'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface ContactCategory {
  id: string
  name: string
  description: string
  contacts: number
  networkMultiplier: number
  icon: string
  avatars: string[]
}

const CONTACT_CATEGORIES: ContactCategory[] = [
  {
    id: 'close-friends',
    name: 'Close Friends',
    description: 'Your inner circle',
    contacts: 5,
    networkMultiplier: 2,
    icon: '👫',
    avatars: ['/avatars/avatar2.svg', '/avatars/avatar3.svg', '/avatars/avatar4.svg']
  },
  {
    id: 'acquaintances',
    name: 'Acquaintances',
    description: 'People you know casually',
    contacts: 20,
    networkMultiplier: 3,
    icon: '👋',
    avatars: ['/avatars/avatar5.svg', '/avatars/avatar6.svg', '/avatars/avatar7.svg']
  },
  {
    id: 'services',
    name: 'Service Providers',
    description: 'Barber, mechanic, cleaner',
    contacts: 15,
    networkMultiplier: 5,
    icon: '🔧',
    avatars: ['/avatars/avatar8.svg', '/avatars/avatar9.svg', '/avatars/avatar10.svg']
  },
  {
    id: 'businesses',
    name: 'Local Businesses',
    description: 'Shops, restaurants, cafes',
    contacts: 25,
    networkMultiplier: 4,
    icon: '🏪',
    avatars: ['/avatars/avatar2.svg', '/avatars/avatar5.svg', '/avatars/avatar8.svg']
  },
  {
    id: 'community',
    name: 'Community Groups',
    description: 'Gym, clubs, meetups',
    contacts: 30,
    networkMultiplier: 6,
    icon: '🏋️',
    avatars: ['/avatars/avatar3.svg', '/avatars/avatar6.svg', '/avatars/avatar9.svg']
  }
]

export default function ContactImportDemo() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['close-friends'])
  
  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }

  const calculateNetwork = () => {
    const selected = CONTACT_CATEGORIES.filter(c => selectedCategories.includes(c.id))
    const directContacts = selected.reduce((sum, cat) => sum + cat.contacts, 0)
    const totalNetwork = selected.reduce((sum, cat) => sum + (cat.contacts * cat.networkMultiplier), 0)
    return { directContacts, totalNetwork }
  }

  const { directContacts, totalNetwork } = calculateNetwork()

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-8">
        Smart Contact Import = <span className="text-vexl-yellow">Maximum Trading Partners</span>
      </h3>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4">Select Contact Categories:</h4>
          <div className="space-y-3">
            {CONTACT_CATEGORIES.map(category => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <label className="flex items-center gap-4 p-4 bg-vexl-gray-900 hover:bg-vexl-gray-800 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => toggleCategory(category.id)}
                    className="w-6 h-6 accent-vexl-yellow"
                  />
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1">
                    <div className="font-bold">{category.name}</div>
                    <div className="text-sm text-vexl-gray-400">{category.description}</div>
                    <div className="text-xs text-vexl-gray-500 mt-1">
                      ~{category.contacts} contacts → {category.contacts * category.networkMultiplier} network reach
                    </div>
                  </div>
                  <div className="flex -space-x-2">
                    {category.avatars?.slice(0, 3).map((avatar, i) => (
                      <Image
                        key={i}
                        src={avatar}
                        alt=""
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full border-2 border-vexl-gray-900"
                      />
                    ))}
                  </div>
                </label>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-vexl-gray-900 p-8 rounded-lg text-center">
            <h4 className="text-xl font-bold mb-6">Your Trading Network</h4>
            
            <div className="relative h-64 flex items-center justify-center">
              <AnimatePresence>
                {selectedCategories.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-vexl-gray-600 text-center"
                  >
                    <div className="text-6xl mb-4">😢</div>
                    <p>No contacts selected</p>
                  </motion.div>
                ) : (
                  <>
                    {/* Center circle */}
                    <motion.div
                      key="center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute w-20 h-20 bg-vexl-yellow rounded-full flex items-center justify-center font-bold text-black z-10"
                    >
                      YOU
                    </motion.div>
                    
                    {/* Direct contacts */}
                    <motion.div
                      key={directContacts}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="absolute w-32 h-32 border-4 border-vexl-white rounded-full"
                    />
                    
                    {/* Extended network */}
                    <motion.div
                      key={totalNetwork}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                      className="absolute w-48 h-48 border-2 border-vexl-gray-600 rounded-full"
                    />
                  </>
                )}
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <motion.div
                key={`direct-${directContacts}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-vexl-gray-800 p-4 rounded"
              >
                <div className="text-3xl font-bold text-vexl-white">{directContacts}</div>
                <div className="text-sm text-vexl-gray-400">Direct Contacts</div>
              </motion.div>
              
              <motion.div
                key={`total-${totalNetwork}`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-vexl-gray-800 p-4 rounded"
              >
                <div className="text-3xl font-bold text-vexl-yellow">{totalNetwork}</div>
                <div className="text-sm text-vexl-gray-400">Total Network Reach</div>
              </motion.div>
            </div>
          </div>
          
          <AnimatePresence>
            {selectedCategories.length === 1 && selectedCategories[0] === 'close-friends' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-red-900/20 border border-red-500/30 rounded"
              >
                <h5 className="font-bold text-red-400 mb-2">⚠️ Limited Network Warning</h5>
                <p className="text-sm">
                  Only importing close friends severely limits your trading opportunities. 
                  Your barber might be the bridge to 50+ bitcoin traders!
                </p>
              </motion.div>
            )}
            
            {selectedCategories.length >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-green-900/20 border border-green-500/30 rounded"
              >
                <h5 className="font-bold text-green-400 mb-2">✅ Optimal Network Strategy</h5>
                <p className="text-sm">
                  Great choice! You're maximizing your trading opportunities while maintaining 
                  the web of trust. This is how circular economies are built.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center p-6 bg-gradient-to-r from-vexl-yellow/10 to-transparent"
      >
        <p className="text-lg">
          <span className="font-bold">Remember:</span> Every contact you don't import is a 
          potential trading partner lost. The magic happens at the edges of your network!
        </p>
      </motion.div>
    </div>
  )
}