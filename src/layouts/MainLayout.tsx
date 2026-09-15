import React, { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Navbar } from '@/components/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

export const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const { user, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <div className="min-h-screen bg-primary-950">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
