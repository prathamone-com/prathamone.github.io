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
 * Release Date : 29 March 2026
 * Environment  : Production
 * ==========================================================
 */

import { NextResponse } from 'next/server';
import { getTopicsForChapter } from '@prathamone/db/curriculum';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const board = searchParams.get('board') || 'CBSE';
  const grade = Number(searchParams.get('grade')) || 10;
  const subject = searchParams.get('subject') || 'Mathematics';
  const chapter = searchParams.get('chapter');

  if (!chapter) {
    return NextResponse.json({ error: 'Chapter is required' }, { status: 400 });
  }

  // Use the deterministic logic from the DB package
  // This ensures that the online and offline topic lists are always in sync.
  const topics = getTopicsForChapter(board, grade, subject, chapter);

  return NextResponse.json({
    board,
    grade,
    subject,
    chapter,
    topics
  });
}
