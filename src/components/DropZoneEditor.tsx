'use client'

import { useState, useRef } from 'react'
import { Plus, Move } from 'lucide-react'

interface DropZoneEditorProps {
  sectionId: string
  content: any
  onUpdate: (key: string, value: any) => void
  editMode: boolean
  children: React.ReactNode
}

export default function DropZoneEditor({ 
  sectionId, 
  content, 
  onUpdate, 
  editMode,
  children 
}: DropZoneEditorProps) {
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [dropPosition, setDropPosition] = useState<'before' | 'after' | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    if (!editMode) return
    e.preventDefault()
    e.stopPropagation()
    
    setIsDraggingOver(true)
    
    // Determine drop position based on mouse position
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const midpoint = rect.top + rect.height / 2
      setDropPosition(e.clientY < midpoint ? 'before' : 'after')
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDraggingOver(false)
    setDropPosition(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    if (!editMode) return
    e.preventDefault()
    e.stopPropagation()
    
    const assetData = e.dataTransfer.getData('asset')
    
    try {
      const asset = JSON.parse(assetData)
      console.log('Dropped asset:', asset, 'at position:', dropPosition)
      
      // Handle different asset types
      if (asset.id === 'heading') {
        addTextElement('h2', asset.defaultContent?.text || 'New Heading')
      } else if (asset.id === 'paragraph') {
        addTextElement('p', asset.defaultContent?.text || 'New paragraph text')
      } else if (asset.id === 'stats-card') {
        addStatsCard(asset.defaultContent)
      } else if (asset.id === 'network-viz') {
        addComponent('NetworkVisualization')
      } else if (asset.id === 'phone-mockup') {
        addComponent('PhoneMockup')
      } else {
        console.log('Unknown asset type:', asset.id)
      }
    } catch (error) {
      console.error('Error handling drop:', error)
    }
    
    setIsDraggingOver(false)
    setDropPosition(null)
  }

  const addTextElement = (tag: string, text: string) => {
    // Add to content based on position
    if (content.additionalElements) {
      const newElements = [...content.additionalElements]
      newElements.push({ type: tag, content: text, id: Date.now() })
      onUpdate('additionalElements', newElements)
    } else {
      onUpdate('additionalElements', [{ type: tag, content: text, id: Date.now() }])
    }
  }

  const addStatsCard = (statsData: any) => {
    if (content.stats) {
      const newStats = [...content.stats]
      newStats.push({
        id: `stat_${Date.now()}`,
        value: statsData?.value || '0',
        label: statsData?.label || 'New Stat'
      })
      onUpdate('stats', newStats)
    }
  }

  const addComponent = (componentName: string) => {
    if (content.components) {
      const newComponents = [...content.components]
      newComponents.push({ type: componentName, id: Date.now() })
      onUpdate('components', newComponents)
    } else {
      onUpdate('components', [{ type: componentName, id: Date.now() }])
    }
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drop indicator - top */}
      {editMode && isDraggingOver && dropPosition === 'before' && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-vexl-yellow z-50">
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-vexl-yellow text-black px-2 py-1 rounded text-xs font-semibold">
            Drop here to add before
          </div>
        </div>
      )}

      {/* Main content */}
      <div className={`${isDraggingOver ? 'opacity-75' : ''} transition-opacity`}>
        {children}
      </div>

      {/* Drop indicator - bottom */}
      {editMode && isDraggingOver && dropPosition === 'after' && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-vexl-yellow z-50">
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-vexl-yellow text-black px-2 py-1 rounded text-xs font-semibold">
            Drop here to add after
          </div>
        </div>
      )}

      {/* Drop zone overlay when dragging */}
      {editMode && isDraggingOver && (
        <div className="absolute inset-0 border-2 border-dashed border-vexl-yellow rounded-lg pointer-events-none z-40">
          <div className="absolute inset-0 bg-vexl-yellow opacity-10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Plus className="w-12 h-12 text-vexl-yellow opacity-50" />
          </div>
        </div>
      )}

      {/* Render additional elements if they exist */}
      {content.additionalElements?.map((element: any) => {
        const Tag = element.type as keyof React.JSX.IntrinsicElements
        return (
          <Tag key={element.id} className="mt-4 text-white">
            {element.content}
          </Tag>
        )
      })}

      {/* Render components if they exist */}
      {content.components?.map((component: any) => (
        <div key={component.id} className="mt-4 p-4 border border-vexl-yellow rounded">
          <div className="text-sm text-vexl-yellow mb-2">Component: {component.type}</div>
          {/* Here you would dynamically render the actual component */}
        </div>
      ))}
    </div>
  )
}