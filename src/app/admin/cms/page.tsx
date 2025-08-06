'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, RefreshCw, Eye, LogOut, Check, AlertCircle, Sparkles, Home } from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'

export default function CMSAdmin() {
  const router = useRouter()
  const [sections, setSections] = useState<any>({})
  const [saving, setSaving] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  // Section definitions for the UI
  const sectionConfig = [
    { id: 'hookSection', name: 'Hook', icon: '🎯' },
    { id: 'pitchSection', name: 'Vexl Pitch', icon: '💡' },
    { id: 'trustSection', name: 'Trust > Ratings', icon: '🤝' },
    { id: 'privacySection', name: 'Privacy First', icon: '🔒' },
    { id: 'profileSetupSection', name: 'Profile Setup', icon: '👤' },
    { id: 'findingOffersSection', name: 'Finding Offers', icon: '🔍' },
    { id: 'contactTradingSection', name: 'Contact & Trading', icon: '💱' },
    { id: 'clubsSection', name: 'Vexl Clubs', icon: '🏛️' },
    { id: 'demoSection', name: 'Live Demo', icon: '📱' },
    { id: 'visionSection', name: 'Your Network', icon: '🌐' },
    { id: 'getStartedSection', name: 'Get Started', icon: '🚀' }
  ]

  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    loadContent()
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

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleFieldChange = (sectionId: string, field: string, value: any) => {
    setSections(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [field]: value
      }
    }))
    setHasChanges(true)
  }

  const handleArrayItemChange = (sectionId: string, field: string, index: number, itemField: string, value: any) => {
    setSections(prev => {
      const section = prev[sectionId] || {}
      const array = section[field] || []
      const newArray = [...array]
      newArray[index] = { ...newArray[index], [itemField]: value }
      
      return {
        ...prev,
        [sectionId]: {
          ...section,
          [field]: newArray
        }
      }
    })
    setHasChanges(true)
  }

  const saveAll = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('vexl-admin-token')
      
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
      
      showNotification('success', 'All changes saved successfully')
      setHasChanges(false)
    } catch (error) {
      showNotification('error', 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const applyDefaultTemplate = async () => {
    if (confirm('This will reset all content to the default template. Are you sure?')) {
      try {
        const response = await fetch('/api/admin/templates/apply', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
          },
          body: JSON.stringify({ templateName: 'default' })
        })
        const data = await response.json()
        if (data.success) {
          showNotification('success', 'Default template applied successfully')
          await loadContent()
          setHasChanges(false)
        }
      } catch (error) {
        showNotification('error', 'Failed to apply default template')
      }
    }
  }

  const openTemplates = () => {
    router.push('/admin/templates')
  }

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <header className="bg-vexl-gray-900 border-b border-vexl-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <VexlLogo className="w-24 h-auto" />
            <h1 className="text-xl font-bold">Content Management</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg"
            >
              <Eye size={18} />
              View Site
            </a>
            
            <button
              onClick={openTemplates}
              className="flex items-center gap-2 px-4 py-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg"
            >
              <Sparkles size={18} />
              Templates
            </button>
            
            <button
              onClick={applyDefaultTemplate}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg border border-red-900"
            >
              <Home size={18} />
              Reset to Default
            </button>
            
            <button
              onClick={saveAll}
              disabled={saving || !hasChanges}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold ${
                hasChanges 
                  ? 'bg-vexl-yellow text-vexl-black hover:bg-vexl-yellow/90' 
                  : 'bg-vexl-gray-800 text-vexl-gray-500 cursor-not-allowed'
              }`}
            >
              <Save size={18} />
              {saving ? 'Saving...' : hasChanges ? 'Save All Changes' : 'No Changes'}
            </button>
            
            <button
              onClick={() => {
                localStorage.removeItem('vexl-admin-token')
                router.push('/admin/login')
              }}
              className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="space-y-8">
          {sectionConfig.map(({ id, name, icon }) => {
            const content = sections[id] || {}
            
            return (
              <div key={id} className="bg-vexl-gray-900 border border-vexl-gray-800 rounded-lg overflow-hidden">
                <div className="bg-vexl-gray-800 px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <h2 className="text-xl font-bold">{name}</h2>
                </div>
                
                <div className="p-6 space-y-4">
                  {/* Title */}
                  {content.title !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Title</label>
                      <input
                        type="text"
                        value={content.title || ''}
                        onChange={(e) => handleFieldChange(id, 'title', e.target.value)}
                        className="w-full px-4 py-2 bg-vexl-black border border-vexl-gray-700 rounded-lg focus:border-vexl-yellow focus:outline-none"
                      />
                    </div>
                  )}
                  
                  {/* Subtitle */}
                  {content.subtitle !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Subtitle</label>
                      <input
                        type="text"
                        value={content.subtitle || ''}
                        onChange={(e) => handleFieldChange(id, 'subtitle', e.target.value)}
                        className="w-full px-4 py-2 bg-vexl-black border border-vexl-gray-700 rounded-lg focus:border-vexl-yellow focus:outline-none"
                      />
                    </div>
                  )}
                  
                  {/* Description */}
                  {content.description !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Description</label>
                      <textarea
                        value={content.description || ''}
                        onChange={(e) => handleFieldChange(id, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-2 bg-vexl-black border border-vexl-gray-700 rounded-lg focus:border-vexl-yellow focus:outline-none"
                      />
                    </div>
                  )}
                  
                  {/* Stats (for sections like Hook and Vision) */}
                  {content.stats && Array.isArray(content.stats) && (
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Stats</label>
                      <div className="space-y-2">
                        {content.stats.map((stat, index) => (
                          <div key={index} className="flex gap-2">
                            <input
                              type="text"
                              value={stat.value || ''}
                              onChange={(e) => handleArrayItemChange(id, 'stats', index, 'value', e.target.value)}
                              placeholder="Value"
                              className="flex-1 px-3 py-1 bg-vexl-black border border-vexl-gray-700 rounded-lg"
                            />
                            <input
                              type="text"
                              value={stat.label || ''}
                              onChange={(e) => handleArrayItemChange(id, 'stats', index, 'label', e.target.value)}
                              placeholder="Label"
                              className="flex-2 px-3 py-1 bg-vexl-black border border-vexl-gray-700 rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Features/Benefits (for sections like Privacy, Finding Offers) */}
                  {content.features && Array.isArray(content.features) && (
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Features</label>
                      <div className="space-y-2">
                        {content.features.map((feature, index) => (
                          <div key={index} className="space-y-1">
                            <div className="flex gap-2">
                              {feature.icon !== undefined && (
                                <input
                                  type="text"
                                  value={feature.icon || ''}
                                  onChange={(e) => handleArrayItemChange(id, 'features', index, 'icon', e.target.value)}
                                  placeholder="Icon"
                                  className="w-16 px-3 py-1 bg-vexl-black border border-vexl-gray-700 rounded-lg"
                                />
                              )}
                              <input
                                type="text"
                                value={feature.title || ''}
                                onChange={(e) => handleArrayItemChange(id, 'features', index, 'title', e.target.value)}
                                placeholder="Title"
                                className="flex-1 px-3 py-1 bg-vexl-black border border-vexl-gray-700 rounded-lg"
                              />
                            </div>
                            {feature.description !== undefined && (
                              <input
                                type="text"
                                value={feature.description || ''}
                                onChange={(e) => handleArrayItemChange(id, 'features', index, 'description', e.target.value)}
                                placeholder="Description"
                                className="w-full px-3 py-1 bg-vexl-black border border-vexl-gray-700 rounded-lg"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </main>

      {/* Notification */}
      {notification && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
        }`}>
          {notification.type === 'success' ? <Check size={18} /> : <AlertCircle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}