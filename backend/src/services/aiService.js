const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = 'claude-opus-4-6';
const MAX_TOKENS = 12000;

/**
 * Sends the assembled prompt to Claude and returns the generated text.
 *
 * @param {string} prompt - The full prompt (from promptEngine.buildPrompt)
 * @returns {Promise<string>} The AI-generated syllabus output
 */
async function generateSyllabus(prompt) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    temperature: 0.3,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const block = response.content.find((b) => b.type === 'text');
  if (!block) {
    throw new Error('Claude returned no text content.');
  }

  return block.text;
}

module.exports = { generateSyllabus };
