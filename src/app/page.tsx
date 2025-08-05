'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import HookSection from '@/components/sections/HookSection'
import PitchSection from '@/components/sections/PitchSection'
import TrustSection from '@/components/sections/TrustSection'
import PrivacySection from '@/components/sections/PrivacySection'
import DemoSection from '@/components/sections/DemoSection'
import VisionSection from '@/components/sections/VisionSection'
import GetStartedSection from '@/components/sections/GetStartedSection'
import Timer from '@/components/Timer'
import PresenterMode from '@/components/PresenterMode'
import SectionNavigation from '@/components/SectionNavigation'
import KeyboardGuide from '@/components/KeyboardGuide'
import { AnimatePresence, motion } from 'framer-motion'

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPresenterMode, setIsPresenterMode] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const sections = [
    { id: 'hook', name: 'Hook', duration: 2 },
    { id: 'pitch', name: 'Vexl Pitch', duration: 3 },
    { id: 'trust', name: 'Trust > Ratings', duration: 5 },
    { id: 'privacy', name: 'Privacy First', duration: 5 },
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
    const handleKeyPress = (e: KeyboardEvent) => {
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
        if (e.key >= '1' && e.key <= '7') {
          e.preventDefault()
          const sectionIndex = parseInt(e.key) - 1
          if (sectionIndex < sections.length) {
            setCurrentSection(sectionIndex)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPresenterMode, isTimerRunning, sections, currentSection])

  return (
    <main className="relative h-screen overflow-hidden">
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

      {/* Slide Container */}
      <div className="min-h-screen overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.section
            key={currentSection}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="section-container absolute inset-0 w-full"
          >
            {currentSection === 0 && <HookSection />}
            {currentSection === 1 && <PitchSection />}
            {currentSection === 2 && <TrustSection />}
            {currentSection === 3 && <PrivacySection />}
            {currentSection === 4 && <DemoSection />}
            {currentSection === 5 && <VisionSection />}
            {currentSection === 6 && <GetStartedSection />}
          </motion.section>
        </AnimatePresence>
      </div>

      <SectionNavigation 
        currentSection={currentSection}
        totalSections={sections.length}
        onNavigate={navigateSection}
      />
      
      <KeyboardGuide />
    </main>
  )
}