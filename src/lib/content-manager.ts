import { defaultContent } from '@/data/defaultContent'

interface ContentConfig {
  sectionId: string
  fallbackContent?: any
  mergeStrategy?: 'replace' | 'merge' | 'fallback'
}

export class ContentManager {
  private static cache: Map<string, { data: any; timestamp: number }> = new Map()
  private static CACHE_TTL = 5000 // 5 seconds

  static async getContent(config: ContentConfig) {
    const { sectionId, fallbackContent, mergeStrategy = 'merge' } = config
    
    // Check cache first
    const cached = this.cache.get(sectionId)
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return this.applyFallback(cached.data, fallbackContent, mergeStrategy)
    }

    try {
      // Fetch from API
      const response = await fetch('/api/admin/slides')
      const data = await response.json()
      
      if (data.success && data.content[sectionId]) {
        const content = data.content[sectionId]
        
        // Update cache
        this.cache.set(sectionId, {
          data: content,
          timestamp: Date.now()
        })
        
        return this.applyFallback(content, fallbackContent, mergeStrategy)
      }
    } catch (error) {
      console.error('ContentManager: Failed to fetch content', error)
    }
    
    // Return fallback if API fails
    return fallbackContent || this.getDefaultContent(sectionId)
  }

  private static applyFallback(content: any, fallback: any, strategy: string) {
    if (!fallback) return content
    
    switch (strategy) {
      case 'replace':
        // Database content completely replaces fallback
        return content
        
      case 'fallback':
        // Only use database if exists, otherwise fallback
        return Object.keys(content).length > 0 ? content : fallback
        
      case 'merge':
      default:
        // Merge database content with fallback (database takes precedence)
        return this.deepMerge(fallback, content)
    }
  }

  private static deepMerge(target: any, source: any): any {
    if (!source) return target
    if (!target) return source
    
    const result = { ...target }
    
    for (const key in source) {
      if (source[key] === null || source[key] === undefined) {
        continue
      }
      
      if (typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key], source[key])
      } else {
        result[key] = source[key]
      }
    }
    
    return result
  }

  private static getDefaultContent(sectionId: string): any {
    // Map section IDs to default content
    const defaultMap: { [key: string]: any } = {
      hookSection: {
        title: defaultContent.hero?.title || 'Your Network is Your Net Worth',
        subtitle: defaultContent.hero?.subtitle || 'Start with the people you already trust',
        description: defaultContent.hero?.description
      },
      pitchSection: {
        title: 'What is Vexl?',
        subtitle: 'The peer-to-peer Bitcoin marketplace',
        description: 'Trade Bitcoin with people you trust, not corporations that track you.',
        features: defaultContent.features || []
      },
      trustSection: {
        title: 'Trust > Ratings',
        subtitle: 'Your network is more valuable than stranger reviews',
        description: 'A friend of a friend is worth more than a 5-star stranger.',
        comparison: defaultContent.comparison || {}
      },
      privacySection: {
        title: 'Privacy First',
        subtitle: 'We refuse to track your trades',
        description: 'No database means no honeypot. Your privacy is our foundation.'
      },
      profileSetupSection: {
        title: 'Quick Setup',
        subtitle: 'Get started in 60 seconds',
        description: 'Create your profile in less than a minute'
      },
      findingOffersSection: {
        title: 'Find Offers',
        subtitle: 'Browse your network',
        description: 'Discover Bitcoin offers from people you trust'
      },
      contactTradingSection: {
        title: 'Safe Trading',
        subtitle: 'Connect and trade securely',
        description: 'Complete trades with confidence'
      },
      clubsSection: {
        title: 'Vexl Clubs',
        subtitle: 'Expand your trading network',
        description: 'Join communities of Bitcoin traders'
      },
      demoSection: {
        title: 'Live Demo',
        subtitle: 'See it in action',
        description: 'Experience the app firsthand'
      },
      visionSection: {
        title: 'Your Network Matters',
        subtitle: 'Build your Bitcoin community',
        description: 'Every connection strengthens the network'
      },
      getStartedSection: {
        title: 'Get Started Today',
        subtitle: 'Join the P2P revolution',
        description: 'Download Vexl and start trading Bitcoin privately'
      }
    }
    
    return defaultMap[sectionId] || {}
  }

  static clearCache(sectionId?: string) {
    if (sectionId) {
      this.cache.delete(sectionId)
    } else {
      this.cache.clear()
    }
  }

  static async preloadContent(sectionIds: string[]) {
    const promises = sectionIds.map(id => 
      this.getContent({ sectionId: id, mergeStrategy: 'merge' })
    )
    await Promise.all(promises)
  }
}