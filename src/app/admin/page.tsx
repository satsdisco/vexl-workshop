'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import VexlLogo from '@/components/VexlLogo'
import { defaultContent, SlideContent } from '@/data/defaultContent'
import { Save, RotateCcw, LogOut, Check, X, Edit2 } from 'lucide-react'

const sectionNames: { [key: string]: string } = {
  hookSection: 'Hook',
  pitchSection: 'Vexl Pitch',
  trustSection: 'Trust > Ratings',
  privacySection: 'Privacy First',
  profileSetupSection: 'Profile Setup',
  findingOffersSection: 'Finding Offers',
  contactTradingSection: 'Contact & Trading',
  clubsSection: 'Vexl Clubs',
  demoSection: 'Live Demo',
  visionSection: 'Your Network',
  getStartedSection: 'Get Started'
}

export default function AdminDashboard() {
  const [content, setContent] = useState<SlideContent>(defaultContent)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [tempValue, setTempValue] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [selectedSection, setSelectedSection] = useState('hookSection')
  const router = useRouter()

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Load content
    loadContent()
  }, [router])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content')
      const data = await response.json()
      if (data.success) {
        setContent(data.content)
      }
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  const saveContent = async () => {
    setSaving(true)
    try {
      const token = localStorage.getItem('vexl-admin-token')
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } catch (error) {
      console.error('Failed to save content:', error)
    } finally {
      setSaving(false)
    }
  }

  const resetToDefaults = async () => {
    if (confirm('Reset all content to defaults? This cannot be undone.')) {
      setContent(defaultContent)
      await saveContent()
    }
  }

  const logout = () => {
    localStorage.removeItem('vexl-admin-token')
    router.push('/admin/login')
  }

  const startEditing = (fieldPath: string, currentValue: string) => {
    setEditingField(fieldPath)
    setTempValue(currentValue)
  }

  const saveEdit = () => {
    if (!editingField) return

    const path = editingField.split('.')
    const newContent = { ...content }
    let target: any = newContent

    for (let i = 0; i < path.length - 1; i++) {
      if (path[i].includes('[')) {
        const [arrayName, index] = path[i].split('[')
        target = target[arrayName][parseInt(index)]
      } else {
        target = target[path[i]]
      }
    }

    const lastKey = path[path.length - 1]
    target[lastKey] = tempValue

    setContent(newContent)
    setEditingField(null)
    setTempValue('')
  }

  const cancelEdit = () => {
    setEditingField(null)
    setTempValue('')
  }

  const renderEditableText = (fieldPath: string, value: string, className = '') => {
    const isEditing = editingField === fieldPath

    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <textarea
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className="flex-1 px-2 py-1 bg-vexl-gray-800 border border-vexl-yellow rounded text-vexl-white"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                saveEdit()
              } else if (e.key === 'Escape') {
                cancelEdit()
              }
            }}
            rows={3}
          />
          <button onClick={saveEdit} className="p-1 text-green-500 hover:text-green-400">
            <Check size={20} />
          </button>
          <button onClick={cancelEdit} className="p-1 text-red-500 hover:text-red-400">
            <X size={20} />
          </button>
        </div>
      )
    }

    return (
      <div 
        className={`group relative ${className} cursor-pointer hover:bg-vexl-gray-800/50 p-2 rounded transition-colors`}
        onClick={() => startEditing(fieldPath, value)}
      >
        <span>{value}</span>
        <Edit2 className="absolute top-2 right-2 w-4 h-4 text-vexl-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    )
  }

  const renderSection = (sectionKey: string) => {
    const section = content[sectionKey]
    if (!section) return null

    return (
      <div className="space-y-6">
        {section.title && (
          <div>
            <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Title</label>
            {renderEditableText(`${sectionKey}.title`, section.title, 'text-3xl font-bold text-vexl-yellow')}
          </div>
        )}

        {section.subtitle && (
          <div>
            <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Subtitle</label>
            {renderEditableText(`${sectionKey}.subtitle`, section.subtitle, 'text-xl text-vexl-gray-300')}
          </div>
        )}

        {section.description && (
          <div>
            <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Description</label>
            {renderEditableText(`${sectionKey}.description`, section.description, 'text-vexl-gray-400')}
          </div>
        )}

        {section.items && (
          <div>
            <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Content Items</label>
            <div className="space-y-4">
              {section.items.map((item, index) => (
                <div key={item.id} className="p-4 bg-vexl-gray-900 rounded-lg">
                  {item.title && (
                    <div className="mb-2">
                      <label className="block text-xs text-vexl-gray-500 mb-1">Item Title</label>
                      {renderEditableText(`${sectionKey}.items[${index}].title`, item.title, 'font-bold text-vexl-yellow')}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs text-vexl-gray-500 mb-1">Content</label>
                    {renderEditableText(`${sectionKey}.items[${index}].content`, item.content, 'text-vexl-gray-300')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.stats && (
          <div>
            <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Statistics</label>
            <div className="grid grid-cols-3 gap-4">
              {section.stats.map((stat, index) => (
                <div key={stat.id} className="p-4 bg-vexl-gray-900 rounded-lg">
                  <div className="mb-2">
                    <label className="block text-xs text-vexl-gray-500 mb-1">Value</label>
                    {renderEditableText(`${sectionKey}.stats[${index}].value`, stat.value, 'text-2xl font-bold text-vexl-yellow')}
                  </div>
                  <div>
                    <label className="block text-xs text-vexl-gray-500 mb-1">Label</label>
                    {renderEditableText(`${sectionKey}.stats[${index}].label`, stat.label, 'text-sm text-vexl-gray-400')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {section.cta && (
          <div>
            <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Call to Action</label>
            {renderEditableText(`${sectionKey}.cta`, section.cta, 'text-xl font-bold text-vexl-yellow')}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vexl-black text-vexl-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-vexl-gray-900 border-b border-vexl-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <VexlLogo className="w-24 h-auto" />
            <span className="text-lg font-semibold">Content Editor</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={saveContent}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-vexl-yellow text-vexl-black font-semibold rounded-lg hover:bg-vexl-yellow/90 disabled:opacity-50 transition-all"
            >
              {saved ? <Check size={20} /> : <Save size={20} />}
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </button>
            <button
              onClick={resetToDefaults}
              className="flex items-center gap-2 px-4 py-2 bg-vexl-gray-800 text-vexl-gray-300 font-semibold rounded-lg hover:bg-vexl-gray-700 transition-all"
            >
              <RotateCcw size={20} />
              Reset
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/20 text-red-400 font-semibold rounded-lg hover:bg-red-900/30 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-vexl-gray-900 border-r border-vexl-gray-800 overflow-y-auto">
          <nav className="p-4">
            <h3 className="text-xs font-semibold text-vexl-gray-500 uppercase tracking-wider mb-3">Slides</h3>
            <ul className="space-y-1">
              {Object.keys(sectionNames).map((key) => (
                <li key={key}>
                  <button
                    onClick={() => setSelectedSection(key)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedSection === key
                        ? 'bg-vexl-yellow text-vexl-black font-semibold'
                        : 'text-vexl-gray-300 hover:bg-vexl-gray-800'
                    }`}
                  >
                    {sectionNames[key]}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-vexl-yellow">
              {sectionNames[selectedSection]}
            </h2>
            <div className="text-sm text-vexl-gray-500 mb-6">
              Click any text to edit. Press Enter to save, Escape to cancel.
            </div>
            {renderSection(selectedSection)}
          </div>
        </main>
      </div>
    </div>
  )
}