'use client'

import { useEffect, useState, useRef } from 'react'
import { Save, Edit3, X } from 'lucide-react'

interface SimpleEditModeProps {
  enabled: boolean
  sectionId: string
  children: React.ReactNode
}

export default function SimpleEditMode({ enabled, sectionId, children }: SimpleEditModeProps) {
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedContent, setSavedContent] = useState<Record<string, string>>({})
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!enabled || !containerRef.current) return

    const container = containerRef.current
    const editableElements = new Map<HTMLElement, string>()

    // Make text elements editable
    const makeEditable = () => {
      // Select all text elements but exclude buttons, navigation, and UI components
      const selector = 'h1, h2, h3, h4, p, span:not(.no-edit), li'
      const elements = container.querySelectorAll(selector)
      
      elements.forEach((el) => {
        const element = el as HTMLElement
        
        // Skip if element is inside a button or link
        if (element.closest('button') || element.closest('a')) return
        
        // Skip if element has the no-edit class
        if (element.classList.contains('no-edit')) return
        
        // Skip if it's a container with many children (likely a layout element)
        if (element.children.length > 2) return
        
        // Skip if it's an icon or has very little text
        const text = element.textContent?.trim() || ''
        if (text.length < 3) return
        
        // Store original content
        const originalContent = element.innerHTML
        editableElements.set(element, originalContent)
        
        // Make editable
        element.contentEditable = 'true'
        element.style.cursor = 'text'
        element.style.transition = 'all 0.2s'
        
        // Add hover effect
        element.addEventListener('mouseenter', handleMouseEnter)
        element.addEventListener('mouseleave', handleMouseLeave)
        
        // Handle focus/blur
        element.addEventListener('focus', handleFocus)
        element.addEventListener('blur', handleBlur)
        
        // Track changes
        element.addEventListener('input', handleInput)
        
        // Prevent line breaks in headings
        if (element.tagName.match(/^H[1-6]$/)) {
          element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              element.blur()
            }
          })
        }
      })
    }

    const handleMouseEnter = (e: Event) => {
      const element = e.target as HTMLElement
      if (element.contentEditable === 'true' && document.activeElement !== element) {
        element.style.backgroundColor = 'rgba(247, 198, 0, 0.1)'
        element.style.outline = '1px dashed rgba(247, 198, 0, 0.5)'
        element.style.outlineOffset = '2px'
      }
    }

    const handleMouseLeave = (e: Event) => {
      const element = e.target as HTMLElement
      if (document.activeElement !== element) {
        element.style.backgroundColor = ''
        element.style.outline = ''
      }
    }

    const handleFocus = (e: Event) => {
      const element = e.target as HTMLElement
      element.style.backgroundColor = 'rgba(247, 198, 0, 0.05)'
      element.style.outline = '2px solid #F7C600'
      element.style.outlineOffset = '2px'
      element.style.borderRadius = '4px'
    }

    const handleBlur = (e: Event) => {
      const element = e.target as HTMLElement
      element.style.backgroundColor = ''
      element.style.outline = ''
      element.style.borderRadius = ''
      
      // Save if content changed
      const originalContent = editableElements.get(element)
      if (originalContent !== element.innerHTML) {
        saveContent()
      }
    }

    const handleInput = () => {
      setHasChanges(true)
    }

    const saveContent = async () => {
      if (!hasChanges) return
      
      setSaving(true)
      
      // Gather all content from the section
      const content: Record<string, any> = {}
      
      // Get specific elements by their role
      const title = container.querySelector('h1')
      const subtitle = container.querySelector('h2')
      const descriptions = container.querySelectorAll('p')
      const lists = container.querySelectorAll('ul li, ol li')
      
      if (title) content.title = title.textContent?.trim()
      if (subtitle) content.subtitle = subtitle.textContent?.trim()
      
      // Handle multiple paragraphs
      if (descriptions.length > 0) {
        if (descriptions.length === 1) {
          content.description = descriptions[0].textContent?.trim()
        } else {
          content.descriptions = Array.from(descriptions).map(p => p.textContent?.trim())
        }
      }
      
      // Handle list items
      if (lists.length > 0) {
        content.listItems = Array.from(lists).map(li => li.textContent?.trim())
      }

      // Save to database
      try {
        const response = await fetch('/api/admin/content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
          },
          body: JSON.stringify({
            content: {
              [sectionId]: content
            }
          })
        })
        
        if (response.ok) {
          setHasChanges(false)
          setSavedContent(content)
          
          // Show save indicator
          showSaveIndicator()
        }
      } catch (error) {
        console.error('Save failed:', error)
      } finally {
        setSaving(false)
      }
    }

    const showSaveIndicator = () => {
      const indicator = document.createElement('div')
      indicator.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in'
      indicator.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Saved</span>'
      document.body.appendChild(indicator)
      
      setTimeout(() => {
        indicator.style.opacity = '0'
        indicator.style.transition = 'opacity 0.3s'
        setTimeout(() => indicator.remove(), 300)
      }, 2000)
    }

    makeEditable()

    // Auto-save every 5 seconds if there are changes
    const autoSaveInterval = setInterval(() => {
      if (hasChanges) {
        saveContent()
      }
    }, 5000)

    // Cleanup
    return () => {
      clearInterval(autoSaveInterval)
      
      // Save any pending changes
      if (hasChanges) {
        saveContent()
      }
      
      // Remove editability
      editableElements.forEach((originalContent, element) => {
        element.contentEditable = 'false'
        element.style.cursor = ''
        element.style.backgroundColor = ''
        element.style.outline = ''
        element.style.borderRadius = ''
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
        element.removeEventListener('focus', handleFocus)
        element.removeEventListener('blur', handleBlur)
        element.removeEventListener('input', handleInput)
      })
    }
  }, [enabled, sectionId, hasChanges])

  return (
    <div ref={containerRef} className="relative">
      {children}
      
      {enabled && (
        <>
          {/* Floating toolbar */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-vexl-gray-900 rounded-full px-6 py-3 shadow-2xl border border-vexl-gray-800 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Edit3 className="w-4 h-4 text-vexl-yellow" />
              <span className="text-sm text-white font-medium">Editing: {sectionId}</span>
            </div>
            
            <div className="w-px h-6 bg-vexl-gray-700" />
            
            {saving ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-vexl-yellow border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-vexl-gray-400">Saving...</span>
              </div>
            ) : hasChanges ? (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                <span className="text-sm text-orange-400">Unsaved changes</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm text-green-400">All changes saved</span>
              </div>
            )}
            
            <div className="w-px h-6 bg-vexl-gray-700" />
            
            <div className="text-xs text-vexl-gray-400">
              Click any text to edit • Press E to exit
            </div>
          </div>
        </>
      )}
    </div>
  )
}