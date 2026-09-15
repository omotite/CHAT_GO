import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ProtectedRoute, GuestRoute, AdminRoute } from '@/components/Routes'

// Pages
import { SignUpPage } from '@/pages/auth/SignUp'
import { LoginPage } from '@/pages/auth/Login'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPassword'
import { EmailVerificationPage } from '@/pages/auth/VerifyEmail'
import { ChatPage } from '@/pages/ChatPage'
import { SearchPage } from '@/pages/SearchPage'
import { GroupsPage } from '@/pages/GroupsPage'
import { NotificationsPage } from '@/pages/NotificationsPage'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'

function App() {
  const { checkAuth, isLoading } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-primary-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-accent-500 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-light">Loading CHAT GO...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/auth/signup"
          element={
            <GuestRoute>
              <SignUpPage />
            </GuestRoute>
          }
        />
        <Route
          path="/auth/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/auth/forgot-password"
          element={
            <GuestRoute>
              <ForgotPasswordPage />
            </GuestRoute>
          }
        />
        <Route
          path="/auth/verify-email"
          element={
            <GuestRoute>
              <EmailVerificationPage />
            </GuestRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups"
          element={
            <ProtectedRoute>
              <GroupsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute adminEmail="Danielchatnet@gmail.com">
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* Default Routes */}
        <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="*" element={<Navigate to="/chat" replace />} />
      </Routes>
    </Router>
  )
}

export default App
