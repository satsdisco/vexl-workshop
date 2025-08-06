'use client'

import { useState } from 'react'
import { templates } from '@/lib/templates'
import { Palette, Users, Shield, Zap, Building, MessageSquare } from 'lucide-react'

const templateIcons: Record<string, any> = {
  bitcoinMaximalist: Shield,
  businessFocus: Building,
  communityBuilder: Users,
  privacyAdvocate: Shield,
  workshopQuick: Zap
}

interface TemplateManagerProps {
  onApply: (templateKey: string) => void
}

export default function TemplateManager({ onApply }: TemplateManagerProps) {
  const [applying, setApplying] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleApply = async (templateKey: string) => {
    if (!confirm(`Apply "${templates[templateKey as keyof typeof templates].name}" template? This will overwrite current content.`)) {
      return
    }

    setApplying(templateKey)
    setSuccess(null)

    try {
      const response = await fetch('/api/admin/templates/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateKey })
      })

      if (response.ok) {
        setSuccess(templateKey)
        setTimeout(() => setSuccess(null), 3000)
        onApply(templateKey)
      }
    } catch (error) {
      console.error('Failed to apply template:', error)
    } finally {
      setApplying(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-vexl-gray-900 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-2">What are Templates?</h3>
        <p className="text-vexl-gray-400 mb-4">
          Templates are pre-configured content sets optimized for different audiences and use cases. 
          Apply a template to instantly customize your entire presentation.
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-vexl-yellow mb-2">Templates change:</h4>
            <ul className="space-y-1 text-vexl-gray-400">
              <li>• Slide titles and content</li>
              <li>• Feature toggles (what's shown/hidden)</li>
              <li>• Configuration settings</li>
              <li>• Technical complexity level</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-vexl-yellow mb-2">Use templates to:</h4>
            <ul className="space-y-1 text-vexl-gray-400">
              <li>• Quickly switch between audiences</li>
              <li>• Test different messaging</li>
              <li>• Save time on customization</li>
              <li>• Maintain consistency</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(templates).map(([key, template]) => {
          const Icon = templateIcons[key] || Palette
          const isApplying = applying === key
          const isSuccess = success === key

          return (
            <div 
              key={key}
              className="bg-vexl-gray-900 rounded-lg p-6 border border-vexl-gray-800 hover:border-vexl-yellow/50 transition-colors"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-vexl-yellow/10 rounded-lg">
                  <Icon className="w-6 h-6 text-vexl-yellow" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
                  <p className="text-sm text-vexl-gray-400">{template.description}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="text-sm">
                  <span className="text-vexl-gray-500">Focus:</span>
                  <span className="ml-2 px-2 py-1 bg-vexl-gray-800 rounded text-xs">
                    {template.config?.focusArea || 'balanced'}
                  </span>
                  <span className="ml-2 px-2 py-1 bg-vexl-gray-800 rounded text-xs">
                    {template.config?.technicalLevel || 'intermediate'}
                  </span>
                </div>

                <div className="text-sm">
                  <span className="text-vexl-gray-500">Key changes:</span>
                  <ul className="mt-1 space-y-1 text-xs text-vexl-gray-400">
                    {template.slides?.hookSection?.title && (
                      <li>• Hook: "{template.slides.hookSection.title}"</li>
                    )}
                    {template.config?.focusArea && (
                      <li>• Focus on {template.config.focusArea}</li>
                    )}
                    {Object.entries(template.features || {}).filter(([_, v]) => !v).length > 0 && (
                      <li>• Hides {Object.entries(template.features || {}).filter(([_, v]) => !v).length} features</li>
                    )}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => handleApply(key)}
                disabled={isApplying}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
                  isSuccess 
                    ? 'bg-green-600 text-white'
                    : isApplying
                    ? 'bg-vexl-gray-700 text-vexl-gray-400'
                    : 'bg-vexl-yellow text-vexl-black hover:bg-vexl-yellow/90'
                }`}
              >
                {isSuccess ? '✓ Applied!' : isApplying ? 'Applying...' : 'Apply Template'}
              </button>
            </div>
          )
        })}
      </div>

      <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
        <h4 className="font-semibold text-blue-400 mb-2">💡 Pro Tip</h4>
        <p className="text-sm text-blue-300">
          After applying a template, you can still customize individual sections. 
          Templates are just starting points - mix and match to create your perfect presentation!
        </p>
      </div>
    </div>
  )
}