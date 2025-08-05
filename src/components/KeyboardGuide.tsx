'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Keyboard, X } from 'lucide-react'

export default function KeyboardGuide() {
  const [isOpen, setIsOpen] = useState(false)
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        e.preventDefault()
        setIsOpen(!isOpen)
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])
  
  const shortcuts = [
    { key: '← →', description: 'Navigate sections' },
    { key: 'Home/End', description: 'Jump to first/last' },
    { key: '1-6', description: 'Jump to section' },
    { key: 'Cmd+P', description: 'Presenter mode' },
    { key: 'Shift+Space', description: 'Timer control' },
    { key: 'Esc', description: 'Exit mode/overlay' },
    { key: '?', description: 'Show this guide' },
  ]
  
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-vexl-black/80 backdrop-blur-sm border border-vexl-gray-800 hover:border-vexl-yellow transition-all hover:scale-110 z-40"
        aria-label="Keyboard shortcuts"
      >
        <Keyboard className="w-5 h-5 text-white" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-vexl-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-vexl-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Keyboard Shortcuts</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-vexl-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.key}
                    className="flex items-center justify-between p-3 rounded-lg bg-vexl-black/50"
                  >
                    <kbd className="px-3 py-1 bg-vexl-gray-800 rounded text-sm font-mono text-vexl-yellow">
                      {shortcut.key}
                    </kbd>
                    <span className="text-vexl-gray-300">{shortcut.description}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}