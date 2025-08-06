'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import VexlLogo from '@/components/VexlLogo'
import RichTextEditor from '@/components/admin/RichTextEditor'
import DataTableEditor from '@/components/admin/DataTableEditor'
import ToggleManager from '@/components/admin/ToggleManager'
import ConfigurationPanel from '@/components/admin/ConfigurationPanel'
import { 
  Save, LogOut, FileText, Grid, Settings, Eye, 
  Download, Upload, Palette, Users, Package,
  RotateCcw, Check, AlertCircle
} from 'lucide-react'

type TabType = 'slides' | 'components' | 'features' | 'config' | 'templates'
type EditMode = 'text' | 'data' | 'toggles' | 'config'

export default function AdvancedAdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('slides')
  const [selectedSection, setSelectedSection] = useState('hookSection')
  const [editMode, setEditMode] = useState<EditMode>('text')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  
  // Content states
  const [slideContent, setSlideContent] = useState<any>({})
  const [componentData, setComponentData] = useState<any>({})
  const [features, setFeatures] = useState<any[]>([])
  const [config, setConfig] = useState<any[]>([])
  const [templates, setTemplates] = useState<any[]>([])

  const sections = {
    slides: [
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
    ],
    components: [
      { id: 'contacts', name: 'Contacts Data', icon: '👥' },
      { id: 'businesses', name: 'Businesses', icon: '🏪' },
      { id: 'skills', name: 'Skills', icon: '💼' },
      { id: 'trades', name: 'Trade Examples', icon: '🔄' },
      { id: 'demoSteps', name: 'Demo Steps', icon: '📋' },
      { id: 'calculations', name: 'Calculations', icon: '🧮' }
    ]
  }

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Load all content
    loadContent()
  }, [router])

  const loadContent = async () => {
    try {
      // Load slides
      const slidesRes = await fetch('/api/admin/slides')
      const slidesData = await slidesRes.json()
      if (slidesData.success) {
        setSlideContent(slidesData.content)
      }

      // Load components
      const componentsRes = await fetch('/api/admin/components')
      const componentsData = await componentsRes.json()
      if (componentsData.success) {
        const grouped = componentsData.components.reduce((acc: any, comp: any) => {
          acc[comp.componentId] = comp
          return acc
        }, {})
        setComponentData(grouped)
      }

      // Load features
      const featuresRes = await fetch('/api/admin/features')
      const featuresData = await featuresRes.json()
      if (featuresData.success) {
        const featuresList = Object.entries(featuresData.features).map(([id, data]: [string, any]) => ({
          id,
          label: id.replace(/([A-Z])/g, ' $1').trim(),
          enabled: data.enabled,
          category: data.section || 'General',
          description: data.config?.description
        }))
        setFeatures(featuresList)
      }

      // Load config
      const configRes = await fetch('/api/admin/config')
      const configData = await configRes.json()
      if (configData.success) {
        const configList = configData.configs.map((c: any) => ({
          id: c.key,
          label: c.key.replace(/([A-Z])/g, ' $1').trim(),
          type: c.category === 'theme' ? 'color' : 'number',
          value: c.value,
          description: c.description
        }))
        setConfig(configList)
      }

      // Load templates
      const templatesRes = await fetch('/api/admin/templates')
      const templatesData = await templatesRes.json()
      if (templatesData.success) {
        setTemplates(templatesData.templates)
      }
    } catch (error) {
      console.error('Failed to load content:', error)
      setError('Failed to load content')
    }
  }

  const saveAll = async () => {
    setSaving(true)
    setError('')
    
    try {
      const token = localStorage.getItem('vexl-admin-token')
      
      // Save slide content
      if (activeTab === 'slides') {
        await fetch('/api/admin/slides', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            sectionId: selectedSection,
            content: slideContent[selectedSection] || {}
          })
        })
      }

      // Save component data
      if (activeTab === 'components') {
        const component = componentData[selectedSection]
        if (component) {
          await fetch('/api/admin/components', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(component)
          })
        }
      }

      // Save features
      if (activeTab === 'features') {
        const featuresObj = features.reduce((acc, f) => {
          acc[f.id] = {
            enabled: f.enabled,
            section: f.category,
            config: { description: f.description }
          }
          return acc
        }, {} as any)
        
        await fetch('/api/admin/features', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ features: featuresObj })
        })
      }

      // Save config
      if (activeTab === 'config') {
        for (const item of config) {
          await fetch('/api/admin/config', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              key: item.id,
              value: item.value,
              category: item.type === 'color' ? 'theme' : 'values',
              description: item.description
            })
          })
        }
      }

      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Save error:', error)
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const applyTemplate = async (templateName: string) => {
    if (!confirm(`Apply template "${templateName}"? This will overwrite current content.`)) {
      return
    }

    try {
      const token = localStorage.getItem('vexl-admin-token')
      await fetch('/api/admin/templates', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ templateName })
      })
      
      // Reload content
      await loadContent()
      alert(`Template "${templateName}" applied successfully!`)
    } catch (error) {
      console.error('Failed to apply template:', error)
      setError('Failed to apply template')
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'slides':
        const section = slideContent[selectedSection] || {}
        return (
          <div className="space-y-6">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setEditMode('text')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  editMode === 'text' ? 'bg-vexl-yellow text-vexl-black' : 'bg-vexl-gray-800'
                }`}
              >
                <FileText className="inline w-4 h-4 mr-2" />
                Text Content
              </button>
              <button
                onClick={() => setEditMode('data')}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  editMode === 'data' ? 'bg-vexl-yellow text-vexl-black' : 'bg-vexl-gray-800'
                }`}
              >
                <Grid className="inline w-4 h-4 mr-2" />
                Data Items
              </button>
            </div>

            {editMode === 'text' ? (
              <div className="space-y-4">
                {section.title !== undefined && (
                  <div>
                    <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Title</label>
                    <RichTextEditor
                      value={section.title || ''}
                      onChange={(value) => setSlideContent({
                        ...slideContent,
                        [selectedSection]: { ...section, title: value }
                      })}
                      placeholder="Enter slide title..."
                    />
                  </div>
                )}
                {section.subtitle !== undefined && (
                  <div>
                    <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Subtitle</label>
                    <RichTextEditor
                      value={section.subtitle || ''}
                      onChange={(value) => setSlideContent({
                        ...slideContent,
                        [selectedSection]: { ...section, subtitle: value }
                      })}
                      placeholder="Enter subtitle..."
                    />
                  </div>
                )}
                {section.description !== undefined && (
                  <div>
                    <label className="block text-sm font-semibold text-vexl-gray-400 mb-2">Description</label>
                    <RichTextEditor
                      value={section.description || ''}
                      onChange={(value) => setSlideContent({
                        ...slideContent,
                        [selectedSection]: { ...section, description: value }
                      })}
                      placeholder="Enter description..."
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                {section.items && (
                  <DataTableEditor
                    data={section.items}
                    columns={[
                      { key: 'title', label: 'Title', editable: true },
                      { key: 'content', label: 'Content', editable: true },
                      { key: 'icon', label: 'Icon', editable: true }
                    ]}
                    onSave={(items) => setSlideContent({
                      ...slideContent,
                      [selectedSection]: { ...section, items }
                    })}
                  />
                )}
                {section.stats && (
                  <DataTableEditor
                    data={section.stats}
                    columns={[
                      { key: 'value', label: 'Value', editable: true },
                      { key: 'label', label: 'Label', editable: true }
                    ]}
                    onSave={(stats) => setSlideContent({
                      ...slideContent,
                      [selectedSection]: { ...section, stats }
                    })}
                  />
                )}
              </div>
            )}
          </div>
        )

      case 'components':
        const component = componentData[selectedSection] || { data: [] }
        return (
          <DataTableEditor
            data={component.data || []}
            columns={
              selectedSection === 'contacts' ? [
                { key: 'name', label: 'Name' },
                { key: 'category', label: 'Category', type: 'select', options: ['friend', 'family', 'colleague', 'community'] },
                { key: 'trustScore', label: 'Trust', type: 'number', min: 0, max: 10 },
                { key: 'isVexlUser', label: 'Vexl User', type: 'boolean' }
              ] :
              selectedSection === 'businesses' ? [
                { key: 'name', label: 'Business Name' },
                { key: 'type', label: 'Type' },
                { key: 'owner', label: 'Owner' },
                { key: 'acceptsBitcoin', label: 'Accepts BTC', type: 'boolean' }
              ] :
              selectedSection === 'skills' ? [
                { key: 'name', label: 'Skill' },
                { key: 'category', label: 'Category' },
                { key: 'icon', label: 'Icon' }
              ] :
              [
                { key: 'id', label: 'ID' },
                { key: 'value', label: 'Value' }
              ]
            }
            onSave={(data) => setComponentData({
              ...componentData,
              [selectedSection]: {
                ...component,
                componentId: selectedSection,
                componentType: selectedSection,
                data
              }
            })}
          />
        )

      case 'features':
        return (
          <ToggleManager
            toggles={features}
            onChange={setFeatures}
            grouped={true}
          />
        )

      case 'config':
        return (
          <ConfigurationPanel
            config={config}
            onChange={setConfig}
          />
        )

      case 'templates':
        return (
          <div className="space-y-4">
            <div className="bg-vexl-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Available Templates</h3>
              <div className="grid grid-cols-2 gap-4">
                {templates.map(template => (
                  <div key={template.id} className="p-4 bg-vexl-gray-800 rounded-lg">
                    <h4 className="font-semibold mb-2">{template.name}</h4>
                    <p className="text-sm text-vexl-gray-400 mb-3">{template.description}</p>
                    <button
                      onClick={() => applyTemplate(template.name)}
                      className="px-3 py-1 bg-vexl-yellow text-vexl-black text-sm font-semibold rounded hover:bg-vexl-yellow/90"
                    >
                      Apply Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-vexl-gray-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Save Current as Template</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Template name..."
                  className="flex-1 px-4 py-2 bg-vexl-gray-800 rounded-lg"
                />
                <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
                  Save Template
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-vexl-black text-vexl-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-vexl-gray-900 border-b border-vexl-gray-800">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <VexlLogo className="w-24 h-auto" />
            <span className="text-lg font-semibold">Advanced Admin</span>
          </div>
          
          <div className="flex items-center gap-4">
            {error && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-900/20 text-red-400 rounded">
                <AlertCircle size={16} />
                {error}
              </div>
            )}
            
            <button
              onClick={saveAll}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-vexl-yellow text-vexl-black font-semibold rounded-lg hover:bg-vexl-yellow/90 disabled:opacity-50"
            >
              {saved ? <Check size={20} /> : <Save size={20} />}
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All'}
            </button>
            
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 px-4 py-2 bg-vexl-gray-800 text-vexl-gray-300 font-semibold rounded-lg hover:bg-vexl-gray-700"
            >
              <Eye size={20} />
              Preview
            </button>
            
            <button
              onClick={() => {
                localStorage.removeItem('vexl-admin-token')
                router.push('/admin/login')
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/20 text-red-400 font-semibold rounded-lg hover:bg-red-900/30"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex gap-1 px-6 pb-2">
          {[
            { id: 'slides', label: 'Slides', icon: <FileText size={16} /> },
            { id: 'components', label: 'Components', icon: <Grid size={16} /> },
            { id: 'features', label: 'Features', icon: <Eye size={16} /> },
            { id: 'config', label: 'Config', icon: <Settings size={16} /> },
            { id: 'templates', label: 'Templates', icon: <Package size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg font-semibold transition-colors ${
                activeTab === tab.id
                  ? 'bg-vexl-black text-vexl-yellow'
                  : 'bg-vexl-gray-800 text-vexl-gray-400 hover:text-vexl-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-vexl-gray-900 border-r border-vexl-gray-800 overflow-y-auto">
          <nav className="p-4">
            <h3 className="text-xs font-semibold text-vexl-gray-500 uppercase tracking-wider mb-3">
              {activeTab === 'slides' ? 'Slides' : 
               activeTab === 'components' ? 'Components' :
               activeTab === 'features' ? 'Feature Areas' :
               activeTab === 'config' ? 'Configuration' :
               'Options'}
            </h3>
            <ul className="space-y-1">
              {(sections[activeTab as 'slides' | 'components'] || []).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setSelectedSection(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                      selectedSection === item.id
                        ? 'bg-vexl-yellow text-vexl-black font-semibold'
                        : 'text-vexl-gray-300 hover:bg-vexl-gray-800'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-5xl mx-auto p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}