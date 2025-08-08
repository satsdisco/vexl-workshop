'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Save, Plus, Trash2, Copy, Move, Settings, Eye, Grid, 
  Layers, ChevronRight, ChevronDown, Download, Upload,
  RefreshCw, Palette, Layout, Type, Image, Code, Users
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'
import { availableModules, slideLayouts, SlideConfig, ModuleInstance } from '@/lib/slide-modules'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Module palette item component
function ModulePaletteItem({ module }: { module: any }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'module',
    item: { module },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  return (
    <div
      ref={drag as any}
      className={`p-3 bg-vexl-gray-800 rounded-lg cursor-move hover:bg-vexl-gray-700 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="text-2xl mb-1">{module.icon}</div>
      <div className="text-sm font-medium text-white">{module.name}</div>
      <div className="text-xs text-vexl-gray-400">{module.description}</div>
    </div>
  )
}

// Canvas drop zone
function SlideCanvas({ slide, onUpdateModule, onDeleteModule, selectedModule, onSelectModule }: any) {
  const [, drop] = useDrop(() => ({
    accept: 'module',
    drop: (item: any, monitor) => {
      const offset = monitor.getClientOffset()
      const canvas = document.getElementById('slide-canvas')
      if (offset && canvas) {
        const rect = canvas.getBoundingClientRect()
        const x = ((offset.x - rect.left) / rect.width) * 100
        const y = ((offset.y - rect.top) / rect.height) * 100
        
        const newModule: ModuleInstance = {
          id: `module-${Date.now()}`,
          moduleId: item.module.id,
          position: { x: Math.max(0, Math.min(80, x - 10)), y: Math.max(0, Math.min(80, y - 10)), width: 20, height: 20 },
          config: { ...item.module.defaultConfig },
          content: {}
        }
        
        onUpdateModule(newModule)
      }
    },
  }))

  return (
    <div
      id="slide-canvas"
      ref={drop as any}
      className="relative w-full h-full bg-vexl-gray-900 rounded-lg overflow-hidden"
      style={{ aspectRatio: '16/9' }}
    >
      {slide.modules.map((moduleInstance: ModuleInstance) => {
        const module = availableModules.find(m => m.id === moduleInstance.moduleId)
        if (!module) return null
        
        return (
          <div
            key={moduleInstance.id}
            onClick={() => onSelectModule(moduleInstance.id)}
            className={`absolute bg-vexl-gray-800 rounded-lg p-4 cursor-pointer transition-all ${
              selectedModule === moduleInstance.id ? 'ring-2 ring-vexl-yellow' : 'hover:ring-2 hover:ring-vexl-gray-600'
            }`}
            style={{
              left: `${moduleInstance.position.x}%`,
              top: `${moduleInstance.position.y}%`,
              width: `${moduleInstance.position.width}%`,
              height: `${moduleInstance.position.height}%`
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{module.icon}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteModule(moduleInstance.id)
                }}
                className="text-red-500 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-sm font-medium text-white">{module.name}</div>
            {moduleInstance.content.text && (
              <div className="text-xs text-vexl-gray-400 mt-1 truncate">
                {moduleInstance.content.text}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Module property editor
function PropertyEditor({ moduleInstance, module, onUpdate }: any) {
  if (!module || !moduleInstance) {
    return (
      <div className="p-4 text-vexl-gray-400 text-center">
        Select a module to edit its properties
      </div>
    )
  }

  const handleFieldChange = (key: string, value: any) => {
    onUpdate({
      ...moduleInstance,
      content: {
        ...moduleInstance.content,
        [key]: value
      }
    })
  }

  const handleConfigChange = (key: string, value: any) => {
    onUpdate({
      ...moduleInstance,
      config: {
        ...moduleInstance.config,
        [key]: value
      }
    })
  }

  const handlePositionChange = (key: string, value: number) => {
    onUpdate({
      ...moduleInstance,
      position: {
        ...moduleInstance.position,
        [key]: value
      }
    })
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <span className="text-2xl mr-2">{module.icon}</span>
          {module.name}
        </h3>
      </div>

      {/* Position Controls */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-vexl-gray-400">Position & Size</h4>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs text-vexl-gray-500">X</label>
            <input
              type="number"
              min="0"
              max="100"
              value={moduleInstance.position.x}
              onChange={(e) => handlePositionChange('x', parseInt(e.target.value))}
              className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-vexl-gray-500">Y</label>
            <input
              type="number"
              min="0"
              max="100"
              value={moduleInstance.position.y}
              onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
              className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-vexl-gray-500">Width</label>
            <input
              type="number"
              min="10"
              max="100"
              value={moduleInstance.position.width}
              onChange={(e) => handlePositionChange('width', parseInt(e.target.value))}
              className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
            />
          </div>
          <div>
            <label className="text-xs text-vexl-gray-500">Height</label>
            <input
              type="number"
              min="10"
              max="100"
              value={moduleInstance.position.height}
              onChange={(e) => handlePositionChange('height', parseInt(e.target.value))}
              className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
            />
          </div>
        </div>
      </div>

      {/* Content Fields */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-vexl-gray-400">Content</h4>
        {module.editableFields.map((field: any) => (
          <div key={field.key}>
            <label className="block text-xs font-medium text-vexl-gray-500 mb-1">
              {field.label}
            </label>
            
            {field.type === 'text' && (
              <input
                type="text"
                value={moduleInstance.content[field.key] || ''}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-vexl-yellow text-sm"
              />
            )}
            
            {field.type === 'textarea' && (
              <textarea
                value={moduleInstance.content[field.key] || ''}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={3}
                className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-vexl-yellow text-sm"
              />
            )}
            
            {field.type === 'number' && (
              <input
                type="number"
                value={moduleInstance.content[field.key] || ''}
                onChange={(e) => handleFieldChange(field.key, parseInt(e.target.value))}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-vexl-yellow text-sm"
              />
            )}
            
            {field.type === 'boolean' && (
              <button
                onClick={() => handleFieldChange(field.key, !moduleInstance.content[field.key])}
                className={`px-3 py-1 rounded text-sm ${
                  moduleInstance.content[field.key] 
                    ? 'bg-vexl-yellow text-black' 
                    : 'bg-vexl-gray-700 text-vexl-gray-400'
                }`}
              >
                {moduleInstance.content[field.key] ? 'Enabled' : 'Disabled'}
              </button>
            )}
            
            {field.type === 'select' && (
              <select
                value={moduleInstance.content[field.key] || field.options[0].value}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-vexl-yellow text-sm"
              >
                {field.options.map((option: any) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'array' && (
              <div className="space-y-2">
                {(moduleInstance.content[field.key] || []).map((item: any, index: number) => (
                  <div key={index} className="p-2 bg-vexl-gray-700 rounded">
                    {field.arrayFields.map((subField: any) => (
                      <input
                        key={subField.key}
                        type="text"
                        value={item[subField.key] || ''}
                        onChange={(e) => {
                          const newArray = [...(moduleInstance.content[field.key] || [])]
                          newArray[index] = { ...newArray[index], [subField.key]: e.target.value }
                          handleFieldChange(field.key, newArray)
                        }}
                        placeholder={subField.label}
                        className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm mb-1"
                      />
                    ))}
                    <button
                      onClick={() => {
                        const newArray = moduleInstance.content[field.key].filter((_: any, i: number) => i !== index)
                        handleFieldChange(field.key, newArray)
                      }}
                      className="text-red-500 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newArray = [...(moduleInstance.content[field.key] || []), {}]
                    handleFieldChange(field.key, newArray)
                  }}
                  className="text-vexl-yellow text-sm"
                >
                  + Add Item
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function SlideBuilder() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'modules' | 'properties' | 'templates'>('modules')
  const [currentSlide, setCurrentSlide] = useState<SlideConfig>({
    id: 'slide-1',
    name: 'New Slide',
    layout: 'custom',
    modules: []
  })
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [slides, setSlides] = useState<SlideConfig[]>([currentSlide])
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  const [filterCategory, setFilterCategory] = useState<'all' | 'content' | 'interactive' | 'visual' | 'data'>('all')

  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 3000)
  }

  const updateModule = (module: ModuleInstance) => {
    setCurrentSlide(prev => ({
      ...prev,
      modules: [...prev.modules.filter(m => m.id !== module.id), module]
    }))
  }

  const deleteModule = (moduleId: string) => {
    setCurrentSlide(prev => ({
      ...prev,
      modules: prev.modules.filter(m => m.id !== moduleId)
    }))
    if (selectedModule === moduleId) {
      setSelectedModule(null)
    }
  }

  const applyLayout = (layoutKey: string) => {
    const layout = slideLayouts[layoutKey as keyof typeof slideLayouts]
    if (layout && layout.positions.length > 0) {
      showNotification('success', `Applied ${layout.name} layout`)
    }
  }

  const saveAsTemplate = async () => {
    const templateName = prompt('Enter template name:')
    if (!templateName) return

    try {
      const token = localStorage.getItem('vexl-admin-token')
      const response = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: templateName,
          description: `Template with ${currentSlide.modules.length} modules`,
          slides: [currentSlide],
          config: {}
        })
      })

      if (response.ok) {
        showNotification('success', 'Template saved successfully!')
      }
    } catch (error) {
      showNotification('error', 'Failed to save template')
    }
  }

  const exportSlide = () => {
    const data = JSON.stringify(currentSlide, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${currentSlide.name.replace(/\s+/g, '-').toLowerCase()}.json`
    a.click()
  }

  const importSlide = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const slide = JSON.parse(e.target?.result as string)
        setCurrentSlide(slide)
        showNotification('success', 'Slide imported successfully!')
      } catch (error) {
        showNotification('error', 'Invalid slide file')
      }
    }
    reader.readAsText(file)
  }

  const addNewSlide = () => {
    const newSlide: SlideConfig = {
      id: `slide-${Date.now()}`,
      name: `Slide ${slides.length + 1}`,
      layout: 'custom',
      modules: []
    }
    setSlides([...slides, newSlide])
    setCurrentSlideIndex(slides.length)
    setCurrentSlide(newSlide)
  }

  const filteredModules = filterCategory === 'all' 
    ? availableModules 
    : availableModules.filter(m => m.category === filterCategory)

  const selectedModuleInstance = currentSlide.modules.find(m => m.id === selectedModule)
  const selectedModuleType = selectedModuleInstance 
    ? availableModules.find(m => m.id === selectedModuleInstance.moduleId)
    : null

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-vexl-black">
        {/* Header */}
        <div className="bg-vexl-gray-900 border-b border-vexl-gray-800">
          <div className="max-w-full mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <VexlLogo />
                <h1 className="text-xl font-bold text-white">Slide Builder</h1>
                <input
                  type="text"
                  value={currentSlide.name}
                  onChange={(e) => setCurrentSlide(prev => ({ ...prev, name: e.target.value }))}
                  className="px-3 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={saveAsTemplate}
                  className="px-3 py-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm">Save as Template</span>
                </button>
                
                <button
                  onClick={exportSlide}
                  className="px-3 py-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
                >
                  <Download className="w-4 h-4" />
                </button>
                
                <label className="px-3 py-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <input type="file" accept=".json" onChange={importSlide} className="hidden" />
                </label>
                
                <button
                  onClick={() => window.open('/', '_blank')}
                  className="px-3 py-2 bg-vexl-yellow text-black rounded hover:bg-vexl-yellow/90 flex items-center space-x-2"
                >
                  <Eye className="w-4 h-4" />
                  <span className="text-sm">Preview</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Left Sidebar - Module Palette */}
          <div className="w-80 bg-vexl-gray-900 border-r border-vexl-gray-800 flex flex-col">
            <div className="p-4 border-b border-vexl-gray-800">
              <div className="flex space-x-2 mb-3">
                <button
                  onClick={() => setActiveTab('modules')}
                  className={`flex-1 px-3 py-2 rounded text-sm ${
                    activeTab === 'modules' ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'
                  }`}
                >
                  Modules
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`flex-1 px-3 py-2 rounded text-sm ${
                    activeTab === 'templates' ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'
                  }`}
                >
                  Templates
                </button>
              </div>
              
              {activeTab === 'modules' && (
                <div className="flex flex-wrap gap-1">
                  {(['all', 'content', 'interactive', 'visual', 'data'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`px-2 py-1 rounded text-xs ${
                        filterCategory === cat ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-700 text-vexl-gray-400'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {activeTab === 'modules' && (
                <div className="grid grid-cols-2 gap-3">
                  {filteredModules.map(module => (
                    <ModulePaletteItem key={module.id} module={module} />
                  ))}
                </div>
              )}
              
              {activeTab === 'templates' && (
                <div className="space-y-3">
                  {Object.entries(slideLayouts).map(([key, layout]) => (
                    <button
                      key={key}
                      onClick={() => applyLayout(key)}
                      className="w-full p-3 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 text-left"
                    >
                      <div className="font-medium text-white">{layout.name}</div>
                      <div className="text-xs text-vexl-gray-400">{layout.description}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Slide Navigator */}
            <div className="p-4 border-t border-vexl-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-vexl-gray-400">Slides</span>
                <button
                  onClick={addNewSlide}
                  className="text-vexl-yellow hover:text-vexl-yellow/80"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentSlideIndex(index)
                      setCurrentSlide(slide)
                    }}
                    className={`w-full px-2 py-1 rounded text-sm text-left ${
                      currentSlideIndex === index 
                        ? 'bg-vexl-yellow text-black' 
                        : 'bg-vexl-gray-800 text-white hover:bg-vexl-gray-700'
                    }`}
                  >
                    {slide.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Center - Canvas */}
          <div className="flex-1 p-8 bg-vexl-gray-950">
            <SlideCanvas
              slide={currentSlide}
              onUpdateModule={updateModule}
              onDeleteModule={deleteModule}
              selectedModule={selectedModule}
              onSelectModule={setSelectedModule}
            />
          </div>

          {/* Right Sidebar - Properties */}
          <div className="w-80 bg-vexl-gray-900 border-l border-vexl-gray-800 overflow-y-auto">
            <div className="p-4 border-b border-vexl-gray-800">
              <h2 className="text-lg font-semibold text-white">Properties</h2>
            </div>
            
            <PropertyEditor
              moduleInstance={selectedModuleInstance}
              module={selectedModuleType}
              onUpdate={updateModule}
            />
          </div>
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
    </DndProvider>
  )
}