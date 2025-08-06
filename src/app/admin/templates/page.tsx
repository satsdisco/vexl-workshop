'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Save, Plus, Trash2, Edit3, Copy, Download, Upload,
  Check, X, AlertCircle, Loader2, Home, ArrowLeft
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'
import { templates as builtInTemplates } from '@/lib/templates'

export default function TemplateManager() {
  const router = useRouter()
  const [customTemplates, setCustomTemplates] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
      return
    }
    loadCustomTemplates()
  }, [router])

  const loadCustomTemplates = async () => {
    try {
      const saved = localStorage.getItem('vexl-custom-templates')
      if (saved) {
        setCustomTemplates(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load custom templates:', error)
    }
  }

  const saveCustomTemplates = (templates: any[]) => {
    localStorage.setItem('vexl-custom-templates', JSON.stringify(templates))
    setCustomTemplates(templates)
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const createTemplateFromCurrent = async () => {
    setLoading(true)
    try {
      // Load current content from database
      const response = await fetch('/api/admin/slides')
      const data = await response.json()
      
      if (data.success) {
        const newTemplate = {
          id: `custom_${Date.now()}`,
          name: 'New Template',
          description: 'Custom template based on current content',
          slides: data.content,
          features: {},
          config: {
            technicalLevel: 'intermediate',
            focusArea: 'custom',
            primaryColor: '#FF9500'
          },
          isCustom: true,
          createdAt: new Date().toISOString()
        }
        
        setEditingTemplate(newTemplate)
        setIsCreating(true)
      }
    } catch (error) {
      showNotification('error', 'Failed to create template')
    } finally {
      setLoading(false)
    }
  }

  const saveTemplate = () => {
    if (!editingTemplate.name || editingTemplate.name.trim() === '') {
      showNotification('error', 'Template name is required')
      return
    }

    if (isCreating) {
      const newTemplates = [...customTemplates, editingTemplate]
      saveCustomTemplates(newTemplates)
      showNotification('success', 'Template created successfully')
    } else {
      const newTemplates = customTemplates.map(t => 
        t.id === editingTemplate.id ? editingTemplate : t
      )
      saveCustomTemplates(newTemplates)
      showNotification('success', 'Template updated successfully')
    }
    
    setEditingTemplate(null)
    setIsCreating(false)
  }

  const deleteTemplate = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      const newTemplates = customTemplates.filter(t => t.id !== id)
      saveCustomTemplates(newTemplates)
      showNotification('success', 'Template deleted')
    }
  }

  const applyTemplate = async (templateId: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/templates/apply', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify({ 
          templateName: templateId,
          customTemplate: customTemplates.find(t => t.id === templateId)
        })
      })
      
      if (response.ok) {
        showNotification('success', 'Template applied successfully')
        router.push('/admin/cms')
      }
    } catch (error) {
      showNotification('error', 'Failed to apply template')
    } finally {
      setLoading(false)
    }
  }

  const exportTemplate = (template: any) => {
    const data = JSON.stringify(template, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vexl-template-${template.name.toLowerCase().replace(/\s+/g, '-')}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const allTemplates = [
    ...Object.entries(builtInTemplates).map(([id, template]) => ({
      ...template,
      id,
      isBuiltIn: true
    })),
    ...customTemplates
  ]

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <header className="bg-vexl-gray-900 border-b border-vexl-gray-800 sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <VexlLogo className="w-24 h-auto" />
            <h1 className="text-xl font-bold">Template Manager</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/admin/cms')}
              className="flex items-center gap-2 px-4 py-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg"
            >
              <ArrowLeft size={18} />
              Back to CMS
            </button>
            
            <button
              onClick={createTemplateFromCurrent}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-vexl-yellow text-vexl-black font-semibold rounded-lg hover:bg-vexl-yellow/90 disabled:opacity-50"
            >
              <Plus size={18} />
              Create from Current
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        {editingTemplate ? (
          // Edit/Create Mode
          <div className="bg-vexl-gray-900 border border-vexl-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">
              {isCreating ? 'Create New Template' : 'Edit Template'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Template Name</label>
                <input
                  type="text"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                  className="w-full px-4 py-2 bg-vexl-black border border-vexl-gray-700 rounded-lg focus:border-vexl-yellow focus:outline-none"
                  placeholder="Enter template name..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-vexl-gray-400 mb-2">Description</label>
                <textarea
                  value={editingTemplate.description}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-vexl-black border border-vexl-gray-700 rounded-lg focus:border-vexl-yellow focus:outline-none"
                  placeholder="Describe this template..."
                />
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={saveTemplate}
                  className="flex items-center gap-2 px-6 py-2 bg-vexl-yellow text-vexl-black font-semibold rounded-lg hover:bg-vexl-yellow/90"
                >
                  <Save size={18} />
                  Save Template
                </button>
                
                <button
                  onClick={() => {
                    setEditingTemplate(null)
                    setIsCreating(false)
                  }}
                  className="px-6 py-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Template Grid
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-vexl-gray-900 border border-vexl-gray-800 rounded-lg overflow-hidden hover:border-vexl-gray-700 transition-colors"
              >
                {/* Color Bar */}
                <div className={`h-2 ${
                  template.id === 'default' ? 'bg-vexl-yellow' :
                  template.id === 'bitcoinMaximalist' ? 'bg-orange-500' :
                  template.id === 'businessFocus' ? 'bg-blue-500' :
                  template.id === 'communityBuilder' ? 'bg-green-500' :
                  template.id === 'privacyAdvocate' ? 'bg-purple-500' :
                  template.id === 'workshopQuick' ? 'bg-gray-500' :
                  'bg-vexl-gray-700'
                }`} />
                
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {template.name}
                        {template.id === 'default' && (
                          <span className="text-xs px-2 py-0.5 bg-vexl-yellow text-vexl-black rounded">DEFAULT</span>
                        )}
                        {template.isCustom && (
                          <span className="text-xs px-2 py-0.5 bg-vexl-gray-700 rounded">CUSTOM</span>
                        )}
                      </h3>
                      <p className="text-sm text-vexl-gray-400 mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => applyTemplate(template.id)}
                      disabled={loading}
                      className="flex-1 px-3 py-2 bg-vexl-yellow text-vexl-black font-medium rounded-lg hover:bg-vexl-yellow/90 disabled:opacity-50"
                    >
                      Apply
                    </button>
                    
                    {template.isCustom && (
                      <>
                        <button
                          onClick={() => setEditingTemplate(template)}
                          className="p-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteTemplate(template.id)}
                          className="p-2 bg-red-900/20 hover:bg-red-900/30 text-red-400 rounded-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                    
                    <button
                      onClick={() => exportTemplate(template)}
                      className="p-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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