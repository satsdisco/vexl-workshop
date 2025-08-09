'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Save, Eye, Trash2, Copy, ChevronLeft, ChevronRight,
  Type, Image, List, Code, Palette, Layout, Download, Upload,
  Sparkles, Play, Edit3, X, Check, Settings, ArrowUp, ArrowDown,
  ArrowRight, Grid, Layers, Component
} from 'lucide-react'
import Link from 'next/link'
import VexlLogo from '@/components/VexlLogo'
import { componentRegistry, getComponent, getComponentsByCategory } from '@/lib/componentRegistry'

// Enhanced slide templates
const slideTemplates = {
  title: {
    name: 'Title Slide',
    icon: Type,
    structure: {
      layout: 'center',
      title: 'Slide Title',
      subtitle: 'Slide Subtitle',
      description: 'Description text here',
      components: []
    }
  },
  bullets: {
    name: 'Bullet Points',
    icon: List,
    structure: {
      layout: 'split',
      title: 'Main Point',
      items: [
        { id: '1', title: 'Point 1', content: 'Explanation' },
        { id: '2', title: 'Point 2', content: 'Explanation' },
        { id: '3', title: 'Point 3', content: 'Explanation' }
      ],
      components: []
    }
  },
  component: {
    name: 'Component Slide',
    icon: Component,
    structure: {
      layout: 'full',
      title: 'Interactive Demo',
      description: 'Add components below',
      components: []
    }
  },
  hybrid: {
    name: 'Text + Component',
    icon: Layers,
    structure: {
      layout: 'sidebar',
      title: 'Hybrid Slide',
      description: 'Text with interactive component',
      components: []
    }
  },
  grid: {
    name: 'Component Grid',
    icon: Grid,
    structure: {
      layout: 'grid',
      title: 'Multiple Components',
      components: []
    }
  }
}

interface SlideComponent {
  id: string
  componentId: string
  position?: { x: number, y: number }
  size?: { width: string, height: string }
  props?: any
}

interface Slide {
  id: string
  name: string
  type: string
  content: any
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

export default function EnhancedDeckBuilder() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null)
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const [showComponentLibrary, setShowComponentLibrary] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [slideOrder, setSlideOrder] = useState<string[]>([])

  // Load existing decks
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
      content: JSON.parse(JSON.stringify(template.structure)),
      components: []
    }
    
    const updatedDeck = {
      ...currentDeck,
      slides: [...currentDeck.slides, newSlide]
    }
    setCurrentDeck(updatedDeck)
    setSlideOrder([...slideOrder, newSlide.id])
    setCurrentSlide(newSlide)
  }

  const addComponentToSlide = (componentId: string) => {
    if (!currentSlide) return
    
    const component = getComponent(componentId)
    if (!component) return
    
    const newComponent: SlideComponent = {
      id: `comp-${Date.now()}`,
      componentId: componentId,
      position: { x: 0, y: 0 },
      size: { width: '100%', height: 'auto' },
      props: component.defaultProps || {}
    }
    
    const updatedSlide = {
      ...currentSlide,
      components: [...(currentSlide.components || []), newComponent]
    }
    
    setCurrentSlide(updatedSlide)
    updateSlideInDeck(updatedSlide)
  }

  const updateSlideInDeck = (slide: Slide) => {
    if (!currentDeck) return
    
    const updatedSlides = currentDeck.slides.map(s => 
      s.id === slide.id ? slide : s
    )
    
    setCurrentDeck({ ...currentDeck, slides: updatedSlides })
  }

  const removeComponentFromSlide = (componentId: string) => {
    if (!currentSlide) return
    
    const updatedSlide = {
      ...currentSlide,
      components: currentSlide.components.filter(c => c.id !== componentId)
    }
    
    setCurrentSlide(updatedSlide)
    updateSlideInDeck(updatedSlide)
  }

  const saveDeck = async () => {
    if (!currentDeck) return
    
    try {
      const response = await fetch('/api/admin/decks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify(currentDeck)
      })
      
      if (response.ok) {
        alert('Deck saved successfully!')
        loadDecks()
      }
    } catch (error) {
      console.error('Failed to save deck:', error)
      alert('Failed to save deck')
    }
  }

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <header className="border-b border-vexl-gray-800 bg-vexl-black/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-vexl-gray-400 hover:text-white">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <VexlLogo />
              <div>
                <h1 className="text-xl font-bold text-white">Enhanced Deck Builder</h1>
                <p className="text-sm text-vexl-gray-400">Create with components</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentDeck && (
                <>
                  <button
                    onClick={() => setShowComponentLibrary(!showComponentLibrary)}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Component className="w-4 h-4" />
                    <span>Components</span>
                  </button>
                  <button
                    onClick={() => setIsPreview(!isPreview)}
                    className="flex items-center space-x-2 px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700"
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
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Deck & Slides */}
        <div className="w-80 border-r border-vexl-gray-800 bg-vexl-gray-900/50 overflow-y-auto">
          {!currentDeck ? (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Select or Create a Deck</h2>
              
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
                    <p className="text-sm text-vexl-gray-400 mt-1">{deck.slides.length} slides • {deck.duration} min</p>
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
                  className="w-full text-lg font-semibold bg-transparent text-white border-b border-vexl-gray-700 focus:border-vexl-yellow outline-none pb-2 mb-2"
                />
              </div>

              {/* Slides List */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-vexl-gray-400 mb-3">SLIDES</h3>
                <div className="space-y-2">
                  {slideOrder.map((slideId, index) => {
                    const slide = currentDeck.slides.find(s => s.id === slideId)
                    if (!slide) return null
                    
                    return (
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
                              {slide.type} • {slide.components?.length || 0} components
                            </p>
                          </div>
                          <Trash2 
                            className="w-4 h-4 text-red-400 hover:text-red-300"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Remove slide logic
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
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

        {/* Main Content - Slide Editor */}
        <div className="flex-1 overflow-y-auto">
          {currentSlide ? (
            <div className="p-8">
              <div className="mb-6">
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

              {/* Component Preview Area */}
              <div className="bg-vexl-black rounded-xl p-8 border-2 border-vexl-gray-800 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Slide Preview</h3>
                <div className="bg-gradient-to-br from-vexl-gray-900 to-vexl-black rounded-lg p-12 min-h-[400px]">
                  {/* Render slide content */}
                  {currentSlide.content.title && (
                    <h2 className="text-4xl font-bold text-white mb-4 text-center" style={{ fontFamily: 'Monument Extended' }}>
                      {currentSlide.content.title}
                    </h2>
                  )}
                  
                  {/* Render components */}
                  <div className={`
                    ${currentSlide.content.layout === 'grid' ? 'grid grid-cols-2 gap-4' : ''}
                    ${currentSlide.content.layout === 'sidebar' ? 'flex gap-8' : ''}
                  `}>
                    {currentSlide.components?.map((comp) => {
                      const ComponentDef = getComponent(comp.componentId)
                      if (!ComponentDef) return null
                      const Component = ComponentDef.component
                      
                      return (
                        <div key={comp.id} className="relative group">
                          <Component {...comp.props} />
                          <button
                            onClick={() => removeComponentFromSlide(comp.id)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Add component placeholder */}
                  {currentSlide.components?.length === 0 && (
                    <div className="flex items-center justify-center h-64 border-2 border-dashed border-vexl-gray-700 rounded-lg">
                      <div className="text-center">
                        <Component className="w-12 h-12 text-vexl-gray-600 mx-auto mb-2" />
                        <p className="text-vexl-gray-400">Click "Components" to add interactive elements</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-4">
                <button
                  onClick={() => setShowComponentLibrary(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Component</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-vexl-gray-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No Slide Selected</h2>
                <p className="text-vexl-gray-400">
                  {currentDeck ? 'Select a slide or add a new one' : 'Create or select a deck to get started'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Component Library Panel */}
        {showComponentLibrary && (
          <div className="w-96 border-l border-vexl-gray-800 bg-vexl-gray-900/50 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Component Library</h3>
              <button
                onClick={() => setShowComponentLibrary(false)}
                className="p-1 hover:bg-vexl-gray-800 rounded"
              >
                <X className="w-5 h-5 text-vexl-gray-400" />
              </button>
            </div>
            
            {/* Category Filter */}
            <div className="mb-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg"
              >
                <option value="all">All Components</option>
                <option value="demo">Demos</option>
                <option value="visualization">Visualizations</option>
                <option value="calculator">Calculators</option>
                <option value="content">Content</option>
                <option value="interactive">Interactive</option>
              </select>
            </div>
            
            {/* Component List */}
            <div className="space-y-3">
              {componentRegistry
                .filter(comp => selectedCategory === 'all' || comp.category === selectedCategory)
                .map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => addComponentToSlide(comp.id)}
                    className="w-full text-left p-4 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 transition-colors group"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{comp.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{comp.name}</h4>
                        <p className="text-xs text-vexl-gray-400 mt-1">{comp.description}</p>
                        <span className="inline-block px-2 py-1 bg-vexl-gray-900 text-xs text-vexl-gray-300 rounded mt-2">
                          {comp.category}
                        </span>
                      </div>
                      <Plus className="w-5 h-5 text-vexl-gray-600 group-hover:text-vexl-yellow transition-colors" />
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