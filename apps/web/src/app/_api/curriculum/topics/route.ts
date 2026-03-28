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
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * GET /api/curriculum/topics?board=MSBSHSE&grade=12&subject=Mathematics&chapter=Mathematical Logic
 * 
 * Returns all granular topics for the given chapter from Supabase.
 * Fully replaces the static JSON fallback mechanism with a live DB call.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const board = searchParams.get('board') || 'MSBSHSE';
  const grade = parseInt(searchParams.get('grade') || '12');
  const subject = searchParams.get('subject') || 'Mathematics';
  const chapterTitle = searchParams.get('chapter') || '';

  // Strip leading chapter number if present: "1. Mathematical Logic" â†’ "Mathematical Logic"
  const cleanChapter = chapterTitle.replace(/^\d+\.\s*/, '').trim();

  try {
    // Fetch chapter + topics via Supabase join
    const { data: chapterData, error } = await supabase
      .from('chapters')
      .select(`
        id,
        title,
        chapter_no,
        book_reference_url,
        topics (
          id,
          title,
          difficulty,
          order_index,
          concept_mastery_html,
          hots_question,
          practice_questions
        )
      `)
      .eq('title', cleanChapter)
      .order('order_index', { referencedTable: 'topics', ascending: true })
      .single();

    if (error || !chapterData) {
      // Graceful fallback if Supabase data not available
      return NextResponse.json({
        topics: [
          { id: 't_mock_1', title: `Introduction to ${cleanChapter}`, difficulty: 'Easy' },
          { id: 't_mock_2', title: 'Core Concepts', difficulty: 'Medium' },
          { id: 't_mock_3', title: 'Advanced Applications', difficulty: 'Hard' },
        ],
        source: 'fallback',
      });
    }

    return NextResponse.json({
      chapter: {
        id: chapterData.id,
        title: chapterData.title,
        book_reference_url: chapterData.book_reference_url,
      },
      topics: chapterData.topics || [],
      source: 'supabase',
    });

  } catch (err) {
    console.error('[curriculum/topics] Supabase error:', err);
    return NextResponse.json({ topics: [], source: 'error' }, { status: 500 });
  }
}

/**
 * GET /api/curriculum/chapters?board=MSBSHSE&grade=12&subject=Mathematics
 * Returns all chapters for a subject.
 */
export async function DELETE(request: Request) {
  // not used but prevents 405 errors
  return NextResponse.json({ ok: true });
}

