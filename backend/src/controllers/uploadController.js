const handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'A syllabus file (PDF or DOCX) is required.' });
  }

  const { filename, originalname, mimetype, size } = req.file;

  return res.status(200).json({
    message: 'File uploaded successfully.',
    syllabus: { filename, originalName: originalname, mimetype, size },
  });
};

module.exports = { handleUpload };
