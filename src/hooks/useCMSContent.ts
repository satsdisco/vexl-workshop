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
        const response = await fetch('/api/admin/slides')
        const data = await response.json()
        
        if (data.success && data.content[sectionId]) {
          setContent(data.content[sectionId])
        }
      } catch (error) {
        console.error('Failed to load CMS content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
    
    // Auto-refresh every 5 seconds to see changes
    const interval = setInterval(loadContent, 5000)
    return () => clearInterval(interval)
  }, [sectionId])

  return { content, loading }
}