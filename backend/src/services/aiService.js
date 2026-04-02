const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = 'claude-opus-4-6';
const MAX_TOKENS = 12000;
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 5000; // 5 seconds

/**
 * Sleep helper
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Sends the assembled prompt to Claude and returns the generated text.
 * Retries up to 3 times with exponential backoff on 529/429 errors.
 *
 * @param {string} prompt - The full prompt (from promptEngine.buildPrompt)
 * @returns {Promise<string>} The AI-generated syllabus output
 */
async function generateSyllabus(prompt) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`[aiService] Attempt ${attempt}/${MAX_RETRIES} with ${MODEL}...`);
      const response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.3,
        messages: [{ role: 'user', content: prompt }],
      });

      const block = response.content.find((b) => b.type === 'text');
      if (!block) {
        throw new Error('Claude returned no text content.');
      }

      console.log(`[aiService] Success on attempt ${attempt}`);
      return block.text;
    } catch (err) {
      const status = err?.status || err?.error?.status;
      const isRetryable = status === 529 || status === 429;

      if (isRetryable && attempt < MAX_RETRIES) {
        const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1); // 5s, 10s, 20s
        console.log(`[aiService] ${status} error on attempt ${attempt}. Retrying in ${delay / 1000}s...`);
        await sleep(delay);
        continue;
      }

      throw err;
    }
  }
}

module.exports = { generateSyllabus };
