'use strict';

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, ImageRun, AlignmentType, WidthType, BorderStyle, ShadingType,
  VerticalAlign, Header, Footer, PageNumber, convertInchesToTwip,
} = require('docx');

const LOGO_PATH = path.join(__dirname, '../assets/pes-logo.png');

// ─── Colour palette (matches format_sample.pdf) ───────────────────────────────
const C = {
  NAVY:       '1F3864',   // title block, table headers, unit headers
  BLUE:       '2E5496',   // section headings
  WHITE:      'FFFFFF',
  LIGHT_GRAY: 'F2F2F2',   // total rows
  BORDER:     'BFBFBF',   // table borders
  RED:        'FF0000',
  DARK_TEXT:  '000000',
};

const THIN = (color = C.BORDER) => ({ style: BorderStyle.SINGLE, size: 4, color });
const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const ALL_THIN = { top: THIN(), bottom: THIN(), left: THIN(), right: THIN() };

// Zero-width space prevents empty TextRun nodes that can corrupt DOCX in some Word versions
const ZWS = '\u200B';
function makeSpacer(before = 100, after = 0) {
  return new Paragraph({
    children: [new TextRun({ text: ZWS, size: 2 })],
    spacing: { before, after },
  });
}

// ─── Flatten nested colour tags from inside out ──────────────────────────────
// e.g. [YELLOW]text [GREEN]tool[/GREEN] more[/YELLOW] → separate runs
function flattenTags(text) {
  const innerTag = /\[(YELLOW|GREEN|RED)\]((?:(?!\[(?:YELLOW|GREEN|RED)\])[\s\S])*?)\[\/\1\]/g;
  let prev = '';
  let result = text;
  while (prev !== result) {
    prev = result;
    result = result.replace(innerTag, (_, tag, content) => `\x01${tag}\x02${content}\x01/${tag}\x02`);
  }
  return result;
}

// ─── Text run parser ──────────────────────────────────────────────────────────
// Handles **bold**, [YELLOW]...[/YELLOW], [GREEN]...[/GREEN], [RED]...[/RED]
// Supports one level of nesting (e.g. [YELLOW]...[GREEN]inner[/GREEN]...[/YELLOW])
function parseTextRuns(raw, opts = {}) {
  const {
    defaultBold  = false,
    defaultColor = C.DARK_TEXT,
    size         = 20,  // half-points (20 = 10pt)
    whiteText    = false,
  } = opts;

  const baseColor = whiteText ? C.WHITE : defaultColor;
  const text = flattenTags((raw || '').trim());
  const runs = [];

  // Strip any leftover \x01/\x02 marker bytes (safety net against corrupt input)
  const clean = (s) => s.replace(/[\x01\x02]/g, '');

  // Build a single TextRun for a colour tag, expanding any inner nested markers
  const makeColorRuns = (innerText, outerTag) => {
    const innerRE = /\x01(YELLOW|GREEN|RED)\x02([\s\S]*?)\x01\/\1\x02/g;
    const result = [];
    let idx = 0, im;
    while ((im = innerRE.exec(innerText)) !== null) {
      if (im.index > idx) {
        const plain = clean(innerText.slice(idx, im.index));
        if (plain) result.push(makeTagRun(plain, outerTag));
      }
      const innerContent = clean(im[2]);
      if (innerContent) result.push(makeTagRun(innerContent, im[1]));
      idx = innerRE.lastIndex;
    }
    const tail = clean(innerText.slice(idx));
    if (tail) result.push(makeTagRun(tail, outerTag));
    return result;
  };

  const makeTagRun = (content, tag) => {
    if (tag === 'YELLOW') return new TextRun({ text: content, highlight: 'yellow', bold: defaultBold, size });
    if (tag === 'GREEN')  return new TextRun({ text: content, highlight: 'green',  bold: defaultBold, size });
    if (tag === 'RED')    return new TextRun({ text: content, color: C.RED, strike: true, bold: defaultBold, size });
    return new TextRun({ text: content, bold: defaultBold, color: baseColor, size });
  };

  // Regex: **bold** OR flattened marker \x01TAG\x02content\x01/TAG\x02
  const RE = /\*\*([\s\S]*?)\*\*|\x01(YELLOW|GREEN|RED)\x02([\s\S]*?)\x01\/\2\x02/g;
  let lastIdx = 0;
  let m;

  while ((m = RE.exec(text)) !== null) {
    if (m.index > lastIdx) {
      const plain = clean(text.slice(lastIdx, m.index));
      if (plain) runs.push(new TextRun({ text: plain, bold: defaultBold, color: baseColor, size }));
    }

    if (m[1] !== undefined) {
      // **bold**
      runs.push(new TextRun({ text: clean(m[1]), bold: true, color: baseColor, size }));
    } else {
      // Colour tag — expand inner nested markers into separate runs
      for (const r of makeColorRuns(m[3], m[2])) runs.push(r);
    }
    lastIdx = RE.lastIndex;
  }

  const tail = clean(text.slice(lastIdx));
  if (tail) runs.push(new TextRun({ text: tail, bold: defaultBold, color: baseColor, size }));

  return runs.length ? runs : [new TextRun({ text: ZWS })];
}

// Strip all tags from text (for extracting plain values)
function stripTags(text) {
  return (text || '')
    .replace(/\[(YELLOW|GREEN|RED)\]/g, '')
    .replace(/\[\/(YELLOW|GREEN|RED)\]/g, '')
    .replace(/\*\*/g, '')
    .trim();
}

// ─── Extract course info from AI output (for title block + page header) ───────
function extractCourseInfo(output) {
  const info = { title: 'Course', code: '', credits: '', programme: '', year: '2025-26' };
  const lines = output.split('\n');
  let inSection1 = false;

  for (const line of lines) {
    if (/1\.\s*COURSE INFORMATION/i.test(line)) { inSection1 = true; continue; }
    if (inSection1 && /^#{1,3}\s*2\./.test(line)) break;
    if (!inSection1 || !line.trim().startsWith('|')) continue;
    if (/^[\s|:\-]+$/.test(line.trim())) continue;

    const cells = line.split('|').slice(1, -1).map(c => stripTags(c));
    if (cells.length < 2) continue;
    const key = cells[0].toLowerCase();
    const val = cells[1];
    if (key.includes('course title')) info.title = val;
    if (key.includes('course code')) info.code = val;
    if (key.includes('credit structure')) info.credits = val;
    if (key.includes('programme')) info.programme = val;
    if (key.includes('semester') || key.includes('year')) {
      const yr = val.match(/20\d\d[-–]\d{2,4}/);
      if (yr) info.year = yr[0];
    }
  }
  return info;
}

// ─── Logo paragraph (centered, above title block) ─────────────────────────────
function makeLogoParagraph() {
  if (!fs.existsSync(LOGO_PATH)) return null;
  try {
    const logoData = fs.readFileSync(LOGO_PATH);
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 160 },
      children: [
        new ImageRun({
          data: logoData,
          transformation: { width: 180, height: 60 },
          type: 'png',
        }),
      ],
    });
  } catch (_) {
    return null;
  }
}

// ─── Title banner ─────────────────────────────────────────────────────────────
function makeTitleBlock(info) {
  const navyCell = (text, bold, fontSize) => new TableRow({
    children: [new TableCell({
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 60 },
        children: [new TextRun({ text: text || ' ', bold, color: C.WHITE, size: fontSize })],
      })],
      shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.NAVY },
      borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER },
    })],
  });

  const line2 = [info.code && `Course Code: ${info.code}`, info.credits && `Credit Structure: (${info.credits.replace(/L-T-P-C-CH:\s*/i, '')})`].filter(Boolean).join(' | ');
  const line3 = `${info.programme || 'Programme'} | Academic Year ${info.year}`;

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
    rows: [
      navyCell((info.title || 'Course').toUpperCase(), true, 36),
      ...(line2 ? [navyCell(line2, false, 20)] : []),
      navyCell(line3, false, 18),
    ],
  });
}

// ─── Legend bar (YELLOW | GREEN | RED) ───────────────────────────────────────
function makeLegendBar() {
  const legendCell = (text, fill, textColor, strike) => new TableCell({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 80, after: 80 },
      children: [new TextRun({ text, bold: true, color: textColor, size: 18, strike: strike || false })],
    })],
    shading: { type: ShadingType.CLEAR, color: 'auto', fill },
    borders: ALL_THIN,
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({
      children: [
        legendCell('YELLOW = Updated / Modified Content', 'FFFF00', C.DARK_TEXT, false),
        legendCell('GREEN = AI Content', '92D050', C.DARK_TEXT, false),
        legendCell('RED = Content to be Removed', 'FFD7D7', C.RED, true),
      ],
    })],
    borders: ALL_THIN,
  });
}

// ─── Section heading (blue, bottom border) ────────────────────────────────────
function makeSectionHeading(raw) {
  const text = raw.replace(/^#{1,4}\s*/, '').trim();
  return new Paragraph({
    spacing: { before: 280, after: 120 },
    border: { bottom: { color: C.BLUE, space: 1, style: BorderStyle.SINGLE, size: 6 } },
    children: [new TextRun({ text: text || ' ', bold: true, color: C.BLUE, size: 24 })],
  });
}

// ─── Unit header box (navy, white text, full width) ───────────────────────────
function makeUnitHeader(raw) {
  const text = raw.replace(/^\*\*/,'').replace(/\*\*$/, '').trim();
  const runs = parseTextRuns(text || ' ', { defaultBold: true, size: 20, whiteText: true });
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER, insideH: NO_BORDER, insideV: NO_BORDER },
    rows: [new TableRow({
      children: [new TableCell({
        children: [new Paragraph({
          spacing: { before: 100, after: 100 },
          indent: { left: 120 },
          children: runs,
        })],
        shading: { type: ShadingType.CLEAR, color: 'auto', fill: C.NAVY },
        borders: { top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER },
      })],
    })],
  });
}

// ─── Parse pipe-delimited lines into 2-D cell array (skips separator rows) ───
function parseTableRows(lines) {
  const rows = [];
  for (const line of lines) {
    const t = line.trim();
    if (!t.startsWith('|')) continue;
    // Separator row: only |, -, :, space
    if (/^[\s|:\-]+$/.test(t)) continue;
    const cells = t.split('|').slice(1, -1).map(c => c.trim());
    if (cells.length > 0) rows.push(cells);
  }
  return rows;
}

// ─── Styled data table ────────────────────────────────────────────────────────
function makeDataTable(tableLines) {
  const rows2d = parseTableRows(tableLines);
  if (rows2d.length === 0) return null;

  // Determine column count from the widest row (not just header)
  const colCount = Math.max(...rows2d.map(r => r.length));
  if (colCount === 0) return null;

  // Normalize: pad short rows with empty cells, trim long rows
  const normalizedRows = rows2d.map(row => {
    if (row.length === colCount) return row;
    if (row.length < colCount) {
      return [...row, ...Array(colCount - row.length).fill('')];
    }
    return row.slice(0, colCount);
  });

  const isTotal = (row) => stripTags(row[0] || '').toLowerCase() === 'total';

  const docRows = [];
  for (let rowIdx = 0; rowIdx < normalizedRows.length; rowIdx++) {
    const cells = normalizedRows[rowIdx];
    const isHeader = rowIdx === 0;
    const isTotalRow = !isHeader && isTotal(cells);

    const fill = isHeader ? C.NAVY : isTotalRow ? C.LIGHT_GRAY : C.WHITE;
    const bold = isHeader || isTotalRow;

    // Build cells with explicit loop and count verification
    const tableCells = [];
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      const cellText = colIdx < cells.length ? (cells[colIdx] || '') : '';
      const runs = parseTextRuns(cellText, { defaultBold: bold, size: 18, whiteText: isHeader });
      const isFirstCol = colIdx === 0;

      tableCells.push(new TableCell({
        verticalAlign: VerticalAlign.CENTER,
        shading: { type: ShadingType.CLEAR, color: 'auto', fill },
        borders: ALL_THIN,
        children: [new Paragraph({
          alignment: isFirstCol ? AlignmentType.LEFT : AlignmentType.CENTER,
          spacing: { before: 60, after: 60 },
          indent: isFirstCol ? { left: 80 } : undefined,
          children: runs,
        })],
      }));
    }

    if (tableCells.length !== colCount) {
      console.error(`[docxExporter] Row ${rowIdx} has ${tableCells.length} cells, expected ${colCount}. Skipping.`);
      continue;
    }

    docRows.push(new TableRow({
      tableHeader: isHeader,
      children: tableCells,
    }));
  }

  if (docRows.length === 0) return null;

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: ALL_THIN,
    rows: docRows,
  });
}

// ─── Normal / sub-heading paragraph ──────────────────────────────────────────
function makePara(text, opts = {}) {
  const { bold = false, indent = 0, spacing = { before: 60, after: 60 }, alignment = AlignmentType.LEFT } = opts;
  return new Paragraph({
    alignment,
    spacing,
    indent: indent ? { left: indent } : undefined,
    children: parseTextRuns(text || '', { defaultBold: bold, size: 20 }),
  });
}

// ─── Page header ─────────────────────────────────────────────────────────────
function makePageHeader(info) {
  const prog = info.programme || 'Programme';
  const headerText = `${prog} | ${info.title || 'Course'} | ${info.year}`;
  return {
    default: new Header({
      children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        border: { bottom: { color: C.BORDER, space: 1, style: BorderStyle.SINGLE, size: 4 } },
        children: [new TextRun({ text: headerText, italics: true, color: '999999', size: 16 })],
      })],
    }),
  };
}

// ─── Page footer (Page X of Y) ───────────────────────────────────────────────
function makePageFooter() {
  return {
    default: new Footer({
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ children: ['Page '],       size: 16, color: '999999' }),
          new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '999999' }),
          new TextRun({ children: [' of '],         size: 16, color: '999999' }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: '999999' }),
        ],
      })],
    }),
  };
}

// ─── Main document builder ────────────────────────────────────────────────────
function buildChildren(output) {
  const info = extractCourseInfo(output);
  const children = [];

  // Logo (if available) + Title + legend
  const logo = makeLogoParagraph();
  if (logo) children.push(logo);
  children.push(makeTitleBlock(info));
  children.push(makeSpacer(160));
  children.push(makeLegendBar());
  children.push(makeSpacer(200));

  const lines = output.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const t = line.trim();

    // ── Section heading
    if (/^#{1,4}\s+\d+\./.test(t)) {
      children.push(makeSectionHeading(t));
      i++;
      continue;
    }

    // ── Unit header (**UNIT X: ...)
    if (/^\*\*UNIT\s+\d+:/i.test(t)) {
      children.push(makeSpacer(200));
      children.push(makeUnitHeader(t));
      i++;
      continue;
    }

    // ── Table (collect all consecutive | lines)
    if (t.startsWith('|')) {
      const tblLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tblLines.push(lines[i]);
        i++;
      }
      try {
        const tbl = makeDataTable(tblLines);
        if (tbl) {
          children.push(tbl);
          children.push(makeSpacer(100));
        }
      } catch (tableErr) {
        // If table parsing fails, render as plain text instead of crashing
        console.error('[docxExporter] Table parsing error, rendering as text:', tableErr.message);
        for (const tl of tblLines) {
          children.push(makePara(tl.trim()));
        }
      }
      continue;
    }

    // ── Empty line
    if (t === '') {
      children.push(makeSpacer(80));
      i++;
      continue;
    }

    // ── Numbered list item
    if (/^\d+\.\s/.test(t)) {
      children.push(makePara(t, { indent: 360, spacing: { before: 40, after: 40 } }));
      i++;
      continue;
    }

    // ── Bold sub-heading line (**Text:**)
    if (t.startsWith('**') && t.endsWith('**')) {
      children.push(makePara(t, { bold: false, spacing: { before: 140, after: 60 } }));
      i++;
      continue;
    }

    // ── Normal paragraph (includes AI Tools lines, preamble, etc.)
    children.push(makePara(t, { spacing: { before: 60, after: 60 } }));
    i++;
  }

  return { children, info };
}

// ─── Public: generate DOCX file ──────────────────────────────────────────────
async function exportToDocx(output, outputPath) {
  const { children, info } = buildChildren(output);

  // Ensure we have at least one child element
  if (children.length === 0) {
    children.push(new Paragraph({ children: [new TextRun({ text: 'No content generated.' })] }));
  }

  const doc = new Document({
    styles: {
      default: {
        document: { run: { font: 'Calibri', size: 20 } },
      },
    },
    sections: [{
      properties: {
        page: {
          margin: {
            top:    convertInchesToTwip(1),
            right:  convertInchesToTwip(1),
            bottom: convertInchesToTwip(1),
            left:   convertInchesToTwip(1),
          },
        },
      },
      headers: makePageHeader(info),
      footers: makePageFooter(),
      children,
    }],
  });

  let buffer;
  try {
    buffer = await Packer.toBuffer(doc);
  } catch (packErr) {
    console.error('[docxExporter] Packer.toBuffer() failed:', packErr.message);
    throw new Error(`DOCX generation failed: ${packErr.message}`);
  }
  fs.writeFileSync(outputPath, buffer);
  console.log(`[docxExporter] Wrote ${buffer.length} bytes to ${outputPath}`);
  return outputPath;
}

module.exports = { exportToDocx };
