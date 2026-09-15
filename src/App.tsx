import React from 'react'
import AppRoutes from '@/routes'
import { useAuthStore } from '@/store/authStore'

function App() {
  const { checkAuth, isLoading } = useAuthStore()

  React.useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-500 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-light text-lg font-medium">Loading CHAT GO...</p>
        </div>
      </div>
    )
  }

  return <AppRoutes />
}

export default App
