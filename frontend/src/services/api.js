import axios from 'axios';

const BASE = '/api';

/**
 * Upload the syllabus file. Returns syllabus file metadata.
 * @param {File} syllabusFile
 */
export async function uploadFile(syllabusFile) {
  const form = new FormData();
  form.append('syllabus', syllabusFile);

  const { data } = await axios.post(`${BASE}/upload`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

/**
 * Trigger AI generation. Returns { output: string }.
 * @param {string} syllabusFilename
 * @param {string} syllabusType
 * @param {string} programId - e.g. 'MBA', 'BCOM', 'BBA_LLB'
 */
export async function generateSyllabus(syllabusFilename, syllabusType, programId, lawBenchmarkType) {
  const { data } = await axios.post(
    `${BASE}/generate`,
    { syllabusFilename, syllabusType, programId, lawBenchmarkType },
    { timeout: 300000 } // 5 min for large syllabi
  );
  return data;
}

/**
 * Download the generated .docx file.
 * @param {string} filename - server-side filename of the generated docx
 */
export async function downloadDocx(filename, downloadName) {
  const response = await axios.get(`${BASE}/download`, {
    params: { filename, downloadName },
    responseType: 'arraybuffer',
  });

  const blob = new Blob([response.data], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = downloadName || 'updated_syllabus.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}