'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Edit3, Save, Eye, EyeOff, Type, Image, Layout, 
  ChevronLeft, ChevronRight, Settings, Plus, Trash2,
  Move, Copy, Palette, Code, Monitor, Smartphone,
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'
import dynamic from 'next/dynamic'

// Import actual workshop sections
const HookSection = dynamic(() => import('@/components/sections/HookSection'))
const PitchSection = dynamic(() => import('@/components/sections/PitchSection'))
const TrustSection = dynamic(() => import('@/components/sections/TrustSection'))
const PrivacySection = dynamic(() => import('@/components/sections/PrivacySection'))
const ProfileSetupSection = dynamic(() => import('@/components/sections/ProfileSetupSection'))
const FindingOffersSection = dynamic(() => import('@/components/sections/FindingOffersSection'))
const ContactTradingSection = dynamic(() => import('@/components/sections/ContactTradingSection'))
const ClubsSection = dynamic(() => import('@/components/sections/ClubsSection'))
const DemoSection = dynamic(() => import('@/components/sections/DemoSection'))
const VisionSection = dynamic(() => import('@/components/sections/VisionSection'))
const GetStartedSection = dynamic(() => import('@/components/sections/GetStartedSection'))

// Section configuration with editable content
interface SectionConfig {
  id: string
  name: string
  component: any
  duration: number
  content: {
    heading?: string
    subheading?: string
    description?: string
    bullets?: string[]
    cta?: string
    [key: string]: any
  }
}

// Editable text component
function EditableText({ 
  value, 
  onChange, 
  className = '', 
  tag = 'p',
  placeholder = 'Click to edit...',
  style = {}
}: any) {
  const [isEditing, setIsEditing] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleSave = () => {
    onChange(localValue)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === 'Escape') {
      setLocalValue(value)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <textarea
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className={`bg-vexl-gray-800 border-2 border-vexl-yellow rounded p-2 w-full resize-none ${className}`}
        style={{
          fontSize: style.fontSize || 'inherit',
          fontWeight: style.fontWeight || 'inherit',
          textAlign: style.textAlign || 'inherit',
          color: 'white'
        }}
        rows={3}
      />
    )
  }

  const Component = tag as any

  return (
    <Component
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-vexl-yellow/10 transition-colors rounded px-2 py-1 ${className}`}
      style={style}
    >
      {value || <span className="opacity-50">{placeholder}</span>}
    </Component>
  )
}

// Component Library Panel
function ComponentLibrary({ onAddComponent }: any) {
  const components = [
    { id: 'heading', name: 'Heading', icon: Type, category: 'text' },
    { id: 'paragraph', name: 'Paragraph', icon: AlignLeft, category: 'text' },
    { id: 'button', name: 'Button', icon: Bold, category: 'action' },
    { id: 'network-viz', name: 'Network Visualization', icon: Layout, category: 'interactive' },
    { id: 'contact-import', name: 'Contact Import', icon: Plus, category: 'interactive' },
    { id: 'phone-mockup', name: 'Phone Mockup', icon: Smartphone, category: 'visual' },
    { id: 'stats-panel', name: 'Stats Panel', icon: Code, category: 'data' },
  ]

  return (
    <div className="bg-vexl-gray-900 rounded-lg p-4">
      <h3 className="text-sm font-semibold text-white mb-3">Components</h3>
      <div className="space-y-2">
        {components.map(comp => (
          <button
            key={comp.id}
            onClick={() => onAddComponent(comp)}
            className="w-full flex items-center space-x-2 p-2 bg-vexl-gray-800 rounded hover:bg-vexl-gray-700 transition-colors"
          >
            <comp.icon className="w-4 h-4 text-vexl-yellow" />
            <span className="text-xs text-white">{comp.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Main Editor Component
export default function WorkshopEditor() {
  const router = useRouter()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [editMode, setEditMode] = useState(true)
  const [showComponentLibrary, setShowComponentLibrary] = useState(true)
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop')
  const [sections, setSections] = useState<SectionConfig[]>([
    {
      id: 'hook',
      name: 'Hook',
      component: HookSection,
      duration: 2,
      content: {
        heading: 'P2P BITCOIN WITHOUT KYC',
        subheading: 'Vexl Workshop',
        description: 'Learn how to trade Bitcoin privately with your social network'
      }
    },
    {
      id: 'pitch',
      name: 'Vexl Pitch',
      component: PitchSection,
      duration: 3,
      content: {
        heading: 'YOUR NETWORK IS YOUR NET WORTH',
        description: 'Stop wasting your time to one employer. Start earning your community with all your skills.',
        bullets: [
          'Web of Trust',
          'Talent Network',
          'Trust > Business',
          'Real Trades'
        ]
      }
    },
    {
      id: 'trust',
      name: 'Trust > Ratings',
      component: TrustSection,
      duration: 5,
      content: {
        heading: 'TRUST BEATS RATINGS',
        subheading: 'Your network is more valuable than stranger reviews',
        description: 'Trust isn\'t a number - it\'s people you know vouching for people they know'
      }
    },
    {
      id: 'privacy',
      name: 'Privacy First',
      component: PrivacySection,
      duration: 5,
      content: {
        heading: 'PRIVACY FIRST',
        description: 'We refuse to track your trades because we refuse to become a honeypot',
        bullets: [
          'NO SURVEILLANCE BY DESIGN',
          'YOUR HISTORY STAYS YOURS',
          'VERIFY EVERYTHING'
        ]
      }
    },
    // Add more sections...
  ])

  const currentSection = sections[currentSectionIndex]

  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  // Navigation
  const navigateSection = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' 
      ? Math.min(currentSectionIndex + 1, sections.length - 1)
      : Math.max(currentSectionIndex - 1, 0)
    setCurrentSectionIndex(newIndex)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && !editMode) {
        navigateSection('prev')
      }
      if (e.key === 'ArrowRight' && !editMode) {
        navigateSection('next')
      }
      if (e.key === 'e' && e.metaKey) {
        e.preventDefault()
        setEditMode(!editMode)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [editMode, currentSectionIndex])

  const updateSectionContent = (key: string, value: any) => {
    const updatedSections = [...sections]
    updatedSections[currentSectionIndex].content[key] = value
    setSections(updatedSections)
  }

  const saveSections = async () => {
    // Save to database
    const response = await fetch('/api/admin/workshop-sections', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
      },
      body: JSON.stringify({ sections })
    })

    if (response.ok) {
      alert('Sections saved successfully!')
    }
  }

  const addComponent = (component: any) => {
    // This would add a component to the current section
    console.log('Adding component:', component)
  }

  return (
    <div className="min-h-screen bg-vexl-black flex flex-col">
      {/* Header */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <VexlLogo />
            <h1 className="text-lg font-bold text-white">Workshop Editor</h1>
            <div className="flex items-center space-x-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSectionIndex(index)}
                  className={`px-3 py-1 rounded text-xs ${
                    index === currentSectionIndex 
                      ? 'bg-vexl-yellow text-black' 
                      : 'bg-vexl-gray-800 text-white hover:bg-vexl-gray-700'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center space-x-1 px-3 py-1 rounded ${
                editMode ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'
              }`}
            >
              {editMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm">{editMode ? 'Edit Mode' : 'Preview'}</span>
            </button>
            
            <button
              onClick={() => setDevicePreview(devicePreview === 'desktop' ? 'mobile' : 'desktop')}
              className="p-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
            >
              {devicePreview === 'desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </button>

            <button
              onClick={saveSections}
              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm">Save All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Component Library (left) */}
        {editMode && showComponentLibrary && (
          <div className="w-64 bg-vexl-gray-900 border-r border-vexl-gray-800 p-4 overflow-y-auto">
            <ComponentLibrary onAddComponent={addComponent} />
          </div>
        )}

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-black">
          <div className={`${devicePreview === 'mobile' ? 'max-w-md mx-auto' : ''}`}>
            {/* Render actual section with editable overlay */}
            <div className="relative">
              {/* Background section (actual component) */}
              <div className={editMode ? 'pointer-events-none opacity-50' : ''}>
                <currentSection.component />
              </div>

              {/* Editable overlay */}
              {editMode && (
                <div className="absolute inset-0 p-8">
                  {/* Main Heading */}
                  {currentSection.content.heading && (
                    <div className="mb-8">
                      <EditableText
                        value={currentSection.content.heading}
                        onChange={(value: string) => updateSectionContent('heading', value)}
                        tag="h1"
                        className="text-5xl md:text-7xl font-bold text-white text-center"
                        style={{ fontSize: '4rem', fontWeight: 'bold', textAlign: 'center' }}
                      />
                    </div>
                  )}

                  {/* Subheading */}
                  {currentSection.content.subheading && (
                    <div className="mb-4">
                      <EditableText
                        value={currentSection.content.subheading}
                        onChange={(value: string) => updateSectionContent('subheading', value)}
                        tag="h2"
                        className="text-2xl text-vexl-gray-400 text-center"
                        style={{ fontSize: '1.5rem', textAlign: 'center' }}
                      />
                    </div>
                  )}

                  {/* Description */}
                  {currentSection.content.description && (
                    <div className="mb-6">
                      <EditableText
                        value={currentSection.content.description}
                        onChange={(value: string) => updateSectionContent('description', value)}
                        tag="p"
                        className="text-lg text-white text-center max-w-3xl mx-auto"
                        style={{ fontSize: '1.125rem', textAlign: 'center' }}
                      />
                    </div>
                  )}

                  {/* Bullet Points */}
                  {currentSection.content.bullets && (
                    <div className="space-y-2">
                      {currentSection.content.bullets.map((bullet, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-vexl-yellow">•</span>
                          <EditableText
                            value={bullet}
                            onChange={(value: string) => {
                              const newBullets = [...currentSection.content.bullets!]
                              newBullets[index] = value
                              updateSectionContent('bullets', newBullets)
                            }}
                            className="text-white"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Properties Panel (right) */}
        {editMode && (
          <div className="w-80 bg-vexl-gray-900 border-l border-vexl-gray-800 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-white mb-4">Section Properties</h3>
            
            <div className="space-y-4">
              {/* Section Name */}
              <div>
                <label className="block text-xs text-vexl-gray-400 mb-1">Section Name</label>
                <input
                  type="text"
                  value={currentSection.name}
                  onChange={(e) => {
                    const updatedSections = [...sections]
                    updatedSections[currentSectionIndex].name = e.target.value
                    setSections(updatedSections)
                  }}
                  className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs text-vexl-gray-400 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={currentSection.duration}
                  onChange={(e) => {
                    const updatedSections = [...sections]
                    updatedSections[currentSectionIndex].duration = parseInt(e.target.value)
                    setSections(updatedSections)
                  }}
                  className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded"
                />
              </div>

              {/* Text Formatting */}
              <div>
                <label className="block text-xs text-vexl-gray-400 mb-2">Text Formatting</label>
                <div className="flex space-x-2">
                  <button className="p-2 bg-vexl-gray-800 rounded hover:bg-vexl-gray-700">
                    <Bold className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-vexl-gray-800 rounded hover:bg-vexl-gray-700">
                    <Italic className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-vexl-gray-800 rounded hover:bg-vexl-gray-700">
                    <AlignLeft className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-vexl-gray-800 rounded hover:bg-vexl-gray-700">
                    <AlignCenter className="w-4 h-4 text-white" />
                  </button>
                  <button className="p-2 bg-vexl-gray-800 rounded hover:bg-vexl-gray-700">
                    <AlignRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Add Bullet Point */}
              {currentSection.content.bullets && (
                <div>
                  <button
                    onClick={() => {
                      const newBullets = [...currentSection.content.bullets!, 'New bullet point']
                      updateSectionContent('bullets', newBullets)
                    }}
                    className="w-full px-3 py-2 bg-vexl-yellow text-black rounded hover:bg-vexl-yellow/90"
                  >
                    Add Bullet Point
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="bg-vexl-gray-900 border-t border-vexl-gray-800 px-4 py-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigateSection('prev')}
            disabled={currentSectionIndex === 0}
            className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-vexl-gray-400">
              Section {currentSectionIndex + 1} of {sections.length}
            </span>
            <div className="flex space-x-1">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentSectionIndex ? 'bg-vexl-yellow' : 'bg-vexl-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            onClick={() => navigateSection('next')}
            disabled={currentSectionIndex === sections.length - 1}
            className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 disabled:opacity-50"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Keyboard Guide */}
      {!editMode && (
        <div className="absolute bottom-20 left-4 bg-vexl-gray-900 rounded-lg p-3 text-xs text-vexl-gray-400">
          <div>← → Navigate sections</div>
          <div>⌘E Toggle edit mode</div>
        </div>
      )}
    </div>
  )
}