import { createOpenAI } from '@ai-sdk/openai';

export const openaiProvider = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export function getModel() {
  return openaiProvider(process.env.OPENAI_MODEL ?? 'gpt-4o');
}
