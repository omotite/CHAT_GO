import React, { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { supabase } from '@/lib/supabase'
import { Button, TextArea, Card, Badge } from '@/components/UI'
import { AlertCircle, Flag } from 'lucide-react'

export const ReportPage: React.FC = () => {
  const { user } = useAuthStore()
  const [reportType, setReportType] = useState<'user' | 'message'>('user')
  const [targetId, setTargetId] = useState('')
  const [reason, setReason] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const reasons = [
    'Harassment',
    'Inappropriate Content',
    'Spam',
    'Hate Speech',
    'Impersonation',
    'Scam',
    'Other',
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !targetId || !reason) return

    try {
      setIsLoading(true)
      const { error } = await supabase.from('reports').insert({
        reporter_id: user.id,
        reported_user_id: reportType === 'user' ? targetId : null,
        reported_message_id: reportType === 'message' ? targetId : null,
        reason,
        description,
        status: 'pending',
      })

      if (error) throw error

      setMessage('Report submitted successfully. Our team will review it shortly.')
      setTargetId('')
      setReason('')
      setDescription('')
      setTimeout(() => setMessage(''), 5000)
    } catch (error) {
      console.error('Submit report error:', error)
      setMessage('Failed to submit report. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-950 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Flag className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-display font-bold text-white">Report User or Content</h1>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.includes('success')
              ? 'bg-green-900/20 border border-green-700 text-green-400'
              : 'bg-red-900/20 border border-red-700 text-red-400'
          }`}>
            {message}
          </div>
        )}

        <Card>
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6 flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-400">
              Please provide accurate information. False reports may result in action against your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-light mb-3">What are you reporting?</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value="user"
                    checked={reportType === 'user'}
                    onChange={(e) => setReportType('user')}
                  />
                  <span className="text-white">Report a User</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value="message"
                    checked={reportType === 'message'}
                    onChange={(e) => setReportType('message')}
                  />
                  <span className="text-white">Report a Message</span>
                </label>
              </div>
            </div>

            {/* Target ID */}
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">
                {reportType === 'user' ? 'User ID or Username' : 'Message ID'}
              </label>
              <input
                type="text"
                placeholder={reportType === 'user' ? 'Enter username or user ID' : 'Enter message ID'}
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white placeholder-gray-500 focus:border-accent-500"
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Reason for Report</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-primary-800 border border-primary-700 rounded-lg text-white focus:border-accent-500"
              >
                <option value="">Select a reason</option>
                {reasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-light mb-2">Description (Optional)</label>
              <TextArea
                placeholder="Provide additional details about your report..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="danger"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              <Flag className="w-5 h-5" />
              Submit Report
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
