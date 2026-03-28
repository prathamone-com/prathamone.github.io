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

/**
 * PrathamOne - Director Graph (Multi-Agent Orchestration)
 */

import { Annotation, StateGraph, START, END } from '@langchain/langgraph';
import type { LangGraphRunnableConfig } from '@langchain/langgraph';
import { SystemMessage, HumanMessage, AIMessage } from '@langchain/core/messages';
import { LanguageModel } from 'ai';

import { AISdkLangGraphAdapter } from './ai-sdk-adapter';
import { PERSONAS, TeacherPersona } from './registry/personas';
import { generateBoardPrompt, PromptContext } from './boards-prompts';
import { ACADEMIC_PROMPTS } from './base-ai/academic_prompts';
import { createLogger } from './lib/logger';

const log = createLogger('PrathamDirector');



// ==================== State Definition ====================

const ClassroomState = Annotation.Root({
  // Input context
  board: Annotation<string>,
  grade: Annotation<number>,
  subject: Annotation<string>,
  language: Annotation<string>,
  topic: Annotation<string>,
  lessonPhase: Annotation<string>,

  // Runtime state
  messages: Annotation<any[]>,
  currentTeacherId: Annotation<string | null>,
  turnCount: Annotation<number>,
  maxTurns: Annotation<number>,
  shouldEnd: Annotation<boolean>,
  useMock: Annotation<boolean>,
});

type ClassroomStateType = typeof ClassroomState.State;

// ==================== Director Node ====================

// ==================== Director Node ====================

async function directorNode(
  state: ClassroomStateType,
  config: LangGraphRunnableConfig,
): Promise<Partial<ClassroomStateType>> {
  if (state.turnCount >= state.maxTurns) {
    return { shouldEnd: true };
  }

  // Orchestration Logic: Phase-based & Grade-based Teacher Selecting
  if (state.turnCount === 0) {
    // Start with a lead educator
    let leadTeacherId = 'vikram-sir';
    if (state.grade <= 7) leadTeacherId = 'shanti-maam';
    if (state.language === 'sa') leadTeacherId = 'pandit-ji';
    
    return { currentTeacherId: leadTeacherId, shouldEnd: false };
  }

  // Peer Mentor (Riya Didi) chimes in for inter-disciplinary connection or simplification
  if (state.turnCount === 1) {
    const shouldBringPeer = state.lessonPhase === 'example' || state.lessonPhase === 'practice' || Math.random() > 0.7;
    if (shouldBringPeer && state.language !== 'sa') {
      return { currentTeacherId: 'riya-didi', shouldEnd: false };
    }
  }

  return { shouldEnd: true };
}

// ==================== Teacher Node ====================

async function teacherNode(
  state: ClassroomStateType,
  config: LangGraphRunnableConfig,
): Promise<Partial<ClassroomStateType>> {
  const teacher = PERSONAS.find(p => p.id === state.currentTeacherId);
  if (!teacher) return { shouldEnd: true };

  // 1. Generate Board-specific System Prompt
  const boardPrompt = generateBoardPrompt({
    board: state.board as any,
    grade: state.grade,
    subject: state.subject,
    language: state.language as any,
    topic: state.topic
  });

  // 2. Wrap with Teacher Persona and Lesson Phase Constraints
  const personaPrompt = `
${boardPrompt}

### Your Persona:
Name: ${teacher.name}
Role: ${teacher.role}
Pedagogy: ${teacher.pedagogy}
Language Preference: Use ${state.language} language scripts exclusively.

### Current Pedagogical Phase: [${(state.lessonPhase || 'concept').toUpperCase()}]
${state.lessonPhase === 'concept' ? '- You are introducing the theoretical fundamentals of the topic. Use analogies.' : ''}
${state.lessonPhase === 'example' ? '- You are demonstrating a step-by-step example or derivation. Focus on clarity.' : ''}
${state.lessonPhase === 'practice' ? '- Provide exactly one practice question for the student to attempt.' : ''}
${state.lessonPhase === 'summary' ? '- Summarize the lesson in 3 key takeaways.' : ''}
${state.lessonPhase === 'doubt' ? '- Answer the student\'s doubt precisely and encourage them.' : ''}

Always stay in character. You are in a PrathamOne live classroom for Bharat.
`;

  log.info(`[Classroom] ${teacher.name} generating turn ${state.turnCount} for ${state.topic}`);

  let content = '';

  try {
    if (state.useMock) throw new Error("Mock Mode Active");

    const { getModel, callLLM } = await import('./base-ai/llm');
    const model = getModel({ 
      provider: 'google', 
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '', 
      model: 'gemini-3.1-pro' 
    });

    const result = await callLLM({
      model,
      systemPrompt: personaPrompt,
      messages: [{ role: 'user', content: `Current Lesson: ${state.topic}. Phase: ${state.lessonPhase}. Please proceed.` }]
    });

    content = result.text || '';
  } catch (error) {
    // Fallback: Topic-Aware Mock Content
    log.warn(`[Classroom] AI fallback triggered for ${state.topic}`);
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const phaseGreetings: Record<string, string> = {
      concept: `Welcome! Let's build a strong foundation for **${state.topic}**.`,
      example: `Let's look at a practical application of **${state.topic}**.`,
      practice: `Ready to test your knowledge on **${state.topic}**?`,
      summary: `Excellent progress! Here's what we learned about **${state.topic}**.`,
      doubt: `That's a great question about **${state.topic}**!`
    };

    content = `${phaseGreetings[state.lessonPhase || 'concept']} 
    
    I am ${teacher.name}, and we are following the ${state.board} curriculum for Grade ${state.grade}. 
    
    In this session, we aim to master the core principles of ${state.subject}. 
    
    ${state.lessonPhase === 'practice' ? 
      "### Practice Question:\nBased on our discussion, how would you apply " + state.topic + " in a real-world scenario? Submit your answer below." : 
      "Let's move forward and dive deeper into the nuances of this chapter."}
    
    Stay curious and keep learning!`;
  }

  return {
    turnCount: state.turnCount + 1,
    currentTeacherId: null,
    messages: [...state.messages, {
      id: Math.random().toString(36).substring(7),
      teacherId: teacher.id,
      text: content,
      timestamp: new Date().toISOString()
    }]
  };
}

// ==================== Graph Construction ====================

export function createPrathamGraph() {
  const graph = new StateGraph(ClassroomState)
    .addNode('director', directorNode)
    .addNode('teacher_generate', teacherNode)
    .addEdge(START, 'director')
    .addConditionalEdges('director', (s) => s.shouldEnd ? END : 'teacher_generate')
    .addEdge('teacher_generate', 'director');

  return graph.compile();
}
