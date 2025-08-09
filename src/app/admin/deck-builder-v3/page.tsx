'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Save, Eye, Trash2, Copy, ChevronLeft, ChevronRight,
  Type, Image, List, Code, Palette, Layout, Download, Upload,
  Sparkles, Play, Edit3, X, Check, Settings, ArrowUp, ArrowDown,
  ArrowRight, Grid, Layers, Component, FileText, Move, Maximize2,
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline,
  Camera, Shield, Star, User
} from 'lucide-react'
import Link from 'next/link'
import VexlLogo from '@/components/VexlLogo'
import { componentRegistry, getComponent, getComponentsByCategory } from '@/lib/componentRegistry'
import { brandAssets, getAssetsByCategory, getPlaceholderUrl } from '@/lib/brandAssets'
import { EnhancedTextEditor } from './enhanced-text-editor'
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

// Simple text display component with enhanced editor modal
const TextBoxComponent = ({ content, onUpdate, id }) => {
  const [isEditing, setIsEditing] = useState(false)
  const richText = content.richText || []
  const style = content.style || 'body'
  const align = content.align || 'left'
  const weight = content.weight || 'normal'
  const customSize = content.customSize || null

  // Brand colors
  const brandColors = {
    white: '#FFFFFF',
    yellow: '#FCD34D',
    green: '#10B981',
    blue: '#3B82F6',
    gray: '#6B7280',
    lightGray: '#D1D5DB',
    red: '#EF4444',
    purple: '#9333EA',
    orange: '#FB923C'
  }

  // Text sizes
  const getTextSize = () => {
    if (customSize) return { fontSize: `${customSize}px` }
    
    const textSizes = {
      title: { fontSize: '48px' },
      subtitle: { fontSize: '32px' },
      large: { fontSize: '24px' },
      body: { fontSize: '18px' },
      small: { fontSize: '16px' },
      caption: { fontSize: '14px' }
    }
    return textSizes[style] || textSizes.body
  }

  // Font weights
  const fontWeights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black'
  }


  return (
    <>
      <div
        onClick={() => setIsEditing(true)}
        className={`${fontWeights[weight]} cursor-pointer hover:bg-vexl-gray-900/20 p-2 rounded h-full w-full select-none`}
        style={{ 
          fontFamily: (style === 'title' || style === 'subtitle') ? 'Monument Extended' : 'inherit',
          textAlign: align as any,
          ...getTextSize(),
          display: 'block'
        }}
      >
        {richText && richText.length > 0 ? (
          <span style={{ display: 'block', textAlign: align as any }}>
            {richText.map((word, index) => (
              <span 
                key={index}
                style={{ color: brandColors[word.color] || brandColors.white }}
              >
                {word.text}{index < richText.length - 1 ? ' ' : ''}
              </span>
            ))}
          </span>
        ) : (
          <span style={{ color: brandColors.white }}>Click to add text</span>
        )}
      </div>
      
      {/* Enhanced Text Editor Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <EnhancedTextEditor
            content={content}
            onUpdate={onUpdate}
            id={id}
            onClose={() => setIsEditing(false)}
          />
        </div>
      )}
    </>
  )
}

interface SlideComponent {
  id: string
  type: 'component' | 'textbox' | 'existing-slide' | 'image' | 'asset'
  componentId?: string
  assetId?: string
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
  const [showBrandAssets, setShowBrandAssets] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedAssetCategory, setSelectedAssetCategory] = useState<string>('all')
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
      const token = localStorage.getItem('vexl-admin-token') || localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/decks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
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
      slides: [], // Ensure slides is always an array
      duration: 30,
      audience: 'General',
      difficulty: 'intermediate',
      tags: []
    }
    setCurrentDeck(newDeck)
    setSlideOrder([])
    setCurrentSlide(null)
  }

  const addSlide = (templateType: string) => {
    if (!currentDeck) return
    
    const template = slideTemplates[templateType as keyof typeof slideTemplates]
    const slides = currentDeck.slides || []
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      name: `Slide ${slides.length + 1}`,
      type: templateType,
      layout: template.structure.layout,
      components: template.structure.components || []
    }
    
    const updatedDeck = {
      ...currentDeck,
      slides: [...slides, newSlide]
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
  
  const addAssetToSlide = (assetId: string) => {
    if (!currentSlide) return
    
    const asset = brandAssets.find(a => a.id === assetId)
    if (!asset) return
    
    // Determine default size based on asset type
    let defaultSize = { width: 20, height: 20 }
    if (asset.category === 'screenshot') {
      defaultSize = { width: 15, height: 30 }
    } else if (asset.category === 'logo') {
      defaultSize = { width: 25, height: 10 }
    }
    
    const newAsset: SlideComponent = {
      id: `asset-${Date.now()}`,
      type: 'asset',
      assetId: assetId,
      content: asset,
      position: { x: 50, y: 50 },
      size: defaultSize
    }
    
    const updatedSlide = {
      ...currentSlide,
      components: [...currentSlide.components, newAsset]
    }
    
    setCurrentSlide(updatedSlide)
    updateSlideInDeck(updatedSlide)
    setShowBrandAssets(false)
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
    if (!currentDeck || !currentDeck.slides) return
    
    const updatedSlides = currentDeck.slides.map(s => 
      s.id === slide.id ? slide : s
    )
    
    setCurrentDeck({ ...currentDeck, slides: updatedSlides })
  }

  const updateComponent = (componentId: string, updates: Partial<SlideComponent>) => {
    if (!currentSlide) return
    
    const components = currentSlide.components || []
    const updatedComponents = components.map(comp =>
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
    
    const components = currentSlide.components || []
    const updatedSlide = {
      ...currentSlide,
      components: components.filter(c => c.id !== componentId)
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

  const handleTextResize = (componentId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const component = currentSlide?.components.find(c => c.id === componentId)
    if (!component || component.type !== 'textbox') return

    const startX = e.clientX
    const currentContent = component.content || {}
    const startSize = currentContent.customSize || 18

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX
      // Use horizontal movement for size adjustment (5px = 1 font size)
      const sizeDelta = Math.round(deltaX / 5)
      const newSize = Math.max(8, Math.min(200, startSize + sizeDelta))
      
      updateComponent(componentId, { 
        content: { 
          ...currentContent, 
          customSize: newSize 
        }
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
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
                  onClick={() => setShowBrandAssets(!showBrandAssets)}
                  className="flex items-center space-x-2 px-4 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90"
                >
                  <Image className="w-4 h-4" />
                  <span>Brand Assets</span>
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
                      setSlideOrder((deck.slides || []).map(s => s.id))
                      setCurrentSlide(deck.slides?.[0] || null)
                    }}
                    className="w-full text-left p-4 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 transition-colors"
                  >
                    <h3 className="font-semibold text-white">{deck.name}</h3>
                    <p className="text-sm text-vexl-gray-400 mt-1">
                      {deck.slides?.length || 0} slides • {deck.duration} min
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
                  {(currentDeck.slides || []).map((slide, index) => (
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
                {(currentSlide?.components || []).map((component) => {
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
                        className="absolute group"
                        style={{
                          left: `${component.position.x}%`,
                          top: `${component.position.y}%`,
                          width: `${component.size.width}%`,
                          minHeight: '40px',
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {/* Invisible drag overlay */}
                        <div
                          className="absolute inset-0 cursor-move z-10"
                          onMouseDown={(e) => {
                            const target = e.target as HTMLElement
                            if (!target.closest('button') && !target.closest('.resize-handle')) {
                              e.preventDefault()
                              handleDragStart(component.id, e)
                            }
                          }}
                        />
                        
                        {/* Visual border on hover */}
                        <div className="absolute inset-0 border-2 border-transparent group-hover:border-vexl-yellow rounded-lg pointer-events-none" />
                        
                        {/* Delete button */}
                        <button
                          className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 z-20 transition-opacity flex items-center justify-center hover:bg-red-600"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeComponent(component.id)
                          }}
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                        
                        {/* Box resize handle */}
                        <div
                          className="resize-handle absolute -bottom-3 -right-3 w-6 h-6 bg-vexl-green rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 z-20 transition-opacity flex items-center justify-center hover:bg-vexl-green/80"
                          onMouseDown={(e) => {
                            e.stopPropagation()
                            handleResize(component.id, e)
                          }}
                          title="Drag to resize box"
                        >
                          <Maximize2 className="w-3 h-3 text-black" />
                        </div>
                        
                        {/* Text size handle */}
                        <div
                          className="resize-handle absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-vexl-blue rounded-full cursor-ew-resize opacity-0 group-hover:opacity-100 z-20 transition-opacity flex items-center justify-center hover:bg-vexl-blue/80"
                          onMouseDown={(e) => {
                            e.stopPropagation()
                            handleTextResize(component.id, e)
                          }}
                          title="Drag horizontally to resize text"
                        >
                          <Type className="w-3 h-3 text-white" />
                        </div>
                        
                        {/* Move indicator */}
                        <div className="absolute -top-3 -left-3 w-6 h-6 bg-vexl-yellow rounded-full opacity-0 group-hover:opacity-100 z-20 transition-opacity flex items-center justify-center pointer-events-none">
                          <Move className="w-3 h-3 text-black" />
                        </div>
                        
                        {/* Text content */}
                        <div className="relative">
                          <TextBoxComponent
                            id={component.id}
                            content={component.content}
                            onUpdate={updateTextContent}
                          />
                        </div>
                      </div>
                    )
                  }

                  // Render brand asset/image
                  if (component.type === 'asset') {
                    const asset = component.content
                    return (
                      <div
                        key={component.id}
                        className="absolute group border-2 border-transparent hover:border-vexl-yellow"
                        style={{
                          left: `${component.position.x}%`,
                          top: `${component.position.y}%`,
                          width: `${component.size.width}%`,
                          height: `${component.size.height}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        <div
                          className="absolute -top-2 -left-2 w-4 h-4 bg-vexl-yellow rounded-full cursor-move opacity-0 group-hover:opacity-100 z-10"
                          onMouseDown={(e) => handleDragStart(component.id, e)}
                        >
                          <Move className="w-4 h-4 text-black p-0.5" />
                        </div>
                        <button
                          className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 z-10"
                          onClick={() => removeComponent(component.id)}
                        >
                          <X className="w-4 h-4 text-white p-0.5" />
                        </button>
                        <div
                          className="absolute -bottom-2 -right-2 w-4 h-4 bg-vexl-green rounded-full cursor-se-resize opacity-0 group-hover:opacity-100 z-10"
                          onMouseDown={(e) => handleResize(component.id, e)}
                        >
                          <Maximize2 className="w-4 h-4 text-black p-0.5" />
                        </div>
                        <img
                          src={asset?.url || getPlaceholderUrl(asset?.category || 'icon', asset?.name || 'Asset')}
                          alt={asset?.name || 'Brand Asset'}
                          className="w-full h-full object-contain"
                          style={{ pointerEvents: 'none' }}
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
                {(!currentSlide?.components || currentSlide.components.length === 0) && (
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
        
        {/* Brand Assets Panel */}
        {showBrandAssets && (
          <div className="w-96 border-l border-vexl-gray-800 bg-vexl-gray-900/50 overflow-y-auto">
            <div className="p-4 border-b border-vexl-gray-800">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white">Brand Assets</h3>
                <button
                  onClick={() => setShowBrandAssets(false)}
                  className="p-1 hover:bg-vexl-gray-800 rounded"
                >
                  <X className="w-5 h-5 text-vexl-gray-400" />
                </button>
              </div>
              <select
                value={selectedAssetCategory}
                onChange={(e) => setSelectedAssetCategory(e.target.value)}
                className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded-lg text-sm"
              >
                <option value="all">All Assets</option>
                <option value="logo">Logos</option>
                <option value="screenshot">Screenshots</option>
                <option value="avatar">Avatars</option>
                <option value="symbol">Symbols & Icons</option>
              </select>
            </div>
            
            <div className="p-4">
              {/* Screenshots Section */}
              {(selectedAssetCategory === 'all' || selectedAssetCategory === 'screenshot') && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-vexl-gray-400 mb-3 flex items-center">
                    <Camera className="w-4 h-4 mr-2" />
                    App Screenshots
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {getAssetsByCategory('screenshot').map(asset => (
                      <button
                        key={asset.id}
                        onClick={() => addAssetToSlide(asset.id)}
                        className="group bg-vexl-gray-800 rounded-lg p-3 hover:bg-vexl-gray-700 transition-colors"
                      >
                        <div className="aspect-[9/16] bg-vexl-gray-900 rounded mb-2 flex items-center justify-center">
                          <img
                            src={asset.url || getPlaceholderUrl('screenshot', asset.name)}
                            alt={asset.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <p className="text-xs text-white truncate">{asset.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Logos Section */}
              {(selectedAssetCategory === 'all' || selectedAssetCategory === 'logo') && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-vexl-gray-400 mb-3 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Logos
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {getAssetsByCategory('logo').map(asset => (
                      <button
                        key={asset.id}
                        onClick={() => addAssetToSlide(asset.id)}
                        className="group bg-vexl-gray-800 rounded-lg p-4 hover:bg-vexl-gray-700 transition-colors"
                      >
                        <div className="h-12 flex items-center justify-center mb-2">
                          <img
                            src={asset.url || getPlaceholderUrl('logo', asset.name)}
                            alt={asset.name}
                            className="max-h-full object-contain"
                          />
                        </div>
                        <p className="text-xs text-white truncate">{asset.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Avatars Section */}
              {(selectedAssetCategory === 'all' || selectedAssetCategory === 'avatar') && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-vexl-gray-400 mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Avatars
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {getAssetsByCategory('avatar').map(asset => (
                      <button
                        key={asset.id}
                        onClick={() => addAssetToSlide(asset.id)}
                        className="group bg-vexl-gray-800 rounded-lg p-3 hover:bg-vexl-gray-700 transition-colors"
                      >
                        <div className="aspect-square rounded-full bg-vexl-gray-900 mb-2 flex items-center justify-center overflow-hidden">
                          <img
                            src={asset.url || getPlaceholderUrl('avatar', asset.name)}
                            alt={asset.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs text-white truncate">{asset.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Symbols & Icons Section */}
              {(selectedAssetCategory === 'all' || selectedAssetCategory === 'symbol') && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-vexl-gray-400 mb-3 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Symbols & Icons
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {getAssetsByCategory('symbol').map(asset => (
                      <button
                        key={asset.id}
                        onClick={() => addAssetToSlide(asset.id)}
                        className="group bg-vexl-gray-800 rounded-lg p-3 hover:bg-vexl-gray-700 transition-colors"
                      >
                        <div className="h-12 flex items-center justify-center mb-2">
                          <img
                            src={asset.url || getPlaceholderUrl('symbol', asset.name)}
                            alt={asset.name}
                            className="max-h-full object-contain"
                          />
                        </div>
                        <p className="text-xs text-white truncate">{asset.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}