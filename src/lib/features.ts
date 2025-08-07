// Feature configuration for workshop presentation
export interface FeatureConfig {
  id: string
  name: string
  description: string
  enabled: boolean
  section?: string
  settings?: Record<string, any>
}

export const defaultFeatures: FeatureConfig[] = [
  // Interactive Demos
  {
    id: 'webOfTrust',
    name: 'Web of Trust Demo',
    description: 'Interactive visualization of trust networks',
    enabled: true,
    section: 'trustSection',
    settings: {
      autoAnimate: true,
      showLabels: true,
      maxConnections: 6
    }
  },
  {
    id: 'networkEffect',
    name: 'Network Effect Calculator',
    description: 'Shows the power of network growth',
    enabled: true,
    section: 'visionSection',
    settings: {
      initialNodes: 5,
      growthRate: 1.5,
      animationSpeed: 'medium'
    }
  },
  {
    id: 'contactImporter',
    name: 'Contact Importer Demo',
    description: 'Demonstrates contact import process',
    enabled: true,
    section: 'profileSetupSection',
    settings: {
      showMockContacts: true,
      demoContactCount: 10
    }
  },
  {
    id: 'qrCodeScanner',
    name: 'QR Code Scanner',
    description: 'Live QR code scanning demonstration',
    enabled: true,
    section: 'getStartedSection',
    settings: {
      showCamera: false,
      mockScanDelay: 2000
    }
  },
  {
    id: 'marketMap',
    name: 'Market Map Visualization',
    description: 'Shows P2P traders in your area',
    enabled: true,
    section: 'findingOffersSection',
    settings: {
      defaultLocation: 'Prague',
      zoomLevel: 12,
      showHeatmap: true
    }
  },
  {
    id: 'chatDemo',
    name: 'Chat Interface Demo',
    description: 'Shows encrypted chat features',
    enabled: true,
    section: 'contactTradingSection',
    settings: {
      showTypingIndicator: true,
      demoMessages: true
    }
  },
  
  // Presentation Features
  {
    id: 'presenterMode',
    name: 'Presenter Mode',
    description: 'Shows presenter notes and timer',
    enabled: true,
    settings: {
      defaultDuration: 45,
      showNotes: true,
      showProgress: true
    }
  },
  {
    id: 'keyboardShortcuts',
    name: 'Keyboard Shortcuts',
    description: 'Enable keyboard navigation',
    enabled: true,
    settings: {
      nextKey: 'ArrowRight',
      prevKey: 'ArrowLeft',
      togglePresenterKey: 'p',
      toggleTimerKey: 't'
    }
  },
  {
    id: 'autoAdvance',
    name: 'Auto-Advance Slides',
    description: 'Automatically advance through sections',
    enabled: false,
    settings: {
      intervalSeconds: 30,
      pauseOnInteraction: true
    }
  },
  {
    id: 'animations',
    name: 'Slide Animations',
    description: 'Enable transition animations',
    enabled: true,
    settings: {
      type: 'fade',
      duration: 500,
      easing: 'easeInOut'
    }
  },
  
  // Content Features
  {
    id: 'liveDataFeed',
    name: 'Live Data Feed',
    description: 'Show real-time Bitcoin/P2P stats',
    enabled: false,
    settings: {
      updateInterval: 30000,
      showPrice: true,
      showVolume: true
    }
  },
  {
    id: 'audiencePolls',
    name: 'Audience Polls',
    description: 'Interactive polling during presentation',
    enabled: false,
    settings: {
      pollProvider: 'internal',
      showResults: 'realtime'
    }
  },
  {
    id: 'languageSwitch',
    name: 'Language Switcher',
    description: 'Multi-language support',
    enabled: false,
    settings: {
      defaultLanguage: 'en',
      availableLanguages: ['en', 'cs', 'de', 'es']
    }
  },
  {
    id: 'darkMode',
    name: 'Dark Mode Toggle',
    description: 'Switch between light and dark themes',
    enabled: false,
    settings: {
      defaultTheme: 'dark'
    }
  }
]

export function getFeatureSettings(featureId: string): any {
  const feature = defaultFeatures.find(f => f.id === featureId)
  return feature?.settings || {}
}

export function isFeatureEnabled(featureId: string): boolean {
  const feature = defaultFeatures.find(f => f.id === featureId)
  return feature?.enabled ?? false
}