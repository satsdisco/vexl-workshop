import { useState, useEffect } from 'react'
import { defaultContent } from '@/data/defaultContent'

export function useContent(sectionKey: keyof typeof defaultContent) {
  const [content, setContent] = useState(defaultContent[sectionKey])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to load dynamic content
    const loadContent = async () => {
      try {
        const response = await fetch('/api/admin/content')
        const data = await response.json()
        
        if (data.success && data.content[sectionKey]) {
          setContent(data.content[sectionKey])
        }
      } catch (error) {
        // Silently fall back to default content
        console.debug('Using default content for', sectionKey)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [sectionKey])

  // Always return content (either dynamic or default)
  return { content, loading }
}

// Alternative hook for getting all content at once
export function useAllContent() {
  const [content, setContent] = useState(defaultContent)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/admin/content')
        const data = await response.json()
        
        if (data.success) {
          setContent(data.content)
        }
      } catch (error) {
        console.debug('Using default content')
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  return { content, loading }
}