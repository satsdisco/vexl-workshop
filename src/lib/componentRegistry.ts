// Component Registry - All available components for deck builder
import dynamic from 'next/dynamic'

export interface ComponentDefinition {
  id: string
  name: string
  category: 'demo' | 'visualization' | 'calculator' | 'content' | 'interactive'
  description: string
  icon: string
  component: any
  defaultProps?: any
}

// Dynamic imports for all components
const components = {
  // Demo Components
  hashExplanation: dynamic(() => import('@/components/HashExplanationDemo')),
  contactImport: dynamic(() => import('@/components/ContactImportDemo')),
  webOfTrust: dynamic(() => import('@/components/WebOfTrustDemo')),
  
  // Visualizations
  localNetworkMap: dynamic(() => import('@/components/LocalNetworkMap')),
  neighborhoodTalentMap: dynamic(() => import('@/components/NeighborhoodTalentMap')),
  networkVisualization: dynamic(() => import('@/components/modules/NetworkVisualization')),
  marketMap: dynamic(() => import('@/components/modules/MarketMapModule')),
  
  // Calculators
  impactCalculator: dynamic(() => import('@/components/ImpactCalculator')),
  networkEffectCalculator: dynamic(() => import('@/components/NetworkEffectCalculator')),
  
  // Content Sections (can be reused)
  phoneMockup: dynamic(() => import('@/components/PhoneMockup')),
  vexlLogo: dynamic(() => import('@/components/VexlLogo')),
}

export const componentRegistry: ComponentDefinition[] = [
  {
    id: 'hashExplanation',
    name: 'Hash Explanation Demo',
    category: 'demo',
    description: 'Interactive demo showing how contact hashing works',
    icon: '🔐',
    component: components.hashExplanation,
  },
  {
    id: 'contactImport',
    name: 'Contact Import Demo',
    category: 'demo',
    description: 'Shows the contact import and trust scoring process',
    icon: '📱',
    component: components.contactImport,
  },
  {
    id: 'webOfTrust',
    name: 'Web of Trust Demo',
    category: 'demo',
    description: 'Visualizes the trust network between contacts',
    icon: '🕸️',
    component: components.webOfTrust,
  },
  {
    id: 'localNetworkMap',
    name: 'Local Network Map',
    category: 'visualization',
    description: 'Interactive map showing local Vexl network',
    icon: '🗺️',
    component: components.localNetworkMap,
  },
  {
    id: 'neighborhoodTalentMap',
    name: 'Neighborhood Talent Map',
    category: 'visualization',
    description: 'Shows skills and talents in your area',
    icon: '🏘️',
    component: components.neighborhoodTalentMap,
  },
  {
    id: 'networkVisualization',
    name: 'Network Visualization',
    category: 'visualization',
    description: '3D network graph of connections',
    icon: '🌐',
    component: components.networkVisualization,
  },
  {
    id: 'marketMap',
    name: 'Market Map',
    category: 'visualization',
    description: 'Local Bitcoin marketplace visualization',
    icon: '🏪',
    component: components.marketMap,
  },
  {
    id: 'impactCalculator',
    name: 'Economic Impact Calculator',
    category: 'calculator',
    description: 'Calculate local economic impact of Bitcoin',
    icon: '💰',
    component: components.impactCalculator,
  },
  {
    id: 'networkEffectCalculator',
    name: 'Network Effect Calculator',
    category: 'calculator',
    description: 'Shows network growth potential',
    icon: '📈',
    component: components.networkEffectCalculator,
  },
  {
    id: 'phoneMockup',
    name: 'Phone Mockup',
    category: 'content',
    description: 'iPhone mockup for app screenshots',
    icon: '📱',
    component: components.phoneMockup,
  },
  {
    id: 'vexlLogo',
    name: 'Vexl Logo',
    category: 'content',
    description: 'Vexl brand logo',
    icon: '⚡',
    component: components.vexlLogo,
  },
]

// Get component by ID
export function getComponent(id: string): ComponentDefinition | undefined {
  return componentRegistry.find(c => c.id === id)
}

// Get components by category
export function getComponentsByCategory(category: string): ComponentDefinition[] {
  return componentRegistry.filter(c => c.category === category)
}

// Get all available slide components
export function getSlideComponents(): string[] {
  return [
    'hook', 'pitch', 'trust', 'privacy', 'profile-setup',
    'finding-offers', 'contact-trading', 'clubs', 'demo',
    'vision', 'get-started', 'demo-quick',
    // New component-based slides
    'community-growth', 'network-effects', 'local-adoption',
    'technical-architecture', 'encryption-deep-dive',
  ]
}