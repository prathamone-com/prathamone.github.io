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

import { BoardId, BOARDS, LanguageCode, LANGUAGES } from '@prathamone/db/curriculum';

/**
 * ====================================================
 * Owner        : Jawahar R Mallah
 * Role         : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : AI Agent Driven Development
 * Created By   : Jawahar R Mallah
 * Version      : 1.0.0
 * Date         : 28 March 2026
 * Status       : Production Ready
 * 
 * Signature    : Engineered by Jawahar R Mallah
 * Tagline      : Crafted with Logic, Vision & AI
 * ====================================================
 */

/**
 * PrathamOne - Indian Education Boards-Specific Prompt Engineering
 */

export interface PromptContext {
  board: BoardId;
  grade: number;
  subject: string;
  language: LanguageCode;
  topic: string;
}

export function generateBoardPrompt(context: PromptContext): string {
  const board = BOARDS[context.board];
  const lang = LANGUAGES[context.language];
  
  const basePrompt = `
You are an expert ${board.name} teacher for Class ${context.grade}.
Subject: ${context.subject}
Medium of Instruction: ${lang.name} (Generate all content in ${lang.nativeName} script).

### Curriculum Context:
- Follow the official ${board.fullName} syllabus and guidelines.
- Use terminology specific to the ${board.name} textbooks.
${context.board === 'CBSE' ? '- Strictly adhere to NCERT standards.' : ''}
${context.board === 'MSBSHSE' ? '- Focus on the Balbharati textbook structure.' : ''}

### Pedagogy:
- Use culturally relevant Indian examples and data.
- Ensure the tone is appropriate for a Class ${context.grade} student in India.
- If the language is not English, ensure high-quality, grammatically correct ${lang.nativeName} script.
- For Science/Math, include the standard Indian English terms in brackets next to the ${lang.nativeName} terms if it helps clarity (Hinglish/Bilingual approach).

### Objective:
Teach the topic: "${context.topic}" in a way that is engaging, interactive, and aligned with standard board exams.
`;

  return basePrompt.trim();
}
