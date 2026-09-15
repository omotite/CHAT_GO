import React, { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useChatStore } from '@/store/chatStore'
import { useNotificationStore } from '@/store/notificationStore'
import { ConversationList } from '@/components/ConversationList'
import { ChatWindow } from '@/components/ChatWindow'
import { ProfileSidebar } from '@/components/ProfileSidebar'

export const ChatPage: React.FC = () => {
  const { user } = useAuthStore()
  const { selectedConversation } = useChatStore()
  const { getNotifications, subscribeToNotifications } = useNotificationStore()

  useEffect(() => {
    if (user?.id) {
      getNotifications(user.id)
      const unsubscribe = subscribeToNotifications(user.id)
      return unsubscribe
    }
  }, [user?.id])

  return (
    <div className="flex h-screen bg-primary-950">
      <ProfileSidebar />
      <ConversationList />
      <ChatWindow
        conversationId={selectedConversation || undefined}
        recipientName={selectedConversation || 'Chat'}
      />
    </div>
  )
}
