const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');
const pdfParse = require('pdf-parse');

/**
 * Extracts plain text from a PDF or DOCX file.
 * @param {string} filePath - Absolute path to the file.
 * @param {string} mimetype - MIME type of the file.
 * @returns {Promise<string>} Extracted text content.
 */
/**
 * Strip any previous colour-coding tags so the AI treats all content as plain text.
 */
function stripColourTags(text) {
  return text
    .replace(/\[(YELLOW|GREEN|RED)\]/g, '')
    .replace(/\[\/(YELLOW|GREEN|RED)\]/g, '');
}

async function extractText(filePath, mimetype) {
  const buffer = fs.readFileSync(filePath);
  let text;

  if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    const result = await mammoth.extractRawText({ buffer });
    text = result.value.trim();
  } else if (mimetype === 'application/pdf') {
    const result = await pdfParse(buffer);
    text = result.text.trim();
  } else {
    throw new Error(`Unsupported file type: ${mimetype}`);
  }

  return stripColourTags(text);
}

module.exports = { extractText };
