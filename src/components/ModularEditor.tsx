'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Move, Trash2, Copy, Maximize2, Save, Plus,
  Type, Image, BarChart, Layout, Users
} from 'lucide-react'

interface Element {
  id: string
  type: string
  content: any
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
}

interface ModularEditorProps {
  sectionId: string
  initialElements?: Element[]
  onSave: (elements: Element[]) => void
  editMode: boolean
}

export default function ModularEditor({ 
  sectionId, 
  initialElements = [], 
  onSave,
  editMode 
}: ModularEditorProps) {
  const [elements, setElements] = useState<Element[]>(initialElements)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [elementStart, setElementStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  // Save elements when they change
  useEffect(() => {
    if (elements.length > 0) {
      const saveTimer = setTimeout(() => {
        console.log('Saving elements:', elements)
        onSave(elements)
      }, 1000)
      return () => clearTimeout(saveTimer)
    }
  }, [elements, onSave])

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (!editMode) return
    
    const element = elements.find(el => el.id === elementId)
    if (!element) return

    setSelectedElement(elementId)
    setIsDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
    setElementStart({ x: element.position.x, y: element.position.y })
    
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !selectedElement) return

    const deltaX = e.clientX - dragStart.x
    const deltaY = e.clientY - dragStart.y

    setElements(prev => prev.map(el => 
      el.id === selectedElement 
        ? { ...el, position: { 
            x: Math.max(0, elementStart.x + deltaX),
            y: Math.max(0, elementStart.y + deltaY)
          }}
        : el
    ))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setIsResizing(false)
  }

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, isResizing, dragStart, elementStart, selectedElement])

  const handleResize = (elementId: string, direction: string) => {
    if (!editMode) return
    
    setSelectedElement(elementId)
    setIsResizing(true)
    // Implement resize logic based on direction
  }

  const deleteElement = (elementId: string) => {
    setElements(prev => prev.filter(el => el.id !== elementId))
    setSelectedElement(null)
  }

  const duplicateElement = (elementId: string) => {
    const element = elements.find(el => el.id === elementId)
    if (!element) return

    const newElement: Element = {
      ...element,
      id: `${element.type}_${Date.now()}`,
      position: { 
        x: element.position.x + 20, 
        y: element.position.y + 20 
      }
    }
    setElements(prev => [...prev, newElement])
  }

  const addNewElement = (type: string) => {
    const newElement: Element = {
      id: `${type}_${Date.now()}`,
      type,
      content: getDefaultContent(type),
      position: { x: 100, y: 100 },
      size: { width: 300, height: 100 },
      zIndex: elements.length
    }
    setElements(prev => [...prev, newElement])
  }

  const getDefaultContent = (type: string) => {
    switch (type) {
      case 'text':
        return { text: 'New Text Element', fontSize: '18px', color: '#ffffff' }
      case 'heading':
        return { text: 'New Heading', fontSize: '32px', color: '#F7C600' }
      case 'stats':
        return { value: '100%', label: 'Success Rate', color: '#F7C600' }
      case 'image':
        return { src: '/placeholder.png', alt: 'Image' }
      default:
        return {}
    }
  }

  const renderElement = (element: Element) => {
    switch (element.type) {
      case 'text':
      case 'heading':
        return (
          <div 
            style={{ 
              fontSize: element.content.fontSize,
              color: element.content.color,
              padding: '10px'
            }}
            contentEditable={editMode}
            suppressContentEditableWarning
            onBlur={(e) => {
              const newContent = { ...element.content, text: e.currentTarget.textContent }
              setElements(prev => prev.map(el => 
                el.id === element.id ? { ...el, content: newContent } : el
              ))
            }}
          >
            {element.content.text}
          </div>
        )
      case 'stats':
        return (
          <div className="p-4 bg-vexl-yellow text-black rounded-lg text-center">
            <div className="text-3xl font-bold">{element.content.value}</div>
            <div className="text-sm">{element.content.label}</div>
          </div>
        )
      default:
        return <div className="p-4">Unknown element type</div>
    }
  }

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Toolbar */}
      {editMode && (
        <div className="absolute top-4 left-4 z-50 bg-vexl-gray-900 rounded-lg p-2 flex space-x-2">
          <button
            onClick={() => addNewElement('heading')}
            className="p-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
            title="Add Heading"
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => addNewElement('text')}
            className="p-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
            title="Add Text"
          >
            <Type className="w-4 h-4" style={{ fontSize: '12px' }} />
          </button>
          <button
            onClick={() => addNewElement('stats')}
            className="p-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
            title="Add Stats"
          >
            <BarChart className="w-4 h-4" />
          </button>
          <div className="w-px bg-vexl-gray-700" />
          <button
            onClick={() => onSave(elements)}
            className="p-2 bg-green-600 text-white rounded hover:bg-green-700"
            title="Save"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Canvas */}
      <div 
        ref={containerRef}
        className="relative w-full h-full bg-black/50 rounded-lg overflow-hidden"
        style={{ minHeight: '600px' }}
      >
        {elements.map(element => (
          <div
            key={element.id}
            className={`absolute group ${
              selectedElement === element.id ? 'ring-2 ring-vexl-yellow' : ''
            } ${editMode ? 'cursor-move' : ''}`}
            style={{
              left: `${element.position.x}px`,
              top: `${element.position.y}px`,
              width: `${element.size.width}px`,
              minHeight: `${element.size.height}px`,
              zIndex: element.zIndex
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
          >
            {renderElement(element)}
            
            {/* Element Controls */}
            {editMode && selectedElement === element.id && (
              <div className="absolute -top-8 left-0 flex space-x-1">
                <button
                  onClick={() => duplicateElement(element.id)}
                  className="p-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={() => deleteElement(element.id)}
                  className="p-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Resize Handles */}
            {editMode && selectedElement === element.id && (
              <>
                <div 
                  className="absolute bottom-0 right-0 w-3 h-3 bg-vexl-yellow cursor-se-resize"
                  onMouseDown={() => handleResize(element.id, 'se')}
                />
                <div 
                  className="absolute bottom-0 left-0 w-3 h-3 bg-vexl-yellow cursor-sw-resize"
                  onMouseDown={() => handleResize(element.id, 'sw')}
                />
                <div 
                  className="absolute top-0 right-0 w-3 h-3 bg-vexl-yellow cursor-ne-resize"
                  onMouseDown={() => handleResize(element.id, 'ne')}
                />
                <div 
                  className="absolute top-0 left-0 w-3 h-3 bg-vexl-yellow cursor-nw-resize"
                  onMouseDown={() => handleResize(element.id, 'nw')}
                />
              </>
            )}
          </div>
        ))}

        {/* Drop Zone Indicator */}
        {elements.length === 0 && editMode && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-vexl-gray-400">
              <Plus className="w-12 h-12 mx-auto mb-2" />
              <p>Click toolbar buttons to add elements</p>
              <p className="text-sm">or drag from the asset library</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}