'use client'

import { useState } from 'react'
import { 
  Type, Image, Layout, BarChart, Users, MessageCircle,
  Phone, Globe, Shield, Zap, ChevronDown, ChevronRight,
  Plus, Move, Copy
} from 'lucide-react'

interface Asset {
  id: string
  name: string
  icon: any
  category: string
  description: string
  preview?: string
  component?: string
  defaultContent?: any
}

const assetCategories = [
  {
    name: 'Text Elements',
    icon: Type,
    assets: [
      { id: 'heading', name: 'Heading', icon: Type, description: 'Large title text', defaultContent: { text: 'New Heading' } },
      { id: 'subheading', name: 'Subheading', icon: Type, description: 'Secondary title', defaultContent: { text: 'Subheading text' } },
      { id: 'paragraph', name: 'Paragraph', icon: Type, description: 'Body text block', defaultContent: { text: 'Your content here...' } },
      { id: 'quote', name: 'Quote', icon: MessageCircle, description: 'Highlighted quote', defaultContent: { text: '"Important quote"', author: 'Author' } },
    ]
  },
  {
    name: 'Data Display',
    icon: BarChart,
    assets: [
      { id: 'stats-card', name: 'Stats Card', icon: BarChart, description: 'Number with label', defaultContent: { value: '100%', label: 'Success Rate' } },
      { id: 'stats-grid', name: 'Stats Grid', icon: Layout, description: '3-column stats', defaultContent: { stats: [
        { value: '50K+', label: 'Users' },
        { value: '99%', label: 'Uptime' },
        { value: '24/7', label: 'Support' }
      ]}},
      { id: 'progress-bar', name: 'Progress Bar', icon: Zap, description: 'Visual progress', defaultContent: { value: 75, label: 'Progress' } },
    ]
  },
  {
    name: 'Interactive',
    icon: Users,
    assets: [
      { id: 'network-viz', name: 'Network Visualization', icon: Globe, description: 'Trust network graph', component: 'NetworkVisualization' },
      { id: 'phone-mockup', name: 'Phone Mockup', icon: Phone, description: 'iPhone with app screens', component: 'PhoneMockup' },
      { id: 'contact-import', name: 'Contact Import', icon: Users, description: 'Contact categorization', component: 'ContactImportDemo' },
      { id: 'chat-demo', name: 'Chat Demo', icon: MessageCircle, description: 'Encrypted chat UI', component: 'ChatDemo' },
    ]
  },
  {
    name: 'Layout',
    icon: Layout,
    assets: [
      { id: 'two-column', name: 'Two Column', icon: Layout, description: 'Split layout' },
      { id: 'three-column', name: 'Three Column', icon: Layout, description: 'Triple split' },
      { id: 'centered', name: 'Centered', icon: Layout, description: 'Center aligned' },
      { id: 'full-width', name: 'Full Width', icon: Layout, description: 'Edge to edge' },
    ]
  },
  {
    name: 'Branding',
    icon: Shield,
    assets: [
      { id: 'vexl-logo', name: 'Vexl Logo', icon: Shield, description: 'Brand logo' },
      { id: 'bitcoin-icon', name: 'Bitcoin Icon', icon: Shield, description: 'BTC symbol' },
      { id: 'trust-badge', name: 'Trust Badge', icon: Shield, description: 'Security badge' },
    ]
  }
]

interface AssetLibraryPanelProps {
  onDragStart?: (asset: any) => void
  onAddAsset?: (asset: any) => void
}

export default function AssetLibraryPanel({ onDragStart, onAddAsset }: AssetLibraryPanelProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Text Elements', 'Interactive'])
  const [searchTerm, setSearchTerm] = useState('')

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(c => c !== categoryName)
        : [...prev, categoryName]
    )
  }

  const handleDragStart = (e: React.DragEvent, asset: any) => {
    e.dataTransfer.setData('asset', JSON.stringify(asset))
    e.dataTransfer.effectAllowed = 'copy'
    if (onDragStart) onDragStart(asset)
  }

  const filteredCategories = assetCategories.map(category => ({
    ...category,
    assets: category.assets.filter(asset =>
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.assets.length > 0)

  return (
    <div className="h-full flex flex-col bg-vexl-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-vexl-gray-800">
        <h3 className="text-sm font-semibold text-white mb-3">Asset Library</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search assets..."
          className="w-full px-3 py-2 bg-vexl-gray-800 text-white text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
        />
      </div>

      {/* Asset Categories */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredCategories.map((category) => (
          <div key={category.name} className="rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex items-center justify-between p-3 bg-vexl-gray-800 hover:bg-vexl-gray-700 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <category.icon className="w-4 h-4 text-vexl-yellow" />
                <span className="text-sm font-medium text-white">{category.name}</span>
                <span className="text-xs text-vexl-gray-400">({category.assets.length})</span>
              </div>
              {expandedCategories.includes(category.name) ? (
                <ChevronDown className="w-4 h-4 text-vexl-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-vexl-gray-400" />
              )}
            </button>

            {expandedCategories.includes(category.name) && (
              <div className="p-2 space-y-1">
                {category.assets.map((asset) => (
                  <div
                    key={asset.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, asset)}
                    className="group relative p-3 bg-vexl-gray-800/50 rounded-lg hover:bg-vexl-gray-700 cursor-move transition-all hover:scale-[1.02]"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-vexl-gray-700 rounded">
                        <asset.icon className="w-4 h-4 text-vexl-yellow" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{asset.name}</h4>
                        <p className="text-xs text-vexl-gray-400 truncate">{asset.description}</p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            if (onAddAsset) onAddAsset(asset)
                          }}
                          className="p-1 bg-vexl-yellow text-black rounded hover:bg-vexl-yellow/80"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Drag indicator */}
                    <div className="absolute inset-0 border-2 border-vexl-yellow rounded-lg opacity-0 group-hover:opacity-20 pointer-events-none" />
                    <Move className="absolute top-2 right-2 w-3 h-3 text-vexl-gray-500 opacity-0 group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Tips */}
      <div className="p-4 border-t border-vexl-gray-800">
        <div className="text-xs text-vexl-gray-400 space-y-1">
          <div className="flex items-center space-x-1">
            <Move className="w-3 h-3" />
            <span>Drag assets to add them</span>
          </div>
          <div className="flex items-center space-x-1">
            <Plus className="w-3 h-3" />
            <span>Click + to add directly</span>
          </div>
        </div>
      </div>
    </div>
  )
}