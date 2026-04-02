const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

// GET /api/download?filename=syllabus-xxx.docx
router.get('/', (req, res) => {
  const { filename, downloadName } = req.query;

  // Validate: must be a .docx filename with no path traversal
  if (!filename || filename.includes('..') || filename.includes('/') || !filename.endsWith('.docx')) {
    return res.status(400).json({ error: 'Invalid filename.' });
  }

  const filePath = path.join(UPLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found or already downloaded.' });
  }

  const safeName = downloadName || 'updated_syllabus.docx';

  try {
    const fileBuffer = fs.readFileSync(filePath);

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.setHeader('Content-Disposition', `attachment; filename="${safeName}"`);
    res.setHeader('Content-Length', fileBuffer.length);
    res.setHeader('Content-Transfer-Encoding', 'binary');
    res.end(fileBuffer);

    // Clean up after sending
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) console.error('[download] Cleanup error:', err.message);
      });
    }, 2000);
  } catch (err) {
    console.error('[download] Read error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to read file.' });
    }
  }
});

module.exports = router;
