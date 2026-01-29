'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface SignupPageProps {
  onSignupSuccess: (user: any) => void
  onBackToLogin: () => void
}

export default function SignupPage({ onSignupSuccess, onBackToLogin }: SignupPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'user'>('user')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: insertError } = await supabase
        .from('custom_users')
        .insert({ username, password, role })
        .select('*')
        .single()

      if (insertError) {
        if (insertError.code === '23505') {
          setError('Username sudah terdaftar')
        } else if (insertError.code === '42501') {
          setError('Akses ditolak (RLS). Pastikan RLS di-disable untuk tabel custom_users.')
        } else {
          setError(`Gagal membuat akun: ${insertError.message}`)
        }
        setLoading(false)
        return
      }

      onSignupSuccess(data)
    } catch (err) {
      setError('Gagal membuat akun. Coba lagi.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Project Q</h1>
          <p className="text-gray-600">Buat Akun Baru</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Role
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setRole('user')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  role === 'user'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                type="button"
              >
                User
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  role === 'admin'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                type="button"
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Buat Akun'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Kembali ke login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
