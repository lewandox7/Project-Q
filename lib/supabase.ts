import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export type User = {
  id: string
  username: string
  role: 'admin' | 'user'
  created_at: string
}

export type Quiz = {
  id: string
  title: string
  description: string
  created_by: string
  created_at: string
}

export type Question = {
  id: string
  quiz_id: string
  question_text: string
  options: string[]
  correct_answer: string
  order: number
}
