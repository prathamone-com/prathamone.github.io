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
 * ==========================================================
 */

/**
 * Extracts JSON-formatted data from a raw AI message string.
 * Supports markdown code blocks and raw JSON fragments.
 */
export function extractJSONFromMessage<T>(message: string): T | null {
  if (!message) return null;

  try {
    // 1. Try Markdown JSON Block
    const jsonBlockMatch = message.match(/```(?:json)?\n?([\s\S]*?)\n?```/i);
    if (jsonBlockMatch?.[1]) {
      return JSON.parse(jsonBlockMatch[1].trim());
    }

    // 2. Try Array/Object shape direct match
    const bracketMatch = message.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
    if (bracketMatch?.[0]) {
      return JSON.parse(bracketMatch[0].trim());
    }

    // 3. Try raw parse
    return JSON.parse(message.trim());
  } catch (e) {
    console.warn('Failed to parse JSON from AI message:', e);
    return null;
  }
}

/**
 * Ensures practice questions are always an array and handled gracefully.
 */
export function normalizePracticeQuestions(data: any): any[] {
  if (!data) return [];
  return Array.isArray(data) ? data : [data];
}
