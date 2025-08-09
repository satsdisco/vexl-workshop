'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Save, Eye, Trash2, Copy, ChevronLeft, ChevronRight,
  Type, Image, List, Code, Palette, Layout, Download, Upload,
  Sparkles, Play, Edit3, X, Check, Settings, ArrowUp, ArrowDown,
  ArrowRight, Grid, Layers, Component, FileText, Move, Maximize2,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline
} from 'lucide-react'
import Link from 'next/link'
import VexlLogo from '@/components/VexlLogo'
import { componentRegistry, getComponent, getComponentsByCategory } from '@/lib/componentRegistry'
import dynamic from 'next/dynamic'

// Import all existing slide components
const existingSlides = [
  { id: 'hook', name: 'Hook - KYC is Killing Bitcoin', component: dynamic(() => import('@/components/sections/HookSection')) },
  { id: 'pitch', name: 'Pitch - Your Social Network', component: dynamic(() => import('@/components/sections/PitchSection')) },
  { id: 'trust', name: 'Trust Beats Ratings', component: dynamic(() => import('@/components/sections/TrustSection')) },
  { id: 'privacy', name: 'Privacy First', component: dynamic(() => import('@/components/sections/PrivacySection')) },
  { id: 'clubs', name: 'Vexl Clubs', component: dynamic(() => import('@/components/sections/ClubsSection')) },
  { id: 'demo', name: 'Live Demo', component: dynamic(() => import('@/components/sections/DemoSection')) },
  { id: 'vision', name: 'Your Network', component: dynamic(() => import('@/components/sections/VisionSection')) },
  { id: 'get-started', name: 'Get Started', component: dynamic(() => import('@/components/sections/GetStartedSection')) },
  { id: 'community-growth', name: 'Community Growth', component: dynamic(() => import('@/components/sections/CommunityGrowthSection')) },
]

// Enhanced slide templates
const slideTemplates = {
  blank: {
    name: 'Blank Canvas',
    icon: FileText,
    structure: {
      layout: 'canvas',
      components: []
    }
  },
  title: {
    name: 'Title Slide',
    icon: Type,
    structure: {
      layout: 'center',
      components: [
        {
          id: 'title-text',
          type: 'textbox',
          content: { text: 'Slide Title', style: 'title' },
          position: { x: 50, y: 40 },
          size: { width: 50, height: 10 }
        },
        {
          id: 'subtitle-text',
          type: 'textbox',
          content: { text: 'Slide Subtitle', style: 'subtitle' },
          position: { x: 50, y: 55 },
          size: { width: 50, height: 8 }
        }
      ]
    }
  },
  component: {
    name: 'Component Focus',
    icon: Component,
    structure: {
      layout: 'canvas',
      components: []
    }
  },
  hybrid: {
    name: 'Text + Component',
    icon: Layers,
    structure: {
      layout: 'split',
      components: [
        {
          id: 'text-side',
          type: 'textbox',
          content: { text: 'Explanation text here', style: 'body' },
          position: { x: 25, y: 50 },
          size: { width: 40, height: 30 }
        }
      ]
    }
  }
}

// Text component for adding to slides
const TextBoxComponent = ({ content, onUpdate, id }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(content.text || 'Click to edit')
  const [style, setStyle] = useState(content.style || 'body')

  const styles = {
    title: 'text-4xl font-bold text-white',
    subtitle: 'text-2xl font-semibold text-vexl-yellow',
    body: 'text-lg text-vexl-gray-300',
    caption: 'text-sm text-vexl-gray-400'
  }

  return (
    <div className="relative group h-full">
      {isEditing ? (
        <div className="flex flex-col h-full">
          <div className="flex gap-2 mb-2">
            <select
              value={style}
              onChange={(e) => {
                setStyle(e.target.value)
                onUpdate(id, { text, style: e.target.value })
              }}
              className="px-2 py-1 bg-vexl-gray-800 text-white text-sm rounded"
            >
              <option value="title">Title</option>
              <option value="subtitle">Subtitle</option>
              <option value="body">Body</option>
              <option value="caption">Caption</option>
            </select>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 bg-vexl-green text-white text-sm rounded"
            >
              Done
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value)
              onUpdate(id, { text: e.target.value, style })
            }}
            className="flex-1 w-full px-3 py-2 bg-vexl-gray-900 text-white rounded resize-none"
            style={{ fontFamily: style === 'title' ? 'Monument Extended' : 'inherit' }}
          />
        </div>
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          className={`${styles[style]} cursor-pointer hover:bg-vexl-gray-900/50 p-2 rounded h-full flex items-center`}
          style={{ fontFamily: style === 'title' || style === 'subtitle' ? 'Monument Extended' : 'inherit' }}
        >
          {text}
        </div>
      )}
    </div>
  )
}

interface SlideComponent {
  id: string
  type: 'component' | 'textbox' | 'existing-slide'
  componentId?: string
  content?: any
  position: { x: number, y: number }
  size: { width: number, height: number }
  props?: any
}

interface Slide {
  id: string
  name: string
  type: string
  layout: string
  components: SlideComponent[]
}

interface Deck {
  id: string
  name: string
  description: string
  slides: Slide[]
  duration: number
  audience: string
  difficulty: string
  tags: string[]
}

export default function UltimateDeckBuilder() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null)
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const [showComponentLibrary, setShowComponentLibrary] = useState(false)
  const [showExistingSlides, setShowExistingSlides] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [slideOrder, setSlideOrder] = useState<string[]>([])
  const [draggedComponent, setDraggedComponent] = useState<string | null>(null)
  const [resizingComponent, setResizingComponent] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Load existing decks on mount
  useEffect(() => {
    loadDecks()
  }, [])

  const loadDecks = async () => {
    try {
      const response = await fetch('/api/admin/decks')
      const data = await response.json()
      if (data.decks) {
        setDecks(data.decks)
      }
    } catch (error) {
      console.error('Failed to load decks:', error)
    }
  }

  const createNewDeck = () => {
    const newDeck: Deck = {
      id: `deck-${Date.now()}`,
      name: 'New Presentation Deck',
      description: 'Describe your deck purpose',
      slides: [],
      duration: 30,
      audience: 'General',
      difficulty: 'intermediate',
      tags: []
    }
    setCurrentDeck(newDeck)
    setSlideOrder([])
  }

  const addSlide = (templateType: string) => {
    if (!currentDeck) return
    
    const template = slideTemplates[templateType as keyof typeof slideTemplates]
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      name: `Slide ${currentDeck.slides.length + 1}`,
      type: templateType,
      layout: template.structure.layout,
      components: template.structure.components || []
    }
    
    const updatedDeck = {
      ...currentDeck,
      slides: [...currentDeck.slides, newSlide]
    }
    setCurrentDeck(updatedDeck)
    setSlideOrder([...slideOrder, newSlide.id])
    setCurrentSlide(newSlide)
  }

  const addTextBox = () => {
    if (!currentSlide) return
    
    const newTextBox: SlideComponent = {
      id: `text-${Date.now()}`,
      type: 'textbox',
      content: { text: 'New text box', style: 'body' },
      position: { x: 50, y: 50 },
      size: { width: 30, height: 10 }
    }
    
    const updatedSlide = {
      ...currentSlide,
      components: [...currentSlide.components, newTextBox]
    }
    
    setCurrentSlide(updatedSlide)
    updateSlideInDeck(updatedSlide)
  }

  const addComponentToSlide = (componentId: string) => {
    if (!currentSlide) return
    
    const component = getComponent(componentId)
    if (!component) return
    
    const newComponent: SlideComponent = {
      id: `comp-${Date.now()}`,
      type: 'component',
      componentId: componentId,
      position: { x: 50, y: 50 },
      size: { width: 40, height: 40 },
      props: component.defaultProps || {}
    }
    
    const updatedSlide = {
      ...currentSlide,
      components: [...currentSlide.components, newComponent]
    }
    
    setCurrentSlide(updatedSlide)
    updateSlideInDeck(updatedSlide)
  }

  const addExistingSlide = (slideId: string) => {
    if (!currentDeck) return
    
    const existingSlide = existingSlides.find(s => s.id === slideId)
    if (!existingSlide) return
    
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      name: existingSlide.name,
      type: 'existing',
      layout: 'full',
      components: [{
        id: `existing-${Date.now()}`,
        type: 'existing-slide',
        componentId: slideId,
        position: { x: 0, y: 0 },
        size: { width: 100, height: 100 }
      }]
    }
    
    const updatedDeck = {
      ...currentDeck,
      slides: [...currentDeck.slides, newSlide]
    }
    setCurrentDeck(updatedDeck)
    setSlideOrder([...slideOrder, newSlide.id])
    setCurrentSlide(newSlide)
  }

  const updateSlideInDeck = (slide: Slide) => {
    if (!currentDeck) return
    
    const updatedSlides = currentDeck.slides.map(s => 
      s.id === slide.id ? slide : s
    )
    
    setCurrentDeck({ ...currentDeck, slides: updatedSlides })
  }

  const updateComponent = (componentId: string, updates: Partial<SlideComponent>) => {
    if (!currentSlide) return
    
    const updatedComponents = currentSlide.components.map(comp =>
      comp.id === componentId ? { ...comp, ...updates } : comp
    )
    
    const updatedSlide = { ...currentSlide, components: updatedComponents }
    setCurrentSlide(updatedSlide)
    updateSlideInDeck(updatedSlide)
  }

  const updateTextContent = (componentId: string, content: any) => {
    updateComponent(componentId, { content })
  }

  const removeComponent = (componentId: string) => {
    if (!currentSlide) return
    
    const updatedSlide = {
      ...currentSlide,
      components: currentSlide.components.filter(c => c.id !== componentId)
    }
    
    setCurrentSlide(updatedSlide)
    updateSlideInDeck(updatedSlide)
  }

  const handleDragStart = (componentId: string, e: React.MouseEvent) => {
    setDraggedComponent(componentId)
    const startX = e.clientX
    const startY = e.clientY
    const component = currentSlide?.components.find(c => c.id === componentId)
    if (!component) return

    const handleDrag = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      updateComponent(componentId, { position: { x, y } })
    }

    const handleDragEnd = () => {
      setDraggedComponent(null)
      document.removeEventListener('mousemove', handleDrag)
      document.removeEventListener('mouseup', handleDragEnd)
    }

    document.addEventListener('mousemove', handleDrag)
    document.addEventListener('mouseup', handleDragEnd)
  }

  const handleResize = (componentId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setResizingComponent(componentId)
    const component = currentSlide?.components.find(c => c.id === componentId)
    if (!component) return

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = component.size.width
    const startHeight = component.size.height

    const handleResize = (e: MouseEvent) => {
      if (!canvasRef.current) return
      const rect = canvasRef.current.getBoundingClientRect()
      const deltaX = ((e.clientX - startX) / rect.width) * 100
      const deltaY = ((e.clientY - startY) / rect.height) * 100
      updateComponent(componentId, {
        size: {
          width: Math.max(10, startWidth + deltaX),
          height: Math.max(10, startHeight + deltaY)
        }
      })
    }

    const handleResizeEnd = () => {
      setResizingComponent(null)
      document.removeEventListener('mousemove', handleResize)
      document.removeEventListener('mouseup', handleResizeEnd)
    }

    document.addEventListener('mousemove', handleResize)
    document.addEventListener('mouseup', handleResizeEnd)
  }

  const saveDeck = async () => {
    if (!currentDeck) return
    
    try {
      const response = await fetch('/api/admin/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify(currentDeck)
      })
      
      if (response.ok) {
        alert('Deck saved successfully!')
        loadDecks()
      } else {
        alert('Failed to save deck. Please try again.')
      }
    } catch (error) {
      console.error('Failed to save deck:', error)
      alert('Failed to save deck')
    }
  }

  const previewDeck = () => {
    if (!currentDeck) return
    // Save to localStorage for preview
    localStorage.setItem('preview-deck', JSON.stringify(currentDeck))
    window.open(`/workshop?preview=${currentDeck.id}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <header className="border-b border-vexl-gray-800 bg-vexl-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Link href="/admin" className="text-vexl-gray-400 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <VexlLogo />
            <div>
              <h1 className="text-xl font-bold text-white">Ultimate Deck Builder</h1>
              <p className="text-sm text-vexl-gray-400">
                {currentDeck ? currentDeck.name : 'Create your presentation'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {currentDeck && (
              <>
                <button
                  onClick={addTextBox}
                  className="flex items-center space-x-2 px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700"
                >
                  <Type className="w-4 h-4" />
                  <span>Add Text</span>
                </button>
                <button
                  onClick={() => setShowComponentLibrary(!showComponentLibrary)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Component className="w-4 h-4" />
                  <span>Components</span>
                </button>
                <button
                  onClick={() => setShowExistingSlides(!showExistingSlides)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Layers className="w-4 h-4" />
                  <span>Existing Slides</span>
                </button>
                <button
                  onClick={previewDeck}
                  className="flex items-center space-x-2 px-4 py-2 bg-vexl-green text-black rounded-lg hover:bg-vexl-green/90"
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={saveDeck}
                  className="flex items-center space-x-2 px-4 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90 font-semibold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Deck</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Deck & Slides */}
        <div className="w-80 border-r border-vexl-gray-800 bg-vexl-gray-900/50 overflow-y-auto">
          {!currentDeck ? (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Start Building</h2>
              
              <button
                onClick={createNewDeck}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90 font-semibold mb-6"
              >
                <Plus className="w-5 h-5" />
                <span>Create New Deck</span>
              </button>
              
              <div className="space-y-3">
                {decks.map(deck => (
                  <button
                    key={deck.id}
                    onClick={() => {
                      setCurrentDeck(deck)
                      setSlideOrder(deck.slides.map(s => s.id))
                      setCurrentSlide(deck.slides[0] || null)
                    }}
                    className="w-full text-left p-4 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 transition-colors"
                  >
                    <h3 className="font-semibold text-white">{deck.name}</h3>
                    <p className="text-sm text-vexl-gray-400 mt-1">
                      {deck.slides.length} slides • {deck.duration} min
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Deck Info */}
              <div className="mb-6">
                <input
                  type="text"
                  value={currentDeck.name}
                  onChange={(e) => setCurrentDeck({ ...currentDeck, name: e.target.value })}
                  className="w-full text-lg font-semibold bg-transparent text-white border-b border-vexl-gray-700 focus:border-vexl-yellow outline-none pb-2"
                />
              </div>

              {/* Slides List */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-vexl-gray-400 mb-3">SLIDES</h3>
                <div className="space-y-2">
                  {currentDeck.slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        currentSlide?.id === slide.id
                          ? 'bg-vexl-yellow/20 border border-vexl-yellow'
                          : 'bg-vexl-gray-800 hover:bg-vexl-gray-700'
                      }`}
                      onClick={() => setCurrentSlide(slide)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{slide.name}</p>
                          <p className="text-xs text-vexl-gray-400">
                            {slide.components.length} elements
                          </p>
                        </div>
                        <Trash2 
                          className="w-4 h-4 text-red-400 hover:text-red-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            const updatedDeck = {
                              ...currentDeck,
                              slides: currentDeck.slides.filter(s => s.id !== slide.id)
                            }
                            setCurrentDeck(updatedDeck)
                            if (currentSlide?.id === slide.id) {
                              setCurrentSlide(null)
                            }
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Slide Templates */}
              <div>
                <h3 className="text-sm font-semibold text-vexl-gray-400 mb-3">ADD SLIDE</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(slideTemplates).map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => addSlide(key)}
                      className="flex flex-col items-center p-3 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 transition-colors"
                    >
                      <template.icon className="w-5 h-5 text-vexl-yellow mb-1" />
                      <span className="text-xs text-white">{template.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Canvas - Slide Editor */}
        <div className="flex-1 overflow-y-auto bg-vexl-gray-950">
          {currentSlide ? (
            <div className="p-8">
              <div className="mb-4">
                <input
                  type="text"
                  value={currentSlide.name}
                  onChange={(e) => {
                    const updated = { ...currentSlide, name: e.target.value }
                    setCurrentSlide(updated)
                    updateSlideInDeck(updated)
                  }}
                  className="text-2xl font-bold bg-transparent text-white border-b-2 border-vexl-gray-700 focus:border-vexl-yellow outline-none pb-2"
                />
              </div>

              {/* Canvas Area */}
              <div 
                ref={canvasRef}
                className="relative bg-black rounded-xl border-2 border-vexl-gray-800"
                style={{ aspectRatio: '16/9', minHeight: '500px' }}
              >
                {currentSlide.components.map((component) => {
                  // Render existing slide
                  if (component.type === 'existing-slide') {
                    const ExistingSlide = existingSlides.find(s => s.id === component.componentId)?.component
                    if (!ExistingSlide) return null
                    return (
                      <div 
                        key={component.id}
                        className="absolute inset-0"
                      >
                        <ExistingSlide />
                      </div>
                    )
                  }

                  // Render text box
                  if (component.type === 'textbox') {
                    return (
                      <div
                        key={component.id}
                        className="absolute group border-2 border-transparent hover:border-vexl-yellow p-2"
                        style={{
                          left: `${component.position.x}%`,
                          top: `${component.position.y}%`,
                          width: `${component.size.width}%`,
                          height: `${component.size.height}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div
                          className="absolute -top-2 -left-2 w-4 h-4 bg-vexl-yellow rounded-full cursor-move opacity-0 group-hover:opacity-100"
                          onMouseDown={(e) => handleDragStart(component.id, e)}
                        >
                          <Move className="w-4 h-4 text-black p-0.5" />
                        </div>
                        <button
                          className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
                          onClick={() => removeComponent(component.id)}
                        >
                          <X className="w-4 h-4 text-white p-0.5" />
                        </button>
                        <div
                          className="absolute -bottom-2 -right-2 w-4 h-4 bg-vexl-green rounded-full cursor-se-resize opacity-0 group-hover:opacity-100"
                          onMouseDown={(e) => handleResize(component.id, e)}
                        >
                          <Maximize2 className="w-4 h-4 text-black p-0.5" />
                        </div>
                        <TextBoxComponent
                          id={component.id}
                          content={component.content}
                          onUpdate={updateTextContent}
                        />
                      </div>
                    )
                  }

                  // Render component
                  if (component.type === 'component') {
                    const ComponentDef = getComponent(component.componentId!)
                    if (!ComponentDef) return null
                    const Component = ComponentDef.component
                    
                    return (
                      <div
                        key={component.id}
                        className="absolute group border-2 border-transparent hover:border-vexl-yellow p-2"
                        style={{
                          left: `${component.position.x}%`,
                          top: `${component.position.y}%`,
                          width: `${component.size.width}%`,
                          height: `${component.size.height}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div
                          className="absolute -top-2 -left-2 w-4 h-4 bg-vexl-yellow rounded-full cursor-move opacity-0 group-hover:opacity-100"
                          onMouseDown={(e) => handleDragStart(component.id, e)}
                        >
                          <Move className="w-4 h-4 text-black p-0.5" />
                        </div>
                        <button
                          className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
                          onClick={() => removeComponent(component.id)}
                        >
                          <X className="w-4 h-4 text-white p-0.5" />
                        </button>
                        <div
                          className="absolute -bottom-2 -right-2 w-4 h-4 bg-vexl-green rounded-full cursor-se-resize opacity-0 group-hover:opacity-100"
                          onMouseDown={(e) => handleResize(component.id, e)}
                        >
                          <Maximize2 className="w-4 h-4 text-black p-0.5" />
                        </div>
                        <Component {...component.props} />
                      </div>
                    )
                  }
                  
                  return null
                })}

                {/* Empty state */}
                {currentSlide.components.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Sparkles className="w-12 h-12 text-vexl-gray-600 mx-auto mb-4" />
                      <p className="text-vexl-gray-400 mb-4">Canvas is empty</p>
                      <div className="flex gap-4 justify-center">
                        <button
                          onClick={addTextBox}
                          className="px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700"
                        >
                          Add Text
                        </button>
                        <button
                          onClick={() => setShowComponentLibrary(true)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                        >
                          Add Component
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Grid className="w-16 h-16 text-vexl-gray-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No Slide Selected</h2>
                <p className="text-vexl-gray-400">
                  {currentDeck ? 'Select a slide or add a new one' : 'Create a deck to get started'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Component Library Panel */}
        {showComponentLibrary && (
          <div className="w-96 border-l border-vexl-gray-800 bg-vexl-gray-900/50 overflow-y-auto">
            <div className="p-4 border-b border-vexl-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Components</h3>
                <button
                  onClick={() => setShowComponentLibrary(false)}
                  className="p-1 hover:bg-vexl-gray-800 rounded"
                >
                  <X className="w-5 h-5 text-vexl-gray-400" />
                </button>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded-lg"
              >
                <option value="all">All Components</option>
                <option value="demo">Demos</option>
                <option value="visualization">Visualizations</option>
                <option value="calculator">Calculators</option>
              </select>
            </div>
            
            <div className="p-4 space-y-3">
              {componentRegistry
                .filter(comp => selectedCategory === 'all' || comp.category === selectedCategory)
                .map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => addComponentToSlide(comp.id)}
                    className="w-full text-left p-3 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{comp.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{comp.name}</h4>
                        <p className="text-xs text-vexl-gray-400 mt-1">{comp.description}</p>
                      </div>
                      <Plus className="w-5 h-5 text-vexl-gray-600" />
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Existing Slides Panel */}
        {showExistingSlides && (
          <div className="w-96 border-l border-vexl-gray-800 bg-vexl-gray-900/50 overflow-y-auto">
            <div className="p-4 border-b border-vexl-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Existing Slides</h3>
                <button
                  onClick={() => setShowExistingSlides(false)}
                  className="p-1 hover:bg-vexl-gray-800 rounded"
                >
                  <X className="w-5 h-5 text-vexl-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              {existingSlides.map(slide => (
                <button
                  key={slide.id}
                  onClick={() => addExistingSlide(slide.id)}
                  className="w-full text-left p-4 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-white">{slide.name}</h4>
                      <p className="text-xs text-vexl-gray-400 mt-1">Click to add to deck</p>
                    </div>
                    <Plus className="w-5 h-5 text-vexl-gray-600 group-hover:text-vexl-yellow" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}