import { useState, useEffect, useCallback } from 'react'
import { ContentManager } from '@/lib/content-manager'

interface UseContentOptions {
  sectionId: string
  fallbackContent?: any
  mergeStrategy?: 'replace' | 'merge' | 'fallback'
  autoRefresh?: boolean
  refreshInterval?: number
}

export function useContentManager({
  sectionId,
  fallbackContent,
  mergeStrategy = 'merge',
  autoRefresh = true,
  refreshInterval = 5000
}: UseContentOptions) {
  const [content, setContent] = useState<any>(fallbackContent || {})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const loadContent = useCallback(async () => {
    try {
      setError(null)
      const data = await ContentManager.getContent({
        sectionId,
        fallbackContent,
        mergeStrategy
      })
      
      setContent(data)
      setLastUpdated(new Date())
      
      if (loading) {
        setLoading(false)
      }
    } catch (err) {
      console.error('Failed to load content:', err)
      setError('Failed to load content')
      
      // Use fallback on error
      if (fallbackContent) {
        setContent(fallbackContent)
      }
      
      if (loading) {
        setLoading(false)
      }
    }
  }, [sectionId, fallbackContent, mergeStrategy, loading])

  // Initial load
  useEffect(() => {
    loadContent()
  }, [])

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      loadContent()
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, loadContent])

  const refresh = useCallback(() => {
    ContentManager.clearCache(sectionId)
    return loadContent()
  }, [sectionId, loadContent])

  return {
    content,
    loading,
    error,
    lastUpdated,
    refresh
  }
}