'use client'

import { useState, useEffect } from 'react'
import { ToggleLeft, ToggleRight, Eye, EyeOff } from 'lucide-react'

interface Toggle {
  id: string
  label: string
  description?: string
  enabled: boolean
  category?: string
}

interface ToggleManagerProps {
  toggles: Toggle[]
  onChange: (toggles: Toggle[]) => void
  grouped?: boolean
  className?: string
}

export default function ToggleManager({
  toggles,
  onChange,
  grouped = true,
  className = ''
}: ToggleManagerProps) {
  const [localToggles, setLocalToggles] = useState(toggles)

  useEffect(() => {
    setLocalToggles(toggles)
  }, [toggles])

  const handleToggle = (id: string) => {
    const updated = localToggles.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled } : t
    )
    setLocalToggles(updated)
    onChange(updated)
  }

  const handleBulkToggle = (category: string, enabled: boolean) => {
    const updated = localToggles.map(t => 
      t.category === category ? { ...t, enabled } : t
    )
    setLocalToggles(updated)
    onChange(updated)
  }

  const groupedToggles = grouped 
    ? localToggles.reduce((acc, toggle) => {
        const cat = toggle.category || 'Other'
        if (!acc[cat]) acc[cat] = []
        acc[cat].push(toggle)
        return acc
      }, {} as Record<string, Toggle[]>)
    : { 'All': localToggles }

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(groupedToggles).map(([category, items]) => (
        <div key={category} className="bg-vexl-gray-900 rounded-lg p-6">
          {grouped && (
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-vexl-yellow">{category}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkToggle(category, true)}
                  className="px-3 py-1 bg-green-900/20 text-green-400 rounded hover:bg-green-900/30 text-sm"
                >
                  Enable All
                </button>
                <button
                  onClick={() => handleBulkToggle(category, false)}
                  className="px-3 py-1 bg-red-900/20 text-red-400 rounded hover:bg-red-900/30 text-sm"
                >
                  Disable All
                </button>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            {items.map(toggle => (
              <div 
                key={toggle.id}
                className="flex items-center justify-between p-3 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {toggle.enabled ? (
                      <Eye className="w-5 h-5 text-green-500" />
                    ) : (
                      <EyeOff className="w-5 h-5 text-vexl-gray-500" />
                    )}
                    <label className="font-medium cursor-pointer" htmlFor={toggle.id}>
                      {toggle.label}
                    </label>
                  </div>
                  {toggle.description && (
                    <p className="text-sm text-vexl-gray-400 mt-1 ml-8">
                      {toggle.description}
                    </p>
                  )}
                </div>
                
                <button
                  id={toggle.id}
                  onClick={() => handleToggle(toggle.id)}
                  className={`relative w-14 h-7 rounded-full transition-colors ${
                    toggle.enabled ? 'bg-vexl-yellow' : 'bg-vexl-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                      toggle.enabled ? 'translate-x-7' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}