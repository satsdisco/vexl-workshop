'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface SectionNavigationProps {
  currentSection: number
  totalSections: number
  onNavigate: (direction: 'prev' | 'next') => void
}

export default function SectionNavigation({ currentSection, totalSections, onNavigate }: SectionNavigationProps) {
  const isFirstSection = currentSection === 0
  const isLastSection = currentSection === totalSections - 1

  return (
    <>
      {/* Left Navigation Button */}
      <motion.button
        onClick={() => onNavigate('prev')}
        disabled={isFirstSection}
        className={`
          fixed left-8 top-1/2 -translate-y-1/2 p-4 md:p-6
          bg-vexl-black/90 backdrop-blur-md border-2 border-vexl-gray-800
          rounded-xl transition-all duration-300 z-50
          ${isFirstSection 
            ? 'opacity-0 pointer-events-none' 
            : 'hover:bg-vexl-gray-900 hover:border-vexl-yellow hover:shadow-lg hover:shadow-vexl-yellow/20 hover:scale-105'
          }
        `}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={3} />
      </motion.button>

      {/* Right Navigation Button */}
      <motion.button
        onClick={() => onNavigate('next')}
        disabled={isLastSection}
        className={`
          fixed right-8 top-1/2 -translate-y-1/2 p-4 md:p-6
          bg-vexl-black/90 backdrop-blur-md border-2 border-vexl-gray-800
          rounded-xl transition-all duration-300 z-50
          ${isLastSection 
            ? 'opacity-0 pointer-events-none' 
            : 'hover:bg-vexl-gray-900 hover:border-vexl-yellow hover:shadow-lg hover:shadow-vexl-yellow/20 hover:scale-105'
          }
        `}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8 md:w-10 md:h-10 text-white" strokeWidth={3} />
      </motion.button>

      {/* Bottom Progress Bar and Counter */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Progress Bar */}
        <div className="h-1 bg-vexl-gray-800">
          <motion.div
            className="h-full bg-vexl-yellow"
            initial={{ width: '0%' }}
            animate={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Slide Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
          <div className="px-6 py-3 bg-vexl-black/90 backdrop-blur-md rounded-full border border-vexl-gray-800">
            <span className="text-lg font-medium">
              <span className="text-vexl-yellow">{currentSection + 1}</span>
              <span className="text-vexl-gray-500"> / {totalSections}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}