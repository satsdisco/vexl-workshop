'use client'

import { useState, useRef, useEffect } from 'react'
import { Bold, Italic, List, Link2, Code, Quote, Heading1, Heading2, Type } from 'lucide-react'

interface ModernRichTextEditorProps {
  content: string
  onChange: (value: string) => void
  placeholder?: string
  compact?: boolean
}

export default function ModernRichTextEditor({ 
  content, 
  onChange, 
  placeholder = 'Enter text...',
  compact = false
}: ModernRichTextEditorProps) {
  const [isFocused, setIsFocused] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const [selectedText, setSelectedText] = useState('')

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== content) {
      editorRef.current.innerHTML = content || ''
    }
  }, [content])

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleChange()
  }

  const handleChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML
      if (newContent !== content) {
        onChange(newContent)
      }
    }
  }

  const handleSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.toString()) {
      setSelectedText(selection.toString())
    } else {
      setSelectedText('')
    }
  }

  const insertMarkdown = (before: string, after: string = '') => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const text = range.toString() || 'text'
      
      range.deleteContents()
      const textNode = document.createTextNode(before + text + after)
      range.insertNode(textNode)
      
      handleChange()
    }
  }

  const toolbarButtons = [
    { icon: Bold, command: 'bold', tooltip: 'Bold' },
    { icon: Italic, command: 'italic', tooltip: 'Italic' },
    { icon: Heading1, action: () => handleFormat('formatBlock', 'h1'), tooltip: 'Heading 1' },
    { icon: Heading2, action: () => handleFormat('formatBlock', 'h2'), tooltip: 'Heading 2' },
    { icon: List, command: 'insertUnorderedList', tooltip: 'Bullet List' },
    { icon: Quote, action: () => handleFormat('formatBlock', 'blockquote'), tooltip: 'Quote' },
    { icon: Code, action: () => insertMarkdown('`', '`'), tooltip: 'Code' },
    { icon: Link2, action: () => {
      const url = prompt('Enter URL:')
      if (url) handleFormat('createLink', url)
    }, tooltip: 'Link' }
  ]

  return (
    <div className={`border border-vexl-gray-800 rounded-lg overflow-hidden transition-all ${
      isFocused ? 'ring-2 ring-vexl-yellow border-vexl-yellow' : ''
    } ${compact ? '' : 'min-h-[200px]'}`}>
      {/* Toolbar */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800 px-2 py-1 flex items-center gap-1">
        {toolbarButtons.map((button, index) => {
          const Icon = button.icon
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                if (button.command) {
                  handleFormat(button.command)
                } else if (button.action) {
                  button.action()
                }
              }}
              className="p-1.5 rounded hover:bg-vexl-gray-800 text-vexl-gray-400 hover:text-vexl-white transition-colors"
              title={button.tooltip}
            >
              <Icon size={16} />
            </button>
          )
        })}
        
        {selectedText && (
          <div className="ml-auto text-xs text-vexl-gray-500">
            {selectedText.length} chars selected
          </div>
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        className={`prose prose-invert max-w-none p-4 focus:outline-none ${
          compact ? 'min-h-[80px]' : 'min-h-[150px]'
        } ${!content ? 'empty-editor' : ''}`}
        style={{
          color: '#ffffff',
          lineHeight: '1.6',
          fontSize: compact ? '14px' : '16px'
        }}
        onInput={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseUp={handleSelection}
        onKeyUp={handleSelection}
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: content || '' }}
      />

      {/* Character count */}
      <div className="px-4 py-2 bg-vexl-gray-900/50 border-t border-vexl-gray-800 flex justify-between items-center text-xs text-vexl-gray-500">
        <span>{content.replace(/<[^>]*>/g, '').length} characters</span>
        {isFocused && (
          <span className="text-vexl-yellow">Editing</span>
        )}
      </div>
    </div>
  )
}