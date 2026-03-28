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

import { useState, useCallback, useRef, useEffect } from 'react';

export interface Message {
  id?: string;
  text: string;
  teacherId: string;
  role?: string;
}

export interface StreamParams {
  board: string;
  grade: number;
  subject: string;
  language: string;
  topic: string;
  lessonPhase: string;
  useMock: boolean;
}

export function useClassroomStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);

  const startStream = useCallback(async (params: StreamParams) => {
    // 1. Abort previous stream if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsStreaming(true);
    setError(null);
    setMessages([]);

    // Offline check
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      setError('Sovereign Mode (Offline): Connect to internet for real-time AI, or use the downloaded curriculum.');
      setIsStreaming(false);
      return;
    }

    try {
      const response = await fetch('/api/classroom/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
        signal,
      });

      if (!response.ok) throw new Error(`Stream Error: ${response.statusText}`);

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error('No reader found in response body');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') break;
            
            try {
              const data = JSON.parse(dataStr);
              
              // Handle Director Events (Teacher ID updates)
              if (data.director?.currentTeacherId) {
                setCurrentTeacherId(data.director.currentTeacherId);
              }

              // Handle Teacher Messages
              if (data.teacher_generate?.messages) {
                setMessages(data.teacher_generate.messages);
              }
            } catch (pE) {
              // Ignore malformed JSON chunks
            }
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // Silently handle expected abortions
      } else {
        setError(err.message || 'An unknown error occurred');
        console.error('Stream failure:', err);
      }
    } finally {
      setIsStreaming(false);
    }
  }, []);

  // Ensure cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    isStreaming,
    currentTeacherId,
    error,
    startStream,
    setMessages,
  };
}
