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
      <div className="absolute inset-0 bg-gradient-to-r from-vexl-yellow/10 via-transparent to-vexl-yellow/10 blur-3xl -z-10" />
      <button
        onClick={() => onNavigate('prev')}
        disabled={isFirstSection}
        className={`
          group p-4 rounded-full bg-vexl-black/90 backdrop-blur-md border border-vexl-gray-800
          transition-all duration-300 hover:scale-110 relative overflow-hidden
          ${isFirstSection 
            ? 'opacity-30 cursor-not-allowed' 
            : 'hover:bg-vexl-gray-900 hover:border-vexl-yellow hover:shadow-lg hover:shadow-vexl-yellow/20'
          }
        `}
        aria-label="Previous section"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-vexl-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <ChevronUp className="w-6 h-6 text-white relative z-10" />
      </button>

      <div className="px-6 py-3 bg-vexl-black/90 backdrop-blur-md rounded-full border border-vexl-gray-800 shadow-inner">
        <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-vexl-gray-400 to-vexl-gray-200">
          {currentSection + 1} / {totalSections}
        </span>
      </div>

      <button
        onClick={() => onNavigate('next')}
        disabled={isLastSection}
        className={`
          group p-4 rounded-full bg-vexl-black/90 backdrop-blur-md border border-vexl-gray-800
          transition-all duration-300 hover:scale-110 relative overflow-hidden
          ${isLastSection 
            ? 'opacity-30 cursor-not-allowed' 
            : 'hover:bg-vexl-gray-900 hover:border-vexl-yellow hover:shadow-lg hover:shadow-vexl-yellow/20'
          }
        `}
        aria-label="Next section"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-vexl-yellow/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <ChevronDown className="w-6 h-6 text-white relative z-10" />
      </button>
    </div>
  )
}