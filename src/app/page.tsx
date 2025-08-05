'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import HookSection from '@/components/sections/HookSection'
import PitchSection from '@/components/sections/PitchSection'
import PrivacySection from '@/components/sections/PrivacySection'
import DemoSection from '@/components/sections/DemoSection'
import VisionSection from '@/components/sections/VisionSection'
import GetStartedSection from '@/components/sections/GetStartedSection'
import Timer from '@/components/Timer'
import PresenterMode from '@/components/PresenterMode'

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPresenterMode, setIsPresenterMode] = useState(false)
  const [isTimerRunning, setIsTimerRunning] = useState(false)

  const sections = [
    { id: 'hook', name: 'Hook', duration: 2 },
    { id: 'pitch', name: 'Vexl Pitch', duration: 3 },
    { id: 'privacy', name: 'Privacy First', duration: 5 },
    { id: 'demo', name: 'Live Demo', duration: 10 },
    { id: 'vision', name: 'Circular Economy', duration: 8 },
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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' && e.metaKey) {
        e.preventDefault()
        setIsPresenterMode(!isPresenterMode)
      }
      if (e.key === ' ' && e.shiftKey) {
        e.preventDefault()
        setIsTimerRunning(!isTimerRunning)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isPresenterMode, isTimerRunning])

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
    </main>
  )
}