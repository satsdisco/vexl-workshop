'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { componentRegistry, getComponent } from '@/lib/componentRegistry'
import VexlLogo from './VexlLogo'

// Import existing slide components
const existingSlideComponents = {
  'hook': dynamic(() => import('@/components/sections/HookSection')),
  'pitch': dynamic(() => import('@/components/sections/PitchSection')),
  'trust': dynamic(() => import('@/components/sections/TrustSection')),
  'privacy': dynamic(() => import('@/components/sections/PrivacySection')),
  'profile-setup': dynamic(() => import('@/components/sections/ProfileSetupSection')),
  'finding-offers': dynamic(() => import('@/components/sections/FindingOffersSection')),
  'contact-trading': dynamic(() => import('@/components/sections/ContactTradingSection')),
  'clubs': dynamic(() => import('@/components/sections/ClubsSection')),
  'demo': dynamic(() => import('@/components/sections/DemoSection')),
  'demo-quick': dynamic(() => import('@/components/sections/QuickDemoSection')),
  'vision': dynamic(() => import('@/components/sections/VisionSection')),
  'get-started': dynamic(() => import('@/components/sections/GetStartedSection')),
  'community-growth': dynamic(() => import('@/components/sections/CommunityGrowthSection')),
}

interface SlideComponent {
  id: string
  type: 'component' | 'textbox' | 'existing-slide' | 'asset' | 'image'
  componentId?: string
  assetId?: string
  content?: any
  position: { x: number, y: number }
  size: { width: number, height: number }
  props?: any
}

interface CustomSlide {
  id: string
  name: string
  type: string
  layout: string
  components: SlideComponent[]
}

interface CustomDeckRendererProps {
  slide: CustomSlide
  isEditMode?: boolean
}

// Enhanced text renderer component with brand colors
const TextRenderer = ({ content }: { content: any }) => {
  // Brand colors
  const brandColors = {
    white: '#FFFFFF',
    yellow: '#FCD34D',
    green: '#10B981',
    blue: '#3B82F6',
    gray: '#6B7280',
    lightGray: '#D1D5DB'
  }
  
  // Text sizes
  const textSizes = {
    title: 'text-4xl md:text-6xl',
    subtitle: 'text-2xl md:text-3xl',
    large: 'text-xl md:text-2xl',
    body: 'text-lg md:text-xl',
    small: 'text-base md:text-lg',
    caption: 'text-sm md:text-base'
  }
  
  // Font weights
  const fontWeights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black'
  }

  const style = content?.style || 'body'
  const color = content?.color || 'white'
  const weight = content?.weight || (style === 'title' ? 'bold' : 'normal')
  const align = content?.align || 'left'
  const text = content?.text || ''

  return (
    <div 
      className={`${textSizes[style]} ${fontWeights[weight]}`}
      style={{ 
        fontFamily: (style === 'title' || style === 'subtitle') ? 'Monument Extended' : 'inherit',
        whiteSpace: 'pre-wrap',
        color: brandColors[color] || brandColors.white,
        textAlign: align as any
      }}
    >
      {text}
    </div>
  )
}

export default function CustomDeckRenderer({ slide, isEditMode = false }: CustomDeckRendererProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !slide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-white">Loading slide...</div>
      </div>
    )
  }

  // If it's a traditional slide (no components array), render as before
  if (!slide.components || slide.components.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <VexlLogo className="w-32 h-auto mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Monument Extended' }}>
            {slide.name}
          </h2>
          <p className="text-vexl-gray-400">
            This slide is being developed
          </p>
        </div>
      </div>
    )
  }

  // Check if this is a full existing slide (single component taking full space)
  const isFullSlide = slide.components.length === 1 && 
    slide.components[0].type === 'existing-slide' &&
    slide.components[0].size.width === 100 && 
    slide.components[0].size.height === 100

  if (isFullSlide) {
    const component = slide.components[0]
    const ExistingSlide = existingSlideComponents[component.componentId as keyof typeof existingSlideComponents]
    
    if (ExistingSlide) {
      return <ExistingSlide />
    }
  }

  // Render custom layout with positioned components
  return (
    <div className="relative w-full min-h-screen bg-vexl-black">
      {/* Canvas container with aspect ratio */}
      <div 
        className="relative mx-auto"
        style={{ 
          maxWidth: '1920px',
          aspectRatio: '16/9',
          minHeight: '100vh'
        }}
      >
        {slide.components.map((component) => {
          // Skip if position/size undefined (safety check)
          if (!component.position || !component.size) {
            return null
          }

          // Common positioning styles
          const positionStyles = {
            position: 'absolute' as const,
            left: `${component.position.x}%`,
            top: `${component.position.y}%`,
            width: `${component.size.width}%`,
            height: component.type === 'textbox' ? 'auto' : `${component.size.height}%`,
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }

          // Render existing slide component
          if (component.type === 'existing-slide') {
            const ExistingSlide = existingSlideComponents[component.componentId as keyof typeof existingSlideComponents]
            if (!ExistingSlide) return null
            
            return (
              <div key={component.id} style={positionStyles}>
                <div className="w-full h-full overflow-auto">
                  <ExistingSlide />
                </div>
              </div>
            )
          }

          // Render text box
          if (component.type === 'textbox') {
            return (
              <div key={component.id} style={positionStyles}>
                <TextRenderer content={component.content} />
              </div>
            )
          }
          
          // Render asset/image
          if (component.type === 'asset' || component.type === 'image') {
            const asset = component.content
            return (
              <div key={component.id} style={positionStyles}>
                <img
                  src={asset?.url || '/placeholder.svg'}
                  alt={asset?.name || 'Asset'}
                  className="w-full h-full object-contain"
                />
              </div>
            )
          }

          // Render interactive component
          if (component.type === 'component') {
            const ComponentDef = getComponent(component.componentId!)
            if (!ComponentDef) return null
            const Component = ComponentDef.component
            
            return (
              <div key={component.id} style={positionStyles}>
                <div className="w-full h-full">
                  <Component {...(component.props || {})} />
                </div>
              </div>
            )
          }

          return null
        })}
      </div>
    </div>
  )
}