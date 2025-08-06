import { prisma } from './prisma'
import { defaultContent } from '@/data/defaultContent'

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database with default content...')
    
    // Seed slide content
    for (const [sectionId, content] of Object.entries(defaultContent)) {
      const { title, subtitle, description, cta, ...rest } = content as any
      
      await prisma.slideContent.upsert({
        where: { sectionId },
        update: {
          title: title || null,
          subtitle: subtitle || null,
          description: description || null,
          cta: cta || null,
          content: JSON.stringify(rest)
        },
        create: {
          sectionId,
          title: title || null,
          subtitle: subtitle || null,
          description: description || null,
          cta: cta || null,
          content: JSON.stringify(rest)
        }
      })
      console.log(`✅ Seeded ${sectionId}`)
    }
    
    // Seed default component data
    const defaultComponents = {
      contacts: {
        componentType: 'contacts',
        data: [
          { id: '1', name: 'Alice Johnson', category: 'friend', trustScore: 9, isVexlUser: true },
          { id: '2', name: 'Bob Smith', category: 'colleague', trustScore: 7, isVexlUser: false },
          { id: '3', name: 'Carol Davis', category: 'family', trustScore: 10, isVexlUser: true },
          { id: '4', name: 'David Wilson', category: 'community', trustScore: 6, isVexlUser: false }
        ]
      },
      businesses: {
        componentType: 'businesses',
        data: [
          { id: '1', name: 'Local Coffee Shop', type: 'Cafe', owner: 'Alice', acceptsBitcoin: true },
          { id: '2', name: 'Farmers Market', type: 'Market', owner: 'Bob', acceptsBitcoin: false },
          { id: '3', name: 'Tech Repair Shop', type: 'Service', owner: 'Carol', acceptsBitcoin: true }
        ]
      },
      skills: {
        componentType: 'skills',
        data: [
          { id: '1', name: 'Web Development', category: 'Tech', icon: '💻' },
          { id: '2', name: 'Graphic Design', category: 'Creative', icon: '🎨' },
          { id: '3', name: 'Plumbing', category: 'Trade', icon: '🔧' },
          { id: '4', name: 'Teaching', category: 'Education', icon: '📚' }
        ]
      },
      trades: {
        componentType: 'trades',
        data: [
          { 
            id: '1', 
            person1: 'Alice', 
            person2: 'Bob', 
            skill1: 'Web Development', 
            skill2: 'Graphic Design',
            story: 'Alice built a website for Bob, Bob designed a logo for Alice'
          }
        ]
      },
      demoSteps: {
        componentType: 'demoSteps',
        data: [
          { id: '1', title: 'Import Contacts', description: 'Connect your phone contacts', action: 'Import' },
          { id: '2', title: 'Create Offer', description: 'Set your buy/sell preferences', action: 'Create' },
          { id: '3', title: 'Find Matches', description: 'Discover traders in your network', action: 'Search' },
          { id: '4', title: 'Make Trade', description: 'Connect and exchange', action: 'Trade' }
        ]
      }
    }
    
    for (const [componentId, data] of Object.entries(defaultComponents)) {
      await prisma.componentData.upsert({
        where: { componentId },
        update: {
          componentType: data.componentType,
          data: JSON.stringify(data.data),
          config: JSON.stringify({}),
          toggles: JSON.stringify({})
        },
        create: {
          componentId,
          componentType: data.componentType,
          data: JSON.stringify(data.data),
          config: JSON.stringify({}),
          toggles: JSON.stringify({})
        }
      })
      console.log(`✅ Seeded component: ${componentId}`)
    }
    
    // Seed default features
    const defaultFeatures = [
      { feature: 'showContactImport', enabled: true, section: 'demo' },
      { feature: 'showNetworkVisualization', enabled: true, section: 'trust' },
      { feature: 'showEconomicCalculator', enabled: true, section: 'vision' },
      { feature: 'showSkillSharing', enabled: true, section: 'vision' },
      { feature: 'showTrustComparison', enabled: true, section: 'trust' },
      { feature: 'showDemoSection', enabled: true, section: 'demo' },
      { feature: 'showGamification', enabled: true, section: 'vision' }
    ]
    
    for (const f of defaultFeatures) {
      await prisma.featureToggle.upsert({
        where: { feature: f.feature },
        update: { enabled: f.enabled, section: f.section },
        create: f
      })
    }
    console.log('✅ Seeded feature toggles')
    
    // Seed default configuration
    const defaultConfig = [
      { key: 'economicMultiplier', value: 2.5, category: 'calculations' },
      { key: 'networkGrowthRate', value: 1.5, category: 'calculations' },
      { key: 'trustDecayRate', value: 0.1, category: 'calculations' },
      { key: 'defaultContactCount', value: 150, category: 'calculations' },
      { key: 'localSpendingPercentage', value: 0.68, category: 'calculations' },
      { key: 'primaryColor', value: '#FFD700', category: 'theme' },
      { key: 'darkMode', value: true, category: 'theme' },
      { key: 'animations', value: true, category: 'theme' }
    ]
    
    for (const c of defaultConfig) {
      await prisma.globalConfig.upsert({
        where: { key: c.key },
        update: { value: JSON.stringify(c.value), category: c.category },
        create: { key: c.key, value: JSON.stringify(c.value), category: c.category }
      })
    }
    console.log('✅ Seeded global configuration')
    
    console.log('🎉 Database seeding complete!')
    return { success: true }
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    return { success: false, error }
  }
}