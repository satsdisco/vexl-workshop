'use client'

import { useState, useEffect } from 'react'
import { Bold, Italic, Link, List, Type } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function RichTextEditor({ 
  value, 
  onChange, 
  placeholder,
  className = ''
}: RichTextEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleSave = () => {
    onChange(localValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setLocalValue(value)
    setIsEditing(false)
  }

  const applyFormat = (format: string) => {
    // Simple formatting - in production you'd use a proper rich text editor
    let formatted = localValue
    const selection = window.getSelection()?.toString() || ''
    
    if (selection) {
      switch(format) {
        case 'bold':
          formatted = localValue.replace(selection, `**${selection}**`)
          break
        case 'italic':
          formatted = localValue.replace(selection, `*${selection}*`)
          break
        case 'link':
          const url = prompt('Enter URL:')
          if (url) {
            formatted = localValue.replace(selection, `[${selection}](${url})`)
          }
          break
      }
      setLocalValue(formatted)
    }
  }

  if (!isEditing) {
    return (
      <div 
        className={`p-3 bg-vexl-gray-900 rounded-lg cursor-pointer hover:bg-vexl-gray-800 transition-colors ${className}`}
        onClick={() => setIsEditing(true)}
      >
        <p className="text-vexl-gray-300 whitespace-pre-wrap">
          {value || <span className="text-vexl-gray-500">{placeholder || 'Click to edit...'}</span>}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2 p-2 bg-vexl-gray-800 rounded-lg">
        <button
          type="button"
          onClick={() => applyFormat('bold')}
          className="p-2 hover:bg-vexl-gray-700 rounded transition-colors"
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('italic')}
          className="p-2 hover:bg-vexl-gray-700 rounded transition-colors"
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => applyFormat('link')}
          className="p-2 hover:bg-vexl-gray-700 rounded transition-colors"
          title="Link"
        >
          <Link size={16} />
        </button>
      </div>
      
      <textarea
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-3 bg-vexl-gray-900 border border-vexl-yellow rounded-lg text-vexl-white resize-none ${className}`}
        rows={5}
        autoFocus
      />
      
      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          className="px-4 py-2 bg-vexl-yellow text-vexl-black font-semibold rounded-lg hover:bg-vexl-yellow/90"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-vexl-gray-800 text-vexl-gray-300 font-semibold rounded-lg hover:bg-vexl-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}