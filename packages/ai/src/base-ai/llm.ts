/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.0.0
 * Release Date : 28 March 2026
 * Environment  : Production
 *
 * Signature    : Engineered by Jawahar R Mallah
 * Motto        : Crafted with Logic, Vision & AI
 * ==========================================================
 */

import { generateText, streamText, LanguageModel } from 'ai';

type Message = { role: 'system' | 'user' | 'assistant'; content: string };
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

/**
 * PrathamOne LLM Provider Layer
 */

export interface LLMConfig {
  provider: 'openai' | 'anthropic' | 'google';
  apiKey: string;
  model: string;
}

export const getModel = (config: LLMConfig): LanguageModel => {
  switch (config.provider) {
    case 'openai':
      return createOpenAI({ apiKey: config.apiKey })(config.model);
    case 'anthropic':
      return createAnthropic({ apiKey: config.apiKey })(config.model);
    case 'google':
      return createGoogleGenerativeAI({ apiKey: config.apiKey })(config.model);
    default:
      throw new Error(`Unsupported provider: ${config.provider}`);
  }
};

/**
 * Unified text generation
 */
export async function callLLM(
  options: {
    model: LanguageModel;
    messages: Message[];
    systemPrompt?: string;
  }
) {
  const { text } = await generateText({
    model: options.model,
    messages: options.messages,
    system: options.systemPrompt,
  });
  return { text };
}

/**
 * Unified streaming generation
 */
export function streamLLM(
  options: {
    model: LanguageModel;
    messages: Message[];
    systemPrompt?: string;
    abortSignal?: AbortSignal;
  }
) {
  return streamText({
    model: options.model,
    messages: options.messages,
    system: options.systemPrompt,
    abortSignal: options.abortSignal,
  });
}
