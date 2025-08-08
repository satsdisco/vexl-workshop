'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Edit3, Save, Eye, EyeOff, Type, Plus, Trash2,
  ChevronLeft, ChevronRight, Monitor, Smartphone,
  Bold, Italic, AlignLeft, AlignCenter, AlignRight,
  RefreshCw, Layers, Image
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'

// Import actual sections to preview
import dynamic from 'next/dynamic'
const HookSection = dynamic(() => import('@/components/sections/HookSection'))
const TrustSection = dynamic(() => import('@/components/sections/TrustSection'))
const PrivacySection = dynamic(() => import('@/components/sections/PrivacySection'))

// Section configuration
const SECTIONS = [
  {
    id: 'hookSection',
    name: 'Hook',
    component: HookSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'KYC is killing Bitcoin' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', default: "Every time you upload your ID to buy bitcoin, you're building the surveillance state." },
      { key: 'cta', label: 'Call to Action', type: 'text', default: "There's a better way" },
      { 
        key: 'stats', 
        label: 'Statistics', 
        type: 'array',
        fields: [
          { key: 'value', label: 'Value', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' }
        ],
        default: [
          { id: 'stat1', value: '500M+', label: 'KYC records leaked in crypto exchange hacks' },
          { id: 'stat2', value: '100%', label: 'of your transactions tracked forever' },
          { id: 'stat3', value: '0', label: 'privacy once you\'re in the system' }
        ]
      }
    ]
  },
  {
    id: 'trustSection',
    name: 'Trust > Ratings',
    component: TrustSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'TRUST BEATS RATINGS' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Your network is more valuable than stranger reviews' },
      { key: 'mainQuote', label: 'Main Quote', type: 'textarea', default: "Trust isn't a number - it's people you know vouching for people they know" },
      { key: 'question', label: 'Question', type: 'text', default: 'Who would you rather trade with?' }
    ]
  },
  {
    id: 'privacySection',
    name: 'Privacy First',
    component: PrivacySection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'PRIVACY FIRST' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'We refuse to track your trades because we refuse to become a honeypot' },
      { 
        key: 'principles', 
        label: 'Privacy Principles', 
        type: 'array',
        fields: [
          { key: 'icon', label: 'Icon', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' }
        ],
        default: [
          { icon: '🔒', title: 'NO SURVEILLANCE BY DESIGN', description: 'Rating systems require tracking every transaction. We chose trust over surveillance.' },
          { icon: '🛡️', title: 'YOUR HISTORY STAYS YOURS', description: 'Your trading history belongs to you, not our database.' },
          { icon: '✓', title: 'VERIFY EVERYTHING', description: 'Open source means you can verify we\'re not tracking you.' }
        ]
      },
      {
        key: 'contactCategories',
        label: 'Contact Import Categories',
        type: 'array',
        fields: [
          { key: 'icon', label: 'Icon', type: 'text' },
          { key: 'name', label: 'Category Name', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' },
          { key: 'count', label: 'Contact Count', type: 'text' }
        ],
        default: [
          { icon: '👥', name: 'Close Friends', description: 'Your inner circle', count: '~5 contacts → 10 network reach' },
          { icon: '🤝', name: 'Acquaintances', description: 'People you know casually', count: '~20 contacts → 60 network reach' },
          { icon: '🛠️', name: 'Service Providers', description: 'Barber, mechanic, cleaner', count: '~15 contacts → 75 network reach' },
          { icon: '🏪', name: 'Local Businesses', description: 'Shops, restaurants, cafes', count: '~25 contacts → 100 network reach' },
          { icon: '🏘️', name: 'Community Groups', description: 'Gym, clubs, meetups', count: '~30 contacts → 180 network reach' }
        ]
      },
      { key: 'warningTitle', label: 'Warning Title', type: 'text', default: 'Limited Network Warning' },
      { key: 'warningMessage', label: 'Warning Message', type: 'textarea', default: 'Only importing close friends severely limits your trading opportunities. Your barber might be the bridge to 50+ bitcoin traders!' }
    ]
  }
]

export default function WorkshopVisualEditor() {
  const router = useRouter()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [editMode, setEditMode] = useState(true)
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop')
  const [sectionContent, setSectionContent] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const currentSection = SECTIONS[currentSectionIndex]

  // Load content from CMS
  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/content', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        const contentMap: Record<string, any> = {}
        
        // Handle both array and object responses
        if (Array.isArray(data.content)) {
          data.content.forEach((item: any) => {
            contentMap[item.sectionId] = item.content
          })
        } else if (data.content) {
          // If it's a single object, use it directly
          Object.keys(data.content).forEach(key => {
            contentMap[key] = data.content[key]
          })
        }
        
        setSectionContent(contentMap)
      }
    } catch (error) {
      console.error('Error loading content:', error)
      // Set default content if loading fails
      const defaultContent: Record<string, any> = {}
      SECTIONS.forEach(section => {
        defaultContent[section.id] = {}
        section.fields.forEach(field => {
          defaultContent[section.id][field.key] = field.default
        })
      })
      setSectionContent(defaultContent)
    } finally {
      setLoading(false)
    }
  }

  const updateField = (sectionId: string, key: string, value: any) => {
    setSectionContent(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [key]: value
      }
    }))
  }

  const updateArrayItem = (sectionId: string, arrayKey: string, index: number, field: string, value: any) => {
    setSectionContent(prev => {
      const section = prev[sectionId] || {}
      const array = section[arrayKey] || []
      const newArray = [...array]
      
      if (!newArray[index]) {
        newArray[index] = { id: `${arrayKey}_${index}` }
      }
      
      // Preserve the id field
      newArray[index] = {
        ...newArray[index],
        [field]: value
      }
      
      return {
        ...prev,
        [sectionId]: {
          ...section,
          [arrayKey]: newArray
        }
      }
    })
  }

  const addArrayItem = (sectionId: string, arrayKey: string, defaultItem: any) => {
    setSectionContent(prev => {
      const section = prev[sectionId] || {}
      const array = section[arrayKey] || []
      
      return {
        ...prev,
        [sectionId]: {
          ...section,
          [arrayKey]: [...array, defaultItem]
        }
      }
    })
  }

  const removeArrayItem = (sectionId: string, arrayKey: string, index: number) => {
    setSectionContent(prev => {
      const section = prev[sectionId] || {}
      const array = section[arrayKey] || []
      
      return {
        ...prev,
        [sectionId]: {
          ...section,
          [arrayKey]: array.filter((_: any, i: number) => i !== index)
        }
      }
    })
  }

  const saveContent = async () => {
    try {
      setSaving(true)
      
      // Build the complete content object
      const fullContent: Record<string, any> = {}
      
      for (const section of SECTIONS) {
        const content = sectionContent[section.id] || {}
        
        // Merge with defaults
        const sectionData: any = {}
        section.fields.forEach(field => {
          sectionData[field.key] = content[field.key] || field.default
        })
        
        fullContent[section.id] = sectionData
      }
      
      // Save all content at once
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify({
          content: fullContent
        })
      })
      
      alert('Content saved successfully!')
      
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const getValue = (sectionId: string, key: string, defaultValue: any) => {
    return sectionContent[sectionId]?.[key] || defaultValue
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-vexl-black flex items-center justify-center">
        <div className="text-white">Loading content...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vexl-black flex flex-col">
      {/* Header */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <VexlLogo />
            <h1 className="text-lg font-bold text-white">Workshop Visual Editor</h1>
            
            {/* Section Tabs */}
            <div className="flex items-center space-x-2">
              {SECTIONS.map((section, index) => (
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
              <span className="text-sm">{editMode ? 'Editing' : 'Preview'}</span>
            </button>
            
            <button
              onClick={() => setDevicePreview(devicePreview === 'desktop' ? 'mobile' : 'desktop')}
              className="p-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
            >
              {devicePreview === 'desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </button>

            <button
              onClick={loadContent}
              className="p-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={saveContent}
              disabled={saving}
              className="flex items-center space-x-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span className="text-sm">{saving ? 'Saving...' : 'Save All'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Edit Panel (left) */}
        {editMode && (
          <div className="w-96 bg-vexl-gray-900 border-r border-vexl-gray-800 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-white mb-4">
              Edit {currentSection.name} Content
            </h3>
            
            <div className="space-y-4">
              {currentSection.fields.map(field => (
                <div key={field.key}>
                  <label className="block text-xs text-vexl-gray-400 mb-1">
                    {field.label}
                  </label>
                  
                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={getValue(currentSection.id, field.key, field.default)}
                      onChange={(e) => updateField(currentSection.id, field.key, e.target.value)}
                      className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded"
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <textarea
                      value={getValue(currentSection.id, field.key, field.default)}
                      onChange={(e) => updateField(currentSection.id, field.key, e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded resize-none"
                    />
                  )}
                  
                  {field.type === 'array' && (
                    <div className="space-y-2">
                      {(getValue(currentSection.id, field.key, field.default) || []).map((item: any, index: number) => (
                        <div key={index} className="bg-vexl-gray-800 p-3 rounded">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs text-vexl-gray-400">Item {index + 1}</span>
                            <button
                              onClick={() => removeArrayItem(currentSection.id, field.key, index)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                          {field.fields?.map(subField => (
                            <div key={subField.key} className="mb-2">
                              <label className="text-xs text-vexl-gray-500">{subField.label}</label>
                              <input
                                type="text"
                                value={item[subField.key] || ''}
                                onChange={(e) => updateArrayItem(
                                  currentSection.id, 
                                  field.key, 
                                  index, 
                                  subField.key, 
                                  e.target.value
                                )}
                                className="w-full px-2 py-1 bg-vexl-gray-700 text-white rounded text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const defaultItem: any = {}
                          field.fields?.forEach(f => {
                            defaultItem[f.key] = ''
                          })
                          addArrayItem(currentSection.id, field.key, defaultItem)
                        }}
                        className="w-full px-3 py-2 bg-vexl-yellow text-black rounded hover:bg-vexl-yellow/90 text-sm"
                      >
                        Add {field.label}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-black">
          <div className={`${devicePreview === 'mobile' ? 'max-w-md mx-auto' : ''} min-h-screen`}>
            {/* Force refresh of section by updating CMS content */}
            <div className="min-h-screen flex items-center justify-center p-8">
              <currentSection.component />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-vexl-gray-900 border-t border-vexl-gray-800 px-4 py-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
            disabled={currentSectionIndex === 0}
            className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-vexl-gray-400">
              Section {currentSectionIndex + 1} of {SECTIONS.length}
            </span>
          </div>

          <button
            onClick={() => setCurrentSectionIndex(Math.min(SECTIONS.length - 1, currentSectionIndex + 1))}
            disabled={currentSectionIndex === SECTIONS.length - 1}
            className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 disabled:opacity-50"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}