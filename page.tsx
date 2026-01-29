'use client'

import { useEffect, useState } from 'react'
import LoginPage from '@/components/LoginPage'
import SignupPage from '@/components/SignupPage'
import Navbar from '@/components/Navbar'
import UserDashboard from '@/components/UserDashboard'
import AdminDashboard from '@/components/AdminDashboard'

type AppUser = {
  id: string
  username: string
  role: 'admin' | 'user'
}

export default function Home() {
  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'login' | 'signup'>('login')

  useEffect(() => {
    const saved = localStorage.getItem('pq_user')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AppUser
        setUser(parsed)
      } catch {
        localStorage.removeItem('pq_user')
      }
    }
    setLoading(false)
  }, [])

  const handleLoginSuccess = (userData: AppUser) => {
    setUser(userData)
    localStorage.setItem('pq_user', JSON.stringify(userData))
  }

  const handleLogout = async () => {
    localStorage.removeItem('pq_user')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return view === 'login' ? (
      <LoginPage
        onLoginSuccess={handleLoginSuccess}
        onGoSignup={() => setView('signup')}
      />
    ) : (
      <SignupPage
        onSignupSuccess={handleLoginSuccess}
        onBackToLogin={() => setView('login')}
      />
    )
  }

  return (
    <>
      <Navbar userName={user.username} userRole={user.role} onLogout={handleLogout} />
      {user.role === 'admin' ? (
        <AdminDashboard userId={user.id} />
      ) : (
        <UserDashboard userId={user.id} />
      )}
    </>
  )
}
