'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, Save, Download, ChevronLeft, Eye, Trash2, Copy,
  Type, Image, Layout, FileText, Grid, Play, Settings,
  ArrowUp, ArrowDown, Palette, Bold, Italic, AlignLeft,
  AlignCenter, AlignRight, List, FileDown, FilePlus,
  Monitor, Smartphone, Tablet
} from 'lucide-react'
import Link from 'next/link'
import VexlLogo from '@/components/VexlLogo'
import { brandAssets, getAssetsByCategory } from '@/lib/brandAssets'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Standard presentation dimensions
const SLIDE_DIMENSIONS = {
  width: 1920,
  height: 1080,
  aspectRatio: '16 / 9'
}

// Vexl brand colors
const VEXL_COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  yellow: '#FCD34D',
  green: '#10B981',
  blue: '#3B82F6',
  gray: '#6B7280',
  darkGray: '#1F2937',
  lightGray: '#D1D5DB'
}

// Slide templates
const slideTemplates = {
  title: {
    name: 'Title Slide',
    icon: FileText,
    layout: {
      backgroundColor: VEXL_COLORS.black,
      elements: [
        {
          type: 'text',
          content: 'Presentation Title',
          style: 'title',
          position: { x: 50, y: 40 },
          align: 'center',
          color: VEXL_COLORS.white,
          fontSize: 72
        },
        {
          type: 'text',
          content: 'Subtitle or Speaker Name',
          style: 'subtitle',
          position: { x: 50, y: 55 },
          align: 'center',
          color: VEXL_COLORS.yellow,
          fontSize: 36
        }
      ]
    }
  },
  content: {
    name: 'Content Slide',
    icon: Layout,
    layout: {
      backgroundColor: VEXL_COLORS.black,
      elements: [
        {
          type: 'text',
          content: 'Slide Title',
          style: 'title',
          position: { x: 50, y: 15 },
          align: 'center',
          color: VEXL_COLORS.yellow,
          fontSize: 48
        },
        {
          type: 'text',
          content: '• First point\n• Second point\n• Third point',
          style: 'body',
          position: { x: 50, y: 45 },
          align: 'left',
          color: VEXL_COLORS.white,
          fontSize: 32
        }
      ]
    }
  },
  twoColumn: {
    name: 'Two Column',
    icon: Grid,
    layout: {
      backgroundColor: VEXL_COLORS.black,
      elements: [
        {
          type: 'text',
          content: 'Section Title',
          style: 'title',
          position: { x: 50, y: 15 },
          align: 'center',
          color: VEXL_COLORS.yellow,
          fontSize: 48
        },
        {
          type: 'text',
          content: 'Left Column\n\n• Point 1\n• Point 2\n• Point 3',
          style: 'body',
          position: { x: 25, y: 45 },
          align: 'left',
          color: VEXL_COLORS.white,
          fontSize: 28
        },
        {
          type: 'text',
          content: 'Right Column\n\n• Point A\n• Point B\n• Point C',
          style: 'body',
          position: { x: 75, y: 45 },
          align: 'left',
          color: VEXL_COLORS.white,
          fontSize: 28
        }
      ]
    }
  },
  imageText: {
    name: 'Image + Text',
    icon: Image,
    layout: {
      backgroundColor: VEXL_COLORS.black,
      elements: [
        {
          type: 'text',
          content: 'Title with Visual',
          style: 'title',
          position: { x: 50, y: 15 },
          align: 'center',
          color: VEXL_COLORS.yellow,
          fontSize: 48
        },
        {
          type: 'placeholder',
          content: 'Image Placeholder',
          position: { x: 25, y: 50 },
          width: 40,
          height: 50,
          backgroundColor: VEXL_COLORS.darkGray
        },
        {
          type: 'text',
          content: 'Description text goes here.\n\nKey points about the image or concept being presented.',
          style: 'body',
          position: { x: 75, y: 50 },
          align: 'left',
          color: VEXL_COLORS.white,
          fontSize: 28
        }
      ]
    }
  },
  quote: {
    name: 'Quote',
    icon: Type,
    layout: {
      backgroundColor: VEXL_COLORS.black,
      elements: [
        {
          type: 'text',
          content: '"Bitcoin is a technological tour de force."',
          style: 'title',
          position: { x: 50, y: 40 },
          align: 'center',
          color: VEXL_COLORS.yellow,
          fontSize: 56,
          italic: true
        },
        {
          type: 'text',
          content: '— Bill Gates',
          style: 'subtitle',
          position: { x: 50, y: 55 },
          align: 'center',
          color: VEXL_COLORS.white,
          fontSize: 32
        }
      ]
    }
  },
  ending: {
    name: 'Thank You',
    icon: Play,
    layout: {
      backgroundColor: VEXL_COLORS.black,
      elements: [
        {
          type: 'text',
          content: 'Thank You',
          style: 'title',
          position: { x: 50, y: 35 },
          align: 'center',
          color: VEXL_COLORS.yellow,
          fontSize: 72
        },
        {
          type: 'text',
          content: 'Questions?',
          style: 'subtitle',
          position: { x: 50, y: 50 },
          align: 'center',
          color: VEXL_COLORS.white,
          fontSize: 48
        },
        {
          type: 'text',
          content: 'contact@vexl.it\nwww.vexl.it',
          style: 'body',
          position: { x: 50, y: 65 },
          align: 'center',
          color: VEXL_COLORS.lightGray,
          fontSize: 24
        }
      ]
    }
  }
}

interface SlideElement {
  id: string
  type: 'text' | 'image' | 'shape' | 'placeholder'
  content: string
  position: { x: number; y: number }
  width?: number
  height?: number
  style?: string
  fontSize?: number
  fontWeight?: string
  color?: string
  backgroundColor?: string
  align?: 'left' | 'center' | 'right'
  italic?: boolean
}

interface Slide {
  id: string
  name: string
  backgroundColor: string
  elements: SlideElement[]
}

interface Presentation {
  id: string
  name: string
  slides: Slide[]
  createdAt: Date
  updatedAt: Date
}

export default function KeynoteBuilder() {
  const [presentation, setPresentation] = useState<Presentation>({
    id: `pres-${Date.now()}`,
    name: 'New Keynote Presentation',
    slides: [],
    createdAt: new Date(),
    updatedAt: new Date()
  })
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isPreview, setIsPreview] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Initialize with a title slide
  useEffect(() => {
    if (presentation.slides.length === 0) {
      addSlide('title')
    }
  }, [])

  const currentSlide = presentation.slides[currentSlideIndex]

  const addSlide = (templateType: keyof typeof slideTemplates) => {
    const template = slideTemplates[templateType]
    const newSlide: Slide = {
      id: `slide-${Date.now()}`,
      name: `Slide ${presentation.slides.length + 1}`,
      backgroundColor: template.layout.backgroundColor,
      elements: template.layout.elements.map((el, index) => ({
        ...el,
        id: `element-${Date.now()}-${index}`
      }))
    }
    
    setPresentation(prev => ({
      ...prev,
      slides: [...prev.slides, newSlide],
      updatedAt: new Date()
    }))
    
    setCurrentSlideIndex(presentation.slides.length)
  }

  const duplicateSlide = (index: number) => {
    const slideToDuplicate = presentation.slides[index]
    const newSlide: Slide = {
      ...slideToDuplicate,
      id: `slide-${Date.now()}`,
      name: `${slideToDuplicate.name} (Copy)`,
      elements: slideToDuplicate.elements.map(el => ({
        ...el,
        id: `element-${Date.now()}-${Math.random()}`
      }))
    }
    
    const newSlides = [...presentation.slides]
    newSlides.splice(index + 1, 0, newSlide)
    
    setPresentation(prev => ({
      ...prev,
      slides: newSlides,
      updatedAt: new Date()
    }))
  }

  const deleteSlide = (index: number) => {
    if (presentation.slides.length === 1) {
      alert('Cannot delete the last slide')
      return
    }
    
    const newSlides = presentation.slides.filter((_, i) => i !== index)
    setPresentation(prev => ({
      ...prev,
      slides: newSlides,
      updatedAt: new Date()
    }))
    
    if (currentSlideIndex >= newSlides.length) {
      setCurrentSlideIndex(newSlides.length - 1)
    }
  }

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    const newSlides = [...presentation.slides]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    
    if (targetIndex < 0 || targetIndex >= newSlides.length) return
    
    [newSlides[index], newSlides[targetIndex]] = [newSlides[targetIndex], newSlides[index]]
    
    setPresentation(prev => ({
      ...prev,
      slides: newSlides,
      updatedAt: new Date()
    }))
    
    if (currentSlideIndex === index) {
      setCurrentSlideIndex(targetIndex)
    } else if (currentSlideIndex === targetIndex) {
      setCurrentSlideIndex(index)
    }
  }

  const updateElement = (elementId: string, updates: Partial<SlideElement>) => {
    if (!currentSlide) return
    
    const newElements = currentSlide.elements.map(el =>
      el.id === elementId ? { ...el, ...updates } : el
    )
    
    const newSlides = presentation.slides.map((slide, index) =>
      index === currentSlideIndex 
        ? { ...slide, elements: newElements }
        : slide
    )
    
    setPresentation(prev => ({
      ...prev,
      slides: newSlides,
      updatedAt: new Date()
    }))
  }

  const addTextElement = () => {
    if (!currentSlide) return
    
    const newElement: SlideElement = {
      id: `element-${Date.now()}`,
      type: 'text',
      content: 'New Text',
      position: { x: 50, y: 50 },
      fontSize: 32,
      color: VEXL_COLORS.white,
      align: 'center'
    }
    
    const newSlides = presentation.slides.map((slide, index) =>
      index === currentSlideIndex 
        ? { ...slide, elements: [...slide.elements, newElement] }
        : slide
    )
    
    setPresentation(prev => ({
      ...prev,
      slides: newSlides,
      updatedAt: new Date()
    }))
  }

  const deleteElement = (elementId: string) => {
    if (!currentSlide) return
    
    const newElements = currentSlide.elements.filter(el => el.id !== elementId)
    
    const newSlides = presentation.slides.map((slide, index) =>
      index === currentSlideIndex 
        ? { ...slide, elements: newElements }
        : slide
    )
    
    setPresentation(prev => ({
      ...prev,
      slides: newSlides,
      updatedAt: new Date()
    }))
    
    setSelectedElement(null)
  }

  const exportToPDF = async () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [SLIDE_DIMENSIONS.width / 2, SLIDE_DIMENSIONS.height / 2]
    })
    
    for (let i = 0; i < presentation.slides.length; i++) {
      setCurrentSlideIndex(i)
      await new Promise(resolve => setTimeout(resolve, 500)) // Wait for render
      
      if (canvasRef.current) {
        const canvas = await html2canvas(canvasRef.current, {
          useCORS: true,
          logging: false
        })
        
        const imgData = canvas.toDataURL('image/png')
        
        if (i > 0) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, 0, SLIDE_DIMENSIONS.width / 2, SLIDE_DIMENSIONS.height / 2)
      }
    }
    
    pdf.save(`${presentation.name}.pdf`)
  }

  const savePresentation = async () => {
    try {
      const token = localStorage.getItem('vexl-admin-token') || localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/keynotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(presentation)
      })
      
      if (response.ok) {
        alert('Presentation saved successfully!')
      }
    } catch (error) {
      console.error('Failed to save presentation:', error)
      alert('Failed to save presentation')
    }
  }

  const getScaledDimensions = () => {
    switch (viewMode) {
      case 'mobile':
        return { width: 375, height: 211 } // 16:9 aspect ratio
      case 'tablet':
        return { width: 768, height: 432 }
      default:
        return { width: 960, height: 540 } // Desktop preview size
    }
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
              <input
                type="text"
                value={presentation.name}
                onChange={(e) => setPresentation(prev => ({ ...prev, name: e.target.value }))}
                className="text-xl font-bold bg-transparent text-white outline-none"
                placeholder="Presentation Name"
              />
              <p className="text-sm text-vexl-gray-400">
                Standard Keynote Presentation • {presentation.slides.length} slides
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* View Mode Selector */}
            <div className="flex items-center space-x-1 bg-vexl-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded ${viewMode === 'desktop' ? 'bg-vexl-yellow text-black' : 'text-white hover:bg-vexl-gray-700'}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded ${viewMode === 'tablet' ? 'bg-vexl-yellow text-black' : 'text-white hover:bg-vexl-gray-700'}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded ${viewMode === 'mobile' ? 'bg-vexl-yellow text-black' : 'text-white hover:bg-vexl-gray-700'}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={addTextElement}
              className="flex items-center space-x-2 px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700"
            >
              <Type className="w-4 h-4" />
              <span>Add Text</span>
            </button>
            
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="flex items-center space-x-2 px-4 py-2 bg-vexl-green text-black rounded-lg hover:bg-vexl-green/90"
            >
              <Eye className="w-4 h-4" />
              <span>{isPreview ? 'Edit' : 'Preview'}</span>
            </button>
            
            <button
              onClick={exportToPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-vexl-blue text-white rounded-lg hover:bg-vexl-blue/90"
            >
              <FileDown className="w-4 h-4" />
              <span>Export PDF</span>
            </button>
            
            <button
              onClick={savePresentation}
              className="flex items-center space-x-2 px-4 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90 font-semibold"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar - Slides List */}
        <div className="w-80 border-r border-vexl-gray-800 bg-vexl-gray-900/50 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-vexl-gray-400 mb-3">SLIDES</h3>
            
            {/* Slide Templates */}
            <div className="mb-6">
              <p className="text-xs text-vexl-gray-500 mb-2">Add New Slide</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(slideTemplates).map(([key, template]) => (
                  <button
                    key={key}
                    onClick={() => addSlide(key as keyof typeof slideTemplates)}
                    className="flex flex-col items-center p-3 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 transition-colors"
                  >
                    <template.icon className="w-5 h-5 text-vexl-yellow mb-1" />
                    <span className="text-xs text-white">{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Slides List */}
            <div className="space-y-2">
              {presentation.slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`group relative p-3 rounded-lg cursor-pointer transition-colors ${
                    currentSlideIndex === index
                      ? 'bg-vexl-yellow/20 border border-vexl-yellow'
                      : 'bg-vexl-gray-800 hover:bg-vexl-gray-700'
                  }`}
                  onClick={() => setCurrentSlideIndex(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {index + 1}. {slide.name}
                      </p>
                      <p className="text-xs text-vexl-gray-400">
                        {slide.elements.length} elements
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveSlide(index, 'up')
                        }}
                        className="p-1 hover:bg-vexl-gray-600 rounded"
                        disabled={index === 0}
                      >
                        <ArrowUp className="w-3 h-3 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          moveSlide(index, 'down')
                        }}
                        className="p-1 hover:bg-vexl-gray-600 rounded"
                        disabled={index === presentation.slides.length - 1}
                      >
                        <ArrowDown className="w-3 h-3 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          duplicateSlide(index)
                        }}
                        className="p-1 hover:bg-vexl-gray-600 rounded"
                      >
                        <Copy className="w-3 h-3 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteSlide(index)
                        }}
                        className="p-1 hover:bg-red-600 rounded"
                      >
                        <Trash2 className="w-3 h-3 text-red-400" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Slide Thumbnail */}
                  <div 
                    className="mt-2 rounded border border-vexl-gray-700"
                    style={{
                      aspectRatio: SLIDE_DIMENSIONS.aspectRatio,
                      backgroundColor: slide.backgroundColor,
                      padding: '8px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {slide.elements.map(element => (
                      <div
                        key={element.id}
                        style={{
                          position: 'absolute',
                          left: `${element.position.x}%`,
                          top: `${element.position.y}%`,
                          transform: 'translate(-50%, -50%) scale(0.15)',
                          color: element.color || VEXL_COLORS.white,
                          fontSize: '8px',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {element.type === 'text' && element.content.substring(0, 20)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Canvas - Slide Editor */}
        <div className="flex-1 overflow-hidden bg-vexl-gray-950 flex items-center justify-center p-8">
          {currentSlide ? (
            <div className="relative">
              {/* Canvas */}
              <div
                ref={canvasRef}
                className="relative shadow-2xl"
                style={{
                  ...getScaledDimensions(),
                  backgroundColor: currentSlide.backgroundColor,
                  aspectRatio: SLIDE_DIMENSIONS.aspectRatio
                }}
              >
                {currentSlide.elements.map(element => {
                  const scaledDimensions = getScaledDimensions()
                  const scale = scaledDimensions.width / SLIDE_DIMENSIONS.width
                  
                  return (
                    <div
                      key={element.id}
                      className={`absolute ${!isPreview && selectedElement === element.id ? 'ring-2 ring-vexl-yellow' : ''} ${!isPreview ? 'cursor-move hover:ring-2 hover:ring-vexl-yellow/50' : ''}`}
                      style={{
                        left: `${element.position.x}%`,
                        top: `${element.position.y}%`,
                        transform: 'translate(-50%, -50%)',
                        fontSize: element.fontSize ? `${element.fontSize * scale}px` : undefined,
                        color: element.color,
                        textAlign: element.align,
                        fontWeight: element.fontWeight,
                        fontStyle: element.italic ? 'italic' : 'normal',
                        fontFamily: element.style === 'title' ? 'Monument Extended' : 'inherit',
                        backgroundColor: element.backgroundColor,
                        padding: element.type === 'placeholder' ? '20px' : undefined,
                        width: element.width ? `${element.width}%` : undefined,
                        height: element.height ? `${element.height}%` : undefined,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: element.type === 'placeholder' ? '8px' : undefined
                      }}
                      onClick={() => !isPreview && setSelectedElement(element.id)}
                      contentEditable={!isPreview && element.type === 'text'}
                      suppressContentEditableWarning
                      onBlur={(e) => {
                        if (element.type === 'text') {
                          updateElement(element.id, { content: e.currentTarget.textContent || '' })
                        }
                      }}
                    >
                      {element.type === 'text' && element.content}
                      {element.type === 'placeholder' && (
                        <div className="text-vexl-gray-500 text-center">
                          {element.content}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              
              {/* Element Controls */}
              {!isPreview && selectedElement && (
                <div className="absolute -right-72 top-0 w-64 bg-vexl-gray-900 rounded-lg p-4 shadow-xl">
                  <h4 className="text-sm font-semibold text-white mb-3">Element Properties</h4>
                  
                  {currentSlide.elements.find(el => el.id === selectedElement)?.type === 'text' && (
                    <>
                      <div className="mb-3">
                        <label className="text-xs text-vexl-gray-400 mb-1 block">Font Size</label>
                        <input
                          type="number"
                          value={currentSlide.elements.find(el => el.id === selectedElement)?.fontSize || 32}
                          onChange={(e) => updateElement(selectedElement, { fontSize: parseInt(e.target.value) })}
                          className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="text-xs text-vexl-gray-400 mb-1 block">Color</label>
                        <div className="grid grid-cols-4 gap-2">
                          {Object.entries(VEXL_COLORS).map(([name, color]) => (
                            <button
                              key={name}
                              onClick={() => updateElement(selectedElement, { color })}
                              className="w-full h-8 rounded border-2 border-vexl-gray-700 hover:border-white"
                              style={{ backgroundColor: color }}
                              title={name}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <label className="text-xs text-vexl-gray-400 mb-1 block">Alignment</label>
                        <div className="flex gap-1">
                          <button
                            onClick={() => updateElement(selectedElement, { align: 'left' })}
                            className={`flex-1 p-1 rounded ${
                              currentSlide.elements.find(el => el.id === selectedElement)?.align === 'left'
                                ? 'bg-vexl-yellow text-black'
                                : 'bg-vexl-gray-800 text-white'
                            }`}
                          >
                            <AlignLeft className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            onClick={() => updateElement(selectedElement, { align: 'center' })}
                            className={`flex-1 p-1 rounded ${
                              currentSlide.elements.find(el => el.id === selectedElement)?.align === 'center'
                                ? 'bg-vexl-yellow text-black'
                                : 'bg-vexl-gray-800 text-white'
                            }`}
                          >
                            <AlignCenter className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            onClick={() => updateElement(selectedElement, { align: 'right' })}
                            className={`flex-1 p-1 rounded ${
                              currentSlide.elements.find(el => el.id === selectedElement)?.align === 'right'
                                ? 'bg-vexl-yellow text-black'
                                : 'bg-vexl-gray-800 text-white'
                            }`}
                          >
                            <AlignRight className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => deleteElement(selectedElement)}
                        className="w-full px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Delete Element
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <FilePlus className="w-16 h-16 text-vexl-gray-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Slides Yet</h2>
              <p className="text-vexl-gray-400 mb-4">
                Choose a template to create your first slide
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}