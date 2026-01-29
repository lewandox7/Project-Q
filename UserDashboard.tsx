'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface UserDashboardProps {
  userId: string
}

export default function UserDashboard({ userId }: UserDashboardProps) {
  const [quizzes, setQuizzes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadQuizzes()
  }, [])

  const loadQuizzes = async () => {
    try {
      const { data } = await supabase.from('quizzes').select('*').limit(10)
      setQuizzes(data || [])
    } catch (err) {
      console.error('Error loading quizzes:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Available Quizzes</h2>
          <p className="text-gray-600 mt-2">Select a quiz to start answering questions</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">No quizzes available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition p-6 cursor-pointer border-l-4 border-blue-600"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{quiz.description}</p>
                <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
