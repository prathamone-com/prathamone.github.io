/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.2.0
 * Release Date : 29 March 2026
 * Environment  : Production (Static-Compatible Client AI)
 * ==========================================================
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { getOfflineContent } from '../utils/curriculum-offline';
import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { PERSONAS } from '@prathamone/ai';

export interface Message {
  id: string;
  text: string;
  teacherId: string;
  role?: string;
  isComplete: boolean;
}

export interface StreamParams {
  board: string;
  grade: number;
  subject: string;
  language: string;
  topic: string;
  lessonPhase: string;
  teacherId?: string; // Optional: can be auto-selected by view
  useMock: boolean;
}

export function useClassroomStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(null);
  const [activePersona, setActivePersona] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [quotaExhausted, setQuotaExhausted] = useState(false);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const localStreamIntervalRef = useRef<any>(null);

  const startLocalStream = useCallback((params: StreamParams, teacherId: string) => {
    setIsStreaming(true);
    setMessages([]);
    setCurrentTeacherId(teacherId);

    const content = getOfflineContent(params.topic, params.lessonPhase, params.language);
    const chars = content.split('');
    let index = 0;
    let accumulated = '';
    const msgId = `offline_${Date.now()}`;

    if (localStreamIntervalRef.current) clearInterval(localStreamIntervalRef.current);

    localStreamIntervalRef.current = setInterval(() => {
      if (index >= chars.length) {
        clearInterval(localStreamIntervalRef.current);
        setIsStreaming(false);
        setMessages(prev => [{ ...prev[0], isComplete: true }]);
        return;
      }

      accumulated += chars[index];
      setMessages([{
        id: msgId,
        text: accumulated,
        teacherId: teacherId,
        role: 'Teacher',
        isComplete: false
      }]);
      index++;
    }, 20);
  }, []);

  const startStream = useCallback(async (params: StreamParams) => {
    // 1. Reset state
    if (abortControllerRef.current) abortControllerRef.current.abort();
    if (localStreamIntervalRef.current) clearInterval(localStreamIntervalRef.current);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // 2. Select Teacher Persona
    const teacherId = params.teacherId || (params.subject.toLowerCase().includes('sanskrit') ? 'pandit-ji' : (params.grade < 5 ? 'shanti-maam' : 'vikram-sir'));
    const persona = PERSONAS.find(p => p.id === teacherId) || PERSONAS[1];
    
    setIsStreaming(true);
    setError(null);
    setQuotaExhausted(false);
    setMessages([]); 
    setCurrentTeacherId(teacherId);
    setActivePersona(persona);

    // 3. Environment & Connectivity Check
    const isOnline = typeof window !== 'undefined' && window.navigator.onLine;
    const hasApiKey = !!process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;

    // Sovereign (Offline) Trigger: Mock, Offline, or Missing API Key
    if (params.useMock || !isOnline || !hasApiKey) {
      if (!hasApiKey && isOnline && !params.useMock) {
        setQuotaExhausted(true);
        console.warn('AI API Key missing. Launching Sovereign Offline Mode.');
      }
      startLocalStream(params, teacherId);
      return;
    }



    try {
      // Direct Client-Side AI Streaming (Static-Hosting Compatible)
      const { textStream } = await streamText({
        model: google('gemini-2.0-flash-exp'),
        system: `You are "${persona.name}", ${persona.role} at PrathamOne.
        Your Persona: ${persona.description}
        Your Pedagogy: ${persona.pedagogy}
        Your Language Proficiencies: ${persona.languages.join(', ')}

        Current Session Context:
        - Board: ${params.board}
        - Grade: ${params.grade}
        - Subject: ${params.subject}
        - Language: ${params.language}
        - Topic: ${params.topic}
        - Phase: ${params.lessonPhase} (Concept, Example, Practice, Summary, or Doubt)

        Instructions:
        1. Embody "${persona.name}" fully. Use their teaching style and specific language tone.
        2. Deliver instruction in ${params.language}.
        3. Use local context (Bharat) and relatable metaphors.
        4. Focus clearly on the current ${params.lessonPhase} of the lesson.
        5. For Practice phase, format your output as valid JSON within a code block if providing questions.
        6. Keep responses high-energy and pedagogically sound.`,
        prompt: `Teach ${params.topic}. Phase: ${params.lessonPhase}.`,
        abortSignal: signal,
      });

      let fullText = '';
      const msgId = `ai_${Date.now()}`;

      for await (const textDelta of textStream) {
        fullText += textDelta;
        setMessages([{
          id: msgId,
          text: fullText,
          teacherId: teacherId,
          role: persona.role,
          isComplete: false
        }]);
      }

    } catch (err: any) {
      if (err.name === 'AbortError') return;
      
      const isQuotaError = err.message?.includes('429') || err.message?.includes('quota') || err.message?.includes('exhausted');
      const isAuthError = err.message?.includes('403') || err.message?.includes('401') || err.message?.includes('unauthorized');
      
      if (isQuotaError || isAuthError) {
        setQuotaExhausted(true);
      }

      setError(err.message || 'An unknown error occurred');
      console.error('Stream failure:', err);
      // Fail-over to Local Stream on API error
      startLocalStream(params, teacherId);
    } finally {

      setIsStreaming(false);
      setMessages(prev => prev.map(m => ({ ...m, isComplete: true })));
    }
  }, [startLocalStream]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      if (localStreamIntervalRef.current) clearInterval(localStreamIntervalRef.current);
    };
  }, []);

  return {
    messages,
    isStreaming,
    currentTeacherId,
    activePersona,
    error,
    quotaExhausted,
    startStream,
    setMessages,
  };
}





