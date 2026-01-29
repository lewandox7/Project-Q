'use client'

interface NavbarProps {
  userName: string
  userRole: string
  onLogout: () => void
}

export default function Navbar({ userName, userRole, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Q</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Project Q</h1>
          </div>

          {/* Right: User Info & Logout */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                {userRole === 'admin' ? '👑 Admin' : '👤 User'}
              </p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
