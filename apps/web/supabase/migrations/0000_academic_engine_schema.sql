-- ==========================================================
-- AITDL AI AGENT BUILD SIGNATURE
-- ==========================================================
-- Architect    : Jawahar R Mallah
-- Designation  : AI Systems Architect & Author
-- Organization : AITDL Network | PrathamOne
-- Framework    : Autonomous AI Agent Development
-- Authored By  : Jawahar R Mallah
-- Version      : 1.0.0
-- Release Date : 28 March 2026
-- Environment  : Production
--
-- Signature    : Engineered by Jawahar R Mallah
-- Motto        : Crafted with Logic, Vision & AI
-- ==========================================================
-- PrathamOne Academic Engine: Balbharati AI Learning System Structure
-- This implements the legal, "Reference-Based Learning" AI product schema.

-- ðŸ“š Table 1: boards
CREATE TABLE IF NOT EXISTS public.boards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    short_name TEXT NOT NULL UNIQUE, -- e.g., 'MSBSHSE', 'CBSE'
    name TEXT NOT NULL,              -- e.g., 'Maharashtra State Board'
    language_options TEXT[] DEFAULT '{"English"}'::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ðŸŽ“ Table 2: classes
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    board_id UUID NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
    name TEXT NOT NULL,              -- e.g., 'Class 12'
    stream TEXT,                     -- e.g., 'Science', 'Commerce'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ðŸ“˜ Table 3: subjects
CREATE TABLE IF NOT EXISTS public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,              -- e.g., 'Mathematics'
    code TEXT,                       -- e.g., 'MATH12'
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ðŸ“– Table 4: chapters
CREATE TABLE IF NOT EXISTS public.chapters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    chapter_no INTEGER NOT NULL,
    title TEXT NOT NULL,             -- e.g., 'Derivatives'
    book_reference_url TEXT,         -- e.g., 'https://books.ebalbharati.in/pdfs/1203030318.pdf'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ðŸ§  Table 5: topics
CREATE TABLE IF NOT EXISTS public.topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,             -- e.g., 'Chain Rule'
    difficulty TEXT DEFAULT 'Medium',-- 'Easy', 'Medium', 'Hard'
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ðŸ¤– Table 6: ai_lessons (Cached AI generation)
CREATE TABLE IF NOT EXISTS public.ai_lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL UNIQUE REFERENCES public.topics(id) ON DELETE CASCADE,
    lesson_title TEXT NOT NULL,
    lesson_content TEXT NOT NULL,    -- The generated markdown explaining the topic
    example_text TEXT,               -- Dedicated practical example
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ðŸ“ Table 7: practice_questions (Auto Generated / Cached)
CREATE TABLE IF NOT EXISTS public.practice_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL,          -- Array of strings
    correct_option_index INTEGER NOT NULL,
    explanation TEXT,                -- 'Why is this the answer.'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ðŸ“Š Table 8: student_progress
CREATE TABLE IF NOT EXISTS public.student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL,       -- Matches auth.users(id)
    topic_id UUID NOT NULL REFERENCES public.topics(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'In_Progress', -- 'Not_Started', 'In_Progress', 'Completed'
    score_percentage INTEGER DEFAULT 0,
    attempts INTEGER DEFAULT 0,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, topic_id)
);

-- RLS (Row Level Security) Implementation
-- Assuming simple public read for academic structure, private read/write for progress
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;

-- Create basic Read policies
CREATE POLICY "Public read boards" ON public.boards FOR SELECT USING (true);
CREATE POLICY "Public read classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Public read subjects" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Public read chapters" ON public.chapters FOR SELECT USING (true);
CREATE POLICY "Public read topics" ON public.topics FOR SELECT USING (true);
CREATE POLICY "Public read ai_lessons" ON public.ai_lessons FOR SELECT USING (true);
CREATE POLICY "Public read practice_questions" ON public.practice_questions FOR SELECT USING (true);

-- Student Progress Policy: Only the specific user can read and update their progress
CREATE POLICY "User read own progress" ON public.student_progress
FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "User insert own progress" ON public.student_progress
FOR INSERT WITH CHECK (auth.uid() = student_id);

CREATE POLICY "User update own progress" ON public.student_progress
FOR UPDATE USING (auth.uid() = student_id);

