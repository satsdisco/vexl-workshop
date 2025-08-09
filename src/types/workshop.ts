// Core workshop types - cleaned and organized

// Slide content types
export interface SlideContent {
  [key: string]: {
    title?: string
    subtitle?: string
    description?: string
    items?: Array<{
      id: string
      title?: string
      content: string
      highlight?: string
    }>
    stats?: Array<{
      id: string
      value: string
      label: string
    }>
    cta?: string
  }
}

// Deck types for multi-presentation system
export interface Deck {
  id: string
  name: string
  description: string
  duration: number
  audience: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  slides: string[]
  icon: string
  color: string
  tags: string[]
}

// Slide types for deck builder
export interface Slide {
  id: string
  name: string
  type: string
  content: any
}

// Section types for workshop navigation
export interface Section {
  id: string
  name: string
  duration: number
}

// Template types for workshop variations
export interface Template {
  id: string
  name: string
  description?: string
  category: string
  sections: any
  isActive?: boolean
  isProtected?: boolean
}