import { useState, useEffect } from 'react'

interface CMSContent {
  [key: string]: any
}

export function useCMSContent(sectionId: string) {
  const [content, setContent] = useState<CMSContent>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/api/admin/content')
        const data = await response.json()
        
        if (data.success && data.content && data.content[sectionId]) {
          setContent(data.content[sectionId])
        }
      } catch (error) {
        console.error('Failed to load CMS content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
    
    // Auto-refresh every 2 seconds to see changes quickly
    const interval = setInterval(loadContent, 2000)
    return () => clearInterval(interval)
  }, [sectionId])

  return { content, loading }
}