'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Check, AlertCircle, Loader2, 
  Users, Building, Shield, Zap, Clock,
  ChevronRight, Eye, Copy, Download
} from 'lucide-react'
import { templates } from '@/lib/templates'

interface TemplateApplicatorProps {
  onApply: (templateId: string) => Promise<void>
  onPreview?: (templateId: string) => void
  currentTemplate?: string
}

const templateIcons = {
  default: Zap,
  bitcoinMaximalist: Shield,
  businessFocus: Building,
  communityBuilder: Users,
  privacyAdvocate: Shield,
  workshopQuick: Clock
}

const templateColors = {
  default: 'from-vexl-yellow to-yellow-600',
  bitcoinMaximalist: 'from-orange-500 to-yellow-600',
  businessFocus: 'from-blue-500 to-indigo-600',
  communityBuilder: 'from-green-500 to-emerald-600',
  privacyAdvocate: 'from-purple-500 to-pink-600',
  workshopQuick: 'from-gray-500 to-gray-700'
}

export default function TemplateApplicator({ 
  onApply, 
  onPreview,
  currentTemplate 
}: TemplateApplicatorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [applying, setApplying] = useState(false)
  const [appliedTemplate, setAppliedTemplate] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [showDetails, setShowDetails] = useState<string | null>(null)

  const handleApply = async (templateId: string) => {
    setApplying(true)
    setError(null)
    
    try {
      await onApply(templateId)
      setAppliedTemplate(templateId)
      setTimeout(() => setAppliedTemplate(null), 3000)
    } catch (err) {
      setError('Failed to apply template')
      console.error(err)
    } finally {
      setApplying(false)
    }
  }

  const exportTemplate = (templateId: string) => {
    const template = templates[templateId as keyof typeof templates]
    const data = JSON.stringify(template, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vexl-template-${templateId}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-vexl-yellow" />
            Workshop Templates
          </h3>
          <p className="text-vexl-gray-400 mt-1">
            Quick-start your presentation with audience-specific content
          </p>
        </div>
        
        {currentTemplate && (
          <div className="px-3 py-1 bg-vexl-gray-800 rounded-full text-sm">
            Current: <span className="text-vexl-yellow">{currentTemplate}</span>
          </div>
        )}
      </div>

      {/* Template Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(templates).map(([id, template]) => {
          const Icon = templateIcons[id as keyof typeof templateIcons] || Sparkles
          const gradient = templateColors[id as keyof typeof templateColors] || 'from-gray-500 to-gray-700'
          const isApplied = appliedTemplate === id
          const isSelected = selectedTemplate === id
          const isCurrent = currentTemplate === id
          
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`relative group ${isSelected ? 'ring-2 ring-vexl-yellow' : ''}`}
            >
              {/* Card */}
              <div className="bg-vexl-gray-900 border border-vexl-gray-800 rounded-lg overflow-hidden">
                {/* Header with gradient */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} opacity-20`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold">{template.name}</h4>
                        {isCurrent && (
                          <span className="text-xs text-green-400">Active</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-vexl-gray-400 mb-4">
                    {template.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="flex gap-4 text-xs text-vexl-gray-500 mb-4">
                    <span>{Object.keys(template.slides).length} sections</span>
                    <span>•</span>
                    <span>{template.config.focusArea}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApply(id)}
                      disabled={applying || isCurrent}
                      className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        isApplied 
                          ? 'bg-green-500 text-white' 
                          : isCurrent
                          ? 'bg-vexl-gray-800 text-vexl-gray-500 cursor-not-allowed'
                          : 'bg-vexl-yellow text-vexl-black hover:bg-vexl-yellow/90'
                      }`}
                    >
                      {applying && selectedTemplate === id ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          Applying...
                        </>
                      ) : isApplied ? (
                        <>
                          <Check size={14} />
                          Applied!
                        </>
                      ) : isCurrent ? (
                        'Current'
                      ) : (
                        'Apply'
                      )}
                    </button>
                    
                    <button
                      onClick={() => setShowDetails(showDetails === id ? null : id)}
                      className="p-2 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700"
                      title="View details"
                    >
                      <ChevronRight 
                        size={16} 
                        className={`transition-transform ${showDetails === id ? 'rotate-90' : ''}`}
                      />
                    </button>
                    
                    {onPreview && (
                      <button
                        onClick={() => onPreview(id)}
                        className="p-2 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700"
                        title="Preview"
                      >
                        <Eye size={16} />
                      </button>
                    )}
                    
                    <button
                      onClick={() => exportTemplate(id)}
                      className="p-2 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700"
                      title="Export"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </div>

                {/* Details Panel */}
                <AnimatePresence>
                  {showDetails === id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-vexl-gray-800 overflow-hidden"
                    >
                      <div className="p-4 space-y-3">
                        <div>
                          <h5 className="text-xs font-medium text-vexl-gray-400 mb-1">Key Messages</h5>
                          <div className="space-y-1">
                            {Object.entries(template.slides).slice(0, 3).map(([key, slide]) => (
                              <div key={key} className="text-xs">
                                <span className="text-vexl-gray-500">{key}:</span>
                                <span className="ml-2 text-vexl-gray-300">{slide.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-xs font-medium text-vexl-gray-400 mb-1">Features</h5>
                          <div className="flex flex-wrap gap-1">
                            {Object.entries(template.features)
                              .filter(([_, enabled]) => enabled)
                              .map(([feature]) => (
                                <span 
                                  key={feature}
                                  className="px-2 py-0.5 bg-vexl-gray-800 rounded text-xs"
                                >
                                  {feature.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                              ))
                            }
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400"
        >
          <AlertCircle size={18} />
          <span>{error}</span>
        </motion.div>
      )}

      {/* Info Box */}
      <div className="p-4 bg-vexl-gray-900/50 border border-vexl-gray-800 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-vexl-yellow mt-0.5" size={18} />
          <div className="text-sm">
            <p className="text-vexl-gray-300 mb-1">
              Templates provide a complete content package tailored to specific audiences.
            </p>
            <p className="text-vexl-gray-500">
              Applying a template will update all slide content, features, and configuration. 
              You can always customize individual sections after applying.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}