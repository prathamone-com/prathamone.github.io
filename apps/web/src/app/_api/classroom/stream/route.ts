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

import { NextRequest } from 'next/server';
import { createPrathamGraph } from '@prathamone/ai';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { board, grade, subject, language, topic, lessonPhase, useMock } = body;

    const graph = createPrathamGraph();
    
    // We stream the graph events (node transitions, state updates)
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
            // LangGraph 'updates' yields the state updates from each node
            const jsonChunk = JSON.stringify(chunk);
            controller.enqueue(encoder.encode(`data: ${jsonChunk}\n\n`));
          }
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
          controller.close();
        } catch(e) {
          console.error("Stream error", e);
          controller.enqueue(encoder.encode(`data: {"error": "Stream failed"}\n\n`));
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
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to start graph' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
