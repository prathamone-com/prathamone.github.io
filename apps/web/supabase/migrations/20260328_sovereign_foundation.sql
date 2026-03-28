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
-- PrathamOne 10/10: Sovereignty Foundation Schema
-- Author: Jawahar R Mallah | AITDL Network
-- Date: 29 March 2026
-- "Architecture of Bharat. Scalable. Transparent. AI-First."
-- ============================================================

-- 1. AI TOKEN MONETIZATION (The Sovereign Wallet)
CREATE TABLE IF NOT EXISTS recharge_packs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL, -- "Starter", "Basic", "Power"
    description TEXT,
    credits INTEGER NOT NULL, -- Number of AI questions
    price_in_paisa INTEGER NOT NULL, -- â‚¹15 = 1500 paisa
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed initial packs discussed
INSERT INTO recharge_packs (name, credits, price_in_paisa) VALUES 
('Starter Pack', 50, 1500), 
('Basic Pack', 200, 4900), 
('Student Pack', 600, 8900),
('Unlimited Pack (Monthly)', 999999, 12900);

CREATE TABLE IF NOT EXISTS wallet_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    wallet_id UUID REFERENCES ai_token_wallets(user_id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('RECHARGE', 'USAGE', 'REFUND', 'ADJUSTMENT')),
    amount INTEGER NOT NULL, -- Positive for recharge, Negative for usage
    price_paid_paisa INTEGER DEFAULT 0,
    pack_id UUID REFERENCES recharge_packs(id),
    metadata JSONB DEFAULT '{}', -- { "question_id": "...", "razorpay_order_id": "..." }
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ONE-CLICK LECTURE REPOSITORY
CREATE TABLE IF NOT EXISTS lecture_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
    institute_id UUID REFERENCES institutes(id) ON DELETE CASCADE,
    lecturer_id UUID REFERENCES profiles(id),
    title TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 45,
    language TEXT DEFAULT 'English',
    content_json JSONB NOT NULL, -- { "script": "...", "slides": [...], "handout": "..." }
    style TEXT DEFAULT 'Concept Introduction', -- Revision, Exam Prep, Concept Intro
    visibility TEXT CHECK (visibility IN ('PRIVATE', 'INSTITUTE', 'PUBLIC')) DEFAULT 'PRIVATE',
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. AI QUESTION CACHE (Similarity Search)
CREATE TABLE IF NOT EXISTS ai_response_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question_text TEXT NOT NULL,
    answer_text TEXT NOT NULL,
    embedding VECTOR(1536), -- Standard embedding for OpenAI/Google/Anthropic
    board_id UUID REFERENCES boards(id),
    subject TEXT,
    grade INTEGER,
    usage_count INTEGER DEFAULT 1,
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for similarity search
CREATE INDEX ON ai_response_cache USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- 4. INSTITUTE BRANDING & WHITE-LABEL SETTINGS
-- (Extending institutes table or using its branding_config JSONB)
-- This facilitates dynamic CSS generation in Next.js

ALTER TABLE institutes ADD COLUMN IF NOT EXISTS custom_domain TEXT UNIQUE;
ALTER TABLE institutes ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'ACTIVE';
ALTER TABLE institutes ADD COLUMN IF NOT EXISTS contact_info JSONB DEFAULT '{}';

-- 5. ROW LEVEL SECURITY (RLS) FOR 10/10 TABLES

ALTER TABLE recharge_packs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read: Recharge Packs" ON recharge_packs FOR SELECT USING (is_active = TRUE);

ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Self Read: Wallet Transactions" ON wallet_transactions FOR SELECT USING (user_id = auth.uid());

ALTER TABLE lecture_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Institute Isolation: Lectures" ON lecture_assets 
    FOR ALL USING (institute_id = (SELECT tenant_id FROM profiles WHERE id = auth.uid()));

ALTER TABLE ai_response_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read: AI Cache" ON ai_response_cache FOR SELECT USING (TRUE);

-- TRIGGERS
-- Trigger to deduct/add credits automatically on transaction insertion
CREATE OR REPLACE FUNCTION public.process_wallet_transaction()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE ai_token_wallets 
    SET balance = balance + NEW.amount,
        updated_at = NOW()
    WHERE user_id = NEW.user_id;

    -- If unlimited pack, set balance to large number or use separate logic
    IF (SELECT name FROM recharge_packs WHERE id = NEW.pack_id) = 'Unlimited Pack (Monthly)' THEN
        UPDATE ai_token_wallets SET balance = 999999 WHERE user_id = NEW.user_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_wallet_transaction
  AFTER INSERT ON wallet_transactions
  FOR EACH ROW EXECUTE PROCEDURE public.process_wallet_transaction();

