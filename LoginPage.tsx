'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface LoginPageProps {
  onLoginSuccess: (user: any) => void
  onGoSignup: () => void
}

export default function LoginPage({ onLoginSuccess, onGoSignup }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Get user from custom_users table
      const { data: userData, error: userError } = await supabase
        .from('custom_users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .eq('role', isAdmin ? 'admin' : 'user')
        .single()

      if (userError) {
        setError('Username atau password salah')
        setLoading(false)
        return
      }

      onLoginSuccess(userData)
    } catch (err) {
      setError('Login gagal. Coba lagi.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">Project Q</h1>
          <p className="text-gray-600">Quiz Management Platform</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Login As
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setIsAdmin(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  !isAdmin
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                User
              </button>
              <button
                onClick={() => setIsAdmin(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
                  isAdmin
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username */}
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

            {/* Password */}
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

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onGoSignup}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Belum punya akun? Buat akun baru
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
