'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Save, Plus, Trash2, Copy, Eye, EyeOff, Play, Pause,
  Download, Upload, Layout, Maximize2, Minimize2,
  ChevronLeft, ChevronRight, Settings, Palette,
  Grid3x3, Layers, BookOpen, Star, Clock
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'
import { availableModules, slideLayouts, SlideConfig, ModuleInstance } from '@/lib/slide-modules'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ModuleRenderer from '@/components/modules/ModuleRenderer'

// View modes
type ViewMode = 'edit' | 'preview' | 'present'

// Template interface
interface SlideTemplate {
  id: string
  name: string
  description: string
  thumbnail?: string
  slide: SlideConfig
  category: string
  isFavorite: boolean
  lastUsed?: Date
}

// Module palette item
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
      className={`p-2 bg-vexl-gray-800 rounded-lg cursor-move hover:bg-vexl-gray-700 transition-all ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-xl">{module.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-white truncate">{module.name}</div>
          <div className="text-xs text-vexl-gray-400 truncate">{module.description}</div>
        </div>
      </div>
    </div>
  )
}

// Canvas/Preview Component
function SlideView({ 
  slide, 
  mode, 
  onUpdateModule, 
  onDeleteModule, 
  selectedModule, 
  onSelectModule 
}: any) {
  const [, drop] = useDrop(() => ({
    accept: 'module',
    drop: (item: any, monitor) => {
      if (mode !== 'edit') return
      
      const offset = monitor.getClientOffset()
      const canvas = document.getElementById('slide-view')
      if (offset && canvas) {
        const rect = canvas.getBoundingClientRect()
        const x = ((offset.x - rect.left) / rect.width) * 100
        const y = ((offset.y - rect.top) / rect.height) * 100
        
        const newModule: ModuleInstance = {
          id: `module-${Date.now()}`,
          moduleId: item.module.id,
          position: { 
            x: Math.max(0, Math.min(80, x - 10)), 
            y: Math.max(0, Math.min(80, y - 10)), 
            width: 30, 
            height: 30 
          },
          config: { ...item.module.defaultConfig },
          content: {}
        }
        
        onUpdateModule(newModule)
      }
    },
  }))

  const isEditMode = mode === 'edit'
  const showControls = mode === 'edit'

  return (
    <div
      id="slide-view"
      ref={drop as any}
      className={`relative w-full h-full bg-vexl-black rounded-lg overflow-hidden ${
        isEditMode ? 'border-2 border-dashed border-vexl-gray-700' : ''
      }`}
      style={{ aspectRatio: '16/9' }}
    >
      {slide.modules.map((moduleInstance: ModuleInstance) => {
        const module = availableModules.find(m => m.id === moduleInstance.moduleId)
        if (!module) return null
        
        return (
          <div
            key={moduleInstance.id}
            onClick={() => isEditMode && onSelectModule(moduleInstance.id)}
            className={`absolute transition-all ${
              isEditMode ? 'cursor-pointer' : ''
            } ${
              selectedModule === moduleInstance.id && isEditMode
                ? 'ring-2 ring-vexl-yellow z-10' 
                : ''
            }`}
            style={{
              left: `${moduleInstance.position.x}%`,
              top: `${moduleInstance.position.y}%`,
              width: `${moduleInstance.position.width}%`,
              height: `${moduleInstance.position.height}%`
            }}
          >
            {showControls && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteModule(moduleInstance.id)
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 z-20"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
            
            {/* Render actual component in preview/present mode, wireframe in edit mode */}
            {mode === 'edit' ? (
              <div className="w-full h-full bg-vexl-gray-800/50 border border-vexl-gray-600 rounded-lg p-2 flex flex-col items-center justify-center">
                <span className="text-2xl mb-1">{module.icon}</span>
                <span className="text-xs text-white font-medium text-center">{module.name}</span>
              </div>
            ) : (
              <ModuleRenderer moduleInstance={moduleInstance} moduleType={module.type} />
            )}
          </div>
        )
      })}
      
      {slide.modules.length === 0 && isEditMode && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Layers className="w-12 h-12 text-vexl-gray-600 mx-auto mb-2" />
            <p className="text-vexl-gray-400">Drag modules here to start building</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Template Gallery
function TemplateGallery({ templates, onApplyTemplate, onClose }: any) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const categories = ['all', 'intro', 'content', 'interactive', 'closing']
  
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter((t: SlideTemplate) => t.category === selectedCategory)

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8">
      <div className="bg-vexl-gray-900 rounded-lg max-w-6xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-vexl-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Choose a Template</h2>
            <button onClick={onClose} className="text-vexl-gray-400 hover:text-white">
              ✕
            </button>
          </div>
          
          <div className="flex space-x-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded ${
                  selectedCategory === cat 
                    ? 'bg-vexl-yellow text-black' 
                    : 'bg-vexl-gray-800 text-white hover:bg-vexl-gray-700'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-3 gap-4">
            {filteredTemplates.map((template: SlideTemplate) => (
              <div
                key={template.id}
                onClick={() => onApplyTemplate(template)}
                className="bg-vexl-gray-800 rounded-lg p-4 cursor-pointer hover:bg-vexl-gray-700 transition-all"
              >
                <div className="bg-vexl-gray-900 rounded aspect-video mb-3 flex items-center justify-center">
                  <Layers className="w-8 h-8 text-vexl-gray-600" />
                </div>
                <h3 className="font-semibold text-white mb-1">{template.name}</h3>
                <p className="text-xs text-vexl-gray-400">{template.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs bg-vexl-gray-900 px-2 py-1 rounded">
                    {template.category}
                  </span>
                  {template.isFavorite && <Star className="w-4 h-4 text-vexl-yellow" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Component
export default function SlideBuilderV2() {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<ViewMode>('edit')
  const [showTemplates, setShowTemplates] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState<SlideConfig>({
    id: 'slide-1',
    name: 'New Slide',
    layout: 'custom',
    modules: []
  })
  
  // Sample templates
  const [templates] = useState<SlideTemplate[]>([
    {
      id: 'template-1',
      name: 'Trust Network Intro',
      description: 'Interactive network visualization with stats',
      category: 'intro',
      isFavorite: true,
      slide: {
        id: 'template-1',
        name: 'Trust Network',
        layout: 'custom',
        modules: [
          {
            id: 'mod-1',
            moduleId: 'network-visualization',
            position: { x: 10, y: 10, width: 50, height: 60 },
            config: { showLabels: true, animated: true },
            content: {}
          },
          {
            id: 'mod-2',
            moduleId: 'heading',
            position: { x: 65, y: 20, width: 30, height: 20 },
            config: {},
            content: { text: 'Your Network is Your Net Worth' }
          }
        ]
      }
    },
    {
      id: 'template-2',
      name: 'Contact Import Demo',
      description: 'Show the onboarding process',
      category: 'interactive',
      isFavorite: false,
      slide: {
        id: 'template-2',
        name: 'Import Contacts',
        layout: 'custom',
        modules: [
          {
            id: 'mod-1',
            moduleId: 'contact-import-demo',
            position: { x: 25, y: 15, width: 50, height: 70 },
            config: { showWarning: true },
            content: {}
          }
        ]
      }
    },
    {
      id: 'template-3',
      name: 'Phone Showcase',
      description: 'iPhone mockup with app screens',
      category: 'content',
      isFavorite: true,
      slide: {
        id: 'template-3',
        name: 'App Demo',
        layout: 'custom',
        modules: [
          {
            id: 'mod-1',
            moduleId: 'phone-mockup',
            position: { x: 35, y: 10, width: 30, height: 80 },
            config: { screen: 'offer-feed' },
            content: {}
          }
        ]
      }
    }
  ])

  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  const handleUpdateModule = (module: ModuleInstance) => {
    if (module.id.startsWith('module-')) {
      // New module
      setCurrentSlide({
        ...currentSlide,
        modules: [...currentSlide.modules, module]
      })
      setSelectedModule(module.id)
    } else {
      // Update existing
      setCurrentSlide({
        ...currentSlide,
        modules: currentSlide.modules.map(m => m.id === module.id ? module : m)
      })
    }
  }

  const handleDeleteModule = (moduleId: string) => {
    setCurrentSlide({
      ...currentSlide,
      modules: currentSlide.modules.filter(m => m.id !== moduleId)
    })
    if (selectedModule === moduleId) {
      setSelectedModule(null)
    }
  }

  const handleApplyTemplate = (template: SlideTemplate) => {
    setCurrentSlide(template.slide)
    setShowTemplates(false)
  }

  const saveAsTemplate = () => {
    const template: SlideTemplate = {
      id: `template-${Date.now()}`,
      name: prompt('Template name:') || 'Untitled Template',
      description: prompt('Template description:') || '',
      category: 'content',
      isFavorite: false,
      slide: currentSlide
    }
    // Here you would save to database
    console.log('Saving template:', template)
  }

  const selectedModuleInstance = currentSlide.modules.find(m => m.id === selectedModule)
  const selectedModuleType = selectedModuleInstance 
    ? availableModules.find(m => m.id === selectedModuleInstance.moduleId)
    : null

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.metaKey) {
        e.preventDefault()
        setViewMode(viewMode === 'preview' ? 'edit' : 'preview')
      }
      if (e.key === 'Delete' && selectedModule) {
        handleDeleteModule(selectedModule)
      }
      if (e.key === 'Escape') {
        setViewMode('edit')
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [viewMode, selectedModule])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-vexl-black flex flex-col">
        {/* Header */}
        <div className="bg-vexl-gray-900 border-b border-vexl-gray-800 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <VexlLogo />
              <h1 className="text-lg font-bold text-white">Slide Builder Pro</h1>
              <div className="flex items-center space-x-2 bg-vexl-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('edit')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'edit' 
                      ? 'bg-vexl-yellow text-black' 
                      : 'text-white hover:bg-vexl-gray-700'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'preview' 
                      ? 'bg-vexl-yellow text-black' 
                      : 'text-white hover:bg-vexl-gray-700'
                  }`}
                >
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('present')}
                  className={`px-3 py-1 rounded text-sm ${
                    viewMode === 'present' 
                      ? 'bg-vexl-yellow text-black' 
                      : 'text-white hover:bg-vexl-gray-700'
                  }`}
                >
                  Present
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowTemplates(true)}
                className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">Templates</span>
              </button>
              <button
                onClick={saveAsTemplate}
                className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
              >
                <Save className="w-4 h-4" />
                <span className="text-sm">Save Template</span>
              </button>
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-2 rounded ${
                  showGrid ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Module Palette (only in edit mode) */}
          {viewMode === 'edit' && (
            <div className="w-64 bg-vexl-gray-900 border-r border-vexl-gray-800 p-4 overflow-y-auto">
              <h3 className="text-sm font-semibold text-white mb-3">Modules</h3>
              <div className="space-y-2">
                {availableModules.slice(0, 10).map(module => (
                  <ModulePaletteItem key={module.id} module={module} />
                ))}
              </div>
            </div>
          )}

          {/* Center - Canvas/Preview */}
          <div className={`flex-1 p-8 ${viewMode === 'present' ? 'p-0' : ''}`}>
            <div className={`h-full ${viewMode === 'present' ? '' : 'max-w-5xl mx-auto'}`}>
              <SlideView
                slide={currentSlide}
                mode={viewMode}
                onUpdateModule={handleUpdateModule}
                onDeleteModule={handleDeleteModule}
                selectedModule={selectedModule}
                onSelectModule={setSelectedModule}
              />
            </div>
          </div>

          {/* Right Panel - Properties (only in edit mode with selection) */}
          {viewMode === 'edit' && selectedModuleInstance && selectedModuleType && (
            <div className="w-80 bg-vexl-gray-900 border-l border-vexl-gray-800 p-4 overflow-y-auto">
              <h3 className="text-sm font-semibold text-white mb-3">Properties</h3>
              
              {/* Position Controls */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-vexl-gray-400">X Position</label>
                    <input
                      type="number"
                      value={selectedModuleInstance.position.x}
                      onChange={(e) => handleUpdateModule({
                        ...selectedModuleInstance,
                        position: { ...selectedModuleInstance.position, x: parseInt(e.target.value) }
                      })}
                      className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-vexl-gray-400">Y Position</label>
                    <input
                      type="number"
                      value={selectedModuleInstance.position.y}
                      onChange={(e) => handleUpdateModule({
                        ...selectedModuleInstance,
                        position: { ...selectedModuleInstance.position, y: parseInt(e.target.value) }
                      })}
                      className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-vexl-gray-400">Width</label>
                    <input
                      type="number"
                      value={selectedModuleInstance.position.width}
                      onChange={(e) => handleUpdateModule({
                        ...selectedModuleInstance,
                        position: { ...selectedModuleInstance.position, width: parseInt(e.target.value) }
                      })}
                      className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-vexl-gray-400">Height</label>
                    <input
                      type="number"
                      value={selectedModuleInstance.position.height}
                      onChange={(e) => handleUpdateModule({
                        ...selectedModuleInstance,
                        position: { ...selectedModuleInstance.position, height: parseInt(e.target.value) }
                      })}
                      className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Module-specific fields */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-vexl-gray-400">Content</h4>
                {selectedModuleType.editableFields.map((field: any) => (
                  <div key={field.key}>
                    <label className="text-xs text-vexl-gray-400">{field.label}</label>
                    {field.type === 'text' && (
                      <input
                        type="text"
                        value={selectedModuleInstance.content[field.key] || selectedModuleInstance.config[field.key] || ''}
                        onChange={(e) => handleUpdateModule({
                          ...selectedModuleInstance,
                          content: { ...selectedModuleInstance.content, [field.key]: e.target.value },
                          config: { ...selectedModuleInstance.config, [field.key]: e.target.value }
                        })}
                        placeholder={field.placeholder}
                        className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                      />
                    )}
                    {field.type === 'textarea' && (
                      <textarea
                        value={selectedModuleInstance.content[field.key] || selectedModuleInstance.config[field.key] || ''}
                        onChange={(e) => handleUpdateModule({
                          ...selectedModuleInstance,
                          content: { ...selectedModuleInstance.content, [field.key]: e.target.value },
                          config: { ...selectedModuleInstance.config, [field.key]: e.target.value }
                        })}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                      />
                    )}
                    {field.type === 'number' && (
                      <input
                        type="number"
                        value={selectedModuleInstance.content[field.key] || selectedModuleInstance.config[field.key] || ''}
                        onChange={(e) => handleUpdateModule({
                          ...selectedModuleInstance,
                          content: { ...selectedModuleInstance.content, [field.key]: parseInt(e.target.value) },
                          config: { ...selectedModuleInstance.config, [field.key]: parseInt(e.target.value) }
                        })}
                        placeholder={field.placeholder}
                        className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                      />
                    )}
                    {field.type === 'boolean' && (
                      <button
                        onClick={() => {
                          const currentValue = selectedModuleInstance.content[field.key] ?? selectedModuleInstance.config[field.key] ?? false
                          handleUpdateModule({
                            ...selectedModuleInstance,
                            content: { ...selectedModuleInstance.content, [field.key]: !currentValue },
                            config: { ...selectedModuleInstance.config, [field.key]: !currentValue }
                          })
                        }}
                        className={`px-3 py-1 rounded text-sm ${
                          (selectedModuleInstance.content[field.key] ?? selectedModuleInstance.config[field.key])
                            ? 'bg-vexl-yellow text-black' 
                            : 'bg-vexl-gray-800 text-white'
                        }`}
                      >
                        {(selectedModuleInstance.content[field.key] ?? selectedModuleInstance.config[field.key]) ? 'On' : 'Off'}
                      </button>
                    )}
                    {field.type === 'select' && (
                      <select
                        value={selectedModuleInstance.content[field.key] || selectedModuleInstance.config[field.key] || ''}
                        onChange={(e) => handleUpdateModule({
                          ...selectedModuleInstance,
                          content: { ...selectedModuleInstance.content, [field.key]: e.target.value },
                          config: { ...selectedModuleInstance.config, [field.key]: e.target.value }
                        })}
                        className="w-full px-2 py-1 bg-vexl-gray-800 text-white rounded text-sm"
                      >
                        {field.options?.map((option: any) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Template Gallery Modal */}
        {showTemplates && (
          <TemplateGallery
            templates={templates}
            onApplyTemplate={handleApplyTemplate}
            onClose={() => setShowTemplates(false)}
          />
        )}

        {/* Keyboard Shortcuts Helper */}
        {viewMode === 'edit' && (
          <div className="absolute bottom-4 left-4 bg-vexl-gray-900 rounded-lg p-3 text-xs text-vexl-gray-400">
            <div>⌘P - Toggle Preview</div>
            <div>Delete - Remove Module</div>
            <div>Esc - Exit Preview</div>
          </div>
        )}
      </div>
    </DndProvider>
  )
}