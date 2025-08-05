'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Bitcoin, Plus } from 'lucide-react'

interface Business {
  id: string
  name: string
  icon: string
  x: number
  y: number
  connections: string[]
  avatar?: string
}

const BUSINESS_TYPES = [
  { id: 'coffee', name: 'Coffee Shop', icon: '☕', avatar: '/avatars/avatar2.svg' },
  { id: 'bike', name: 'Bike Repair', icon: '🚲', avatar: '/avatars/avatar3.svg' },
  { id: 'farmer', name: 'Farmers Market', icon: '🥕', avatar: '/avatars/avatar4.svg' },
  { id: 'bakery', name: 'Bakery', icon: '🥖', avatar: '/avatars/avatar5.svg' },
  { id: 'butcher', name: 'Butcher Shop', icon: '🥩', avatar: '/avatars/avatar6.svg' },
  { id: 'bookstore', name: 'Book Store', icon: '📚', avatar: '/avatars/avatar7.svg' },
  { id: 'gym', name: 'Local Gym', icon: '🏋️', avatar: '/avatars/avatar8.svg' },
  { id: 'barber', name: 'Barber Shop', icon: '💈', avatar: '/avatars/avatar9.svg' },
]

export default function LocalNetworkMap() {
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [transactions, setTransactions] = useState(0)
  const [velocity, setVelocity] = useState(0)
  const [showAddMenu, setShowAddMenu] = useState(false)

  const addBusiness = (type: typeof BUSINESS_TYPES[0]) => {
    const newBusiness: Business = {
      id: `${type.id}-${Date.now()}`,
      name: type.name,
      icon: type.icon,
      avatar: type.avatar,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      connections: [],
    }

    // Connect to existing businesses
    const updatedBusinesses = businesses.map(b => ({
      ...b,
      connections: [...b.connections, newBusiness.id]
    }))

    newBusiness.connections = businesses.map(b => b.id)

    setBusinesses([...updatedBusinesses, newBusiness])
    setShowAddMenu(false)
    
    // Update metrics
    setTransactions(prev => prev + businesses.length)
    setVelocity(prev => prev + Math.floor(Math.random() * 5) + 1)
  }

  return (
    <div className="w-full">
      <div className="mb-8 grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-vexl-gray-900/50 rounded-lg">
          <p className="text-sm text-vexl-gray-400">Businesses Connected</p>
          <p className="text-3xl font-bold text-vexl-yellow">{businesses.length}</p>
        </div>
        <div className="p-4 bg-vexl-gray-900/50 rounded-lg">
          <p className="text-sm text-vexl-gray-400">Total Transactions</p>
          <p className="text-3xl font-bold text-green-500">{transactions}</p>
        </div>
        <div className="p-4 bg-vexl-gray-900/50 rounded-lg">
          <p className="text-sm text-vexl-gray-400">Bitcoin Velocity</p>
          <p className="text-3xl font-bold text-blue-500">{velocity}/month</p>
        </div>
      </div>

      <div className="relative h-[600px] bg-gradient-to-br from-vexl-gray-900/30 to-vexl-gray-800/30 rounded-2xl p-8 overflow-hidden">
        {/* Street Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-vexl-gray-700" />
            ))}
          </div>
        </div>

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <AnimatePresence>
            {businesses.map(business => 
              business.connections.map(targetId => {
                const target = businesses.find(b => b.id === targetId)
                if (!target) return null
                
                return (
                  <motion.line
                    key={`${business.id}-${targetId}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.3 }}
                    x1={`${business.x}%`}
                    y1={`${business.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke="#FFD700"
                    strokeWidth="2"
                    strokeDasharray="5 5"
                  />
                )
              })
            )}
          </AnimatePresence>
        </svg>

        {/* Businesses */}
        <AnimatePresence>
          {businesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute"
              style={{ left: `${business.x}%`, top: `${business.y}%` }}
            >
              <div className="relative group">
                <div className="w-20 h-20 bg-vexl-black border-2 border-vexl-yellow rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                  {business.avatar ? (
                    <Image
                      src={business.avatar}
                      alt={business.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-3xl">{business.icon}</span>
                  )}
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {business.name}
                </div>
                
                {/* Transaction Animation */}
                {business.connections.length > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <Bitcoin className="w-4 h-4 text-black" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Business Button */}
        <div className="absolute bottom-8 right-8">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="p-4 bg-vexl-yellow text-black rounded-full hover:bg-yellow-400 transition-all hover:scale-110"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Add Business Menu */}
        <AnimatePresence>
          {showAddMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-24 right-8 bg-vexl-black border border-vexl-gray-800 rounded-lg p-4 w-64 max-h-96 overflow-y-auto"
            >
              <h4 className="font-bold mb-4">Add Local Business</h4>
              <div className="space-y-2">
                {BUSINESS_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => addBusiness(type)}
                    className="w-full text-left p-3 bg-vexl-gray-900 hover:bg-vexl-gray-800 rounded-lg transition-colors flex items-center gap-3"
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span>{type.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-vexl-yellow/10 to-transparent border-l-4 border-vexl-yellow">
        <h4 className="text-xl font-bold mb-2">Watch Your Local Economy Grow!</h4>
        <p className="text-vexl-gray-400">
          Each connection represents potential bitcoin transactions. The more businesses join, 
          the stronger your local circular economy becomes.
        </p>
      </div>
    </div>
  )
}