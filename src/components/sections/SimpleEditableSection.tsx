'use client'

import { useEffect, useRef } from 'react'

interface SimpleEditableSectionProps {
  sectionId: string
  content: any
  onUpdate: (key: string, value: any) => void
  editMode: boolean
  children: React.ReactNode
}

export default function SimpleEditableSection({ 
  sectionId, 
  content, 
  onUpdate, 
  editMode,
  children 
}: SimpleEditableSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!editMode || !containerRef.current) return

    const makeEditable = (element: HTMLElement) => {
      // Skip if already editable or is a container
      if (element.contentEditable === 'true') return
      if (element.children.length > 0 && element.tagName !== 'SPAN') return
      
      const originalText = element.textContent || ''
      const originalStyles = {
        outline: element.style.outline,
        cursor: element.style.cursor,
        background: element.style.background
      }

      // Make editable
      element.contentEditable = 'true'
      element.style.outline = '2px solid #F7C600'
      element.style.outlineOffset = '2px'
      element.style.cursor = 'text'
      element.focus()

      // Select all text
      const selection = window.getSelection()
      const range = document.createRange()
      range.selectNodeContents(element)
      selection?.removeAllRanges()
      selection?.addRange(range)

      const handleBlur = () => {
        element.contentEditable = 'false'
        element.style.outline = originalStyles.outline
        element.style.cursor = originalStyles.cursor
        
        const newText = element.textContent || ''
        if (newText !== originalText) {
          // Try to figure out which field this is
          if (originalText === content.title) {
            onUpdate('title', newText)
          } else if (originalText === content.subtitle) {
            onUpdate('subtitle', newText)
          } else if (originalText === content.description) {
            onUpdate('description', newText)
          } else if (originalText === content.cta) {
            onUpdate('cta', newText)
          } else {
            // Check if it's a stat
            content.stats?.forEach((stat: any, index: number) => {
              if (stat.value === originalText) {
                const newStats = [...content.stats]
                newStats[index].value = newText
                onUpdate('stats', newStats)
              } else if (stat.label === originalText) {
                const newStats = [...content.stats]
                newStats[index].label = newText
                onUpdate('stats', newStats)
              }
            })
            
            // Check if it's an item
            content.items?.forEach((item: any, index: number) => {
              if (item.title === originalText) {
                const newItems = [...content.items]
                newItems[index].title = newText
                onUpdate('items', newItems)
              } else if (item.content === originalText) {
                const newItems = [...content.items]
                newItems[index].content = newText
                onUpdate('items', newItems)
              }
            })
          }
        }
      }

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          element.blur()
        } else if (e.key === 'Escape') {
          e.preventDefault()
          element.textContent = originalText
          element.blur()
        }
      }

      element.addEventListener('blur', handleBlur, { once: true })
      element.addEventListener('keydown', handleKeyDown)
    }

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Only make text elements editable
      if (target.textContent && target !== containerRef.current) {
        e.preventDefault()
        e.stopPropagation()
        makeEditable(target)
      }
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.textContent && 
          target !== containerRef.current && 
          target.contentEditable !== 'true' &&
          target.children.length === 0) {
        target.style.outline = '1px dashed rgba(247, 198, 0, 0.5)'
        target.style.outlineOffset = '2px'
        target.style.cursor = 'pointer'
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.contentEditable !== 'true') {
        target.style.outline = ''
        target.style.cursor = ''
      }
    }

    containerRef.current.addEventListener('click', handleClick, true)
    containerRef.current.addEventListener('mouseover', handleHover)
    containerRef.current.addEventListener('mouseout', handleMouseOut)

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('click', handleClick, true)
        containerRef.current.removeEventListener('mouseover', handleHover)
        containerRef.current.removeEventListener('mouseout', handleMouseOut)
      }
    }
  }, [editMode, content, onUpdate])

  return (
    <div ref={containerRef} className="relative w-full">
      {editMode && (
        <div className="absolute -top-10 left-4 z-50 bg-vexl-yellow text-black px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
          Click any text to edit
        </div>
      )}
      {children}
    </div>
  )
}