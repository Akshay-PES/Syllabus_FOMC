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
export async function generateSyllabus(syllabusFilename, syllabusType, programId) {
  const { data } = await axios.post(
    `${BASE}/generate`,
    { syllabusFilename, syllabusType, programId },
    { timeout: 180000 } // 3 min for large syllabi
  );
  return data;
}

/**
 * Download the generated .docx file.
 * @param {string} filename - server-side filename of the generated docx
 */
export async function downloadDocx(filename) {
  const response = await axios.get(`${BASE}/download`, {
    params: { filename },
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'updated_syllabus.docx';
  link.click();
  window.URL.revokeObjectURL(url);
}
