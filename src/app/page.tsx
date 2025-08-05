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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const sectionElements = sections.map(s => document.getElementById(s.id))
      
      sectionElements.forEach((el, index) => {
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(index)
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const navigateSection = (direction: 'prev' | 'next') => {
    const newSection = direction === 'next' 
      ? Math.min(currentSection + 1, sections.length - 1)
      : Math.max(currentSection - 1, 0)
    
    const targetElement = document.getElementById(sections[newSection].id)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
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
            const firstElement = document.getElementById(sections[0].id)
            firstElement?.scrollIntoView({ behavior: 'smooth' })
            break
          case 'End':
            e.preventDefault()
            const lastElement = document.getElementById(sections[sections.length - 1].id)
            lastElement?.scrollIntoView({ behavior: 'smooth' })
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
            const targetElement = document.getElementById(sections[sectionIndex].id)
            targetElement?.scrollIntoView({ behavior: 'smooth' })
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPresenterMode, isTimerRunning, sections])

  return (
    <main className="relative">
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

      <section id="hook" className="section-container">
        <HookSection />
      </section>

      <section id="pitch" className="section-container">
        <PitchSection />
      </section>

      <section id="trust" className="section-container">
        <TrustSection />
      </section>

      <section id="privacy" className="section-container">
        <PrivacySection />
      </section>

      <section id="demo" className="section-container">
        <DemoSection />
      </section>

      <section id="vision" className="section-container">
        <VisionSection />
      </section>

      <section id="get-started" className="section-container">
        <GetStartedSection />
      </section>

      <SectionNavigation 
        currentSection={currentSection}
        totalSections={sections.length}
        onNavigate={navigateSection}
      />
      
      <KeyboardGuide />
    </main>
  )
}