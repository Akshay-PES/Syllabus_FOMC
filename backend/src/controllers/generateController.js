const path = require('path');
const fs = require('fs');
const { extractText } = require('../services/fileParser');
const { buildPrompt } = require('../services/promptEngine');
const { generateSyllabus } = require('../services/aiService');
const { exportToDocx } = require('../services/docxExporter');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

/**
 * POST /api/generate
 * Body: { syllabusFilename, syllabusType }
 */
const handleGenerate = async (req, res) => {
  const { syllabusFilename, syllabusType, programId } = req.body;

  if (!syllabusFilename) {
    return res.status(400).json({ error: 'syllabusFilename is required.' });
  }

  const syllabusPath = path.join(UPLOADS_DIR, syllabusFilename);

  if (!fs.existsSync(syllabusPath)) {
    return res.status(404).json({ error: 'Syllabus file not found. Please upload again.' });
  }

  // Step 1: Extract text
  let syllabusText;
  try {
    syllabusText = await extractText(syllabusPath, syllabusType);
  } catch (err) {
    return res.status(422).json({ error: `Failed to parse syllabus: ${err.message}` });
  }

  // Step 2: Build prompt (programme-specific)
  const prompt = buildPrompt(syllabusText, programId);

  // Step 3: Call Claude
  let output;
  try {
    output = await generateSyllabus(prompt);
  } catch (err) {
    console.error('[generateController] Claude API error:', err.message);
    return res.status(502).json({ error: `AI generation failed: ${err.message}` });
  }

  // Step 4: Remove uploaded syllabus file
  try { fs.unlinkSync(syllabusPath); } catch (_) {}

  // Step 5: Extract course name from output for filename
  let courseName = 'syllabus';
  const courseMatch = output.match(/(?:Course\s*(?:Title|Name)\s*[:\-|]\s*)(.+)/i);
  if (courseMatch) {
    courseName = courseMatch[1]
      .replace(/\*\*/g, '')
      .replace(/\[(YELLOW|GREEN|RED|\/YELLOW|\/GREEN|\/RED)\]/g, '')
      .trim()
      .replace(/[^a-zA-Z0-9\s\-]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 80);
  }

  // Step 6: Generate DOCX
  let docxFilename = null;
  try {
    docxFilename = `${courseName}_${Date.now()}.docx`;
    const docxPath = path.join(UPLOADS_DIR, docxFilename);
    await exportToDocx(output, docxPath);
  } catch (err) {
    console.error('[generateController] DOCX export error:', err.message);
    docxFilename = null; // Non-fatal: user can still copy the text
  }

  return res.status(200).json({ output, docxFilename, downloadName: `${courseName}.docx` });
};

module.exports = { handleGenerate };
