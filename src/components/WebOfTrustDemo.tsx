'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Contact {
  id: string
  name: string
  x: number
  y: number
  level: number
  connections: string[]
}

const CONTACT_TYPES = [
  { id: 'satoshi', name: 'Satoshi Nakamoto', icon: '₿' },
  { id: 'grandma', name: 'Grandma', icon: '👵' },
  { id: 'friend', name: 'Best Friend', icon: '🤝' },
  { id: 'gym', name: 'Gym Buddy', icon: '💪' },
  { id: 'barber', name: 'Your Barber', icon: '💈' },
  { id: 'neighbor', name: 'Cool Neighbor', icon: '🏠' },
]

export default function WebOfTrustDemo() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 'you', name: 'You', x: 50, y: 50, level: 0, connections: [] }
  ])
  const [totalPartners, setTotalPartners] = useState(1)

  const addContact = (type: typeof CONTACT_TYPES[0]) => {
    const newContact: Contact = {
      id: type.id,
      name: type.name,
      x: 50 + (Math.random() - 0.5) * 40,
      y: 50 + (Math.random() - 0.5) * 40,
      level: 1,
      connections: ['you']
    }
    
    const secondDegree: Contact[] = []
    const numSecondDegree = Math.floor(Math.random() * 4) + 2
    
    for (let i = 0; i < numSecondDegree; i++) {
      const angle = (i / numSecondDegree) * Math.PI * 2
      secondDegree.push({
        id: `${type.id}-${i}`,
        name: `Friend ${i + 1}`,
        x: newContact.x + Math.cos(angle) * 20,
        y: newContact.y + Math.sin(angle) * 20,
        level: 2,
        connections: [type.id]
      })
    }
    
    setContacts(prev => [...prev, newContact, ...secondDegree])
    setTotalPartners(prev => prev + 1 + secondDegree.length)
  }

  const reset = () => {
    setContacts([{ id: 'you', name: 'You', x: 50, y: 50, level: 0, connections: [] }])
    setTotalPartners(1)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-3xl font-bold text-center mb-8">
        Build Your <span className="text-vexl-yellow">Web of Trust</span>
      </h3>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-vexl-gray-900 border border-vexl-gray-800 p-8 relative h-[500px] overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            <AnimatePresence>
              {contacts.map(contact => 
                contact.connections.map(targetId => {
                  const target = contacts.find(c => c.id === targetId)
                  if (!target) return null
                  return (
                    <motion.line
                      key={`${contact.id}-${targetId}`}
                      initial={{ opacity: 0, pathLength: 0 }}
                      animate={{ opacity: 0.3, pathLength: 1 }}
                      exit={{ opacity: 0 }}
                      x1={`${contact.x}%`}
                      y1={`${contact.y}%`}
                      x2={`${target.x}%`}
                      y2={`${target.y}%`}
                      stroke="#FFD700"
                      strokeWidth="1"
                      transition={{ duration: 0.5 }}
                    />
                  )
                })
              )}
            </AnimatePresence>
          </svg>
          
          <AnimatePresence>
            {contacts.map(contact => (
              <motion.div
                key={contact.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  contact.level === 0 ? 'z-20' : contact.level === 1 ? 'z-10' : 'z-0'
                }`}
                style={{ left: `${contact.x}%`, top: `${contact.y}%` }}
              >
                <div className={`
                  rounded-full flex items-center justify-center font-bold
                  ${contact.level === 0 
                    ? 'w-20 h-20 bg-vexl-yellow text-black text-2xl' 
                    : contact.level === 1
                    ? 'w-16 h-16 bg-vexl-white text-black text-xl'
                    : 'w-12 h-12 bg-vexl-gray-600 text-white text-sm'
                  }
                `}>
                  {contact.id === 'you' ? '👤' : 
                   CONTACT_TYPES.find(t => t.id === contact.id)?.icon || 
                   contact.name.charAt(0)}
                </div>
                {contact.level < 2 && (
                  <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-xs whitespace-nowrap">
                    {contact.name}
                  </span>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          <motion.div
            className="absolute top-4 right-4 bg-vexl-yellow text-black px-4 py-2 font-bold text-lg"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
            key={totalPartners}
          >
            Trading Partners: {totalPartners}
          </motion.div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-xl font-bold mb-4">Add Your Contacts:</h4>
          <div className="grid grid-cols-2 gap-3">
            {CONTACT_TYPES.map(type => (
              <motion.button
                key={type.id}
                onClick={() => addContact(type)}
                className="bg-vexl-gray-800 hover:bg-vexl-gray-700 p-4 text-left transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={contacts.some(c => c.id === type.id)}
              >
                <span className="text-2xl mr-2">{type.icon}</span>
                <span className={contacts.some(c => c.id === type.id) ? 'opacity-50' : ''}>
                  {type.name}
                </span>
              </motion.button>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-vexl-yellow/20 to-transparent border-l-4 border-vexl-yellow">
            <h5 className="font-bold mb-2">Network Growth:</h5>
            <p className="text-sm text-vexl-gray-400">
              Each contact connects you to their network. Your pizza guy knows other bitcoiners. 
              Your dog walker trades with their clients. The network effect is real!
            </p>
          </div>
          
          <button
            onClick={reset}
            className="w-full bg-vexl-gray-800 hover:bg-vexl-gray-700 py-3 px-6 transition-colors"
          >
            Reset Demo
          </button>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-6 bg-red-900/20 border border-red-500/30"
      >
        <h5 className="font-bold text-red-400 mb-2">⚠️ Selective Import = Network Isolation</h5>
        <p className="text-sm">
          Only importing "close friends" kills your trading opportunities. 
          The magic happens when you include ALL your bitcoin-friendly contacts - 
          service providers, local businesses, everyone!
        </p>
      </motion.div>
    </div>
  )
}