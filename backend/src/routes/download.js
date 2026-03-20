const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const UPLOADS_DIR = path.join(__dirname, '../../uploads');

// GET /api/download?filename=syllabus-xxx.docx
router.get('/', (req, res) => {
  const { filename } = req.query;

  // Validate: must be a .docx filename with no path traversal
  if (!filename || filename.includes('..') || filename.includes('/') || !filename.endsWith('.docx')) {
    return res.status(400).json({ error: 'Invalid filename.' });
  }

  const filePath = path.join(UPLOADS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found or already downloaded.' });
  }

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', 'attachment; filename="updated_syllabus.docx"');

  const stream = fs.createReadStream(filePath);
  stream.pipe(res);

  // Clean up after the file is fully sent
  stream.on('end', () => {
    fs.unlink(filePath, () => {});
  });

  stream.on('error', (err) => {
    console.error('[download] Stream error:', err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to stream file.' });
    }
  });
});

module.exports = router;
