'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Copy, Trash2, Edit3, Eye, Plus, Check,
  ArrowLeft, Download, Upload, Globe, Lock,
  Calendar, User, Star, MoreVertical, RotateCcw
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'

interface Template {
  id: string
  name: string
  description: string
  thumbnail?: string
  sections: any
  createdAt: string
  updatedAt: string
  isActive: boolean
  category: 'default' | 'custom' | 'seasonal' | 'event'
}

export default function TemplatesPage() {
  const router = useRouter()
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTemplateName, setNewTemplateName] = useState('')
  const [newTemplateDescription, setNewTemplateDescription] = useState('')
  const [newTemplateCategory, setNewTemplateCategory] = useState<Template['category']>('custom')

  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    loadTemplates()
  }, [router])

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/admin/templates', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        setTemplates(data.templates || [])
      }
    } catch (error) {
      console.error('Error loading templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const createTemplateFromCurrent = async () => {
    if (!newTemplateName) {
      showNotification('Please enter a template name', 'error')
      return
    }

    setCreating(true)
    try {
      const response = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify({
          action: 'create',
          name: newTemplateName,
          description: newTemplateDescription,
          category: newTemplateCategory,
          cloneFromCurrent: true
        })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        await loadTemplates()
        setShowCreateModal(false)
        setNewTemplateName('')
        setNewTemplateDescription('')
        setNewTemplateCategory('custom')
        showNotification('Template created successfully!')
      } else {
        console.error('Template creation failed:', data)
        showNotification(data.error || 'Failed to create template', 'error')
      }
    } catch (error) {
      console.error('Error creating template:', error)
      showNotification('Failed to create template. Please try again.', 'error')
    } finally {
      setCreating(false)
    }
  }

  const applyTemplate = async (templateId: string) => {
    if (!confirm('This will replace the current workshop content. Are you sure?')) return

    try {
      const response = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify({
          action: 'apply',
          templateId
        })
      })

      if (response.ok) {
        showNotification('Template applied successfully!')
        // Refresh templates to update active status
        await loadTemplates()
      }
    } catch (error) {
      console.error('Error applying template:', error)
      showNotification('Failed to apply template', 'error')
    }
  }

  const deleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      const response = await fetch('/api/admin/templates', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify({ templateId })
      })

      if (response.ok) {
        await loadTemplates()
        showNotification('Template deleted successfully!')
      }
    } catch (error) {
      console.error('Error deleting template:', error)
      showNotification('Failed to delete template', 'error')
    }
  }

  const resetToMaster = async () => {
    if (!confirm('This will reset the workshop to the original master template. All current changes will be lost. Are you sure?')) return

    try {
      const response = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify({
          action: 'reset'
        })
      })

      const data = await response.json()
      
      if (response.ok && data.success) {
        showNotification('Workshop reset to master template successfully!')
        await loadTemplates()
      } else {
        showNotification(data.error || 'Failed to reset', 'error')
      }
    } catch (error) {
      console.error('Error resetting to master:', error)
      showNotification('Failed to reset to master template', 'error')
    }
  }

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const notification = document.createElement('div')
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white shadow-lg z-50 ${
      type === 'success' ? 'bg-green-600' : 'bg-red-600'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 3000)
  }

  const getCategoryColor = (category: Template['category']) => {
    switch (category) {
      case 'default': return 'bg-vexl-blue text-white'
      case 'custom': return 'bg-vexl-yellow text-black'
      case 'seasonal': return 'bg-vexl-green text-white'
      case 'event': return 'bg-purple-600 text-white'
      default: return 'bg-vexl-gray-700 text-white'
    }
  }

  // Default templates to show even if none exist
  const defaultTemplates: Template[] = [
    {
      id: 'default-main',
      name: 'Main Workshop',
      description: 'The primary Vexl workshop presentation with all 11 core sections',
      category: 'default',
      sections: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isActive: true
    }
  ]

  const displayTemplates = templates.length > 0 ? templates : defaultTemplates

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-vexl-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <VexlLogo />
              <div>
                <h1 className="text-xl font-bold text-white">Template Manager</h1>
                <p className="text-sm text-vexl-gray-400">Create and manage workshop templates</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={resetToMaster}
                className="flex items-center space-x-2 px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                title="Reset to original workshop content"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Master</span>
              </button>
              
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90 transition-colors font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Clone Current Workshop</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-vexl-gray-900 rounded-lg p-4 border border-vexl-gray-800">
            <div className="text-2xl font-bold text-white mb-1">{displayTemplates.length}</div>
            <div className="text-sm text-vexl-gray-400">Total Templates</div>
          </div>
          <div className="bg-vexl-gray-900 rounded-lg p-4 border border-vexl-gray-800">
            <div className="text-2xl font-bold text-vexl-yellow mb-1">
              {displayTemplates.filter(t => t.category === 'custom').length}
            </div>
            <div className="text-sm text-vexl-gray-400">Custom Templates</div>
          </div>
          <div className="bg-vexl-gray-900 rounded-lg p-4 border border-vexl-gray-800">
            <div className="text-2xl font-bold text-vexl-green mb-1">1</div>
            <div className="text-sm text-vexl-gray-400">Active Template</div>
          </div>
          <div className="bg-vexl-gray-900 rounded-lg p-4 border border-vexl-gray-800">
            <div className="text-2xl font-bold text-vexl-blue mb-1">11</div>
            <div className="text-sm text-vexl-gray-400">Sections per Template</div>
          </div>
        </div>

        {/* Templates Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vexl-yellow"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTemplates.map((template) => (
              <div
                key={template.id}
                className={`
                  relative group bg-vexl-gray-900 rounded-xl border-2 overflow-hidden
                  ${template.isActive ? 'border-vexl-yellow' : 'border-vexl-gray-800'}
                  hover:border-vexl-yellow transition-all
                `}
              >
                {/* Active Badge */}
                {template.isActive && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center space-x-1 px-3 py-1 bg-vexl-yellow text-black rounded-full text-xs font-bold">
                      <Check className="w-3 h-3" />
                      <span>ACTIVE</span>
                    </div>
                  </div>
                )}

                {/* Thumbnail Preview */}
                <div className="aspect-video bg-gradient-to-br from-vexl-gray-800 to-vexl-black relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-vexl-gray-700 mb-2" style={{ fontFamily: 'Monument Extended' }}>
                        {template.name.charAt(0)}
                      </div>
                      <div className="text-xs text-vexl-gray-600 uppercase tracking-wider">Template</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white flex-1">
                      {template.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-vexl-gray-400 mb-4 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-vexl-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                    </div>
                    {template.category === 'custom' && (
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>Custom</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {!template.isActive && (
                      <button
                        onClick={() => applyTemplate(template.id)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90 transition-colors font-medium text-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Apply</span>
                      </button>
                    )}
                    
                    <Link
                      href={`/workshop?template=${template.id}`}
                      className="flex items-center justify-center p-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700 transition-colors"
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    
                    {template.category !== 'default' && (
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="flex items-center justify-center p-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Template Card */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="group bg-vexl-gray-900 rounded-xl border-2 border-dashed border-vexl-gray-700 hover:border-vexl-yellow transition-all flex flex-col items-center justify-center min-h-[300px]"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-vexl-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-vexl-yellow/20 transition-colors">
                  <Plus className="w-8 h-8 text-vexl-gray-400 group-hover:text-vexl-yellow" />
                </div>
                <h3 className="text-white font-semibold mb-1">Create New Template</h3>
                <p className="text-sm text-vexl-gray-400">Clone the current workshop</p>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-vexl-gray-900 rounded-xl p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4">Create New Template</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-vexl-gray-300 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={newTemplateName}
                  onChange={(e) => setNewTemplateName(e.target.value)}
                  placeholder="e.g., Conference Version"
                  className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-vexl-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={newTemplateDescription}
                  onChange={(e) => setNewTemplateDescription(e.target.value)}
                  placeholder="Describe this template version..."
                  rows={3}
                  className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow resize-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-vexl-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newTemplateCategory}
                  onChange={(e) => setNewTemplateCategory(e.target.value as Template['category'])}
                  className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                >
                  <option value="custom">Custom</option>
                  <option value="seasonal">Seasonal</option>
                  <option value="event">Event</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowCreateModal(false)
                  setNewTemplateName('')
                  setNewTemplateDescription('')
                }}
                className="px-4 py-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createTemplateFromCurrent}
                disabled={!newTemplateName || creating}
                className="px-4 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {creating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Template</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}