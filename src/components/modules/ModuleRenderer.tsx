'use client'

import dynamic from 'next/dynamic'
import { ModuleInstance } from '@/lib/slide-modules'

// Dynamically import interactive components to avoid SSR issues
const NetworkVisualization = dynamic(() => import('./NetworkVisualization'), { ssr: false })
const ContactImportDemo = dynamic(() => import('./ContactImportDemo'), { ssr: false })
const PhoneMockup = dynamic(() => import('./PhoneMockup'), { ssr: false })

interface ModuleRendererProps {
  moduleInstance: ModuleInstance
  moduleType: string
}

export default function ModuleRenderer({ moduleInstance, moduleType }: ModuleRendererProps) {
  const renderModule = () => {
    switch (moduleType) {
      // Interactive Modules
      case 'networkVisualization':
        return <NetworkVisualization config={{ ...moduleInstance.config, ...moduleInstance.content }} />
      case 'contactImportDemo':
        return <ContactImportDemo config={{ ...moduleInstance.config, ...moduleInstance.content }} />
      case 'phoneMockup':
        return <PhoneMockup config={{ ...moduleInstance.config, ...moduleInstance.content }} />
      
      // Placeholder for other modules
      default:
        return (
          <div className="flex items-center justify-center h-full bg-vexl-gray-800 rounded-lg p-4">
            <div className="text-center">
              <div className="text-white font-semibold">{moduleType}</div>
              <div className="text-vexl-gray-400 text-sm">
                {moduleInstance.content?.text || 'Configure this module'}
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