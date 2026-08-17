import { env } from '../config/env.js';
export async function generateCareerResponse(task, input) {
  if (!env.openaiKey) { const error = new Error('AI service is not configured.'); error.status = 503; error.expose = true; throw error; }
  const response = await fetch('https://api.openai.com/v1/responses', { method: 'POST', headers: { Authorization: `Bearer ${env.openaiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'gpt-5', store: false, instructions: `You are a student career assessment aid. Task: ${task}. Give constructive, explainable feedback. Never state that this guarantees employment or make an automated hiring decision.`, input }) });
  const data = await response.json(); if (!response.ok) { const error = new Error(data.error?.message || 'AI request failed.'); error.status = 502; error.expose = true; throw error; } return data.output_text;
}
