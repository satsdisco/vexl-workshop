// Comprehensive content types for the admin panel

export interface TextContent {
  title?: string
  subtitle?: string
  description?: string
  cta?: string
  items?: ContentItem[]
  stats?: StatItem[]
}

export interface ContentItem {
  id: string
  title?: string
  content: string
  highlight?: string
  icon?: string
}

export interface StatItem {
  id: string
  value: string
  label: string
  color?: string
}

// Component-specific data types
export interface Contact {
  id: string
  name: string
  category: 'friend' | 'family' | 'colleague' | 'community'
  trustScore: number
  avatar?: string
  skills?: string[]
  isVexlUser?: boolean
}

export interface Business {
  id: string
  name: string
  type: string
  owner?: string
  acceptsBitcoin: boolean
  avatar?: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  category: string
  icon?: string
  popularit

y?: number
}

export interface Trade {
  id: string
  person1: string
  person2: string
  skill1: string
  skill2: string
  story?: string
  impact?: string
}

export interface DemoStep {
  id: string
  title: string
  description: string
  screenshot?: string
  highlights?: string[]
  action?: string
}

// Configuration types
export interface GlobalConfig {
  theme: ThemeConfig
  features: FeatureConfig
  audience: AudienceConfig
  calculations: CalculationConfig
}

export interface ThemeConfig {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  darkMode: boolean
  animations: boolean
}

export interface FeatureConfig {
  showContactImport: boolean
  showNetworkVisualization: boolean
  showEconomicCalculator: boolean
  showSkillSharing: boolean
  showTrustComparison: boolean
  showDemoSection: boolean
  showGamification: boolean
}

export interface AudienceConfig {
  technicalLevel: 'beginner' | 'intermediate' | 'advanced'
  focusArea: 'privacy' | 'economics' | 'community' | 'balanced'
  region?: string
  language?: string
}

export interface CalculationConfig {
  economicMultiplier: number
  networkGrowthRate: number
  trustDecayRate: number
  defaultContactCount: number
  localSpendingPercentage: number
}

// Template types
export interface PresetTemplate {
  id: string
  name: string
  description: string
  config: GlobalConfig
  slideContent: Record<string, TextContent>
  componentData: Record<string, any>
}

// Media types
export interface MediaAsset {
  id: string
  url: string
  filename: string
  type: 'image' | 'icon' | 'screenshot'
  alt?: string
  section?: string
}