'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import VexlLogo from '@/components/VexlLogo'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      const data = await response.json()

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('vexl-admin-token', data.token)
        router.push('/admin')
      } else {
        setError('Invalid password')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-vexl-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <VexlLogo className="w-32 h-auto mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-vexl-white mb-2">Admin Panel</h1>
          <p className="text-vexl-gray-400">Enter password to access content editor</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 bg-vexl-gray-900 border-2 border-vexl-gray-800 rounded-lg text-vexl-white placeholder-vexl-gray-500 focus:border-vexl-yellow focus:outline-none transition-colors"
              autoFocus
              disabled={loading}
            />
          </div>

          {error && (
            <div className="p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 bg-vexl-yellow text-vexl-black font-bold rounded-lg hover:bg-vexl-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a 
            href="/" 
            className="text-vexl-gray-400 hover:text-vexl-white transition-colors"
          >
            ← Back to presentation
          </a>
        </div>
      </div>
    </div>
  )
}