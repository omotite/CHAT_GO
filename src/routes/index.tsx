import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ProtectedRoute, GuestRoute, AdminRoute } from '@/components/Routes'
import { MainLayout } from '@/layouts/MainLayout'

// Auth Pages
import { SignUpPage } from '@/pages/auth/SignUp'
import { LoginPage } from '@/pages/auth/Login'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPassword'
import { EmailVerificationPage } from '@/pages/auth/VerifyEmail'

// Main Pages
import { LandingPage } from '@/pages/LandingPage'
import { ChatPage } from '@/pages/ChatPage'
import { SearchPage } from '@/pages/SearchPage'
import { GroupsPage } from '@/pages/GroupsPage'
import { NotificationsPage } from '@/pages/NotificationsPage'

// Profile Pages
import { ProfileSettingsPage } from '@/pages/profile/Settings'
import { PrivacySafetyPage } from '@/pages/privacy/SafetyPage'
import { ReportPage } from '@/pages/report/ReportPage'

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard'

function AppRoutes() {
  const { isLoading } = useAuthStore()

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
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

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
            <MainLayout>
              <ChatPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SearchPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/groups"
        element={
          <ProtectedRoute>
            <MainLayout>
              <GroupsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <NotificationsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile/settings"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfileSettingsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/privacy"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PrivacySafetyPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/report"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ReportPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute adminEmail="Danielchatnet@gmail.com">
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </AdminRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
