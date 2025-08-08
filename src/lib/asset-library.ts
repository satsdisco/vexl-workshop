// Comprehensive Asset Library System for Vexl Workshop
// This defines all reusable components, mockups, and interactive modules

export interface AssetItem {
  id: string
  name: string
  type: 'component' | 'mockup' | 'interactive' | 'media' | 'animation'
  category: string
  description: string
  thumbnail?: string
  configurable: boolean
  dependencies?: string[]
  defaultConfig?: any
}

// ============================================
// INTERACTIVE COMPONENTS (Live, animated elements)
// ============================================

export const interactiveComponents: AssetItem[] = [
  {
    id: 'network-visualization',
    name: 'Network Web Visualization',
    type: 'interactive',
    category: 'Trust Network',
    description: 'Animated network showing connections between users with labels and stats',
    configurable: true,
    defaultConfig: {
      nodes: [
        { id: 'you', label: 'You', type: 'primary', x: 50, y: 50 },
        { id: 'mom', label: 'Your Mom', type: 'bridge', x: 70, y: 30 },
        { id: 'friend', label: 'Best Friend', type: 'vexl', x: 30, y: 70 },
        { id: 'coworker', label: 'Coworker', type: 'normal', x: 80, y: 60 },
        { id: 'barber', label: 'Your Barber', type: 'bridge', x: 20, y: 40 }
      ],
      connections: [
        { from: 'you', to: 'mom', strength: 'strong' },
        { from: 'you', to: 'friend', strength: 'strong' },
        { from: 'you', to: 'coworker', strength: 'medium' },
        { from: 'you', to: 'barber', strength: 'weak' },
        { from: 'mom', to: 'friend', strength: 'bridge' }
      ],
      stats: {
        totalConnections: 15,
        vexlUsers: 6,
        bridges: 3
      },
      showLabels: true,
      animated: true,
      interactive: true
    }
  },
  {
    id: 'contact-import-demo',
    name: 'Contact Import Demonstration',
    type: 'interactive',
    category: 'Onboarding',
    description: 'Interactive UI showing contact categorization and import process',
    configurable: true,
    defaultConfig: {
      categories: [
        { id: 'close', name: 'Close Friends', icon: '👥', count: 5, checked: true },
        { id: 'acquaintances', name: 'Acquaintances', icon: '🤝', count: 20, checked: false },
        { id: 'service', name: 'Service Providers', icon: '🛠️', count: 15, checked: false },
        { id: 'business', name: 'Local Businesses', icon: '🏪', count: 25, checked: false },
        { id: 'community', name: 'Community Groups', icon: '🏘️', count: 30, checked: false }
      ],
      showWarning: true,
      warningMessage: 'Only importing close friends severely limits your trading opportunities',
      directContacts: 5,
      totalNetworkReach: 10
    }
  },
  {
    id: 'offer-feed',
    name: 'Live Offer Feed',
    type: 'interactive',
    category: 'Trading',
    description: 'Scrollable feed showing Bitcoin offers from network',
    configurable: true,
    defaultConfig: {
      offers: [
        { location: 'Zimbabwe', amount: '500 BTC', rate: '5%', seller: 'Mokstoshe' },
        { location: 'Berlin', amount: '1000 EUR', rate: '€10K', seller: 'Local trader' }
      ],
      showCommonFriends: true,
      animated: true
    }
  },
  {
    id: 'common-friends-modal',
    name: 'Common Friends Display',
    type: 'interactive',
    category: 'Trust',
    description: 'Modal showing mutual connections with a trader',
    configurable: true,
    defaultConfig: {
      friends: [
        { name: 'Sarah Miller', avatar: '👤', action: 'Call' },
        { name: 'John Doe', avatar: '👤', action: 'Call' },
        { name: 'Emma Wilson', avatar: '👤', action: 'Call' }
      ]
    }
  },
  {
    id: 'trust-indicators',
    name: 'Trust Level Indicators',
    type: 'interactive',
    category: 'Trust',
    description: 'Visual indicators showing trust levels and connection paths',
    configurable: true,
    defaultConfig: {
      levels: ['1st degree', '2nd degree', 'Bridge connection'],
      colors: ['#FFD700', '#90EE90', '#87CEEB']
    }
  }
]

// ============================================
// PHONE MOCKUPS (Device frames with screens)
// ============================================

export const phoneMockups: AssetItem[] = [
  {
    id: 'iphone-offer-feed',
    name: 'iPhone - Offer Feed Screen',
    type: 'mockup',
    category: 'App Screens',
    description: 'iPhone frame showing the main offer feed interface',
    configurable: true,
    defaultConfig: {
      device: 'iphone14pro',
      screen: 'offer-feed',
      orientation: 'portrait',
      theme: 'dark'
    }
  },
  {
    id: 'iphone-common-friends',
    name: 'iPhone - Common Friends Modal',
    type: 'mockup',
    category: 'App Screens',
    description: 'iPhone showing the common friends verification modal',
    configurable: true,
    defaultConfig: {
      device: 'iphone14pro',
      screen: 'common-friends',
      modalOpen: true
    }
  },
  {
    id: 'iphone-chat',
    name: 'iPhone - Chat Interface',
    type: 'mockup',
    category: 'App Screens',
    description: 'iPhone showing encrypted chat with trader',
    configurable: true,
    defaultConfig: {
      device: 'iphone14pro',
      screen: 'chat',
      messages: ['Hi, I want to buy', 'Sure, let\'s meet at...']
    }
  },
  {
    id: 'triple-phone-showcase',
    name: 'Three Phone Showcase',
    type: 'mockup',
    category: 'Marketing',
    description: 'Three iPhones showing different app features',
    configurable: true,
    defaultConfig: {
      phones: [
        { screen: 'offer-feed', angle: -15 },
        { screen: 'common-friends', angle: 0 },
        { screen: 'chat', angle: 15 }
      ]
    }
  }
]

// ============================================
// UI COMPONENTS (Smaller reusable elements)
// ============================================

export const uiComponents: AssetItem[] = [
  {
    id: 'network-stats-panel',
    name: 'Network Statistics Panel',
    type: 'component',
    category: 'Data Display',
    description: 'Panel showing network stats like connections and users',
    configurable: true,
    defaultConfig: {
      stats: [
        { label: 'Total Connections', value: 15, icon: '🔗' },
        { label: 'Vexl Users', value: 6, icon: '👥' },
        { label: 'Bridge Connections', value: 3, icon: '🌉' }
      ]
    }
  },
  {
    id: 'contact-list',
    name: 'Contact List Sidebar',
    type: 'component',
    category: 'Lists',
    description: 'Scrollable list of contacts with badges',
    configurable: true,
    defaultConfig: {
      contacts: [],
      showBadges: true,
      showActions: true
    }
  },
  {
    id: 'cta-buttons',
    name: 'Call-to-Action Buttons',
    type: 'component',
    category: 'Actions',
    description: 'Styled buttons for primary actions',
    configurable: true,
    defaultConfig: {
      buttons: [
        { text: 'I\'m posting my first skill offer today!', style: 'primary' },
        { text: 'Show me local Vexl groups', style: 'secondary' }
      ]
    }
  },
  {
    id: 'warning-panel',
    name: 'Warning/Info Panel',
    type: 'component',
    category: 'Feedback',
    description: 'Alert panel for warnings or important info',
    configurable: true,
    defaultConfig: {
      type: 'warning',
      title: 'Limited Network Warning',
      message: 'Only importing close friends severely limits your trading opportunities',
      icon: '⚠️'
    }
  },
  {
    id: 'progress-indicator',
    name: 'Progress Indicator',
    type: 'component',
    category: 'Feedback',
    description: 'Shows progress through multi-step process',
    configurable: true,
    defaultConfig: {
      steps: ['Data Collection', 'Privacy Tech', 'Import Strategy'],
      currentStep: 2
    }
  }
]

// ============================================
// MEDIA ASSETS (Static images, icons, etc.)
// ============================================

export const mediaAssets: AssetItem[] = [
  {
    id: 'vexl-logo',
    name: 'Vexl Logo',
    type: 'media',
    category: 'Branding',
    description: 'Official Vexl logo in various formats',
    configurable: false
  },
  {
    id: 'bitcoin-icon',
    name: 'Bitcoin Icon',
    type: 'media',
    category: 'Icons',
    description: 'Bitcoin logo/icon',
    configurable: false
  },
  {
    id: 'trust-badges',
    name: 'Trust Level Badges',
    type: 'media',
    category: 'Icons',
    description: 'Visual badges for different trust levels',
    configurable: true,
    defaultConfig: {
      badges: ['1st', '2nd', 'Bridge', 'Vexl']
    }
  }
]

// ============================================
// ANIMATIONS (Reusable animation sequences)
// ============================================

export const animations: AssetItem[] = [
  {
    id: 'network-pulse',
    name: 'Network Connection Pulse',
    type: 'animation',
    category: 'Effects',
    description: 'Pulsing animation for network connections',
    configurable: true,
    defaultConfig: {
      duration: 2000,
      color: '#FFD700',
      intensity: 0.8
    }
  },
  {
    id: 'node-appear',
    name: 'Node Appearance Animation',
    type: 'animation',
    category: 'Transitions',
    description: 'Animation for new nodes appearing in network',
    configurable: true,
    defaultConfig: {
      duration: 500,
      easing: 'easeOut',
      scale: true,
      fade: true
    }
  },
  {
    id: 'message-flow',
    name: 'Message Flow Animation',
    type: 'animation',
    category: 'Effects',
    description: 'Shows messages flowing between nodes',
    configurable: true,
    defaultConfig: {
      speed: 1000,
      particleCount: 3,
      color: '#00FF00'
    }
  }
]

// ============================================
// PRESET COMBINATIONS (Ready-made slide layouts)
// ============================================

export const presetLayouts = [
  {
    id: 'trust-network-showcase',
    name: 'Trust Network Showcase',
    description: 'Full network visualization with stats and contact list',
    components: ['network-visualization', 'network-stats-panel', 'contact-list']
  },
  {
    id: 'onboarding-flow',
    name: 'Onboarding Flow Demo',
    description: 'Contact import process with warnings',
    components: ['contact-import-demo', 'warning-panel', 'progress-indicator']
  },
  {
    id: 'app-showcase',
    name: 'App Feature Showcase',
    description: 'Multiple phones showing different features',
    components: ['triple-phone-showcase', 'cta-buttons']
  },
  {
    id: 'offer-discovery',
    name: 'Offer Discovery Demo',
    description: 'How users find and verify offers',
    components: ['iphone-offer-feed', 'common-friends-modal', 'trust-indicators']
  }
]

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getAssetById(id: string): AssetItem | undefined {
  const allAssets = [
    ...interactiveComponents,
    ...phoneMockups,
    ...uiComponents,
    ...mediaAssets,
    ...animations
  ]
  return allAssets.find(asset => asset.id === id)
}

export function getAssetsByCategory(category: string): AssetItem[] {
  const allAssets = [
    ...interactiveComponents,
    ...phoneMockups,
    ...uiComponents,
    ...mediaAssets,
    ...animations
  ]
  return allAssets.filter(asset => asset.category === category)
}

export function getAssetsByType(type: string): AssetItem[] {
  const allAssets = [
    ...interactiveComponents,
    ...phoneMockups,
    ...uiComponents,
    ...mediaAssets,
    ...animations
  ]
  return allAssets.filter(asset => asset.type === type)
}