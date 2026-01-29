-- Custom Users Table (Simplified Username/Password Login)
CREATE TABLE IF NOT EXISTS custom_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quizzes Table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  created_by UUID NOT NULL REFERENCES custom_users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  options TEXT[] DEFAULT '{}',
  correct_answer TEXT NOT NULL,
  "order" INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quiz Attempts (User Responses)
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES custom_users(id) ON DELETE CASCADE,
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  score INT,
  total_questions INT,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Disable RLS for simplicity (Supabase)
ALTER TABLE custom_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes DISABLE ROW LEVEL SECURITY;
ALTER TABLE questions DISABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts DISABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX idx_quizzes_created_by ON quizzes(created_by);
CREATE INDEX idx_questions_quiz_id ON questions(quiz_id);
CREATE INDEX idx_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_attempts_quiz_id ON quiz_attempts(quiz_id);

-- Seed Data (1 admin, 1 user)
INSERT INTO custom_users (username, password, role) VALUES
('admin', 'admin123', 'admin'),
('user', 'user123', 'user')
ON CONFLICT DO NOTHING;
