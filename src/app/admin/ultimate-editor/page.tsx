'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Plus, Copy, Trash2, Save, Eye, Edit2, 
  ChevronLeft, ChevronRight, Layers, Type,
  Image, BarChart, Grid, Play, Settings,
  Bold, Italic, AlignLeft, AlignCenter, AlignRight,
  Palette, Download, Upload, Search, Maximize
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'

// Define slide types
interface Slide {
  id: string
  name: string
  type: 'existing' | 'custom'
  content: any
  thumbnail?: string
  order: number
}

export default function UltimateEditor() {
  const router = useRouter()
  const [slides, setSlides] = useState<Slide[]>([])
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [isEditing, setIsEditing] = useState(true)
  const [isPreviewing, setIsPreviewing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const editorRef = useRef<HTMLDivElement>(null)

  // Load all slides on mount
  useEffect(() => {
    loadSlides()
  }, [])

  const loadSlides = async () => {
    try {
      const response = await fetch('/api/admin/slides', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        
        // Load existing sections as slides
        const existingSlides: Slide[] = [
          { id: 'hook', name: 'KYC is Killing Bitcoin', type: 'existing', content: data.content?.hookSection || {}, order: 0 },
          { id: 'pitch', name: 'Your Social Network', type: 'existing', content: data.content?.pitchSection || {}, order: 1 },
          { id: 'trust', name: 'Trust > Ratings', type: 'existing', content: data.content?.trustSection || {}, order: 2 },
          { id: 'privacy', name: 'Privacy First', type: 'existing', content: data.content?.privacySection || {}, order: 3 },
          { id: 'profile', name: 'Profile Setup', type: 'existing', content: data.content?.profileSetupSection || {}, order: 4 },
          { id: 'offers', name: 'Finding Offers', type: 'existing', content: data.content?.findingOffersSection || {}, order: 5 },
          { id: 'trading', name: 'Contact Trading', type: 'existing', content: data.content?.contactTradingSection || {}, order: 6 },
          { id: 'clubs', name: 'Vexl Clubs', type: 'existing', content: data.content?.clubsSection || {}, order: 7 },
          { id: 'demo', name: 'Live Demo', type: 'existing', content: data.content?.demoSection || {}, order: 8 },
          { id: 'vision', name: 'Your Network', type: 'existing', content: data.content?.visionSection || {}, order: 9 },
          { id: 'start', name: 'Get Started', type: 'existing', content: data.content?.getStartedSection || {}, order: 10 }
        ]
        
        setSlides(existingSlides)
      }
    } catch (error) {
      console.error('Error loading slides:', error)
    }
  }

  const saveSlide = async (slide: Slide) => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/admin/slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify({
          slideId: slide.id,
          content: slide.content
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save')
      }

      // Auto-save notification
      showNotification('Saved!')
    } catch (error) {
      console.error('Error saving:', error)
      showNotification('Error saving', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    // Simple notification (you can enhance this)
    const notification = document.createElement('div')
    notification.className = `fixed bottom-4 right-4 px-4 py-2 rounded-lg text-white ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    } z-50 animate-pulse`
    notification.textContent = message
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 2000)
  }

  const createNewSlide = () => {
    const newSlide: Slide = {
      id: `custom_${Date.now()}`,
      name: 'New Slide',
      type: 'custom',
      content: {
        title: 'New Slide Title',
        subtitle: 'Add your subtitle here',
        description: 'Click anywhere to edit',
        backgroundColor: '#000000',
        textColor: '#FFFFFF'
      },
      order: slides.length
    }
    setSlides([...slides, newSlide])
    setCurrentSlideIndex(slides.length)
  }

  const duplicateSlide = (index: number) => {
    const slide = slides[index]
    const duplicated: Slide = {
      ...slide,
      id: `${slide.id}_copy_${Date.now()}`,
      name: `${slide.name} (Copy)`,
      order: slides.length
    }
    setSlides([...slides, duplicated])
  }

  const deleteSlide = (index: number) => {
    if (slides.length === 1) {
      showNotification('Cannot delete last slide', 'error')
      return
    }
    const newSlides = slides.filter((_, i) => i !== index)
    setSlides(newSlides)
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1)
    }
  }

  const updateSlideContent = (key: string, value: any) => {
    const updatedSlides = [...slides]
    updatedSlides[currentSlideIndex].content[key] = value
    setSlides(updatedSlides)
    
    // Auto-save after 1 second
    setTimeout(() => saveSlide(updatedSlides[currentSlideIndex]), 1000)
  }

  const currentSlide = slides[currentSlideIndex]

  if (!currentSlide) {
    return (
      <div className="min-h-screen bg-vexl-black flex items-center justify-center">
        <button
          onClick={createNewSlide}
          className="flex items-center space-x-2 px-6 py-3 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90"
        >
          <Plus className="w-5 h-5" />
          <span>Create Your First Slide</span>
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vexl-black flex">
      {/* Sidebar - Slide List */}
      <div className="w-64 bg-vexl-gray-900 border-r border-vexl-gray-800 flex flex-col">
        <div className="p-4 border-b border-vexl-gray-800">
          <VexlLogo />
          <h2 className="text-white font-semibold mt-2">Slide Editor</h2>
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vexl-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search slides..."
              className="w-full pl-10 pr-3 py-2 bg-vexl-gray-800 text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
            />
          </div>
        </div>

        {/* Slides List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {slides
            .filter(slide => slide.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => setCurrentSlideIndex(index)}
              className={`
                relative group cursor-pointer rounded-lg p-3 transition-all
                ${currentSlideIndex === index 
                  ? 'bg-vexl-yellow text-black' 
                  : 'bg-vexl-gray-800 text-white hover:bg-vexl-gray-700'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{slide.name}</div>
                  <div className="text-xs opacity-60">Slide {index + 1}</div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      duplicateSlide(index)
                    }}
                    className="p-1 hover:bg-vexl-gray-600 rounded"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteSlide(index)
                    }}
                    className="p-1 hover:bg-red-600 rounded"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Slide Button */}
        <div className="p-3 border-t border-vexl-gray-800">
          <button
            onClick={createNewSlide}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90"
          >
            <Plus className="w-4 h-4" />
            <span>New Slide</span>
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-vexl-gray-900 border-b border-vexl-gray-800 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Text Formatting */}
              <div className="flex items-center space-x-1">
                <button className="p-2 hover:bg-vexl-gray-800 rounded">
                  <Bold className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 hover:bg-vexl-gray-800 rounded">
                  <Italic className="w-4 h-4 text-white" />
                </button>
                <div className="w-px h-6 bg-vexl-gray-700" />
                <button className="p-2 hover:bg-vexl-gray-800 rounded">
                  <AlignLeft className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 hover:bg-vexl-gray-800 rounded">
                  <AlignCenter className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 hover:bg-vexl-gray-800 rounded">
                  <AlignRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Insert Elements */}
              <div className="flex items-center space-x-1">
                <button className="p-2 hover:bg-vexl-gray-800 rounded" title="Add Text">
                  <Type className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 hover:bg-vexl-gray-800 rounded" title="Add Image">
                  <Image className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 hover:bg-vexl-gray-800 rounded" title="Add Chart">
                  <BarChart className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 hover:bg-vexl-gray-800 rounded" title="Add Layout">
                  <Grid className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Preview/Edit Toggle */}
              <button
                onClick={() => setIsPreviewing(!isPreviewing)}
                className={`flex items-center space-x-1 px-3 py-1 rounded ${
                  isPreviewing ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'
                }`}
              >
                {isPreviewing ? <Eye className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                <span className="text-sm">{isPreviewing ? 'Preview' : 'Edit'}</span>
              </button>

              {/* Present Button */}
              <button
                onClick={() => router.push('/?section=' + currentSlideIndex)}
                className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Play className="w-4 h-4" />
                <span className="text-sm">Present</span>
              </button>

              {/* Save Status */}
              <div className="flex items-center space-x-1 px-3 py-1">
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-vexl-yellow border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-vexl-gray-400">Saving...</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-xs text-vexl-gray-400">Saved</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas/Editor */}
        <div className="flex-1 overflow-hidden bg-black">
          <div className="h-full flex items-center justify-center p-8">
            <div 
              ref={editorRef}
              className="w-full max-w-6xl mx-auto bg-vexl-black rounded-lg shadow-2xl"
              style={{ aspectRatio: '16/9' }}
            >
              {/* Editable Slide Content */}
              <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                <h1
                  contentEditable={!isPreviewing}
                  suppressContentEditableWarning
                  onBlur={(e) => updateSlideContent('title', e.currentTarget.textContent)}
                  className="text-6xl font-bold text-white mb-4 outline-none focus:ring-2 focus:ring-vexl-yellow rounded px-2"
                  style={{ fontFamily: 'Monument Extended' }}
                >
                  {currentSlide.content.title || 'Click to edit title'}
                </h1>
                
                <h2
                  contentEditable={!isPreviewing}
                  suppressContentEditableWarning
                  onBlur={(e) => updateSlideContent('subtitle', e.currentTarget.textContent)}
                  className="text-2xl text-vexl-gray-400 mb-6 outline-none focus:ring-2 focus:ring-vexl-yellow rounded px-2"
                >
                  {currentSlide.content.subtitle || 'Click to edit subtitle'}
                </h2>

                <p
                  contentEditable={!isPreviewing}
                  suppressContentEditableWarning
                  onBlur={(e) => updateSlideContent('description', e.currentTarget.textContent)}
                  className="text-lg text-white max-w-3xl outline-none focus:ring-2 focus:ring-vexl-yellow rounded px-2"
                >
                  {currentSlide.content.description || 'Click to edit description'}
                </p>

                {/* Stats if they exist */}
                {currentSlide.content.stats && (
                  <div className="grid grid-cols-3 gap-6 mt-8">
                    {currentSlide.content.stats.map((stat: any, index: number) => (
                      <div key={index} className="bg-vexl-yellow text-black p-6 rounded-lg">
                        <div
                          contentEditable={!isPreviewing}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newStats = [...currentSlide.content.stats]
                            newStats[index].value = e.currentTarget.textContent
                            updateSlideContent('stats', newStats)
                          }}
                          className="text-3xl font-bold outline-none"
                        >
                          {stat.value}
                        </div>
                        <div
                          contentEditable={!isPreviewing}
                          suppressContentEditableWarning
                          onBlur={(e) => {
                            const newStats = [...currentSlide.content.stats]
                            newStats[index].label = e.currentTarget.textContent
                            updateSlideContent('stats', newStats)
                          }}
                          className="text-sm mt-2 outline-none"
                        >
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

        {/* Bottom Navigation */}
        <div className="bg-vexl-gray-900 border-t border-vexl-gray-800 px-4 py-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-vexl-gray-400">
                Slide {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>

            <button
              onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 disabled:opacity-50"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}