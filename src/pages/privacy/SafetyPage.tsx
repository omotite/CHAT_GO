import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { Button, Card, Badge } from '@/components/UI'
import { Trash2, Shield } from 'lucide-react'

interface BlockedUser {
  id: string
  username: string
  email: string
  avatar_url?: string
}

export const PrivacySafetyPage: React.FC = () => {
  const { user } = useAuthStore()
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadBlockedUsers()
  }, [user?.id])

  const loadBlockedUsers = async () => {
    if (!user?.id) return

    try {
      const { data, error } = await supabase
        .from('blocked_users')
        .select(
          `
          blocked_id,
          profiles:blocked_id(id, username, email, avatar_url)
        `
        )
        .eq('blocker_id', user.id)

      if (error) throw error

      const blocked = data.map((item: any) => ({
        id: item.blocked_id,
        ...item.profiles,
      }))

      setBlockedUsers(blocked)
    } catch (error) {
      console.error('Load blocked users error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnblock = async (blockedId: string) => {
    try {
      const { error } = await supabase
        .from('blocked_users')
        .delete()
        .eq('blocker_id', user?.id)
        .eq('blocked_id', blockedId)

      if (error) throw error

      setBlockedUsers(blockedUsers.filter((u) => u.id !== blockedId))
    } catch (error) {
      console.error('Unblock user error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-primary-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Privacy & Safety</h1>

        {/* Blocked Users */}
        <Card className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-accent-500" />
            <h2 className="text-xl font-bold text-white">Blocked Users</h2>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-accent-500 border-t-gold rounded-full animate-spin mx-auto"></div>
            </div>
          ) : blockedUsers.length === 0 ? (
            <p className="text-gray-400">You haven't blocked anyone yet</p>
          ) : (
            <div className="space-y-3">
              {blockedUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-primary-800 rounded-lg border border-primary-700"
                >
                  <div>
                    <h3 className="font-semibold text-white">{user.username}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <Button
                    onClick={() => handleUnblock(user.id)}
                    variant="outline"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Unblock
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Safety Tips */}
        <Card>
          <h2 className="text-xl font-bold text-white mb-6">Safety Tips</h2>
          <div className="space-y-4">
            <div className="p-4 bg-primary-800 rounded-lg">
              <h3 className="font-semibold text-white mb-2">🔒 Strong Password</h3>
              <p className="text-sm text-gray-400">Use a unique, strong password for your CHAT GO account</p>
            </div>
            <div className="p-4 bg-primary-800 rounded-lg">
              <h3 className="font-semibold text-white mb-2">👀 Watch for Suspicious Activity</h3>
              <p className="text-sm text-gray-400">Be cautious of unusual requests or messages</p>
            </div>
            <div className="p-4 bg-primary-800 rounded-lg">
              <h3 className="font-semibold text-white mb-2">📵 Use Block Feature</h3>
              <p className="text-sm text-gray-400">Block users who are harassing or bothering you</p>
            </div>
            <div className="p-4 bg-primary-800 rounded-lg">
              <h3 className="font-semibold text-white mb-2">🚩 Report Issues</h3>
              <p className="text-sm text-gray-400">Use the report feature to alert moderators of inappropriate content</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
