'use client'

import dynamic from 'next/dynamic'
import { ModuleInstance } from '@/lib/slide-modules'

// Dynamically import interactive components to avoid SSR issues
const NetworkVisualization = dynamic(() => import('./NetworkVisualization'), { ssr: false })
const ContactImportDemo = dynamic(() => import('./ContactImportDemo'), { ssr: false })
const PhoneMockup = dynamic(() => import('./PhoneMockup'), { ssr: false })

// Import content modules
import HeadingModule from './HeadingModule'
import ParagraphModule from './ParagraphModule'
import ButtonModule from './ButtonModule'

interface ModuleRendererProps {
  moduleInstance: ModuleInstance
  moduleType: string
}

export default function ModuleRenderer({ moduleInstance, moduleType }: ModuleRendererProps) {
  const renderModule = () => {
    switch (moduleType) {
      // Content Modules
      case 'heading':
        return <HeadingModule config={moduleInstance.config} content={moduleInstance.content} />
      case 'paragraph':
        return <ParagraphModule config={moduleInstance.config} content={moduleInstance.content} />
      case 'button':
        return <ButtonModule config={moduleInstance.config} content={moduleInstance.content} />
      
      // Interactive Modules
      case 'networkVisualization':
        return <NetworkVisualization config={{ ...moduleInstance.config, ...moduleInstance.content }} />
      case 'contactImportDemo':
        return <ContactImportDemo config={{ ...moduleInstance.config, ...moduleInstance.content }} />
      case 'phoneMockup':
        return <PhoneMockup config={{ ...moduleInstance.config, ...moduleInstance.content }} />
      
      // Visual Modules (placeholders for now)
      case 'image':
        return (
          <div className="w-full h-full flex items-center justify-center bg-vexl-gray-800 rounded-lg">
            <div className="text-center">
              <span className="text-4xl">🖼️</span>
              <p className="text-white mt-2">{moduleInstance.content?.alt || 'Image'}</p>
            </div>
          </div>
        )
      
      case 'video':
        return (
          <div className="w-full h-full flex items-center justify-center bg-vexl-gray-800 rounded-lg">
            <div className="text-center">
              <span className="text-4xl">🎬</span>
              <p className="text-white mt-2">Video Player</p>
            </div>
          </div>
        )
      
      // Default placeholder
      default:
        return (
          <div className="flex items-center justify-center h-full bg-vexl-gray-800 rounded-lg p-4">
            <div className="text-center">
              <div className="text-white font-semibold">{moduleType}</div>
              <div className="text-vexl-gray-400 text-sm">
                {moduleInstance.content?.text || 'Module coming soon'}
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="w-full h-full">
      {renderModule()}
    </div>
  )
}