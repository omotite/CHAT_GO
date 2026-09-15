import React, { useState } from 'react'
import { authService } from '@/lib/auth'
import { Avatar, Button } from '@/components/UI'
import { Search } from 'lucide-react'

interface SearchResult {
  id: string
  username: string
  email: string
  avatar_url?: string
}

export const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState<'username' | 'email'>('username')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    try {
      setIsLoading(true)
      setHasSearched(true)
      const data =
        searchType === 'username'
          ? await authService.searchByUsername(query)
          : await authService.searchByEmail(query)
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-white mb-8">Find Users</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-accent-500" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search by ${searchType}...`}
                className="w-full pl-10 pr-4 py-3 bg-primary-900 border border-primary-800 rounded-lg text-white placeholder-gray-500 focus:border-accent-500 focus:ring-0"
              />
            </div>
            <Button type="submit" variant="primary" size="lg" isLoading={isLoading}>
              Search
            </Button>
          </div>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={searchType === 'username'}
                onChange={() => setSearchType('username')}
                className="w-4 h-4"
              />
              <span className="text-white">Search by Username</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                checked={searchType === 'email'}
                onChange={() => setSearchType('email')}
                className="w-4 h-4"
              />
              <span className="text-white">Search by Email</span>
            </label>
          </div>
        </form>

        {hasSearched && (
          <div>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-accent-500 border-t-gold rounded-full animate-spin mx-auto"></div>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-8 bg-primary-900 rounded-lg border border-primary-800">
                <p className="text-gray-400">No users found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 bg-primary-900 border border-primary-800 rounded-lg hover:border-accent-500/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar src={user.avatar_url} alt={user.username} size="lg" />
                      <div>
                        <h3 className="font-semibold text-white">{user.username}</h3>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="md">
                      Message
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
