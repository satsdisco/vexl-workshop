'use client'

import { useState, useEffect } from 'react'
import { Settings, Sliders, Palette } from 'lucide-react'

interface ConfigItem {
  id: string
  label: string
  type: 'number' | 'range' | 'color' | 'select' | 'text'
  value: any
  min?: number
  max?: number
  step?: number
  options?: { value: string; label: string }[]
  unit?: string
  description?: string
}

interface ConfigurationPanelProps {
  config: ConfigItem[]
  onChange: (config: ConfigItem[]) => void
  className?: string
}

export default function ConfigurationPanel({
  config,
  onChange,
  className = ''
}: ConfigurationPanelProps) {
  const [localConfig, setLocalConfig] = useState(config)

  useEffect(() => {
    setLocalConfig(config)
  }, [config])

  const handleChange = (id: string, value: any) => {
    const updated = localConfig.map(item =>
      item.id === id ? { ...item, value } : item
    )
    setLocalConfig(updated)
    onChange(updated)
  }

  const renderInput = (item: ConfigItem) => {
    switch (item.type) {
      case 'range':
        return (
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={item.min || 0}
              max={item.max || 100}
              step={item.step || 1}
              value={item.value}
              onChange={(e) => handleChange(item.id, Number(e.target.value))}
              className="flex-1"
            />
            <span className="w-20 text-right">
              {item.value}{item.unit || ''}
            </span>
          </div>
        )
      
      case 'number':
        return (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={item.min}
              max={item.max}
              step={item.step}
              value={item.value}
              onChange={(e) => handleChange(item.id, Number(e.target.value))}
              className="w-32 px-3 py-2 bg-vexl-gray-800 rounded-lg"
            />
            {item.unit && <span className="text-vexl-gray-400">{item.unit}</span>}
          </div>
        )
      
      case 'color':
        return (
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={item.value}
              onChange={(e) => handleChange(item.id, e.target.value)}
              className="w-12 h-12 bg-transparent border-2 border-vexl-gray-700 rounded cursor-pointer"
            />
            <input
              type="text"
              value={item.value}
              onChange={(e) => handleChange(item.id, e.target.value)}
              className="w-32 px-3 py-2 bg-vexl-gray-800 rounded-lg"
              placeholder="#000000"
            />
          </div>
        )
      
      case 'select':
        return (
          <select
            value={item.value}
            onChange={(e) => handleChange(item.id, e.target.value)}
            className="w-full px-3 py-2 bg-vexl-gray-800 rounded-lg"
          >
            {item.options?.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )
      
      default:
        return (
          <input
            type="text"
            value={item.value}
            onChange={(e) => handleChange(item.id, e.target.value)}
            className="w-full px-3 py-2 bg-vexl-gray-800 rounded-lg"
          />
        )
    }
  }

  // Group config items by type
  const grouped = localConfig.reduce((acc, item) => {
    const category = 
      item.type === 'color' ? 'Theme' :
      item.type === 'range' || item.type === 'number' ? 'Values' :
      'Settings'
    
    if (!acc[category]) acc[category] = []
    acc[category].push(item)
    return acc
  }, {} as Record<string, ConfigItem[]>)

  const icons = {
    'Theme': <Palette className="w-5 h-5" />,
    'Values': <Sliders className="w-5 h-5" />,
    'Settings': <Settings className="w-5 h-5" />
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="bg-vexl-gray-900 rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-vexl-yellow">{icons[category as keyof typeof icons]}</span>
            <h3 className="text-lg font-semibold">{category}</h3>
          </div>
          
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id}>
                <label className="block mb-2">
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.description && (
                    <span className="block text-xs text-vexl-gray-400 mt-1">
                      {item.description}
                    </span>
                  )}
                </label>
                {renderInput(item)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}