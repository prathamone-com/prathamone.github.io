/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.1.2
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { getOfflineContent } from '../utils/curriculum-offline';

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
  useMock: boolean;
}

export function useClassroomStream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const localStreamIntervalRef = useRef<any>(null);

  const startLocalStream = useCallback((params: StreamParams) => {
    setIsStreaming(true);
    setMessages([]);
    setCurrentTeacherId('scholar_1');

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
        teacherId: 'scholar_1',
        role: 'Teacher',
        isComplete: false
      }]);
      index++;
    }, 20); // Fast typing speed for offline (simulating edge AI)
  }, []);

  const startStream = useCallback(async (params: StreamParams) => {
    // 1. Reset state for new session
    if (abortControllerRef.current) abortControllerRef.current.abort();
    if (localStreamIntervalRef.current) clearInterval(localStreamIntervalRef.current);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setIsStreaming(true);
    setError(null);
    setMessages([]); 
    setCurrentTeacherId(null);

    // Sovereign (Offline) Trigger
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      startLocalStream(params);
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
          if (!line.startsWith('data: ')) continue;
          
          const dataStr = line.slice(6).trim();
          if (dataStr === '[DONE]') break;
          
          try {
            const data = JSON.parse(dataStr);
            
            // Handle Multi-Agent Transitions (Director Events)
            if (data.director?.currentTeacherId) {
              const nextTeacher = data.director.currentTeacherId;
              setCurrentTeacherId(nextTeacher);
            }

            // Handle Teacher Message Deltas / Final Updates
            if (data.teacher_generate?.messages) {
              const incomingMessages = data.teacher_generate.messages;
              if (!incomingMessages || incomingMessages.length === 0) continue;

              setMessages(prev => {
                const latestIncoming = incomingMessages[incomingMessages.length - 1];
                const lastExisting = prev[prev.length - 1];

                if (lastExisting && lastExisting.teacherId === latestIncoming.teacherId && !lastExisting.isComplete) {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...lastExisting,
                    text: latestIncoming.text,
                    isComplete: data.teacher_generate.isComplete || false
                  };
                  return updated;
                }

                return [...prev, {
                  id: `msg_${Date.now()}`,
                  text: latestIncoming.text,
                  teacherId: latestIncoming.teacherId || data.director?.currentTeacherId || 'default',
                  role: latestIncoming.role,
                  isComplete: data.teacher_generate.isComplete || false
                }];
              });
            }
          } catch (pE) {
            // Ignore malformed JSON chunks
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      setError(err.message || 'An unknown error occurred');
      console.error('Stream failure:', err);
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
    error,
    startStream,
    setMessages,
  };
}


