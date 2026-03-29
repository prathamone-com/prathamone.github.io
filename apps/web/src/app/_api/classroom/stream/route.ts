/**
 * ==========================================================
 * AITDL AI AGENT BUILD SIGNATURE
 * ==========================================================
 * Architect    : Jawahar R Mallah
 * Designation  : AI Systems Architect & Author
 * Organization : AITDL Network | PrathamOne
 * Framework    : Autonomous AI Agent Development
 * Authored By  : Jawahar R Mallah
 * Version      : 1.1.0
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

import { NextRequest } from 'next/server';
import { createPrathamGraph } from '@prathamone/ai';

export const runtime = 'nodejs';

/**
 * AI Classroom Streaming Engine
 * Orchestrates multi-agent pedagogical loops via LangGraph.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      board, grade, subject, language, topic, lessonPhase, useMock 
    } = body;

    const graph = createPrathamGraph();
    
    // Execute the pedagogical graph with standard educational state
    const stream = await graph.stream({
      board, 
      grade, 
      subject, 
      language, 
      topic,
      lessonPhase: lessonPhase || 'concept',
      turnCount: 0,
      maxTurns: 3,
      messages: [],
      currentTeacherId: null,
      shouldEnd: false,
      useMock: !!useMock
    }, { streamMode: "updates" });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            // LangGraph 'updates' mode: chunk = { [nodeName]: { stateUpdates } }
            const jsonChunk = JSON.stringify(chunk);
            controller.enqueue(encoder.encode(`data: ${jsonChunk}\n\n`));
          }
          
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch(e) {
          console.error("Stream runtime error:", e);
          const errorMsg = JSON.stringify({ error: "Pedagogical loop interrupted" });
          controller.enqueue(encoder.encode(`data: ${errorMsg}\n\n`));
          controller.close();
        }
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error("Stream initiation failed:", error);
    return new Response(JSON.stringify({ error: 'Failed to start pedagogical graph' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

