import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

interface UniversalEditableSectionProps {
  sectionId: string
  content: any
  onUpdate: (key: string, value: any) => void
  editMode: boolean
  children: React.ReactNode
}

export default function UniversalEditableSection({ 
  sectionId, 
  content, 
  onUpdate, 
  editMode,
  children 
}: UniversalEditableSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!editMode || !containerRef.current) return

    const handleClick = (e: MouseEvent) => {
      e.stopPropagation()
      const target = e.target as HTMLElement
      
      // Check if the element contains text and is not already being edited
      if (target.textContent && !target.contentEditable) {
        makeEditable(target)
      }
    }

    const makeEditable = (element: HTMLElement) => {
      // Don't make containers editable, only text elements
      const tagName = element.tagName.toLowerCase()
      if (['div', 'section', 'article', 'main'].includes(tagName) && element.children.length > 0) {
        return
      }

      // Store original content
      const originalContent = element.textContent || ''
      const dataKey = element.getAttribute('data-content-key')
      
      // Make element editable
      element.contentEditable = 'true'
      element.style.outline = '2px solid #F7C600'
      element.style.outlineOffset = '2px'
      element.style.cursor = 'text'
      
      // Focus and select text
      element.focus()
      const range = document.createRange()
      range.selectNodeContents(element)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
      
      setSelectedElement(element)

      // Handle blur to save
      const handleBlur = () => {
        element.contentEditable = 'false'
        element.style.outline = ''
        element.style.cursor = ''
        
        const newContent = element.textContent || ''
        if (newContent !== originalContent && dataKey) {
          onUpdate(dataKey, newContent)
        }
        
        element.removeEventListener('blur', handleBlur)
        element.removeEventListener('keydown', handleKeyDown)
        setSelectedElement(null)
      }

      // Handle keyboard shortcuts
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          element.blur()
        }
        if (e.key === 'Escape') {
          element.textContent = originalContent
          element.blur()
        }
      }

      element.addEventListener('blur', handleBlur)
      element.addEventListener('keydown', handleKeyDown)
    }

    // Add hover effect to show editable elements
    const handleMouseOver = (e: MouseEvent) => {
      if (!editMode) return
      const target = e.target as HTMLElement
      
      // Check if element has text and is not a container
      const tagName = target.tagName.toLowerCase()
      if (target.textContent && 
          !['div', 'section', 'article', 'main'].includes(tagName) || 
          (tagName === 'div' && target.children.length === 0)) {
        target.style.outline = '1px dashed rgba(247, 198, 0, 0.5)'
        target.style.outlineOffset = '2px'
        target.style.cursor = 'pointer'
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (!editMode) return
      const target = e.target as HTMLElement
      if (target !== selectedElement && target.contentEditable !== 'true') {
        target.style.outline = ''
        target.style.cursor = ''
      }
    }

    // Add event listeners
    containerRef.current.addEventListener('click', handleClick)
    containerRef.current.addEventListener('mouseover', handleMouseOver)
    containerRef.current.addEventListener('mouseout', handleMouseOut)

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleClick)
        containerRef.current.removeEventListener('mouseover', handleMouseOver)
        containerRef.current.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [editMode, onUpdate])

  // Add data attributes to elements for tracking
  useEffect(() => {
    if (!containerRef.current) return

    // Add data-content-key attributes to track which content field each element maps to
    const addContentKeys = (element: HTMLElement, path: string = '') => {
      // Skip if element has children (container)
      if (element.children.length > 0) {
        Array.from(element.children).forEach((child, index) => {
          const childPath = path ? `${path}.${index}` : `${index}`
          addContentKeys(child as HTMLElement, childPath)
        })
      } else if (element.textContent) {
        // This is a text element, add key based on content matching
        const text = element.textContent.trim()
        
        // Try to match content to known fields
        if (text === content.title) {
          element.setAttribute('data-content-key', 'title')
        } else if (text === content.subtitle) {
          element.setAttribute('data-content-key', 'subtitle')
        } else if (text === content.description) {
          element.setAttribute('data-content-key', 'description')
        } else if (text === content.cta) {
          element.setAttribute('data-content-key', 'cta')
        } else if (content.stats?.some((s: any) => s.value === text)) {
          const statIndex = content.stats.findIndex((s: any) => s.value === text)
          element.setAttribute('data-content-key', `stats.${statIndex}.value`)
        } else if (content.stats?.some((s: any) => s.label === text)) {
          const statIndex = content.stats.findIndex((s: any) => s.label === text)
          element.setAttribute('data-content-key', `stats.${statIndex}.label`)
        } else if (content.items?.some((i: any) => i.title === text)) {
          const itemIndex = content.items.findIndex((i: any) => i.title === text)
          element.setAttribute('data-content-key', `items.${itemIndex}.title`)
        } else if (content.items?.some((i: any) => i.content === text)) {
          const itemIndex = content.items.findIndex((i: any) => i.content === text)
          element.setAttribute('data-content-key', `items.${itemIndex}.content`)
        }
      }
    }

    addContentKeys(containerRef.current)
  }, [content, children])

  return (
    <div ref={containerRef} className="relative">
      {editMode && (
        <div className="absolute -top-12 left-4 z-50 bg-vexl-yellow text-black px-3 py-1 rounded-full text-xs font-semibold">
          Click any text to edit
        </div>
      )}
      {children}
    </div>
  )
}