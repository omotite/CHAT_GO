import { create } from 'zustand'
import { supabase } from '@/lib/supabase'

interface Message {
  id: string
  sender_id: string
  recipient_id?: string
  group_id?: string
  content: string
  image_url?: string
  reactions: Record<string, string[]>
  created_at: string
}

interface Conversation {
  id: string
  messages: Message[]
  isLoading: boolean
  hasMore: boolean
}

interface ChatStore {
  conversations: Record<string, Conversation>
  selectedConversation: string | null
  setSelectedConversation: (id: string | null) => void
  loadMessages: (conversationId: string, recipientId?: string, groupId?: string) => Promise<void>
  sendMessage: (conversationId: string, content: string, senderId: string, recipientId?: string, groupId?: string) => Promise<void>
  sendImage: (conversationId: string, file: File, senderId: string, recipientId?: string, groupId?: string) => Promise<void>
  addReaction: (messageId: string, emoji: string, userId: string) => Promise<void>
  removeReaction: (messageId: string, emoji: string, userId: string) => Promise<void>
  subscribeToMessages: (conversationId: string, recipientId?: string, groupId?: string) => () => void
}

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: {},
  selectedConversation: null,

  setSelectedConversation: (id) => set({ selectedConversation: id }),

  loadMessages: async (conversationId, recipientId, groupId) => {
    try {
      set((state) => ({
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            isLoading: true,
          },
        },
      }))

      let query = supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: true })

      if (groupId) {
        query = query.eq('group_id', groupId)
      } else if (recipientId) {
        query = query.or(
          `and(sender_id.eq.${conversationId},recipient_id.eq.${recipientId}),and(sender_id.eq.${recipientId},recipient_id.eq.${conversationId})`
        )
      }

      const { data, error } = await query.limit(50)

      if (error) throw error

      set((state) => ({
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: data || [],
            isLoading: false,
          },
        },
      }))
    } catch (error) {
      console.error('Load messages error:', error)
      set((state) => ({
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            isLoading: false,
          },
        },
      }))
    }
  },

  sendMessage: async (conversationId, content, senderId, recipientId, groupId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          sender_id: senderId,
          recipient_id: recipientId || null,
          group_id: groupId || null,
          content,
          reactions: {},
        })
        .select()
        .single()

      if (error) throw error

      set((state) => ({
        conversations: {
          ...state.conversations,
          [conversationId]: {
            ...state.conversations[conversationId],
            messages: [...state.conversations[conversationId].messages, data],
          },
        },
      }))
    } catch (error) {
      console.error('Send message error:', error)
      throw error
    }
  },

  sendImage: async (conversationId, file, senderId, recipientId, groupId) => {
    try {
      const fileName = `${Date.now()}-${file.name}`

      const { error: uploadError } = await supabase.storage
        .from('messages')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('messages').getPublicUrl(fileName)

      await get().sendMessage(
        conversationId,
        `[Image: ${file.name}]`,
        senderId,
        recipientId,
        groupId
      )
    } catch (error) {
      console.error('Send image error:', error)
      throw error
    }
  },

  addReaction: async (messageId, emoji, userId) => {
    try {
      const { data: message } = await supabase
        .from('messages')
        .select('reactions')
        .eq('id', messageId)
        .single()

      if (message) {
        const reactions = message.reactions || {}
        if (!reactions[emoji]) {
          reactions[emoji] = []
        }
        if (!reactions[emoji].includes(userId)) {
          reactions[emoji].push(userId)
        }

        const { error } = await supabase
          .from('messages')
          .update({ reactions })
          .eq('id', messageId)

        if (error) throw error
      }
    } catch (error) {
      console.error('Add reaction error:', error)
      throw error
    }
  },

  removeReaction: async (messageId, emoji, userId) => {
    try {
      const { data: message } = await supabase
        .from('messages')
        .select('reactions')
        .eq('id', messageId)
        .single()

      if (message) {
        const reactions = message.reactions || {}
        if (reactions[emoji]) {
          reactions[emoji] = reactions[emoji].filter((id: string) => id !== userId)
          if (reactions[emoji].length === 0) {
            delete reactions[emoji]
          }
        }

        const { error } = await supabase
          .from('messages')
          .update({ reactions })
          .eq('id', messageId)

        if (error) throw error
      }
    } catch (error) {
      console.error('Remove reaction error:', error)
      throw error
    }
  },

  subscribeToMessages: (conversationId, recipientId, groupId) => {
    let subscription: any

    if (groupId) {
      subscription = supabase
        .from(`messages:group_id=eq.${groupId}`)
        .on('*', (payload) => {
          if (payload.eventType === 'INSERT') {
            set((state) => ({
              conversations: {
                ...state.conversations,
                [conversationId]: {
                  ...state.conversations[conversationId],
                  messages: [...state.conversations[conversationId].messages, payload.new],
                },
              },
            }))
          }
        })
        .subscribe()
    } else if (recipientId) {
      subscription = supabase
        .from('messages')
        .on('*', (payload) => {
          if (payload.eventType === 'INSERT') {
            const message = payload.new
            if (
              (message.sender_id === conversationId && message.recipient_id === recipientId) ||
              (message.sender_id === recipientId && message.recipient_id === conversationId)
            ) {
              set((state) => ({
                conversations: {
                  ...state.conversations,
                  [conversationId]: {
                    ...state.conversations[conversationId],
                    messages: [...state.conversations[conversationId].messages, message],
                  },
                },
              }))
            }
          }
        })
        .subscribe()
    }

    return () => {
      if (subscription) subscription.unsubscribe()
    }
  },
}))
