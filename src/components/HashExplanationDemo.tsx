'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SAMPLE_CONTACTS = [
  { name: 'Pizza Palace', number: '+420 123 456 789', hash: '#a8b2c9d4f7e1' },
  { name: 'John Bitcoin', number: '+1 555 0123', hash: '#f3e5d7a9b1c3' },
  { name: 'Coffee Shop', number: '+420 987 654 321', hash: '#b7d9e2f4a6c8' },
]

export default function HashExplanationDemo() {
  const [activeContact, setActiveContact] = useState(0)
  const [showTransform, setShowTransform] = useState(false)

  const handleTransform = () => {
    setShowTransform(true)
    setTimeout(() => setShowTransform(false), 3000)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-4">
        Your Privacy is <span className="text-vexl-yellow">Mathematically Guaranteed</span>
      </h3>
      
      <div className="grid lg:grid-cols-3 gap-8 items-center">
        {/* Your Phone */}
        <div className="relative">
          <div className="bg-black rounded-[2rem] p-3 border-2 border-vexl-gray-800">
            <div className="bg-vexl-gray-900 rounded-[1.5rem] p-4">
              <div className="text-center mb-4">
                <span className="text-sm text-vexl-gray-500">Your Phone</span>
              </div>
              <div className="space-y-3">
                {SAMPLE_CONTACTS.map((contact, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setActiveContact(idx)
                      handleTransform()
                    }}
                    className={`w-full p-3 text-left transition-all ${
                      activeContact === idx 
                        ? 'bg-vexl-yellow text-black' 
                        : 'bg-vexl-gray-800 hover:bg-vexl-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-bold">{contact.name}</div>
                    <div className="text-sm opacity-80">{contact.number}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
            <span className="text-sm text-vexl-gray-500">Actual contact data</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence>
            {showTransform && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute"
              >
                <motion.div
                  animate={{ x: [0, 100, 0] }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="bg-vexl-yellow px-4 py-2 rounded-full"
                >
                  <span className="text-black font-bold">SHA-256</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          <svg width="100" height="50" className="w-full">
            <motion.path
              d="M 10 25 L 90 25"
              stroke="#FFD700"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: showTransform ? 1 : 0.3 }}
              transition={{ duration: 1 }}
            />
            <motion.path
              d="M 75 15 L 90 25 L 75 35"
              stroke="#FFD700"
              strokeWidth="3"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: showTransform ? 1 : 0.3 }}
            />
          </svg>
        </div>

        {/* Vexl Servers */}
        <div className="relative">
          <div className="bg-vexl-gray-900 rounded-lg p-6 border-2 border-vexl-gray-800">
            <div className="text-center mb-4">
              <span className="text-sm text-vexl-gray-500">Vexl Servers</span>
            </div>
            <div className="space-y-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContact}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-vexl-gray-800 p-4 rounded"
                >
                  <div className="font-mono text-vexl-yellow text-lg" style={{ fontFamily: 'Space Mono, monospace' }}>
                    {SAMPLE_CONTACTS[activeContact].hash}
                  </div>
                  <div className="text-xs text-vexl-gray-500 mt-2">
                    One-way hash (irreversible)
                  </div>
                </motion.div>
              </AnimatePresence>
              
              <div className="text-center pt-4">
                <span className="text-2xl">🔒</span>
                <p className="text-sm text-vexl-gray-400 mt-2">
                  We literally cannot see your phone number
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
            <span className="text-sm text-vexl-gray-500">What we store</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 bg-vexl-gray-900 p-8 rounded-lg"
      >
        <h4 className="text-xl font-bold mb-4">Microservices Architecture</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-vexl-gray-800 p-4 rounded text-center">
            <div className="text-3xl mb-2">📱</div>
            <h5 className="font-bold mb-1">Contact Service</h5>
            <p className="text-sm text-vexl-gray-400">Only sees hashes</p>
          </div>
          <div className="bg-vexl-gray-800 p-4 rounded text-center opacity-50">
            <div className="text-3xl mb-2">🚫</div>
            <h5 className="font-bold mb-1">No Communication</h5>
            <p className="text-sm text-vexl-gray-400">Services isolated</p>
          </div>
          <div className="bg-vexl-gray-800 p-4 rounded text-center">
            <div className="text-3xl mb-2">💱</div>
            <h5 className="font-bold mb-1">Offer Service</h5>
            <p className="text-sm text-vexl-gray-400">No user data</p>
          </div>
        </div>
        <p className="text-center mt-4 text-vexl-gray-400">
          Even if we wanted to spy on you (we don't), our architecture makes it impossible
        </p>
      </motion.div>
    </div>
  )
}