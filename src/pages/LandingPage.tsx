import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LogoWithSlogan, Button } from '@/components/UI'
import { Home, MessageCircle, Users, Search, Settings } from 'lucide-react'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-primary-950">
      {/* Navigation */}
      <nav className="border-b border-primary-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <LogoWithSlogan size="sm" />
          <div className="space-x-4">
            <Button variant="outline" size="md" onClick={() => navigate('/auth/login')}>
              Sign In
            </Button>
            <Button variant="primary" size="md" onClick={() => navigate('/auth/signup')}>
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
            Connect • Chat • Share
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Experience premium messaging with real-time conversations, group chats, and a beautiful interface designed for modern communication.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={() => navigate('/auth/signup')}>
              Join CHAT GO Now
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/auth/login')}>
              Already a Member?
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-primary-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-display font-bold text-white text-center mb-16">Why Choose CHAT GO?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-primary-900 border border-primary-800 rounded-xl hover:border-accent-500/50 transition-colors">
              <MessageCircle className="w-12 h-12 text-accent-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Real-Time Messaging</h3>
              <p className="text-gray-400">Instant message delivery with real-time notifications and typing indicators</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-primary-900 border border-primary-800 rounded-xl hover:border-accent-500/50 transition-colors">
              <Users className="w-12 h-12 text-accent-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Group Chats</h3>
              <p className="text-gray-400">Create and manage groups with unlimited members and real-time collaboration</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-primary-900 border border-primary-800 rounded-xl hover:border-accent-500/50 transition-colors">
              <Search className="w-12 h-12 text-accent-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Easy Search</h3>
              <p className="text-gray-400">Find users by username or email and start conversations instantly</p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 bg-primary-900 border border-primary-800 rounded-xl hover:border-accent-500/50 transition-colors">
              <div className="w-12 h-12 text-accent-500 mb-4 text-3xl">📸</div>
              <h3 className="text-xl font-bold text-white mb-3">Photo Sharing</h3>
              <p className="text-gray-400">Share photos and media with your contacts securely</p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 bg-primary-900 border border-primary-800 rounded-xl hover:border-accent-500/50 transition-colors">
              <div className="w-12 h-12 text-accent-500 mb-4 text-3xl">😊</div>
              <h3 className="text-xl font-bold text-white mb-3">Emoji Reactions</h3>
              <p className="text-gray-400">React to messages with emoji to express yourself quickly</p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 bg-primary-900 border border-primary-800 rounded-xl hover:border-accent-500/50 transition-colors">
              <Settings className="w-12 h-12 text-accent-500 mb-4" />
              <h3 className="text-xl font-bold text-white mb-3">Privacy Controls</h3>
              <p className="text-gray-400">Full control over your privacy, blocking, and notification settings</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-2xl mx-auto bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Connect?</h2>
          <p className="text-white mb-8 opacity-90">Join thousands of users enjoying premium messaging today</p>
          <Button variant="primary" size="lg" onClick={() => navigate('/auth/signup')}>
            Start Chatting Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary-800 px-6 py-12 bg-primary-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <LogoWithSlogan size="sm" />
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-accent-500">Features</a></li>
                <li><a href="#" className="hover:text-accent-500">Security</a></li>
                <li><a href="#" className="hover:text-accent-500">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-accent-500">Help Center</a></li>
                <li><a href="#" className="hover:text-accent-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-accent-500">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-accent-500">Privacy</a></li>
                <li><a href="#" className="hover:text-accent-500">Terms</a></li>
                <li><a href="#" className="hover:text-accent-500">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-800 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 CHAT GO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
