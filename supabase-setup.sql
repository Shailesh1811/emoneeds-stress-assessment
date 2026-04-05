-- ==============================================
-- EMONEEDS STRESS ASSESSMENT - SUPABASE TABLE SETUP
-- ==============================================
-- Run this SQL in your Supabase Dashboard → SQL Editor
-- URL: https://supabase.com/dashboard → Your Project → SQL Editor
-- ==============================================

-- 1. Create the assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  score INTEGER NOT NULL,
  stress_level TEXT NOT NULL CHECK (stress_level IN ('low', 'moderate', 'high')),
  answers JSONB NOT NULL
);

-- 2. Enable Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- 3. Allow anonymous inserts (public assessment form)
CREATE POLICY "Allow anonymous inserts" 
  ON assessments 
  FOR INSERT 
  WITH CHECK (true);

-- 4. Allow authenticated reads (for admin dashboard later)
CREATE POLICY "Allow authenticated reads" 
  ON assessments 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- 5. Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_assessments_email ON assessments(email);

-- 6. Create index on created_at for date-based queries
CREATE INDEX IF NOT EXISTS idx_assessments_created_at ON assessments(created_at DESC);

-- ==============================================
-- DATA FORMAT REFERENCE:
-- ==============================================
-- name: "John Doe"
-- email: "john@example.com"  
-- phone: "+91-9876543210" (optional)
-- score: 25 (0-40 range)
-- stress_level: "low" | "moderate" | "high"
-- answers (JSONB): {"Q1":"a2","Q2":"a0","Q3":"a4","Q4":"a1",...,"Q10":"a3"}
--
-- Answer key: a0=Never, a1=Rarely, a2=Sometimes, a3=Often, a4=Always
-- Questions: Q1=Work, Q2=Sleep, Q3=Anxiety, Q4=Physical, Q5=Mood,
--            Q6=Cognitive, Q7=Lifestyle, Q8=Emotional, Q9=Social, Q10=Balance
-- ==============================================

-- EXAMPLE QUERY: Get all high-stress assessments this week
-- SELECT name, email, score, stress_level, created_at 
-- FROM assessments 
-- WHERE stress_level = 'high' 
--   AND created_at >= NOW() - INTERVAL '7 days'
-- ORDER BY created_at DESC;

-- EXAMPLE QUERY: Get per-question breakdown for a specific user
-- SELECT name, email, score,
--   answers->>'Q1' as work_stress,
--   answers->>'Q2' as sleep_stress,
--   answers->>'Q3' as anxiety_level
-- FROM assessments
-- WHERE email = 'user@example.com';
