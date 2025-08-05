'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

interface Contact {
  id: string
  name: string
  x: number
  y: number
  level: number
  connections: string[]
  hasVexl: boolean
  description?: string
}

const CONTACT_TYPES = [
  { id: 'mom', name: 'Your Mom', icon: '👩', avatar: '/avatars/avatar3.svg', hasVexl: false, description: "Doesn't need Vexl to connect you" },
  { id: 'friend', name: 'Best Friend', icon: '🤝', avatar: '/avatars/avatar4.svg', hasVexl: true, description: "Active trader on Vexl" },
  { id: 'coworker', name: 'Coworker', icon: '💼', avatar: '/avatars/avatar2.svg', hasVexl: true, description: "Buys BTC monthly" },
  { id: 'barber', name: 'Your Barber', icon: '💈', avatar: '/avatars/avatar6.svg', hasVexl: false, description: "Accepts bitcoin at shop" },
  { id: 'neighbor', name: 'Neighbor', icon: '🏠', avatar: '/avatars/avatar7.svg', hasVexl: false, description: "Curious about bitcoin" },
  { id: 'mechanic', name: 'Mechanic', icon: '🔧', avatar: '/avatars/avatar5.svg', hasVexl: true, description: "Trades for parts" },
]

export default function EnhancedWebOfTrustV2() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 'you', name: 'You', x: 50, y: 50, level: 0, connections: [], hasVexl: true }
  ])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 3))
  const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, 0.5))
  const handleReset = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const addContact = (type: typeof CONTACT_TYPES[0]) => {
    const angle = (contacts.length - 1) * 60 * (Math.PI / 180)
    const distance = 25
    
    const newContact: Contact = {
      id: type.id,
      name: type.name,
      x: 50 + Math.cos(angle) * distance,
      y: 50 + Math.sin(angle) * distance,
      level: 1,
      connections: ['you'],
      hasVexl: type.hasVexl,
      description: type.description
    }
    
    // Add second-degree connections
    const secondDegree: Contact[] = []
    const numSecondDegree = type.hasVexl ? 3 : 2
    
    for (let i = 0; i < numSecondDegree; i++) {
      const subAngle = angle + (i - 1) * 0.5
      const subDistance = 45
      
      const connectionNames = type.hasVexl 
        ? ['Trader', 'Seller', 'Buyer']
        : ['Friend', 'Client', 'Family']
      
      secondDegree.push({
        id: `${type.id}-${i}`,
        name: `${type.name}'s ${connectionNames[i]}`,
        x: 50 + Math.cos(subAngle) * subDistance,
        y: 50 + Math.sin(subAngle) * subDistance,
        level: 2,
        connections: [type.id],
        hasVexl: Math.random() > 0.5,
        description: type.hasVexl ? 'Connected through Vexl' : 'Connected through trust'
      })
    }
    
    setContacts(prev => [...prev, newContact, ...secondDegree])
  }

  const reset = () => {
    setContacts([{ id: 'you', name: 'You', x: 50, y: 50, level: 0, connections: [], hasVexl: true }])
    setSelectedContact(null)
    handleReset()
  }

  const getTotalReach = () => {
    const vexlUsers = contacts.filter(c => c.hasVexl).length
    const nonVexlConnections = contacts.filter(c => !c.hasVexl).length
    return { vexlUsers, nonVexlConnections, total: contacts.length }
  }

  const reach = getTotalReach()

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h3 className="text-2xl md:text-3xl mb-3" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
          Your Network is <span className="text-vexl-yellow">Everyone's Network</span>
        </h3>
        <p className="text-base md:text-lg text-vexl-gray-400 max-w-3xl mx-auto">
          Non-Vexl users are bridges. Your mom connects you to her hairdresser who's a bitcoiner.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6 flex-1 min-h-0">
        {/* Network Visualization */}
        <div 
          ref={containerRef}
          className="lg:col-span-2 bg-vexl-gray-900 border border-vexl-gray-800 p-6 relative h-[400px] md:h-[500px] overflow-hidden"
        >
          {/* Zoom Controls */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomIn}
              className="p-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleZoomOut}
              className="p-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleReset}
              className="p-2 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded transition-colors"
              title="Reset View"
            >
              <Maximize2 className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Draggable & Zoomable Container */}
          <motion.div
            drag
            dragMomentum={false}
            dragElastic={0.1}
            onDrag={(e, info) => {
              setPosition({
                x: position.x + info.delta.x,
                y: position.y + info.delta.y
              })
            }}
            className="absolute inset-0 cursor-move"
            style={{
              x: position.x,
              y: position.y,
              scale: scale,
            }}
          >
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
                        stroke={contact.hasVexl && target.hasVexl ? "#FFD700" : "#666"}
                        strokeWidth="2"
                        strokeDasharray={contact.hasVexl && target.hasVexl ? "0" : "5,5"}
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
                  className="absolute flex flex-col items-center"
                  style={{ 
                    left: `${contact.x}%`, 
                    top: `${contact.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedContact(contact)
                  }}
                >
                  <div className={`
                    rounded-full flex items-center justify-center font-bold overflow-hidden cursor-pointer
                    ${contact.level === 0 
                      ? 'w-20 h-20 ring-4 ring-vexl-yellow shadow-lg shadow-vexl-yellow/50' 
                      : contact.level === 1
                      ? 'w-16 h-16 ring-2 ring-vexl-white shadow-md'
                      : 'w-12 h-12 ring-1 ring-vexl-gray-600'
                    }
                    ${contact.hasVexl ? 'bg-vexl-gray-800' : 'bg-vexl-gray-700 opacity-80'}
                  `}>
                    {contact.id === 'you' ? (
                      <span className="text-2xl">👤</span>
                    ) : contact.level === 1 ? (
                      <span className="text-2xl">{CONTACT_TYPES.find(t => t.id === contact.id)?.icon}</span>
                    ) : (
                      <span className="text-xs">{contact.hasVexl ? '₿' : '👤'}</span>
                    )}
                  </div>
                  <div className="mt-1 text-center">
                    <div className="text-xs font-medium whitespace-nowrap">
                      {contact.name}
                    </div>
                    {contact.level > 0 && (
                      <div className={`text-xs ${contact.hasVexl ? 'text-green-400' : 'text-vexl-gray-500'}`}>
                        {contact.hasVexl ? 'Vexl' : 'Bridge'}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-vexl-gray-800/90 p-2 rounded text-xs">
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-vexl-yellow rounded-full"></div>
                <span>You</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-vexl-gray-800 ring-1 ring-white rounded-full"></div>
                <span>Vexl</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-vexl-gray-700 ring-1 ring-vexl-gray-600 rounded-full"></div>
                <span>Bridge</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Controls and Info */}
        <div className="space-y-3 overflow-y-auto max-h-[500px]">
          <div className="bg-vexl-gray-900 p-4 border border-vexl-gray-800">
            <h4 className="text-lg mb-3" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>Network Stats</h4>
            <div className="space-y-3">
              <div>
                <div className="text-3xl font-bold text-vexl-yellow">{reach.total}</div>
                <div className="text-sm text-vexl-gray-400">Total Connections</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xl font-bold text-green-400">{reach.vexlUsers}</div>
                  <div className="text-xs text-vexl-gray-400">Vexl Users</div>
                </div>
                <div>
                  <div className="text-xl font-bold text-blue-400">{reach.nonVexlConnections}</div>
                  <div className="text-xs text-vexl-gray-400">Bridge Connections</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-base mb-2" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>Add Contacts:</h4>
            <div className="space-y-2">
              {CONTACT_TYPES.map(type => (
                <motion.button
                  key={type.id}
                  onClick={() => addContact(type)}
                  className="w-full bg-vexl-gray-800 hover:bg-vexl-gray-700 p-2 text-left transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  disabled={contacts.some(c => c.id === type.id)}
                >
                  <span className="text-2xl">{type.icon}</span>
                  <div className="flex-1">
                    <div className={contacts.some(c => c.id === type.id) ? 'opacity-50' : ''}>
                      {type.name}
                    </div>
                    <div className="text-xs text-vexl-gray-500">
                      {type.description}
                    </div>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded ${type.hasVexl ? 'bg-green-900 text-green-400' : 'bg-blue-900 text-blue-400'}`}>
                    {type.hasVexl ? 'Vexl' : 'Bridge'}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {selectedContact && selectedContact.id !== 'you' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-vexl-gray-800 p-4 rounded"
            >
              <h5 className="font-bold mb-2">{selectedContact.name}</h5>
              <p className="text-sm text-vexl-gray-400">{selectedContact.description}</p>
            </motion.div>
          )}

          <button
            onClick={reset}
            className="w-full bg-vexl-gray-800 hover:bg-vexl-gray-700 py-3 px-6 transition-colors"
          >
            Reset Network
          </button>

          <div className="bg-gradient-to-r from-vexl-yellow/20 to-transparent border-l-4 border-vexl-yellow p-4">
            <p className="text-sm">
              <span className="font-bold">Pro tip:</span> Use zoom controls or drag to explore your network. 
              Every connection expands your trading possibilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}