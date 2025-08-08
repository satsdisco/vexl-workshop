'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Save, RefreshCw, Eye, LogOut, Settings, 
  Sparkles, Home, Monitor, Sliders, Layers,
  ToggleLeft, ToggleRight, ChevronDown, ChevronRight,
  Code, Users, MessageSquare, Map, QrCode, Network
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'
import { defaultFeatures, FeatureConfig } from '@/lib/features'

export default function WorkshopAdmin() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'content' | 'features' | 'preview'>('content')
  const [sections, setSections] = useState<any>({})
  const [features, setFeatures] = useState<FeatureConfig[]>(defaultFeatures)
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(new Set())

  // Section definitions
  const sectionConfig = [
    { id: 'hookSection', name: 'Hook', icon: '🎯', description: 'Opening hook - KYC is killing Bitcoin' },
    { id: 'pitchSection', name: 'Vexl Pitch', icon: '💡', description: 'Main value proposition' },
    { id: 'trustSection', name: 'Trust > Ratings', icon: '🤝', description: 'Web of trust explanation' },
    { id: 'privacySection', name: 'Privacy First', icon: '🔒', description: 'Privacy features and benefits' },
    { id: 'profileSetupSection', name: 'Profile Setup', icon: '👤', description: 'How to set up your profile' },
    { id: 'findingOffersSection', name: 'Finding Offers', icon: '🔍', description: 'Discover P2P offers' },
    { id: 'contactTradingSection', name: 'Contact & Trading', icon: '💱', description: 'Chat and trade process' },
    { id: 'clubsSection', name: 'Vexl Clubs', icon: '🏛️', description: 'Community features' },
    { id: 'demoSection', name: 'Live Demo', icon: '📱', description: 'Interactive demonstration' },
    { id: 'visionSection', name: 'Your Network', icon: '🌐', description: 'Network effect visualization' },
    { id: 'getStartedSection', name: 'Get Started', icon: '🚀', description: 'Call to action' }
  ]

  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    loadContent()
    loadFeatures()
  }, [router])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/slides')
      const data = await response.json()
      if (data.success) {
        setSections(data.content || {})
      }
    } catch (error) {
      showNotification('error', 'Failed to load content')
    }
  }

  const loadFeatures = async () => {
    try {
      const response = await fetch('/api/admin/features')
      const data = await response.json()
      if (data.success && data.features) {
        setFeatures(data.features)
      }
    } catch (error) {
      console.error('Failed to load features:', error)
    }
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev)
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId)
      } else {
        newSet.add(sectionId)
      }
      return newSet
    })
  }

  const toggleFeature = (featureId: string) => {
    setExpandedFeatures(prev => {
      const newSet = new Set(prev)
      if (newSet.has(featureId)) {
        newSet.delete(featureId)
      } else {
        newSet.add(featureId)
      }
      return newSet
    })
  }

  const handleContentChange = (sectionId: string, field: string, value: any) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }))
    setHasChanges(true)
  }

  const handleFeatureToggle = (featureId: string) => {
    setFeatures(prev => prev.map(f => 
      f.id === featureId ? { ...f, enabled: !f.enabled } : f
    ))
    setHasChanges(true)
  }

  const handleFeatureSettingChange = (featureId: string, setting: string, value: any) => {
    setFeatures(prev => prev.map(f => 
      f.id === featureId 
        ? { ...f, settings: { ...f.settings, [setting]: value } }
        : f
    ))
    setHasChanges(true)
  }

  const saveAll = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('vexl-admin-token')
      
      // Save content
      for (const [sectionId, content] of Object.entries(sections)) {
        await fetch('/api/admin/slides', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ sectionId, content })
        })
      }
      
      // Save features
      await fetch('/api/admin/features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ features })
      })
      
      showNotification('success', 'All changes saved successfully!')
      setHasChanges(false)
    } catch (error) {
      showNotification('error', 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const getFeatureIcon = (featureId: string) => {
    const icons = {
      webOfTrust: Network,
      networkEffect: Users,
      contactImporter: Users,
      qrCodeScanner: QrCode,
      marketMap: Map,
      chatDemo: MessageSquare,
      presenterMode: Monitor,
      keyboardShortcuts: Code,
      autoAdvance: Sliders
    }
    return icons[featureId] || Settings
  }

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <VexlLogo />
              <h1 className="text-xl font-bold text-white">Workshop Editor</h1>
              {hasChanges && (
                <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-500 rounded">
                  Unsaved changes
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin/slide-builder')}
                className="flex items-center space-x-2 px-4 py-2 text-vexl-gray-400 hover:text-white transition-colors"
              >
                <Layers className="w-4 h-4" />
                <span>Slide Builder</span>
              </button>
              
              <button
                onClick={() => window.open('/', '_blank')}
                className="flex items-center space-x-2 px-4 py-2 text-vexl-gray-400 hover:text-white transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>
              
              <button
                onClick={saveAll}
                disabled={saving || !hasChanges}
                className="flex items-center space-x-2 px-4 py-2 bg-vexl-yellow text-black rounded hover:bg-vexl-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save All'}</span>
              </button>
              
              <button
                onClick={() => {
                  localStorage.removeItem('vexl-admin-token')
                  router.push('/admin/login')
                }}
                className="p-2 text-vexl-gray-400 hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-3 px-1 border-b-2 transition-colors ${
                activeTab === 'content' 
                  ? 'border-vexl-yellow text-vexl-yellow' 
                  : 'border-transparent text-vexl-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Content</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('features')}
              className={`py-3 px-1 border-b-2 transition-colors ${
                activeTab === 'features' 
                  ? 'border-vexl-yellow text-vexl-yellow' 
                  : 'border-transparent text-vexl-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Features</span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('preview')}
              className={`py-3 px-1 border-b-2 transition-colors ${
                activeTab === 'preview' 
                  ? 'border-vexl-yellow text-vexl-yellow' 
                  : 'border-transparent text-vexl-gray-400 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Monitor className="w-4 h-4" />
                <span>Live Preview</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'content' && (
          <div className="space-y-4">
            {sectionConfig.map(section => (
              <div key={section.id} className="bg-vexl-gray-900 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-vexl-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{section.icon}</span>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-white">{section.name}</h3>
                      <p className="text-sm text-vexl-gray-400">{section.description}</p>
                    </div>
                  </div>
                  {expandedSections.has(section.id) ? 
                    <ChevronDown className="w-5 h-5 text-vexl-gray-400" /> : 
                    <ChevronRight className="w-5 h-5 text-vexl-gray-400" />
                  }
                </button>
                
                {expandedSections.has(section.id) && (
                  <div className="px-6 pb-6 space-y-4 border-t border-vexl-gray-800">
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={sections[section.id]?.title || ''}
                        onChange={(e) => handleContentChange(section.id, 'title', e.target.value)}
                        className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                        placeholder="Enter section title..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">
                        Subtitle
                      </label>
                      <textarea
                        value={sections[section.id]?.subtitle || ''}
                        onChange={(e) => handleContentChange(section.id, 'subtitle', e.target.value)}
                        className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                        rows={2}
                        placeholder="Enter section subtitle..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">
                        Content
                      </label>
                      <textarea
                        value={sections[section.id]?.content || ''}
                        onChange={(e) => handleContentChange(section.id, 'content', e.target.value)}
                        className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                        rows={6}
                        placeholder="Enter main content..."
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-4">
            {features.map(feature => {
              const Icon = getFeatureIcon(feature.id)
              return (
                <div key={feature.id} className="bg-vexl-gray-900 rounded-lg overflow-hidden">
                  <div className="px-6 py-4 flex items-center justify-between">
                    <button
                      onClick={() => toggleFeature(feature.id)}
                      className="flex-1 flex items-center space-x-3"
                    >
                      <Icon className="w-5 h-5 text-vexl-gray-400" />
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-white">{feature.name}</h3>
                        <p className="text-sm text-vexl-gray-400">{feature.description}</p>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleFeatureToggle(feature.id)}
                      className="ml-4"
                    >
                      {feature.enabled ? (
                        <ToggleRight className="w-8 h-8 text-vexl-yellow" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-vexl-gray-600" />
                      )}
                    </button>
                  </div>
                  
                  {expandedFeatures.has(feature.id) && feature.settings && (
                    <div className="px-6 pb-6 space-y-3 border-t border-vexl-gray-800">
                      {Object.entries(feature.settings).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-vexl-gray-400 mb-1">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </label>
                          {typeof value === 'boolean' ? (
                            <button
                              onClick={() => handleFeatureSettingChange(feature.id, key, !value)}
                              className={`px-3 py-1 rounded ${
                                value ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-700 text-vexl-gray-400'
                              }`}
                            >
                              {value ? 'Enabled' : 'Disabled'}
                            </button>
                          ) : typeof value === 'number' ? (
                            <input
                              type="number"
                              value={value}
                              onChange={(e) => handleFeatureSettingChange(feature.id, key, parseInt(e.target.value))}
                              className="w-32 px-3 py-1 bg-vexl-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                            />
                          ) : (
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => handleFeatureSettingChange(feature.id, key, e.target.value)}
                              className="w-full px-3 py-1 bg-vexl-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="bg-vexl-gray-900 rounded-lg p-6">
            <iframe
              src="/"
              className="w-full h-[600px] rounded-lg"
              title="Preview"
            />
          </div>
        )}
      </div>

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notification.message}
        </div>
      )}
    </div>
  )
}