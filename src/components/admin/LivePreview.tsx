'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Smartphone, Monitor, RefreshCw, Maximize2 } from 'lucide-react'

interface LivePreviewProps {
  sectionId: string
  content: any
  deviceMode?: 'desktop' | 'mobile'
}

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
  hookSection: () => (
    <div className="space-y-6">
      <h1 className="text-5xl font-bold" style={{ fontFamily: 'Monument Extended' }}>
        {content?.title || 'Your Network is Your Net Worth'}
      </h1>
      <p className="text-xl text-vexl-gray-400">
        {content?.subtitle || 'Start with the people you already trust'}
      </p>
    </div>
  ),
  pitchSection: () => (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold">{content?.title || 'What is Vexl?'}</h2>
      <p className="text-lg">{content?.description || 'Peer-to-peer Bitcoin trading'}</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-vexl-gray-800 rounded">
          <div className="text-3xl mb-2">🔒</div>
          <h3 className="font-bold">Private</h3>
        </div>
        <div className="p-4 bg-vexl-gray-800 rounded">
          <div className="text-3xl mb-2">🤝</div>
          <h3 className="font-bold">P2P</h3>
        </div>
        <div className="p-4 bg-vexl-gray-800 rounded">
          <div className="text-3xl mb-2">⚡</div>
          <h3 className="font-bold">Fast</h3>
        </div>
      </div>
    </div>
  ),
  trustSection: () => (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">
        Trust <span className="text-vexl-yellow">&gt;</span> Ratings
      </h2>
      <div className="bg-vexl-gray-900 p-6 rounded-lg">
        <p className="mb-4">{content?.description || 'Your existing network is more valuable than strangers with stars'}</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Friend of a friend</span>
            <span className="text-green-500">✓ Trustworthy</span>
          </div>
          <div className="flex justify-between">
            <span>5-star stranger</span>
            <span className="text-red-500">✗ Unknown</span>
          </div>
        </div>
      </div>
    </div>
  ),
  privacySection: () => (
    <div className="space-y-6">
      <h2 className="text-4xl font-bold">
        Privacy <span className="text-vexl-yellow">First</span>
      </h2>
      <p className="text-lg text-vexl-gray-400">
        {content?.subtitle || 'We refuse to track your trades because we refuse to become a honeypot'}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-vexl-gray-900 rounded">
          <h3 className="font-bold mb-2">KYC Exchange</h3>
          <ul className="space-y-1 text-sm text-red-400">
            <li>• Tracks everything</li>
            <li>• Stores your data</li>
            <li>• Reports to authorities</li>
          </ul>
        </div>
        <div className="p-4 bg-vexl-gray-900 rounded">
          <h3 className="font-bold mb-2">Vexl</h3>
          <ul className="space-y-1 text-sm text-green-400">
            <li>• No tracking</li>
            <li>• No database</li>
            <li>• No honeypot</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

let content: any = {}

export default function LivePreview({ sectionId, content: propContent, deviceMode = 'desktop' }: LivePreviewProps) {
  content = propContent
  const [scale, setScale] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const Component = sectionComponents[sectionId] || (() => (
    <div className="text-center py-12">
      <p className="text-vexl-gray-500">Preview for this section is being developed</p>
    </div>
  ))

  const getDeviceStyles = () => {
    if (deviceMode === 'mobile') {
      return {
        width: '375px',
        height: '667px',
        transform: `scale(${scale})`
      }
    }
    return {
      width: '100%',
      height: '100%',
      transform: `scale(${scale})`
    }
  }

  return (
    <div className="relative h-full">
      {/* Preview Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setScale(scale === 1 ? 0.75 : scale === 0.75 ? 0.5 : 1)}
          className="p-2 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700"
          title="Zoom"
        >
          <span className="text-xs">{Math.round(scale * 100)}%</span>
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Device Frame */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-vexl-black' : 'relative'} h-full flex items-center justify-center p-8`}>
        {deviceMode === 'mobile' && (
          <div className="relative">
            {/* Phone Frame */}
            <div className="absolute inset-0 bg-vexl-gray-800 rounded-[2.5rem] shadow-2xl" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-20 h-1 bg-vexl-gray-900 rounded-full" />
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 bg-vexl-gray-900 rounded-full" />
          </div>
        )}

        {/* Content Area */}
        <div 
          className={`bg-vexl-black overflow-auto ${
            deviceMode === 'mobile' 
              ? 'rounded-[2rem] border-8 border-vexl-gray-800' 
              : 'rounded-lg border border-vexl-gray-800'
          }`}
          style={getDeviceStyles()}
        >
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={sectionId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Component />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Close Fullscreen */}
        {isFullscreen && (
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 p-2 bg-vexl-gray-800 rounded-lg hover:bg-vexl-gray-700"
          >
            <span className="text-sm">ESC</span>
          </button>
        )}
      </div>

      {/* Update Indicator */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xs text-vexl-gray-500">
        <RefreshCw size={12} className="animate-spin" />
        <span>Live updating</span>
      </div>
    </div>
  )
}