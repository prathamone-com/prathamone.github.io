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
-- ============================================================
-- PrathamOne Academic Engine Schema
-- Author: Jawahar R Mallah | AITDL Network
-- Run this in Supabase SQL Editor to set up all tables
-- ============================================================

-- 1. BOARDS
create table if not exists boards (
  id uuid primary key default gen_random_uuid(),
  short_name text unique not null,
  name text not null,
  language_options text[] default '{}'
);

-- 2. CLASSES
create table if not exists classes (
  id uuid primary key default gen_random_uuid(),
  board_id uuid references boards(id) on delete cascade,
  name text not null,
  stream text
);

-- 3. SUBJECTS
create table if not exists subjects (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references classes(id) on delete cascade,
  name text not null,
  code text,
  icon text
);

-- 4. CHAPTERS
create table if not exists chapters (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references subjects(id) on delete cascade,
  chapter_no int,
  title text not null,
  book_reference_url text
);

-- 5. TOPICS
create table if not exists topics (
  id uuid primary key default gen_random_uuid(),
  chapter_id uuid references chapters(id) on delete cascade,
  title text not null,
  difficulty text default 'Medium',
  order_index int default 1,
  concept_mastery_html text,
  hots_question jsonb,
  practice_questions jsonb
);

-- 6. Disable RLS so seed script can write (re-enable after seeding if needed)
ALTER TABLE boards DISABLE ROW LEVEL SECURITY;
ALTER TABLE classes DISABLE ROW LEVEL SECURITY;
ALTER TABLE subjects DISABLE ROW LEVEL SECURITY;
ALTER TABLE chapters DISABLE ROW LEVEL SECURITY;
ALTER TABLE topics DISABLE ROW LEVEL SECURITY;

SELECT 'Schema created successfully! Run the seed script now.' as status;

