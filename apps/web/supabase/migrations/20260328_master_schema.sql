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
-- PrathamOne 9.8: Master Supabase Schema
-- Author: Jawahar R Mallah | AITDL Network
-- Date: 29 March 2026
-- "No Hard-Coded. Bridging Bharat to the Future."
-- ============================================================

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector"; -- For AI Q&A Similarity Search

-- 1. INSTITUTIONAL HIERARCHY (Tenancy)
CREATE TABLE IF NOT EXISTS institutes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    subdomain TEXT UNIQUE, -- e.g., "kvpune.prathamone.com"
    branding_config JSONB DEFAULT '{}', -- { "logo": "...", "colors": { "primary": "..." } }
    subscription_plan TEXT DEFAULT 'FREE', -- FREE, PRO, ENTERPRISE
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    institute_id UUID REFERENCES institutes(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. STAKEHOLDER PROFILES (Auth Integration)
-- Links to Supabase auth.users
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES institutes(id), -- Critical for RLS
    branch_id UUID REFERENCES branches(id),
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('STUDENT', 'LECTURER', 'PARENT', 'INSTITUTE_ADMIN', 'PLATFORM_ADMIN')),
    institutional_id TEXT UNIQUE, -- "POA-2026-001"
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Junction for Parent-Student links (Multi-child support)
CREATE TABLE IF NOT EXISTS parent_student_links (
    parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    PRIMARY KEY (parent_id, student_id)
);

-- 3. ACADEMIC ENGINE
CREATE TABLE IF NOT EXISTS boards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    short_name TEXT UNIQUE NOT NULL, -- "MSBSHSE", "CBSE"
    name TEXT NOT NULL,
    language_options TEXT[] DEFAULT '{English, Hindi}'
);

CREATE TABLE IF NOT EXISTS chapters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    board_id UUID REFERENCES boards(id),
    grade INTEGER NOT NULL, -- 10, 11, 12
    subject TEXT NOT NULL, -- "Mathematics", "Physics"
    chapter_no INTEGER,
    title TEXT NOT NULL,
    book_reference_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id UUID REFERENCES chapters(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    difficulty TEXT DEFAULT 'Medium',
    order_index INTEGER DEFAULT 1,
    concept_mastery_html TEXT, -- From AI Content Factory
    hots_question JSONB,        -- { "q": "...", "sol": "..." }
    practice_questions JSONB,   -- [{ "q": "...", "options": [], "ans": "" }]
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. ENGAGEMENT & TRACKING
CREATE TABLE IF NOT EXISTS attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES profiles(id),
    institute_id UUID REFERENCES institutes(id),
    lecture_date DATE DEFAULT CURRENT_DATE,
    status TEXT DEFAULT 'PRESENT', -- PRESENT, ABSENT, LATE
    remarks TEXT
);

CREATE TABLE IF NOT EXISTS learning_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES profiles(id),
    topic_id UUID REFERENCES topics(id),
    mastery_score INTEGER DEFAULT 0, -- 0-100
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    duration_minutes INTEGER DEFAULT 0,
    status TEXT DEFAULT 'STARTED' -- STARTED, COMPLETED, MASTERY_ACHIEVED
);

CREATE TABLE IF NOT EXISTS streaks (
    student_id UUID PRIMARY KEY REFERENCES profiles(id),
    current_streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    last_activity_date DATE DEFAULT CURRENT_DATE
);

-- 5. FINANCIAL & AI LEDGER
CREATE TABLE IF NOT EXISTS ai_token_wallets (
    user_id UUID PRIMARY KEY REFERENCES profiles(id),
    balance INTEGER DEFAULT 100, -- Free starter tokens
    total_recharged INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fee_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES profiles(id),
    institute_id UUID REFERENCES institutes(id),
    academic_year TEXT DEFAULT '2025-26',
    total_due NUMERIC(10, 2),
    paid_amount NUMERIC(10, 2) DEFAULT 0.0,
    status TEXT DEFAULT 'PENDING',
    due_date DATE
);

-- 6. ROW LEVEL SECURITY (RLS)
-- Each Stakeholder/Institute sees only their data.

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation: Profiles" ON profiles 
    FOR ALL USING (tenant_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tenant Isolation: Attendance" ON attendance 
    FOR ALL USING (institute_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

ALTER TABLE learning_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self Isolation: Ledger" ON learning_ledger 
    FOR ALL USING (student_id = auth.uid() OR 
                   EXISTS (SELECT 1 FROM parent_student_links WHERE parent_id = auth.uid() AND student_id = learning_ledger.student_id));

ALTER TABLE ai_token_wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self Access: Token Wallet" ON ai_token_wallets 
    FOR ALL USING (user_id = auth.uid());

-- Add similar policies for other tables...

-- FUNCTIONS & TRIGGERS
-- Auto-create profile on Auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url', COALESCE(new.raw_user_meta_data->>'role', 'STUDENT'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger for AI Token Update
CREATE OR REPLACE FUNCTION public.sync_wallet_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wallet_timestamp
  BEFORE UPDATE ON ai_token_wallets
  FOR EACH ROW EXECUTE PROCEDURE public.sync_wallet_update();

