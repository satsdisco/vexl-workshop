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
import { AnimatePresence, motion } from 'framer-motion'

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

function Workshop() {
  const searchParams = useSearchParams()
  const [currentSection, setCurrentSection] = useState(0)
  const [isPresenterMode, setIsPresenterMode] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const sections = [
    { id: 'hook', name: 'Hook', duration: 2 },
    { id: 'pitch', name: 'Vexl Pitch', duration: 3 },
    { id: 'trust', name: 'Trust > Ratings', duration: 5 },
    { id: 'privacy', name: 'Privacy First', duration: 5 },
    { id: 'profile-setup', name: 'Profile Setup', duration: 2 },
    { id: 'finding-offers', name: 'Finding Offers', duration: 2 },
    { id: 'contact-trading', name: 'Contact & Trading', duration: 3 },
    { id: 'clubs', name: 'Vexl Clubs', duration: 3 },
    { id: 'demo', name: 'Live Demo', duration: 10 },
    { id: 'vision', name: 'Your Network', duration: 8 },
    { id: 'get-started', name: 'Get Started', duration: 2 },
  ]


  const navigateSection = (direction: 'prev' | 'next') => {
    const newSection = direction === 'next' 
      ? Math.min(currentSection + 1, sections.length - 1)
      : Math.max(currentSection - 1, 0)
    
    setCurrentSection(newSection)
  }

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
            <div className="min-h-full px-6 py-20 md:px-12 lg:px-16">
              <div className="w-full max-w-7xl mx-auto">
                {currentSection === 0 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="hookSection">
                    <HookSection />
                  </SimpleEditMode>
                )}
                {currentSection === 1 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="pitchSection">
                    <PitchSection />
                  </SimpleEditMode>
                )}
                {currentSection === 2 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="trustSection">
                    <TrustSection />
                  </SimpleEditMode>
                )}
                {currentSection === 3 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="privacySection">
                    <PrivacySection />
                  </SimpleEditMode>
                )}
                {currentSection === 4 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="profileSetupSection">
                    <ProfileSetupSection />
                  </SimpleEditMode>
                )}
                {currentSection === 5 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="findingOffersSection">
                    <FindingOffersSection />
                  </SimpleEditMode>
                )}
                {currentSection === 6 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="contactTradingSection">
                    <ContactTradingSection />
                  </SimpleEditMode>
                )}
                {currentSection === 7 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="clubsSection">
                    <ClubsSection />
                  </SimpleEditMode>
                )}
                {currentSection === 8 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="demoSection">
                    <DemoSection />
                  </SimpleEditMode>
                )}
                {currentSection === 9 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="visionSection">
                    <VisionSection />
                  </SimpleEditMode>
                )}
                {currentSection === 10 && (
                  <SimpleEditMode enabled={isEditMode} sectionId="getStartedSection">
                    <GetStartedSection />
                  </SimpleEditMode>
                )}
              </div>
            </div>
          </motion.section>
        </AnimatePresence>
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