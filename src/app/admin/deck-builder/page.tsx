'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Save, Eye, Trash2, Copy, ChevronLeft, ChevronRight,
  Type, Image, List, Code, Palette, Layout, Download, Upload,
  Sparkles, Play, Edit3, X, Check, Settings, ArrowUp, ArrowDown,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import VexlLogo from '@/components/VexlLogo'

// Slide templates for quick start
const slideTemplates = {
  title: {
    name: 'Title Slide',
    icon: Type,
    structure: {
      title: 'Slide Title',
      subtitle: 'Slide Subtitle',
      description: 'Description text here'
    }
  },
  bullets: {
    name: 'Bullet Points',
    icon: List,
    structure: {
      title: 'Main Point',
      items: [
        { id: '1', title: 'Point 1', content: 'Explanation' },
        { id: '2', title: 'Point 2', content: 'Explanation' },
        { id: '3', title: 'Point 3', content: 'Explanation' }
      ]
    }
  },
  stats: {
    name: 'Statistics',
    icon: Sparkles,
    structure: {
      title: 'Key Metrics',
      stats: [
        { id: '1', value: '100%', label: 'Metric Label' },
        { id: '2', value: '50k', label: 'Another Metric' },
        { id: '3', value: '24/7', label: 'Third Metric' }
      ]
    }
  },
  comparison: {
    name: 'Comparison',
    icon: Layout,
    structure: {
      title: 'Compare Options',
      items: [
        { id: '1', title: 'Option A', content: 'Pros and details' },
        { id: '2', title: 'Option B', content: 'Pros and details' }
      ]
    }
  },
  process: {
    name: 'Process Steps',
    icon: ArrowRight,
    structure: {
      title: 'How It Works',
      items: [
        { id: '1', title: 'Step 1', content: 'First step description' },
        { id: '2', title: 'Step 2', content: 'Second step description' },
        { id: '3', title: 'Step 3', content: 'Third step description' },
        { id: '4', title: 'Step 4', content: 'Final step description' }
      ]
    }
  }
}

interface Slide {
  id: string
  name: string
  type: string
  content: any
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

export default function DeckBuilder() {
  const [decks, setDecks] = useState<Deck[]>([])
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null)
  const [currentSlide, setCurrentSlide] = useState<Slide | null>(null)
  const [isPreview, setIsPreview] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)
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
      content: JSON.parse(JSON.stringify(template.structure))
    }
    
    const updatedDeck = {
      ...currentDeck,
      slides: [...currentDeck.slides, newSlide]
    }
    setCurrentDeck(updatedDeck)
    setSlideOrder([...slideOrder, newSlide.id])
    setCurrentSlide(newSlide)
  }

  const updateSlideContent = (slideId: string, content: any) => {
    if (!currentDeck) return
    
    const updatedSlides = currentDeck.slides.map(slide => 
      slide.id === slideId ? { ...slide, content } : slide
    )
    
    const updatedDeck = { ...currentDeck, slides: updatedSlides }
    setCurrentDeck(updatedDeck)
    
    if (currentSlide?.id === slideId) {
      setCurrentSlide({ ...currentSlide, content })
    }
  }

  const deleteSlide = (slideId: string) => {
    if (!currentDeck) return
    
    const updatedSlides = currentDeck.slides.filter(s => s.id !== slideId)
    const updatedDeck = { ...currentDeck, slides: updatedSlides }
    setCurrentDeck(updatedDeck)
    setSlideOrder(slideOrder.filter(id => id !== slideId))
    
    if (currentSlide?.id === slideId) {
      setCurrentSlide(updatedSlides[0] || null)
    }
  }

  const moveSlide = (slideId: string, direction: 'up' | 'down') => {
    const index = slideOrder.indexOf(slideId)
    if (index === -1) return
    
    const newOrder = [...slideOrder]
    if (direction === 'up' && index > 0) {
      [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]]
    } else if (direction === 'down' && index < newOrder.length - 1) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]]
    }
    
    setSlideOrder(newOrder)
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

  const exportDeck = () => {
    if (!currentDeck) return
    
    const dataStr = JSON.stringify(currentDeck, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `${currentDeck.name.toLowerCase().replace(/ /g, '-')}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
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
                <h1 className="text-xl font-bold text-white">Deck Builder</h1>
                <p className="text-sm text-vexl-gray-400">Create and edit presentation decks</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentDeck && (
                <>
                  <button
                    onClick={() => setIsPreview(!isPreview)}
                    className="flex items-center space-x-2 px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </button>
                  <button
                    onClick={exportDeck}
                    className="flex items-center space-x-2 px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
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
                <input
                  type="text"
                  value={currentDeck.description}
                  onChange={(e) => setCurrentDeck({ ...currentDeck, description: e.target.value })}
                  className="w-full text-sm bg-transparent text-vexl-gray-400 border-b border-vexl-gray-800 focus:border-vexl-yellow outline-none pb-1"
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
                        className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-colors ${
                          currentSlide?.id === slide.id
                            ? 'bg-vexl-yellow/20 border border-vexl-yellow'
                            : 'bg-vexl-gray-800 hover:bg-vexl-gray-700'
                        }`}
                        onClick={() => setCurrentSlide(slide)}
                      >
                        <span className="text-xs text-vexl-gray-500 w-6">{index + 1}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">{slide.name}</p>
                          <p className="text-xs text-vexl-gray-400">{slide.type}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              moveSlide(slide.id, 'up')
                            }}
                            className="p-1 hover:bg-vexl-gray-600 rounded"
                          >
                            <ArrowUp className="w-3 h-3 text-vexl-gray-400" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              moveSlide(slide.id, 'down')
                            }}
                            className="p-1 hover:bg-vexl-gray-600 rounded"
                          >
                            <ArrowDown className="w-3 h-3 text-vexl-gray-400" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteSlide(slide.id)
                            }}
                            className="p-1 hover:bg-red-500/20 rounded"
                          >
                            <Trash2 className="w-3 h-3 text-red-400" />
                          </button>
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
              {/* Slide Editor Header */}
              <div className="mb-6">
                <input
                  type="text"
                  value={currentSlide.name}
                  onChange={(e) => {
                    const updated = { ...currentSlide, name: e.target.value }
                    setCurrentSlide(updated)
                    updateSlideContent(currentSlide.id, updated.content)
                  }}
                  className="text-2xl font-bold bg-transparent text-white border-b-2 border-vexl-gray-700 focus:border-vexl-yellow outline-none pb-2"
                />
              </div>

              {/* Content Editor */}
              <div className="bg-vexl-gray-900 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Content Editor</h3>
                
                {/* Title/Subtitle Fields */}
                {currentSlide.content.title !== undefined && (
                  <div className="mb-4">
                    <label className="block text-sm text-vexl-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={currentSlide.content.title}
                      onChange={(e) => updateSlideContent(currentSlide.id, {
                        ...currentSlide.content,
                        title: e.target.value
                      })}
                      className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                    />
                  </div>
                )}
                
                {currentSlide.content.subtitle !== undefined && (
                  <div className="mb-4">
                    <label className="block text-sm text-vexl-gray-400 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={currentSlide.content.subtitle}
                      onChange={(e) => updateSlideContent(currentSlide.id, {
                        ...currentSlide.content,
                        subtitle: e.target.value
                      })}
                      className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                    />
                  </div>
                )}
                
                {currentSlide.content.description !== undefined && (
                  <div className="mb-4">
                    <label className="block text-sm text-vexl-gray-400 mb-2">Description</label>
                    <textarea
                      value={currentSlide.content.description}
                      onChange={(e) => updateSlideContent(currentSlide.id, {
                        ...currentSlide.content,
                        description: e.target.value
                      })}
                      rows={3}
                      className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                    />
                  </div>
                )}
                
                {/* Items Editor */}
                {currentSlide.content.items && (
                  <div className="mb-4">
                    <label className="block text-sm text-vexl-gray-400 mb-2">Items</label>
                    <div className="space-y-3">
                      {currentSlide.content.items.map((item: any, index: number) => (
                        <div key={item.id} className="p-4 bg-vexl-gray-800 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <span className="text-vexl-yellow font-bold">{index + 1}.</span>
                            <div className="flex-1 space-y-2">
                              <input
                                type="text"
                                value={item.title || ''}
                                onChange={(e) => {
                                  const updatedItems = [...currentSlide.content.items]
                                  updatedItems[index] = { ...item, title: e.target.value }
                                  updateSlideContent(currentSlide.id, {
                                    ...currentSlide.content,
                                    items: updatedItems
                                  })
                                }}
                                placeholder="Item title"
                                className="w-full px-3 py-1 bg-vexl-gray-900 text-white rounded focus:outline-none focus:ring-1 focus:ring-vexl-yellow"
                              />
                              <textarea
                                value={item.content}
                                onChange={(e) => {
                                  const updatedItems = [...currentSlide.content.items]
                                  updatedItems[index] = { ...item, content: e.target.value }
                                  updateSlideContent(currentSlide.id, {
                                    ...currentSlide.content,
                                    items: updatedItems
                                  })
                                }}
                                placeholder="Item content"
                                rows={2}
                                className="w-full px-3 py-1 bg-vexl-gray-900 text-white rounded focus:outline-none focus:ring-1 focus:ring-vexl-yellow"
                              />
                            </div>
                            <button
                              onClick={() => {
                                const updatedItems = currentSlide.content.items.filter((_: any, i: number) => i !== index)
                                updateSlideContent(currentSlide.id, {
                                  ...currentSlide.content,
                                  items: updatedItems
                                })
                              }}
                              className="p-1 hover:bg-red-500/20 rounded"
                            >
                              <X className="w-4 h-4 text-red-400" />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const newItem = {
                            id: `item-${Date.now()}`,
                            title: 'New Item',
                            content: 'Item description'
                          }
                          updateSlideContent(currentSlide.id, {
                            ...currentSlide.content,
                            items: [...(currentSlide.content.items || []), newItem]
                          })
                        }}
                        className="w-full py-2 border-2 border-dashed border-vexl-gray-700 text-vexl-gray-400 rounded-lg hover:border-vexl-yellow hover:text-vexl-yellow transition-colors"
                      >
                        + Add Item
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Stats Editor */}
                {currentSlide.content.stats && (
                  <div className="mb-4">
                    <label className="block text-sm text-vexl-gray-400 mb-2">Statistics</label>
                    <div className="grid grid-cols-3 gap-3">
                      {currentSlide.content.stats.map((stat: any, index: number) => (
                        <div key={stat.id} className="p-4 bg-vexl-gray-800 rounded-lg">
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const updatedStats = [...currentSlide.content.stats]
                              updatedStats[index] = { ...stat, value: e.target.value }
                              updateSlideContent(currentSlide.id, {
                                ...currentSlide.content,
                                stats: updatedStats
                              })
                            }}
                            placeholder="Value"
                            className="w-full text-2xl font-bold bg-transparent text-vexl-yellow border-b border-vexl-gray-700 focus:border-vexl-yellow outline-none mb-2"
                          />
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const updatedStats = [...currentSlide.content.stats]
                              updatedStats[index] = { ...stat, label: e.target.value }
                              updateSlideContent(currentSlide.id, {
                                ...currentSlide.content,
                                stats: updatedStats
                              })
                            }}
                            placeholder="Label"
                            className="w-full text-sm bg-transparent text-vexl-gray-400 outline-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Live Preview */}
              <div className="bg-vexl-black rounded-xl p-8 border-2 border-vexl-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Live Preview</h3>
                <div className="bg-gradient-to-br from-vexl-gray-900 to-vexl-black rounded-lg p-12 min-h-[400px]">
                  {/* Render preview based on slide type */}
                  <div className="text-center">
                    {currentSlide.content.title && (
                      <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Monument Extended' }}>
                        {currentSlide.content.title}
                      </h2>
                    )}
                    {currentSlide.content.subtitle && (
                      <p className="text-xl text-vexl-yellow mb-6">
                        {currentSlide.content.subtitle}
                      </p>
                    )}
                    {currentSlide.content.description && (
                      <p className="text-lg text-vexl-gray-300 mb-8 max-w-3xl mx-auto">
                        {currentSlide.content.description}
                      </p>
                    )}
                    
                    {/* Render items */}
                    {currentSlide.content.items && (
                      <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                        {currentSlide.content.items.map((item: any) => (
                          <div key={item.id} className="p-6 bg-vexl-gray-900/50 rounded-lg">
                            {item.title && (
                              <h3 className="text-xl font-bold text-white mb-2">
                                <span className="text-vexl-yellow mr-2">→</span>
                                {item.title}
                              </h3>
                            )}
                            <p className="text-vexl-gray-300">{item.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* Render stats */}
                    {currentSlide.content.stats && (
                      <div className="flex justify-center space-x-8">
                        {currentSlide.content.stats.map((stat: any) => (
                          <div key={stat.id} className="text-center">
                            <div className="text-4xl font-bold text-vexl-yellow mb-2">
                              {stat.value}
                            </div>
                            <div className="text-sm text-vexl-gray-400">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Sparkles className="w-16 h-16 text-vexl-gray-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">No Slide Selected</h2>
                <p className="text-vexl-gray-400">
                  {currentDeck ? 'Select a slide from the sidebar or add a new one' : 'Create or select a deck to get started'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Preview Panel */}
        {isPreview && currentDeck && (
          <div className="w-96 border-l border-vexl-gray-800 bg-vexl-gray-900/50 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Deck Preview</h3>
              <button
                onClick={() => setIsPreview(false)}
                className="p-1 hover:bg-vexl-gray-800 rounded"
              >
                <X className="w-5 h-5 text-vexl-gray-400" />
              </button>
            </div>
            
            <div className="space-y-4">
              {slideOrder.map((slideId, index) => {
                const slide = currentDeck.slides.find(s => s.id === slideId)
                if (!slide) return null
                
                return (
                  <div
                    key={slide.id}
                    className="p-4 bg-vexl-gray-800 rounded-lg cursor-pointer hover:bg-vexl-gray-700"
                    onClick={() => setCurrentSlide(slide)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-vexl-gray-500">Slide {index + 1}</span>
                      <span className="text-xs px-2 py-1 bg-vexl-gray-900 rounded text-vexl-gray-400">
                        {slide.type}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-white">
                      {slide.content.title || slide.name}
                    </h4>
                  </div>
                )
              })}
            </div>
            
            <div className="mt-6 pt-6 border-t border-vexl-gray-800">
              <Link
                href={`/workshop?deck=${currentDeck.id}`}
                target="_blank"
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90 font-semibold"
              >
                <Play className="w-4 h-4" />
                <span>Test Presentation</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}