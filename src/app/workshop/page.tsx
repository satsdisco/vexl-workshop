'use client'

import { useState, useEffect, Suspense, lazy } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Timer from '@/components/Timer'
import PresenterMode from '@/components/PresenterMode'
import SectionNavigation from '@/components/SectionNavigation'
import KeyboardGuide from '@/components/KeyboardGuide'
import SimpleEditMode from '@/components/SimpleEditMode'
import ExportPDF from '@/components/ExportPDF'
import CustomDeckRenderer from '@/components/CustomDeckRenderer'
import { AnimatePresence, motion } from 'framer-motion'
import { getDeck } from '@/data/decks'

// Dynamic imports for code splitting
const HookSection = dynamic(() => import('@/components/sections/HookSection'), {
  loading: () => <div className="min-h-screen flex items-center justify-center"><div className="animate-pulse">Loading...</div></div>
})
const PitchSection = dynamic(() => import('@/components/sections/PitchSection'))
const TrustSection = dynamic(() => import('@/components/sections/TrustSection'))
const PrivacySection = dynamic(() => import('@/components/sections/PrivacySection'))
const ProfileSetupSection = dynamic(() => import('@/components/sections/ProfileSetupSection'))
const FindingOffersSection = dynamic(() => import('@/components/sections/FindingOffersSection'))
const ContactTradingSection = dynamic(() => import('@/components/sections/ContactTradingSection'))
const ClubsSection = dynamic(() => import('@/components/sections/ClubsSection'))
const DemoSection = dynamic(() => import('@/components/sections/DemoSection'))
const VisionSection = dynamic(() => import('@/components/sections/VisionSection'))
const GetStartedSection = dynamic(() => import('@/components/sections/GetStartedSection'))
const QuickDemoSection = dynamic(() => import('@/components/sections/QuickDemoSection'))
const CommunityGrowthSection = dynamic(() => import('@/components/sections/CommunityGrowthSection'))

function Workshop() {
  const searchParams = useSearchParams()
  const [currentSection, setCurrentSection] = useState(0)
  const [isPresenterMode, setIsPresenterMode] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  // Get deck from query parameter or preview
  const deckId = searchParams.get('deck') || 'main-workshop'
  const previewId = searchParams.get('preview')
  const customDeckId = searchParams.get('custom')
  
  // State for custom deck loading
  const [customDeck, setCustomDeck] = useState<any>(null)
  const [loadingDeck, setLoadingDeck] = useState(false)
  
  // Load preview deck from localStorage if preview mode
  let deck = getDeck(deckId)
  if (previewId) {
    const previewData = localStorage.getItem('preview-deck')
    if (previewData) {
      try {
        deck = JSON.parse(previewData)
      } catch (e) {
        console.error('Failed to load preview deck')
      }
    }
  }
  
  // Use custom deck if loaded
  if (customDeck) {
    deck = customDeck
  }

  // All possible sections across all decks
  const allSections = [
    { id: 'hook', name: 'Hook', duration: 2 },
    { id: 'pitch', name: 'Vexl Pitch', duration: 3 },
    { id: 'trust', name: 'Trust > Ratings', duration: 5 },
    { id: 'privacy', name: 'Privacy First', duration: 5 },
    { id: 'profile-setup', name: 'Profile Setup', duration: 2 },
    { id: 'finding-offers', name: 'Finding Offers', duration: 2 },
    { id: 'contact-trading', name: 'Contact & Trading', duration: 3 },
    { id: 'clubs', name: 'Vexl Clubs', duration: 3 },
    { id: 'demo', name: 'Live Demo', duration: 10 },
    { id: 'demo-quick', name: 'Quick Demo', duration: 3 },
    { id: 'vision', name: 'Your Network', duration: 8 },
    { id: 'get-started', name: 'Get Started', duration: 2 },
    // Technical deck sections
    { id: 'technical-architecture', name: 'Technical Architecture', duration: 5 },
    { id: 'encryption-deep-dive', name: 'Encryption Deep Dive', duration: 5 },
    { id: 'p2p-networking', name: 'P2P Networking', duration: 4 },
    { id: 'security-model', name: 'Security Model', duration: 4 },
    { id: 'api-overview', name: 'API Overview', duration: 3 },
    // Beginner deck sections
    { id: 'what-is-bitcoin', name: 'What is Bitcoin?', duration: 3 },
    { id: 'why-privacy-matters', name: 'Why Privacy Matters', duration: 3 },
    { id: 'simple-demo', name: 'Simple Demo', duration: 5 },
    { id: 'getting-started-easy', name: 'Getting Started', duration: 3 },
    { id: 'support-resources', name: 'Support & Resources', duration: 2 },
    // Privacy deck sections
    { id: 'surveillance-problem', name: 'The Surveillance Problem', duration: 4 },
    { id: 'no-kyc-philosophy', name: 'No-KYC Philosophy', duration: 3 },
    { id: 'encryption-overview', name: 'Encryption Overview', duration: 3 },
    { id: 'anonymous-trading', name: 'Anonymous Trading', duration: 4 },
    // Community deck sections
    { id: 'community-growth', name: 'Community Growth', duration: 3 },
    { id: 'network-effects', name: 'Network Effects', duration: 3 },
    { id: 'local-adoption', name: 'Local Adoption', duration: 4 },
    { id: 'organizing-tips', name: 'Organizing Tips', duration: 3 },
    // Investor deck sections
    { id: 'market-opportunity', name: 'Market Opportunity', duration: 3 },
    { id: 'traction-metrics', name: 'Traction & Metrics', duration: 3 },
    { id: 'roadmap', name: 'Product Roadmap', duration: 3 },
    { id: 'team', name: 'Team', duration: 2 },
    { id: 'funding-needs', name: 'Funding Needs', duration: 2 },
  ]

  // Filter sections based on deck if provided
  const sections = deck && deck.slides && Array.isArray(deck.slides) && typeof deck.slides[0] === 'string'
    ? allSections.filter(section => deck.slides.includes(section.id))
    : deck && deck.slides && Array.isArray(deck.slides) && typeof deck.slides[0] === 'object'
    ? deck.slides // Custom deck with slide objects
    : allSections


  const navigateSection = (direction: 'prev' | 'next') => {
    const newSection = direction === 'next' 
      ? Math.min(currentSection + 1, sections.length - 1)
      : Math.max(currentSection - 1, 0)
    
    setCurrentSection(newSection)
  }

  // Load custom deck if needed
  useEffect(() => {
    const loadCustomDeck = async () => {
      if (customDeckId) {
        setLoadingDeck(true)
        try {
          const token = localStorage.getItem('adminToken')
          const response = await fetch('/api/admin/templates', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          if (response.ok) {
            const data = await response.json()
            const customTemplate = data.templates?.find((t: any) => t.id === customDeckId)
            if (customTemplate && customTemplate.sections) {
              const deckData = customTemplate.sections
              setCustomDeck(deckData)
            }
          }
        } catch (error) {
          console.error('Failed to load custom deck:', error)
        } finally {
          setLoadingDeck(false)
        }
      }
    }
    
    loadCustomDeck()
  }, [customDeckId])

  useEffect(() => {
    // Check for edit mode in URL
    if (searchParams.get('edit') === 'true') {
      setIsEditMode(true)
    }
  }, [searchParams])

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Edit mode toggle
      if (e.key === 'e' && !e.metaKey && !e.shiftKey && !e.altKey) {
        // Don't toggle if user is typing in an editable field
        const target = e.target as HTMLElement
        if (target.contentEditable === 'true' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          return
        }
        e.preventDefault()
        setIsEditMode(!isEditMode)
      }
      
      // Presenter mode toggle
      if (e.key === 'p' && e.metaKey) {
        e.preventDefault()
        setIsPresenterMode(!isPresenterMode)
      }
      
      // Timer control
      if (e.key === ' ' && e.shiftKey) {
        e.preventDefault()
        setIsTimerRunning(!isTimerRunning)
      }
      
      // Navigation controls
      if (!e.metaKey && !e.shiftKey && !e.altKey) {
        switch(e.key) {
          case 'ArrowLeft':
            e.preventDefault()
            navigateSection('prev')
            break
          case 'ArrowRight':
            e.preventDefault()
            navigateSection('next')
            break
          case 'Home':
            e.preventDefault()
            setCurrentSection(0)
            break
          case 'End':
            e.preventDefault()
            setCurrentSection(sections.length - 1)
            break
          case 'Escape':
            if (isPresenterMode) {
              setIsPresenterMode(false)
            }
            break
          case ' ':
            if (isTimerRunning) {
              e.preventDefault()
              setIsTimerRunning(false)
            }
            break
        }
        
        // Number keys for direct section navigation
        if (e.key >= '0' && e.key <= '9') {
          e.preventDefault()
          const sectionIndex = parseInt(e.key) - 1
          if (sectionIndex < sections.length) {
            setCurrentSection(sectionIndex)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    
    // Prevent scroll wheel from changing slides on desktop
    const handleWheel = (e: WheelEvent) => {
      if (!isMobile) {
        // Allow scrolling within the slide but not slide navigation
        e.stopPropagation()
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: true })
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [isPresenterMode, isTimerRunning, isEditMode, sections, currentSection, isMobile])

  // Render mobile version with normal scrolling
  if (isMobile) {
    return (
      <main className="min-h-screen">
        <Header />
        
        {/* Mobile: All sections in one scrollable page */}
        <div className="pt-16">
          <section className="min-h-screen flex items-center justify-center px-4 py-12">
            <HookSection />
          </section>
          <section className="px-4 py-12">
            <PitchSection />
          </section>
          <section className="px-4 py-12">
            <TrustSection />
          </section>
          <section className="px-4 py-12">
            <PrivacySection />
          </section>
          <section className="px-4 py-12">
            <ProfileSetupSection />
          </section>
          <section className="px-4 py-12">
            <FindingOffersSection />
          </section>
          <section className="px-4 py-12">
            <ContactTradingSection />
          </section>
          <section className="px-4 py-12">
            <ClubsSection />
          </section>
          <section className="px-4 py-12">
            <DemoSection />
          </section>
          <section className="px-4 py-12">
            <VisionSection />
          </section>
          <section className="px-4 py-12 pb-20">
            <GetStartedSection />
          </section>
        </div>
      </main>
    )
  }

  // Show loading state if loading custom deck
  if (loadingDeck) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-vexl-black">
        <div className="text-center">
          <div className="animate-pulse text-white mb-4">Loading custom deck...</div>
          <div className="w-8 h-8 border-4 border-vexl-yellow border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </main>
    )
  }

  // Desktop version with slide navigation
  return (
    <main className="relative h-screen flex flex-col">
      <Header />
      <Navigation 
        sections={sections} 
        currentSection={currentSection} 
      />
      
      {isTimerRunning && (
        <Timer 
          sections={sections} 
          currentSection={currentSection}
        />
      )}

      {isPresenterMode && (
        <PresenterMode 
          currentSection={currentSection}
          sections={sections}
        />
      )}

      {/* Slide Container - Takes remaining height and allows scrolling */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.section
            key={currentSection}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto overflow-x-hidden"
          >
            <div className="min-h-full px-6 py-20 md:px-12 lg:px-16 slide-section">
              <div className="w-full max-w-7xl mx-auto">
                {/* Check if this is a custom deck with component data */}
                {deck && deck.slides && typeof deck.slides[currentSection] === 'object' && deck.slides[currentSection].components ? (
                  // Render custom deck slide
                  <CustomDeckRenderer 
                    slide={deck.slides[currentSection]} 
                    isEditMode={isEditMode}
                  />
                ) : sections[currentSection] && (() => {
                  // Render traditional slides
                  const sectionId = sections[currentSection].id
                  const sectionMap: { [key: string]: { component: React.ReactNode, editId: string } } = {
                    'hook': { component: <HookSection />, editId: 'hookSection' },
                    'pitch': { component: <PitchSection />, editId: 'pitchSection' },
                    'trust': { component: <TrustSection />, editId: 'trustSection' },
                    'privacy': { component: <PrivacySection />, editId: 'privacySection' },
                    'profile-setup': { component: <ProfileSetupSection />, editId: 'profileSetupSection' },
                    'finding-offers': { component: <FindingOffersSection />, editId: 'findingOffersSection' },
                    'contact-trading': { component: <ContactTradingSection />, editId: 'contactTradingSection' },
                    'clubs': { component: <ClubsSection />, editId: 'clubsSection' },
                    'demo': { component: <DemoSection />, editId: 'demoSection' },
                    'demo-quick': { component: <QuickDemoSection />, editId: 'quickDemoSection' },
                    'vision': { component: <VisionSection />, editId: 'visionSection' },
                    'get-started': { component: <GetStartedSection />, editId: 'getStartedSection' },
                    'community-growth': { component: <CommunityGrowthSection />, editId: 'communityGrowthSection' },
                  }
                  
                  const section = sectionMap[sectionId]
                  if (!section) {
                    // Placeholder for sections not yet implemented
                    return (
                      <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Monument Extended' }}>
                            {sections[currentSection].name}
                          </h2>
                          <p className="text-vexl-gray-400 mb-8">
                            This slide is being developed for specialized decks
                          </p>
                          <div className="inline-flex items-center gap-2 px-6 py-3 bg-vexl-gray-900 rounded-lg">
                            <span className="text-vexl-yellow">Coming Soon</span>
                          </div>
                        </div>
                      </div>
                    )
                  }
                  
                  return (
                    <SimpleEditMode enabled={isEditMode} sectionId={section.editId}>
                      {section.component}
                    </SimpleEditMode>
                  )
                })()}
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
      </div>

      {/* PDF Export Button */}
      <div className="fixed bottom-20 left-4 z-40">
        <ExportPDF deckName={deck?.name || 'Vexl Workshop'} />
      </div>

      <SectionNavigation 
        currentSection={currentSection}
        totalSections={sections.length}
        onNavigate={navigateSection}
      />
      
      <KeyboardGuide />
      
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="fixed top-20 right-4 z-50 bg-vexl-yellow text-black px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          <span className="font-semibold">Edit Mode</span>
          <span className="text-sm opacity-75">(Press E to exit)</span>
        </div>
      )}
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-vexl-black">
        <div className="animate-pulse text-white">Loading workshop...</div>
      </div>
    }>
      <Workshop />
    </Suspense>
  )
}