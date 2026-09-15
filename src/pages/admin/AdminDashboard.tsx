import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { Button, Card, Badge } from '@/components/UI'
import { Users, AlertCircle, TrendingUp, MessageSquare } from 'lucide-react'

interface Stats {
  totalUsers: number
  activeUsers: number
  totalMessages: number
  totalReports: number
}

export const AdminDashboard: React.FC = () => {
  const { user } = useAuthStore()
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    totalMessages: 0,
    totalReports: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [usersRes, messagesRes, reportsRes] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('messages').select('id', { count: 'exact' }),
        supabase.from('reports').select('id', { count: 'exact' }),
      ])

      setStats({
        totalUsers: usersRes.count || 0,
        activeUsers: Math.floor((usersRes.count || 0) * 0.7),
        totalMessages: messagesRes.count || 0,
        totalReports: reportsRes.count || 0,
      })
    } catch (error) {
      console.error('Load stats error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-display font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Platform statistics and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Total Users</p>
                <h3 className="text-3xl font-bold text-white">{stats.totalUsers}</h3>
              </div>
              <Users className="w-12 h-12 text-accent-500/30" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Active Users</p>
                <h3 className="text-3xl font-bold text-white">{stats.activeUsers}</h3>
              </div>
              <TrendingUp className="w-12 h-12 text-green-500/30" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Total Messages</p>
                <h3 className="text-3xl font-bold text-white">{stats.totalMessages}</h3>
              </div>
              <MessageSquare className="w-12 h-12 text-blue-500/30" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium mb-1">Reports</p>
                <h3 className="text-3xl font-bold text-white">{stats.totalReports}</h3>
              </div>
              <AlertCircle className="w-12 h-12 text-red-500/30" />
            </div>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-white mb-4">Users Management</h2>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full">View All Users</Button>
              <Button variant="secondary" className="w-full">Search Users</Button>
              <Button variant="secondary" className="w-full">Manage Suspensions</Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-white mb-4">Safety & Moderation</h2>
            <div className="space-y-3">
              <Button variant="secondary" className="w-full">View Reports</Button>
              <Button variant="secondary" className="w-full">Flagged Messages</Button>
              <Button variant="secondary" className="w-full">Banned Users</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
