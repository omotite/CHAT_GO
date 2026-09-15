import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { Menu, X, Bell, Search, LogOut } from 'lucide-react'
import { Logo } from '@/components/Logo'

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { user, signOut } = useAuthStore()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth/login')
  }

  if (!user) return null

  return (
    <nav className="sticky top-0 z-40 bg-primary-900/95 backdrop-blur border-b border-primary-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('/chat')} className="flex-shrink-0">
            <Logo size="sm" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('/search')}
              className="p-2 hover:bg-primary-800 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-gray-400 hover:text-accent-500" />
            </button>
            <button
              onClick={() => navigate('/notifications')}
              className="p-2 hover:bg-primary-800 rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-400 hover:text-accent-500" />
            </button>
            <button
              onClick={() => navigate('/profile/settings')}
              className="p-2 hover:bg-primary-800 rounded-lg transition-colors"
            >
              <img
                src={user.avatar_url || `https://ui-avatars.com/api/?name=${user.username}`}
                alt={user.username}
                className="w-8 h-8 rounded-full border border-accent-500"
              />
            </button>
            <button
              onClick={handleSignOut}
              className="p-2 hover:bg-red-900/20 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5 text-gray-400 hover:text-red-400" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-primary-800 rounded-lg"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-gray-400" />
              ) : (
                <Menu className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <button
              onClick={() => {
                navigate('/search')
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-primary-800 rounded-lg transition-colors text-gray-300"
            >
              <Search className="w-5 h-5 inline mr-2" />
              Search
            </button>
            <button
              onClick={() => {
                navigate('/notifications')
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-primary-800 rounded-lg transition-colors text-gray-300"
            >
              <Bell className="w-5 h-5 inline mr-2" />
              Notifications
            </button>
            <button
              onClick={() => {
                navigate('/profile/settings')
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-2 hover:bg-primary-800 rounded-lg transition-colors text-gray-300"
            >
              Settings
            </button>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 hover:bg-red-900/20 rounded-lg transition-colors text-red-400"
            >
              <LogOut className="w-5 h-5 inline mr-2" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
