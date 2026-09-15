import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useGroupStore } from '@/store/groupStore'
import { Avatar, Button, Input, TextArea, Card } from '@/components/UI'
import { Plus, Settings } from 'lucide-react'

export const GroupsPage: React.FC = () => {
  const { user } = useAuthStore()
  const { groups, getGroups, createGroup, selectedGroup, setSelectedGroup } = useGroupStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPublic: true,
  })

  useEffect(() => {
    if (user?.id) {
      getGroups(user.id)
    }
  }, [user?.id])

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !formData.name.trim()) return

    try {
      setIsLoading(true)
      const group = await createGroup(
        formData.name,
        formData.description,
        user.id,
        formData.isPublic
      )
      setSelectedGroup(group)
      setShowCreateModal(false)
      setFormData({ name: '', description: '', isPublic: true })
    } catch (error) {
      console.error('Create group error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Groups</h1>
            <p className="text-gray-400">Create and manage your group chats</p>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            variant="primary"
            size="lg"
          >
            <Plus className="w-5 h-5" />
            New Group
          </Button>
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <Card
              key={group.id}
              className="cursor-pointer hover:border-accent-500/50 transition-colors"
              onClick={() => setSelectedGroup(group)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Avatar src={group.avatar_url} alt={group.name} size="lg" />
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{group.name}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-2">{group.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{group.members.length} members</span>
                <span>{group.is_public ? 'Public' : 'Private'}</span>
              </div>
            </Card>
          ))}
        </div>

        {/* Create Group Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <h2 className="text-2xl font-bold text-white mb-6">Create New Group</h2>
              <form onSubmit={handleCreateGroup} className="space-y-4">
                <Input
                  label="Group Name"
                  placeholder="Enter group name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
                <TextArea
                  label="Description"
                  placeholder="Enter group description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPublic}
                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  />
                  <span className="text-white">Make group public</span>
                </label>
                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    className="flex-1"
                  >
                    Create
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
