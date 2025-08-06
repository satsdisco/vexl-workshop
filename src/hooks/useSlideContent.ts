import { useState, useEffect } from 'react'

interface SlideContent {
  title?: string
  subtitle?: string
  description?: string
  cta?: string
  items?: any[]
  stats?: any[]
  [key: string]: any
}

export function useSlideContent(sectionId: string, fallbackContent?: SlideContent) {
  const [content, setContent] = useState<SlideContent>(fallbackContent || {})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/admin/slides')
        const data = await response.json()
        
        if (data.success && data.content[sectionId]) {
          setContent(data.content[sectionId])
        } else if (fallbackContent) {
          setContent(fallbackContent)
        }
      } catch (error) {
        console.error('Failed to load content:', error)
        if (fallbackContent) {
          setContent(fallbackContent)
        }
      } finally {
        setLoading(false)
      }
    }

    loadContent()
    
    // Reload content every 5 seconds to see changes
    const interval = setInterval(loadContent, 5000)
    return () => clearInterval(interval)
  }, [sectionId, fallbackContent])

  return { content, loading }
}