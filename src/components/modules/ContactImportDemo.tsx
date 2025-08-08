'use client'

import { useState } from 'react'
import { Check, AlertTriangle, Users, Globe, Store, Home } from 'lucide-react'

interface Category {
  id: string
  name: string
  icon: string
  count: number
  checked: boolean
}

interface ContactImportDemoProps {
  config?: {
    categories?: Category[]
    showWarning?: boolean
    warningMessage?: string
    directContacts?: number
    totalNetworkReach?: number
  }
}

export default function ContactImportDemo({ config }: ContactImportDemoProps) {
  const defaultCategories: Category[] = [
    { id: 'close', name: 'Close Friends', icon: '👥', count: 5, checked: true },
    { id: 'acquaintances', name: 'Acquaintances', icon: '🤝', count: 20, checked: false },
    { id: 'service', name: 'Service Providers', icon: '🛠️', count: 15, checked: false },
    { id: 'business', name: 'Local Businesses', icon: '🏪', count: 25, checked: false },
    { id: 'community', name: 'Community Groups', icon: '🏘️', count: 30, checked: false }
  ]

  const [categories, setCategories] = useState(config?.categories || defaultCategories)
  const showWarning = config?.showWarning !== false
  const warningMessage = config?.warningMessage || 'Only importing close friends severely limits your trading opportunities'
  
  const selectedCount = categories.filter(c => c.checked).reduce((sum, c) => sum + c.count, 0)
  const totalCount = categories.reduce((sum, c) => sum + c.count, 0)
  const directContacts = selectedCount
  const totalNetworkReach = Math.floor(selectedCount * 2.5) // Estimated network effect

  const toggleCategory = (id: string) => {
    setCategories(prev => prev.map(cat => 
      cat.id === id ? { ...cat, checked: !cat.checked } : cat
    ))
  }

  const getCategoryIcon = (id: string) => {
    switch(id) {
      case 'close': return <Users className="w-5 h-5" />
      case 'acquaintances': return <Users className="w-5 h-5" />
      case 'service': return <Store className="w-5 h-5" />
      case 'business': return <Store className="w-5 h-5" />
      case 'community': return <Home className="w-5 h-5" />
      default: return <Globe className="w-5 h-5" />
    }
  }

  return (
    <div className="bg-vexl-gray-900 rounded-lg p-6 max-w-2xl">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Who can help you with Bitcoin?</h3>
        <p className="text-vexl-gray-400 text-sm">
          Select contact categories to import. More connections = better opportunities.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-3 mb-6">
        {categories.map(category => (
          <div
            key={category.id}
            onClick={() => toggleCategory(category.id)}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${category.checked 
                ? 'border-vexl-yellow bg-vexl-yellow/10' 
                : 'border-vexl-gray-700 bg-vexl-gray-800 hover:border-vexl-gray-600'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${category.checked ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-700 text-white'}
                `}>
                  <span className="text-lg">{category.icon}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{category.name}</div>
                  <div className="text-sm text-vexl-gray-400">{category.count} contacts</div>
                </div>
              </div>
              <div className={`
                w-6 h-6 rounded-full border-2 flex items-center justify-center
                ${category.checked 
                  ? 'border-vexl-yellow bg-vexl-yellow' 
                  : 'border-vexl-gray-600'
                }
              `}>
                {category.checked && <Check className="w-4 h-4 text-black" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Warning */}
      {showWarning && selectedCount < 20 && (
        <div className="bg-orange-500/20 border border-orange-500 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <div className="font-semibold text-orange-500">Limited Network Warning</div>
              <div className="text-sm text-orange-400 mt-1">{warningMessage}</div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="bg-vexl-gray-800 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-vexl-yellow">{selectedCount}</div>
            <div className="text-xs text-vexl-gray-400">Direct Contacts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">{totalNetworkReach}</div>
            <div className="text-xs text-vexl-gray-400">Network Reach</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-400">
              {totalCount > 0 ? Math.round((selectedCount / totalCount) * 100) : 0}%
            </div>
            <div className="text-xs text-vexl-gray-400">Coverage</div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button className="w-full py-3 bg-vexl-yellow text-black font-bold rounded-lg hover:bg-vexl-yellow/90 transition-colors">
        Import {selectedCount} Contacts
      </button>

      {/* Network visualization preview */}
      <div className="mt-6 p-4 bg-vexl-gray-800 rounded-lg">
        <div className="text-xs text-vexl-gray-400 mb-2">Your potential network:</div>
        <div className="flex items-center justify-around">
          <div className="text-center">
            <div className="w-12 h-12 bg-vexl-yellow rounded-full flex items-center justify-center mb-1">
              <span>You</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {Array.from({length: Math.min(5, selectedCount)}).map((_, i) => (
              <div key={i} className="w-8 h-8 bg-green-400 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="flex space-x-1">
            {Array.from({length: Math.min(10, totalNetworkReach - selectedCount)}).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-blue-400 rounded-full animate-pulse opacity-50" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}