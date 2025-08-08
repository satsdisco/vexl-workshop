'use client'

import { ModuleInstance } from '@/lib/slide-modules'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Dynamic imports for all module types
const moduleComponents = {
  heading: dynamic(() => import('./HeadingModule')),
  paragraph: dynamic(() => import('./ParagraphModule')),
  bulletPoints: dynamic(() => import('./BulletPointsModule')),
  quote: dynamic(() => import('./QuoteModule')),
  stats: dynamic(() => import('./StatsModule')),
  webOfTrust: dynamic(() => import('@/components/EnhancedWebOfTrustV2')),
  networkEffect: dynamic(() => import('@/components/NetworkEffectCalculator')),
  marketMap: dynamic(() => import('./MarketMapModule')),
  hashingViz: dynamic(() => import('./HashingVizModule')),
  qrScanner: dynamic(() => import('./QRScannerModule')),
  contactImporter: dynamic(() => import('./ContactImporterModule')),
  image: dynamic(() => import('./ImageModule')),
  video: dynamic(() => import('./VideoModule')),
  icon: dynamic(() => import('./IconModule')),
  comparison: dynamic(() => import('./ComparisonModule')),
  chart: dynamic(() => import('./ChartModule')),
  timeline: dynamic(() => import('./TimelineModule')),
  codeBlock: dynamic(() => import('./CodeBlockModule')),
  button: dynamic(() => import('./ButtonModule'))
}

interface ModuleRendererProps {
  module: ModuleInstance
  isPresenting?: boolean
}

export default function ModuleRenderer({ module, isPresenting = false }: ModuleRendererProps) {
  const Component = moduleComponents[module.moduleId as keyof typeof moduleComponents]
  
  if (!Component) {
    return (
      <div className="p-4 bg-vexl-gray-800 rounded-lg">
        <p className="text-vexl-gray-400">Unknown module: {module.moduleId}</p>
      </div>
    )
  }

  const style = isPresenting ? {
    position: 'absolute' as const,
    left: `${module.position.x}%`,
    top: `${module.position.y}%`,
    width: `${module.position.width}%`,
    height: `${module.position.height}%`
  } : {}

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={style}
      className={!isPresenting ? 'w-full' : ''}
    >
      <Component {...module.content} config={module.config} />
    </motion.div>
  )
}