import React, { useEffect, useState } from 'react'
import { useChatStore } from '@/store/chatStore'
import { useAuthStore } from '@/store/authStore'
import { Avatar, Badge } from '@/components/UI'
import { Send, Image, Smile, MoreVertical } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { formatDistanceToNow } from 'date-fns'

interface MessageProps {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  imageUrl?: string
  reactions: Record<string, string[]>
  timestamp: string
  isOwn: boolean
  onReact: (emoji: string) => void
}

const MessageBubble: React.FC<MessageProps> = ({
  id,
  senderName,
  senderAvatar,
  content,
  imageUrl,
  reactions,
  timestamp,
  isOwn,
  onReact,
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  return (
    <div className={`flex gap-3 mb-4 message-animate ${isOwn ? 'flex-row-reverse' : ''}`}>
      <Avatar src={senderAvatar} alt={senderName} size="md" />

      <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
        <div className={`flex items-center gap-2 mb-1 ${isOwn ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-semibold text-gray-300">{senderName}</span>
          <span className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
          </span>
        </div>

        <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
          isOwn
            ? 'bg-gradient-to-r from-accent-500 to-accent-600 text-white'
            : 'bg-primary-800 text-gray-100'
        }`}>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Shared image"
              className="rounded-lg mb-2 max-w-xs"
            />
          )}
          <p className="text-sm break-words">{content}</p>
        </div>

        {Object.keys(reactions).length > 0 && (
          <div className="flex gap-1 mt-2 flex-wrap">
            {Object.entries(reactions).map(([emoji, userIds]) => (
              <button
                key={emoji}
                className="flex items-center gap-1 px-2 py-1 bg-primary-800 rounded-full text-xs hover:bg-primary-700 transition-colors"
              >
                <span>{emoji}</span>
                <span className="text-gray-400">{userIds.length}</span>
              </button>
            ))}
          </div>
        )}

        <div className="relative mt-2">
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="p-1 hover:bg-primary-800 rounded-lg transition-colors"
          >
            <Smile className="w-4 h-4 text-gray-400 hover:text-accent-500" />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2 right-0 z-50">
              <EmojiPicker
                onEmojiClick={(e) => {
                  onReact(e.emoji)
                  setShowEmojiPicker(false)
                }}
                theme="dark"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface ChatWindowProps {
  conversationId?: string
  recipientName?: string
  recipientAvatar?: string
  isGroup?: boolean
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  conversationId,
  recipientName = 'Chat',
  recipientAvatar,
  isGroup = false,
}) => {
  const { user } = useAuthStore()
  const { conversations, selectedConversation, sendMessage, addReaction, subscribeToMessages } = useChatStore()
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const convId = conversationId || selectedConversation
  const conversation = convId ? conversations[convId] : null
  const messages = conversation?.messages || []

  useEffect(() => {
    if (!convId || !user?.id) return

    const unsubscribe = subscribeToMessages(
      convId,
      isGroup ? undefined : convId,
      isGroup ? convId : undefined
    )

    return unsubscribe
  }, [convId, user?.id, isGroup])

  const handleSendMessage = async () => {
    if (!message.trim() || !convId || !user?.id) return

    try {
      setIsLoading(true)
      await sendMessage(
        convId,
        message,
        user.id,
        isGroup ? undefined : convId,
        isGroup ? convId : undefined
      )
      setMessage('')
    } catch (error) {
      console.error('Send message error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddReaction = async (messageId: string, emoji: string) => {
    if (!user?.id) return
    try {
      await addReaction(messageId, emoji, user.id)
    } catch (error) {
      console.error('Add reaction error:', error)
    }
  }

  if (!convId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-primary-950">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-gray-600" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Select a Conversation</h2>
          <p className="text-gray-400">Choose a chat to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-primary-950">
      {/* Header */}
      <div className="p-4 border-b border-primary-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar src={recipientAvatar} alt={recipientName} size="md" />
          <div>
            <h2 className="font-bold text-white">{recipientName}</h2>
            {!isGroup && <p className="text-xs text-gray-400">Online</p>}
          </div>
        </div>
        <button className="p-2 hover:bg-primary-800 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-gray-400">No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          <div>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                id={msg.id}
                senderId={msg.sender_id}
                senderName="Sender"
                senderAvatar={recipientAvatar}
                content={msg.content}
                imageUrl={msg.image_url}
                reactions={msg.reactions || {}}
                timestamp={msg.created_at}
                isOwn={msg.sender_id === user?.id}
                onReact={(emoji) => handleAddReaction(msg.id, emoji)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-primary-800">
        <div className="flex items-end gap-3">
          <button className="p-2.5 hover:bg-primary-800 rounded-lg transition-colors">
            <Image className="w-6 h-6 text-accent-500" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Type a message..."
              className="w-full px-4 py-3 bg-primary-800 border border-primary-700 rounded-lg text-white placeholder-gray-500 focus:border-accent-500 focus:ring-0 transition-colors resize-none"
              rows={1}
            />
            <div className="absolute right-2 bottom-2">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="p-1 hover:bg-primary-700 rounded-lg transition-colors"
              >
                <Smile className="w-5 h-5 text-gray-400 hover:text-accent-500" />
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2 z-50">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setMessage(message + e.emoji)
                      setShowEmojiPicker(false)
                    }}
                    theme="dark"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className="p-2.5 bg-gradient-to-r from-accent-500 to-accent-600 hover:shadow-lg hover:shadow-accent-500/30 disabled:opacity-50 rounded-lg transition-all"
          >
            <Send className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
