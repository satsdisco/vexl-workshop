'use client'

import { ChevronUp, ChevronDown } from 'lucide-react'

interface SectionNavigationProps {
  currentSection: number
  totalSections: number
  onNavigate: (direction: 'prev' | 'next') => void
}

export default function SectionNavigation({ currentSection, totalSections, onNavigate }: SectionNavigationProps) {
  const isFirstSection = currentSection === 0
  const isLastSection = currentSection === totalSections - 1

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">
      <button
        onClick={() => onNavigate('prev')}
        disabled={isFirstSection}
        className={`
          p-3 rounded-full bg-vexl-black/80 backdrop-blur-sm border border-vexl-gray-800
          transition-all duration-300 hover:scale-110
          ${isFirstSection 
            ? 'opacity-30 cursor-not-allowed' 
            : 'hover:bg-vexl-gray-900 hover:border-vexl-yellow'
          }
        `}
        aria-label="Previous section"
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </button>

      <div className="px-4 py-2 bg-vexl-black/80 backdrop-blur-sm rounded-full border border-vexl-gray-800">
        <span className="text-sm text-vexl-gray-400">
          {currentSection + 1} / {totalSections}
        </span>
      </div>

      <button
        onClick={() => onNavigate('next')}
        disabled={isLastSection}
        className={`
          p-3 rounded-full bg-vexl-black/80 backdrop-blur-sm border border-vexl-gray-800
          transition-all duration-300 hover:scale-110
          ${isLastSection 
            ? 'opacity-30 cursor-not-allowed' 
            : 'hover:bg-vexl-gray-900 hover:border-vexl-yellow'
          }
        `}
        aria-label="Next section"
      >
        <ChevronDown className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}