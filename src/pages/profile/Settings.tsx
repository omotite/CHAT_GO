import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { Button, Input, TextArea, Card, Avatar } from '@/components/UI'
import { Camera, Lock, Globe, Eye } from 'lucide-react'

export const ProfileSettingsPage: React.FC = () => {
  const { user, updateProfile, uploadAvatar } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: user?.username || '',
    bio: user?.bio || '',
    privacy: (user?.privacy as 'public' | 'private') || 'public',
    language: user?.language || 'en',
  })
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState(user?.avatar_url)
  const [message, setMessage] = useState('')

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)

      // Upload avatar if changed
      if (avatarFile) {
        await uploadAvatar(avatarFile)
      }

      // Update profile
      await updateProfile(formData)
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      console.error('Update profile error:', error)
      setMessage('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Profile Settings</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('success')
              ? 'bg-green-900/20 border border-green-700 text-green-400'
              : 'bg-red-900/20 border border-red-700 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Section */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-6">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <Avatar src={previewUrl} alt={user?.username || 'User'} size="xl" />
              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg cursor-pointer hover:shadow-lg hover:shadow-accent-500/30 transition-all">
                  <Camera className="w-5 h-5" />
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
                <p className="text-sm text-gray-400 mt-2">Max size: 5MB</p>
              </div>
            </div>
          </Card>

          {/* Basic Info */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-6">Basic Information</h2>
            <div className="space-y-4">
              <Input
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                disabled
                className="opacity-50 cursor-not-allowed"
              />
              <div>
                <label className="block text-sm font-medium text-gray-light mb-2">Email</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-4 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <TextArea
                label="Bio"
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
              />
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-6">Privacy Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-primary-800 transition-colors">
                  <input
                    type="radio"
                    name="privacy"
                    value="public"
                    checked={formData.privacy === 'public'}
                    onChange={(e) => setFormData({ ...formData, privacy: 'public' })}
                  />
                  <div>
                    <p className="font-semibold text-white">Public Profile</p>
                    <p className="text-sm text-gray-400">Anyone can find and message you</p>
                  </div>
                </label>
              </div>
              <div>
                <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-primary-800 transition-colors">
                  <input
                    type="radio"
                    name="privacy"
                    value="private"
                    checked={formData.privacy === 'private'}
                    onChange={(e) => setFormData({ ...formData, privacy: 'private' })}
                  />
                  <div>
                    <p className="font-semibold text-white">Private Profile</p>
                    <p className="text-sm text-gray-400">Only people you know can message you</p>
                  </div>
                </label>
              </div>
            </div>
          </Card>

          {/* Language Settings */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-6">Language</h2>
            <select
              value={formData.language}
              onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              className="w-full px-4 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:border-accent-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="pt">Português</option>
              <option value="ja">日本語</option>
            </select>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  )
}
