'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Search, Filter, Grid, List, Eye, Settings, Copy, 
  Download, Upload, Plus, Trash2, Edit, Save,
  Smartphone, Network, Component, Image, Film,
  ChevronRight, Tag, Layers, Package
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'
import { 
  interactiveComponents, 
  phoneMockups, 
  uiComponents, 
  mediaAssets,
  animations,
  presetLayouts,
  getAssetsByType,
  getAssetsByCategory
} from '@/lib/asset-library'

// Asset type icons
const typeIcons = {
  interactive: Network,
  mockup: Smartphone,
  component: Component,
  media: Image,
  animation: Film
}

// Asset card component
function AssetCard({ asset, onSelect, onConfigure, selected }: any) {
  const Icon = typeIcons[asset.type as keyof typeof typeIcons] || Package
  
  return (
    <div 
      onClick={() => onSelect(asset)}
      className={`bg-vexl-gray-900 rounded-lg p-4 cursor-pointer transition-all hover:bg-vexl-gray-800 ${
        selected ? 'ring-2 ring-vexl-yellow' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <Icon className="w-6 h-6 text-vexl-yellow" />
        <span className="text-xs px-2 py-1 bg-vexl-gray-800 rounded text-vexl-gray-400">
          {asset.category}
        </span>
      </div>
      
      <h3 className="text-white font-semibold mb-1">{asset.name}</h3>
      <p className="text-sm text-vexl-gray-400 mb-3">{asset.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          <span className="text-xs px-2 py-1 bg-vexl-gray-800 rounded">
            {asset.type}
          </span>
          {asset.configurable && (
            <span className="text-xs px-2 py-1 bg-vexl-yellow/20 text-vexl-yellow rounded">
              Configurable
            </span>
          )}
        </div>
        
        {asset.configurable && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onConfigure(asset)
            }}
            className="p-1 hover:bg-vexl-gray-700 rounded"
          >
            <Settings className="w-4 h-4 text-vexl-gray-400" />
          </button>
        )}
      </div>
    </div>
  )
}

// Configuration panel
function ConfigPanel({ asset, onSave, onClose }: any) {
  const [config, setConfig] = useState(asset?.defaultConfig || {})
  
  if (!asset) return null
  
  return (
    <div className="bg-vexl-gray-900 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{asset.name} Configuration</h3>
        <button
          onClick={onClose}
          className="text-vexl-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(config).map(([key, value]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-vexl-gray-400 mb-1">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            
            {typeof value === 'boolean' ? (
              <button
                onClick={() => setConfig({ ...config, [key]: !value })}
                className={`px-3 py-1 rounded ${
                  value ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'
                }`}
              >
                {value ? 'Enabled' : 'Disabled'}
              </button>
            ) : typeof value === 'number' ? (
              <input
                type="number"
                value={value}
                onChange={(e) => setConfig({ ...config, [key]: parseInt(e.target.value) })}
                className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded"
              />
            ) : typeof value === 'object' ? (
              <pre className="text-xs bg-vexl-gray-800 p-2 rounded overflow-x-auto">
                {JSON.stringify(value, null, 2)}
              </pre>
            ) : (
              <input
                type="text"
                value={value as string}
                onChange={(e) => setConfig({ ...config, [key]: e.target.value })}
                className="w-full px-3 py-2 bg-vexl-gray-800 text-white rounded"
              />
            )}
          </div>
        ))}
      </div>
      
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={() => onSave(config)}
          className="px-4 py-2 bg-vexl-yellow text-black rounded hover:bg-vexl-yellow/90"
        >
          Save Configuration
        </button>
      </div>
    </div>
  )
}

export default function AssetManager() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [configuringAsset, setConfiguringAsset] = useState<any>(null)
  const [selectedAssets, setSelectedAssets] = useState<Set<string>>(new Set())
  
  // Get all assets
  const allAssets = [
    ...interactiveComponents,
    ...phoneMockups,
    ...uiComponents,
    ...mediaAssets,
    ...animations
  ]
  
  // Get unique categories
  const categories = ['all', ...new Set(allAssets.map(a => a.category))]
  const types = ['all', 'interactive', 'mockup', 'component', 'media', 'animation']
  
  // Filter assets
  const filteredAssets = allAssets.filter(asset => {
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    const matchesType = selectedType === 'all' || asset.type === selectedType
    const matchesSearch = searchQuery === '' || 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesType && matchesSearch
  })
  
  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])
  
  const handleAssetSelect = (asset: any) => {
    if (selectedAssets.has(asset.id)) {
      const newSet = new Set(selectedAssets)
      newSet.delete(asset.id)
      setSelectedAssets(newSet)
    } else {
      setSelectedAssets(new Set([...selectedAssets, asset.id]))
    }
    setSelectedAsset(asset)
  }
  
  const handleConfigSave = (config: any) => {
    // Save configuration (could be to database or local storage)
    console.log('Saving config for', configuringAsset.id, config)
    setConfiguringAsset(null)
  }
  
  const exportSelectedAssets = () => {
    const assetsToExport = allAssets.filter(a => selectedAssets.has(a.id))
    const data = JSON.stringify(assetsToExport, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'vexl-assets.json'
    a.click()
  }
  
  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <VexlLogo />
              <h1 className="text-xl font-bold text-white">Asset Library</h1>
              <span className="px-2 py-1 text-xs bg-vexl-gray-800 text-vexl-gray-400 rounded">
                {filteredAssets.length} assets
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {selectedAssets.size > 0 && (
                <>
                  <span className="text-sm text-vexl-gray-400">
                    {selectedAssets.size} selected
                  </span>
                  <button
                    onClick={exportSelectedAssets}
                    className="flex items-center space-x-2 px-3 py-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </>
              )}
              
              <button
                onClick={() => router.push('/admin/slide-builder')}
                className="flex items-center space-x-2 px-4 py-2 bg-vexl-yellow text-black rounded hover:bg-vexl-yellow/90"
              >
                <Layers className="w-4 h-4" />
                <span>Slide Builder</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Filters Bar */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vexl-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search assets..."
                  className="w-full pl-10 pr-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
                />
              </div>
              
              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-vexl-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Asset Grid/List */}
          <div className={configuringAsset ? 'col-span-8' : 'col-span-12'}>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
              {filteredAssets.map(asset => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  selected={selectedAssets.has(asset.id)}
                  onSelect={handleAssetSelect}
                  onConfigure={setConfiguringAsset}
                />
              ))}
            </div>
          </div>
          
          {/* Configuration Panel */}
          {configuringAsset && (
            <div className="col-span-4">
              <ConfigPanel
                asset={configuringAsset}
                onSave={handleConfigSave}
                onClose={() => setConfiguringAsset(null)}
              />
            </div>
          )}
        </div>
        
        {/* Preset Layouts Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-white mb-4">Preset Layouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {presetLayouts.map(layout => (
              <div key={layout.id} className="bg-vexl-gray-900 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-1">{layout.name}</h3>
                <p className="text-sm text-vexl-gray-400 mb-3">{layout.description}</p>
                <div className="flex flex-wrap gap-1">
                  {layout.components.map(comp => (
                    <span key={comp} className="text-xs px-2 py-1 bg-vexl-gray-800 rounded">
                      {comp}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-3 px-3 py-2 bg-vexl-yellow text-black rounded text-sm hover:bg-vexl-yellow/90">
                  Use Layout
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}