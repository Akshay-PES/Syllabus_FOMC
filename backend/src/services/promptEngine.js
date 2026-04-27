'use strict';

const { PROGRAMS } = require('../config/programConfig');
const { buildMasterPrompt } = require('../config/masterPrompt');

const MAX_CHARS = 150000;

/**
 * Builds the final prompt by selecting the correct programme config,
 * generating the master prompt, and injecting the syllabus text.
 *
 * @param {string} syllabusText
 * @param {string} programId - e.g. 'MBA', 'BCOM', 'BBA_LLB', etc.
 * @returns {string}
 */
function buildPrompt(syllabusText, programId, lawBenchmarkType = 'indian') {
  const program = PROGRAMS[programId] || PROGRAMS['MBA'];

  let content = syllabusText;
  if (content.length > MAX_CHARS) {
    console.warn(`[promptEngine] syllabusText truncated from ${content.length} to ${MAX_CHARS} chars`);
    content = content.slice(0, MAX_CHARS) + '\n\n[... content truncated due to length ...]';
  }

  const masterPrompt = buildMasterPrompt(program, lawBenchmarkType);
  return masterPrompt.replace('{{SYLLABUS_CONTENT}}', content);
}

module.exports = { buildPrompt };
