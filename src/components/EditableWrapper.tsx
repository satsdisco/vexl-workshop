'use client'

import { useState, useEffect, useRef } from 'react'
import { Edit2 } from 'lucide-react'

interface EditableWrapperProps {
  value: string
  onChange: (value: string) => void
  tag?: keyof React.JSX.IntrinsicElements
  className?: string
  children?: React.ReactNode
  editMode?: boolean
}

export default function EditableWrapper({
  value,
  onChange,
  tag = 'div',
  className = '',
  children,
  editMode = true
}: EditableWrapperProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const elementRef = useRef<HTMLElement>(null)
  const Tag = tag as any

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && elementRef.current) {
      elementRef.current.focus()
      // Select all text
      const range = document.createRange()
      range.selectNodeContents(elementRef.current)
      const selection = window.getSelection()
      selection?.removeAllRanges()
      selection?.addRange(range)
    }
  }, [isEditing])

  const handleBlur = () => {
    setIsEditing(false)
    if (localValue !== value) {
      onChange(localValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      elementRef.current?.blur()
    }
    if (e.key === 'Escape') {
      setLocalValue(value)
      setIsEditing(false)
    }
  }

  const handleInput = () => {
    if (elementRef.current) {
      setLocalValue(elementRef.current.textContent || '')
    }
  }

  if (!editMode) {
    return <Tag className={className}>{children || value}</Tag>
  }

  return (
    <div className="relative group inline-block">
      <Tag
        ref={elementRef}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onClick={() => !isEditing && setIsEditing(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        className={`
          ${className}
          ${!isEditing ? 'cursor-pointer' : ''}
          ${isEditing ? 'outline outline-2 outline-vexl-yellow outline-offset-2' : ''}
          ${!isEditing ? 'hover:outline hover:outline-1 hover:outline-vexl-yellow/50 hover:outline-offset-2' : ''}
          transition-all
        `}
        style={{
          minWidth: '20px',
          minHeight: '20px'
        }}
      >
        {children || localValue}
      </Tag>
      
      {!isEditing && (
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-vexl-yellow text-black p-1 rounded">
            <Edit2 className="w-3 h-3" />
          </div>
        </div>
      )}
    </div>
  )
}