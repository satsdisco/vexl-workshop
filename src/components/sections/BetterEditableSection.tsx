'use client'

import { useEffect, useRef, useState } from 'react'

interface BetterEditableSectionProps {
  sectionId: string
  content: any
  onUpdate: (key: string, value: any) => void
  editMode: boolean
  children: React.ReactNode
}

export default function BetterEditableSection({ 
  sectionId, 
  content, 
  onUpdate, 
  editMode,
  children 
}: BetterEditableSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [editingElement, setEditingElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!editMode || !containerRef.current) return

    // Add data attributes to track content
    const assignDataAttributes = () => {
      if (!containerRef.current) return
      
      const allTextElements = containerRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, button')
      
      allTextElements.forEach((element) => {
        const el = element as HTMLElement
        const text = el.textContent?.trim()
        
        if (!text || el.children.length > 1) return
        
        // Try to match content fields
        if (text === content.title) {
          el.setAttribute('data-field', 'title')
        } else if (text === content.subtitle) {
          el.setAttribute('data-field', 'subtitle')
        } else if (text === content.description) {
          el.setAttribute('data-field', 'description')
        } else if (text === content.cta) {
          el.setAttribute('data-field', 'cta')
        } else if (content.stats?.some((s: any) => s.value === text)) {
          const index = content.stats.findIndex((s: any) => s.value === text)
          el.setAttribute('data-field', `stats[${index}].value`)
        } else if (content.stats?.some((s: any) => s.label === text)) {
          const index = content.stats.findIndex((s: any) => s.label === text)
          el.setAttribute('data-field', `stats[${index}].label`)
        } else if (content.items?.some((i: any) => i.title === text)) {
          const index = content.items.findIndex((i: any) => i.title === text)
          el.setAttribute('data-field', `items[${index}].title`)
        } else if (content.items?.some((i: any) => i.content === text)) {
          const index = content.items.findIndex((i: any) => i.content === text)
          el.setAttribute('data-field', `items[${index}].content`)
        }
      })
    }

    // Run assignment after a short delay to ensure DOM is ready
    setTimeout(assignDataAttributes, 100)

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Skip if already editing or no text content
      if (editingElement || !target.textContent?.trim()) return
      
      // Skip containers with multiple children
      if (target.children.length > 1) return
      
      e.preventDefault()
      e.stopPropagation()
      
      makeEditable(target)
    }

    const makeEditable = (element: HTMLElement) => {
      const originalText = element.textContent || ''
      const field = element.getAttribute('data-field')
      
      // Store original styles
      const originalStyles = {
        outline: element.style.outline,
        outlineOffset: element.style.outlineOffset,
        cursor: element.style.cursor,
        userSelect: element.style.userSelect,
        background: element.style.background
      }

      // Make editable with visible feedback
      element.contentEditable = 'true'
      element.style.outline = '2px solid #F7C600'
      element.style.outlineOffset = '4px'
      element.style.cursor = 'text'
      element.style.userSelect = 'text'
      element.style.background = 'rgba(247, 198, 0, 0.05)'
      
      setEditingElement(element)
      
      // Focus and select
      element.focus()
      const range = document.createRange()
      range.selectNodeContents(element)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)

      const save = () => {
        const newText = element.textContent?.trim() || ''
        
        if (newText !== originalText.trim()) {
          console.log('Saving change:', field, originalText, '->', newText)
          
          if (field) {
            // Parse field path like "stats[0].value"
            if (field.includes('[')) {
              const match = field.match(/(\w+)\[(\d+)\]\.(\w+)/)
              if (match) {
                const [, arrayName, indexStr, property] = match
                const index = parseInt(indexStr)
                
                if (arrayName === 'stats' && content.stats) {
                  const newStats = [...content.stats]
                  newStats[index] = { ...newStats[index], [property]: newText }
                  onUpdate('stats', newStats)
                } else if (arrayName === 'items' && content.items) {
                  const newItems = [...content.items]
                  newItems[index] = { ...newItems[index], [property]: newText }
                  onUpdate('items', newItems)
                }
              }
            } else {
              // Simple field update
              onUpdate(field, newText)
            }
          } else {
            // Try to infer field from content
            if (originalText.trim() === content.title) {
              onUpdate('title', newText)
            } else if (originalText.trim() === content.subtitle) {
              onUpdate('subtitle', newText)
            } else if (originalText.trim() === content.description) {
              onUpdate('description', newText)
            } else if (originalText.trim() === content.cta) {
              onUpdate('cta', newText)
            }
          }
        }

        // Reset styles
        element.contentEditable = 'false'
        Object.assign(element.style, originalStyles)
        setEditingElement(null)
      }

      const handleBlur = () => save()
      
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          save()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          element.textContent = originalText
          element.contentEditable = 'false'
          Object.assign(element.style, originalStyles)
          setEditingElement(null)
        }
      }

      element.addEventListener('blur', handleBlur, { once: true })
      element.addEventListener('keydown', handleKeyDown)
      
      // Clean up on unmount
      return () => {
        element.removeEventListener('blur', handleBlur)
        element.removeEventListener('keydown', handleKeyDown)
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (editingElement || !target.textContent?.trim() || target.children.length > 1) return
      
      target.style.outline = '1px dashed rgba(247, 198, 0, 0.5)'
      target.style.outlineOffset = '2px'
      target.style.cursor = 'pointer'
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target !== editingElement) {
        if (!target.style.outline.includes('2px solid')) {
          target.style.outline = ''
          target.style.cursor = ''
        }
      }
    }

    // Add event listeners
    containerRef.current.addEventListener('click', handleClick, true)
    containerRef.current.addEventListener('mouseover', handleMouseOver)
    containerRef.current.addEventListener('mouseout', handleMouseOut)

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleClick, true)
        containerRef.current.removeEventListener('mouseover', handleMouseOver)
        containerRef.current.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [editMode, content, onUpdate, editingElement])

  return (
    <div ref={containerRef} className="relative w-full">
      {editMode && (
        <div className="absolute -top-10 left-4 z-50 flex items-center space-x-2">
          <div className="bg-vexl-yellow text-black px-3 py-1 rounded-full text-xs font-semibold">
            ✏️ Click any text to edit
          </div>
          {editingElement && (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
              Editing... Press Enter to save
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}