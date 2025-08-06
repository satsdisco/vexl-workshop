'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import VexlLogo from '@/components/VexlLogo'
import { 
  Save, Eye, Undo, Redo, Settings, Palette, 
  FileText, Grid, Package, LogOut, Search,
  Check, X, Edit3, Plus, Copy, Trash2,
  ChevronLeft, ChevronRight, Loader2, Sparkles,
  Monitor, Smartphone, Clock, AlertCircle
} from 'lucide-react'

// Lazy load heavy components
const RichTextEditor = dynamic(() => import('@/components/admin/ModernRichTextEditor'), {
  loading: () => <div className="h-32 bg-vexl-gray-800 animate-pulse rounded-lg" />,
  ssr: false
})

const LivePreview = dynamic(() => import('@/components/admin/LivePreview'), {
  loading: () => <div className="h-96 bg-vexl-gray-800 animate-pulse rounded-lg" />,
  ssr: false
})

const TemplateApplicator = dynamic(() => import('@/components/admin/TemplateApplicator'), {
  loading: () => <div className="h-96 bg-vexl-gray-800 animate-pulse rounded-lg" />,
  ssr: false
})

interface ContentState {
  current: any
  history: any[]
  historyIndex: number
  lastSaved: Date | null
  isDirty: boolean
}

export default function ModernAdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('hookSection')
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('split')
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop')
  const [searchQuery, setSearchQuery] = useState('')
  const [contentState, setContentState] = useState<ContentState>({
    current: {},
    history: [],
    historyIndex: -1,
    lastSaved: null,
    isDirty: false
  })
  const [saving, setSaving] = useState(false)
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true)
  const [notification, setNotification] = useState<{ type: 'success' | 'error' | 'info', message: string } | null>(null)

  const sections = [
    { id: 'templates', name: 'Templates', icon: '✨', duration: '' },
    { id: 'hookSection', name: 'Hook', icon: '🎯', duration: '2 min' },
    { id: 'pitchSection', name: 'Vexl Pitch', icon: '💡', duration: '3 min' },
    { id: 'trustSection', name: 'Trust > Ratings', icon: '🤝', duration: '5 min' },
    { id: 'privacySection', name: 'Privacy First', icon: '🔒', duration: '5 min' },
    { id: 'profileSetupSection', name: 'Profile Setup', icon: '👤', duration: '2 min' },
    { id: 'findingOffersSection', name: 'Finding Offers', icon: '🔍', duration: '2 min' },
    { id: 'contactTradingSection', name: 'Contact & Trading', icon: '💱', duration: '3 min' },
    { id: 'clubsSection', name: 'Vexl Clubs', icon: '🏛️', duration: '3 min' },
    { id: 'demoSection', name: 'Live Demo', icon: '📱', duration: '10 min' },
    { id: 'visionSection', name: 'Your Network', icon: '🌐', duration: '8 min' },
    { id: 'getStartedSection', name: 'Get Started', icon: '🚀', duration: '2 min' }
  ]

  // Filter sections based on search
  const filteredSections = sections.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        setContentState(prev => ({
          ...prev,
          current: data.content,
          lastSaved: new Date()
        }))
      }
    } catch (error) {
      showNotification('error', 'Failed to load content')
    }
  }

  const showNotification = (type: 'success' | 'error' | 'info', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleContentChange = useCallback((sectionId: string, field: string, value: any) => {
    setContentState(prev => {
      const newContent = {
        ...prev.current,
        [sectionId]: {
          ...prev.current[sectionId],
          [field]: value
        }
      }

      // Add to history for undo/redo
      const newHistory = prev.history.slice(0, prev.historyIndex + 1)
      newHistory.push(newContent)

      return {
        current: newContent,
        history: newHistory,
        historyIndex: newHistory.length - 1,
        lastSaved: prev.lastSaved,
        isDirty: true
      }
    })
  }, [])

  const handleUndo = () => {
    if (contentState.historyIndex > 0) {
      setContentState(prev => ({
        ...prev,
        current: prev.history[prev.historyIndex - 1],
        historyIndex: prev.historyIndex - 1,
        isDirty: true
      }))
    }
  }

  const handleRedo = () => {
    if (contentState.historyIndex < contentState.history.length - 1) {
      setContentState(prev => ({
        ...prev,
        current: prev.history[prev.historyIndex + 1],
        historyIndex: prev.historyIndex + 1,
        isDirty: true
      }))
    }
  }

  const saveContent = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('vexl-admin-token')
      const section = contentState.current[activeSection] || {}
      
      await fetch('/api/admin/slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sectionId: activeSection,
          content: section
        })
      })

      setContentState(prev => ({
        ...prev,
        lastSaved: new Date(),
        isDirty: false
      }))
      
      showNotification('success', 'Content saved successfully')
    } catch (error) {
      showNotification('error', 'Failed to save content')
    } finally {
      setSaving(false)
    }
  }

  // Auto-save
  useEffect(() => {
    if (autoSaveEnabled && contentState.isDirty) {
      const timer = setTimeout(() => {
        saveContent()
      }, 5000) // Auto-save after 5 seconds of inactivity

      return () => clearTimeout(timer)
    }
  }, [contentState.current, autoSaveEnabled, contentState.isDirty])

  const currentContent = contentState.current[activeSection] || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-vexl-gray-900 via-vexl-black to-vexl-gray-900">
      {/* Modern Header */}
      <header className="bg-vexl-black/50 backdrop-blur-lg border-b border-vexl-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <VexlLogo className="w-24 h-auto" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-vexl-gray-400">Editing:</span>
              <span className="text-lg font-semibold text-vexl-yellow">
                {sections.find(s => s.id === activeSection)?.name}
              </span>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex bg-vexl-gray-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('edit')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'edit' ? 'bg-vexl-yellow text-vexl-black' : 'text-vexl-gray-400'
                }`}
              >
                <Edit3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'split' ? 'bg-vexl-yellow text-vexl-black' : 'text-vexl-gray-400'
                }`}
              >
                Split
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'preview' ? 'bg-vexl-yellow text-vexl-black' : 'text-vexl-gray-400'
                }`}
              >
                <Eye size={16} />
              </button>
            </div>

            {/* Undo/Redo */}
            <div className="flex gap-1">
              <button
                onClick={handleUndo}
                disabled={contentState.historyIndex <= 0}
                className="p-2 rounded-lg hover:bg-vexl-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Undo size={18} />
              </button>
              <button
                onClick={handleRedo}
                disabled={contentState.historyIndex >= contentState.history.length - 1}
                className="p-2 rounded-lg hover:bg-vexl-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Redo size={18} />
              </button>
            </div>

            {/* Auto-save Toggle */}
            <button
              onClick={() => setAutoSaveEnabled(!autoSaveEnabled)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                autoSaveEnabled ? 'bg-green-900/20 text-green-400' : 'bg-vexl-gray-800 text-vexl-gray-400'
              }`}
            >
              <Clock size={16} />
              <span className="text-sm">Auto-save</span>
            </button>

            {/* Save Button */}
            <button
              onClick={saveContent}
              disabled={saving || !contentState.isDirty}
              className="flex items-center gap-2 px-4 py-2 bg-vexl-yellow text-vexl-black font-semibold rounded-lg hover:bg-vexl-yellow/90 disabled:opacity-50 transition-all"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save
                </>
              )}
            </button>

            {/* Preview Link */}
            <a
              href="/"
              target="_blank"
              className="p-2 rounded-lg hover:bg-vexl-gray-800 text-vexl-gray-400"
            >
              <Monitor size={18} />
            </a>

            {/* Logout */}
            <button
              onClick={() => {
                localStorage.removeItem('vexl-admin-token')
                router.push('/admin/login')
              }}
              className="p-2 rounded-lg hover:bg-red-900/20 text-red-400"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="px-6 py-2 bg-vexl-gray-900/50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            {contentState.lastSaved && (
              <span className="text-vexl-gray-400">
                Last saved: {contentState.lastSaved.toLocaleTimeString()}
              </span>
            )}
            {contentState.isDirty && (
              <span className="text-yellow-400">• Unsaved changes</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDevicePreview(devicePreview === 'desktop' ? 'mobile' : 'desktop')}
              className="flex items-center gap-2 text-vexl-gray-400 hover:text-vexl-white"
            >
              {devicePreview === 'desktop' ? <Monitor size={14} /> : <Smartphone size={14} />}
              {devicePreview}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex h-[calc(100vh-130px)]">
        {/* Modern Sidebar */}
        <aside className="w-72 bg-vexl-black/30 backdrop-blur-sm border-r border-vexl-gray-800 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-vexl-gray-500" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sections..."
                className="w-full pl-10 pr-4 py-2 bg-vexl-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
              />
            </div>
          </div>

          {/* Section List */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="space-y-2">
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-gradient-to-r from-vexl-yellow to-vexl-yellow/80 text-vexl-black shadow-lg'
                      : 'bg-vexl-gray-800/50 hover:bg-vexl-gray-800 text-vexl-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{section.icon}</span>
                      <div>
                        <div className="font-medium">{section.name}</div>
                        <div className="text-xs opacity-70">{section.duration}</div>
                      </div>
                    </div>
                    {activeSection === section.id && (
                      <ChevronRight size={16} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="p-4 border-t border-vexl-gray-800">
            <button 
              onClick={() => setActiveSection('templates')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-vexl-yellow/20 to-vexl-yellow/10 text-vexl-yellow rounded-lg hover:from-vexl-yellow/30 hover:to-vexl-yellow/20 transition-all">
              <Sparkles size={16} />
              <span className="font-medium">Apply Template</span>
            </button>
          </div>
        </aside>

        {/* Editor/Preview Area */}
        <main className="flex-1 overflow-hidden">
          {activeSection === 'templates' ? (
            <div className="h-full overflow-y-auto p-8">
              <div className="max-w-6xl mx-auto">
                <TemplateApplicator 
                  onApply={async (templateId) => {
                    const response = await fetch('/api/admin/templates/apply', {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
                      },
                      body: JSON.stringify({ templateName: templateId })
                    })
                    
                    if (!response.ok) {
                      throw new Error('Failed to apply template')
                    }
                    
                    showNotification('success', 'Template applied successfully')
                    await loadContent()
                  }}
                />
              </div>
            </div>
          ) : viewMode === 'edit' ? (
            <div className="h-full overflow-y-auto p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-vexl-yellow">
                  {sections.find(s => s.id === activeSection)?.name}
                </h2>
                <div className="space-y-6">
                  {currentContent.title !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Title</label>
                      <RichTextEditor
                        content={currentContent.title}
                        onChange={(value) => handleContentChange(activeSection, 'title', value)}
                        placeholder="Enter slide title..."
                      />
                    </div>
                  )}
                  {currentContent.subtitle !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Subtitle</label>
                      <RichTextEditor
                        content={currentContent.subtitle}
                        onChange={(value) => handleContentChange(activeSection, 'subtitle', value)}
                        placeholder="Enter subtitle..."
                      />
                    </div>
                  )}
                  {currentContent.description !== undefined && (
                    <div>
                      <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Description</label>
                      <RichTextEditor
                        content={currentContent.description}
                        onChange={(value) => handleContentChange(activeSection, 'description', value)}
                        placeholder="Enter description..."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : viewMode === 'preview' ? (
            <div className="h-full overflow-y-auto p-8">
              <LivePreview
                sectionId={activeSection}
                content={currentContent}
                deviceMode={devicePreview}
              />
            </div>
          ) : viewMode === 'split' ? (
            <div className="flex h-full">
              <div className="flex-1 overflow-y-auto p-8 border-r border-vexl-gray-800">
                <div className="max-w-2xl mx-auto">
                  <h3 className="text-lg font-semibold mb-4">Edit Content</h3>
                  <div className="space-y-4">
                    {currentContent.title !== undefined && (
                      <div>
                        <label className="block text-xs font-medium text-vexl-gray-400 mb-1">Title</label>
                        <RichTextEditor
                          content={currentContent.title}
                          onChange={(value) => handleContentChange(activeSection, 'title', value)}
                          placeholder="Enter title..."
                          compact
                        />
                      </div>
                    )}
                    {currentContent.subtitle !== undefined && (
                      <div>
                        <label className="block text-xs font-medium text-vexl-gray-400 mb-1">Subtitle</label>
                        <RichTextEditor
                          content={currentContent.subtitle}
                          onChange={(value) => handleContentChange(activeSection, 'subtitle', value)}
                          placeholder="Enter subtitle..."
                          compact
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8 bg-vexl-gray-900/30">
                <h3 className="text-lg font-semibold mb-4">Live Preview</h3>
                <LivePreview
                  sectionId={activeSection}
                  content={currentContent}
                  deviceMode={devicePreview}
                />
              </div>
            </div>
          ) : null}
        </main>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-slide-up ${
          notification.type === 'success' ? 'bg-green-900/90 text-green-300' :
          notification.type === 'error' ? 'bg-red-900/90 text-red-300' :
          'bg-blue-900/90 text-blue-300'
        }`}>
          {notification.type === 'success' && <Check size={18} />}
          {notification.type === 'error' && <X size={18} />}
          {notification.type === 'info' && <AlertCircle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  )
}