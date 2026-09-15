import React, { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNotificationStore } from '@/store/notificationStore'
import { Button, Badge } from '@/components/UI'
import { Trash2, Bell } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export const NotificationsPage: React.FC = () => {
  const { user } = useAuthStore()
  const { notifications, unreadCount, getNotifications, markAsRead, markAllAsRead, deleteNotification } =
    useNotificationStore()

  useEffect(() => {
    if (user?.id) {
      getNotifications(user.id)
    }
  }, [user?.id])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return '💬'
      case 'group_invite':
        return '👥'
      case 'friend_request':
        return '👋'
      default:
        return '🔔'
    }
  }

  return (
    <div className="min-h-screen bg-primary-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="gold" size="md">
                {unreadCount} Unread
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              onClick={() => user?.id && markAllAsRead(user.id)}
              variant="outline"
              size="md"
            >
              Mark All as Read
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="text-center py-16 bg-primary-900 border border-primary-800 rounded-lg">
            <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No notifications yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.is_read
                    ? 'bg-primary-900 border-primary-800'
                    : 'bg-primary-800 border-accent-500/30'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-400 mb-2">{notification.content}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!notification.is_read && (
                      <Button
                        onClick={() => markAsRead(notification.id)}
                        variant="outline"
                        size="sm"
                      >
                        Mark Read
                      </Button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 hover:bg-primary-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
