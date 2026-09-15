import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MessageCircle, Users, Search, Settings } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  path: string
  icon: React.ReactNode
}

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems: NavItem[] = [
    {
      id: 'chat',
      label: 'Messages',
      path: '/chat',
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      id: 'groups',
      label: 'Groups',
      path: '/groups',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'search',
      label: 'Find Users',
      path: '/search',
      icon: <Search className="w-5 h-5" />,
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/profile/settings',
      icon: <Settings className="w-5 h-5" />,
    },
  ]

  return (
    <div className="hidden md:flex flex-col w-64 bg-primary-900 border-r border-primary-800 h-screen sticky top-0">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/30'
                  : 'text-gray-400 hover:text-white hover:bg-primary-800'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
