'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Users, Star, Shield } from 'lucide-react'

interface Person {
  id: string
  name: string
  skill: string
  avatar: string
  mutualFriends: number
  trustScore: number
  testimonial?: string
  x: number
  y: number
  connections: string[]
}

const NEIGHBORHOOD_PEOPLE: Person[] = [
  { id: '1', name: 'Sarah Chen', skill: 'Electrician', avatar: '/avatars/avatar2.svg', mutualFriends: 3, trustScore: 95, testimonial: 'Fixed my wiring issue same day!', x: 20, y: 20, connections: ['2', '3', '5'] },
  { id: '2', name: 'Mike Johnson', skill: 'Web Developer', avatar: '/avatars/avatar3.svg', mutualFriends: 5, trustScore: 98, testimonial: 'Built my business website', x: 60, y: 15, connections: ['1', '4', '6'] },
  { id: '3', name: 'Anna Kowalski', skill: 'Beekeeper', avatar: '/avatars/avatar4.svg', mutualFriends: 2, trustScore: 92, testimonial: 'Best local honey!', x: 80, y: 35, connections: ['1', '5', '7'] },
  { id: '4', name: 'Tom Rodriguez', skill: 'Dog Walker', avatar: '/avatars/avatar5.svg', mutualFriends: 4, trustScore: 96, testimonial: 'My dog loves him!', x: 25, y: 60, connections: ['2', '6', '8'] },
  { id: '5', name: 'Lisa Park', skill: 'Math Tutor', avatar: '/avatars/avatar6.svg', mutualFriends: 6, trustScore: 99, testimonial: 'My kid went from C to A!', x: 70, y: 70, connections: ['1', '3', '7'] },
  { id: '6', name: 'James Wright', skill: 'Plumber', avatar: '/avatars/avatar7.svg', mutualFriends: 3, trustScore: 94, testimonial: 'Fair prices, great work', x: 40, y: 80, connections: ['2', '4', '8'] },
  { id: '7', name: 'Maria Garcia', skill: 'Graphic Designer', avatar: '/avatars/avatar8.svg', mutualFriends: 4, trustScore: 97, testimonial: 'Amazing logo design!', x: 85, y: 65, connections: ['3', '5', '8'] },
  { id: '8', name: 'David Kim', skill: 'Home Baker', avatar: '/avatars/avatar9.svg', mutualFriends: 7, trustScore: 100, testimonial: 'Best sourdough in town', x: 15, y: 45, connections: ['4', '6', '7'] },
]

export default function NeighborhoodTalentMap() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)
  const [hoveredPerson, setHoveredPerson] = useState<string | null>(null)

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h3 className="text-3xl font-bold mb-4">Your Neighborhood Talent Network</h3>
        <p className="text-vexl-gray-400">Click on anyone to see their skills and trust connections</p>
      </div>

      <div className="relative h-[600px] bg-gradient-to-br from-vexl-gray-900/30 to-vexl-gray-800/30 rounded-2xl overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 grid-rows-12 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <div key={i} className="border border-vexl-gray-700" />
            ))}
          </div>
        </div>

        {/* Trust Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <AnimatePresence>
            {NEIGHBORHOOD_PEOPLE.map(person => 
              person.connections.map(targetId => {
                const target = NEIGHBORHOOD_PEOPLE.find(p => p.id === targetId)
                if (!target || parseInt(person.id) > parseInt(targetId)) return null
                
                const isHighlighted = hoveredPerson === person.id || hoveredPerson === targetId
                
                return (
                  <motion.line
                    key={`${person.id}-${targetId}`}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: 1, 
                      opacity: isHighlighted ? 0.6 : 0.2 
                    }}
                    x1={`${person.x}%`}
                    y1={`${person.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={isHighlighted ? "#FFD700" : "#666"}
                    strokeWidth={isHighlighted ? "3" : "1"}
                    strokeDasharray={isHighlighted ? "0" : "5 5"}
                  />
                )
              })
            )}
          </AnimatePresence>
        </svg>

        {/* People Nodes */}
        <AnimatePresence>
          {NEIGHBORHOOD_PEOPLE.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute cursor-pointer"
              style={{ left: `${person.x}%`, top: `${person.y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHoveredPerson(person.id)}
              onMouseLeave={() => setHoveredPerson(null)}
              onClick={() => setSelectedPerson(person)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="relative"
              >
                {/* Trust Score Ring */}
                <div className={`absolute inset-0 rounded-full ${
                  person.trustScore > 95 ? 'ring-4 ring-green-500' : 
                  person.trustScore > 90 ? 'ring-4 ring-yellow-500' : 
                  'ring-4 ring-vexl-gray-600'
                } ring-opacity-50`} />
                
                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-vexl-black">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Mutual Friends Badge */}
                  <div className="absolute -bottom-1 -right-1 bg-vexl-yellow text-black rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold">
                    {person.mutualFriends}
                  </div>
                </div>

                {/* Name & Skill */}
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                  <p className="text-xs font-bold">{person.name}</p>
                  <p className="text-xs text-vexl-gray-400">{person.skill}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* You (Center) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-24 h-24 bg-vexl-yellow rounded-full flex items-center justify-center text-black font-bold text-xl ring-8 ring-vexl-yellow/30">
            YOU
          </div>
        </div>
      </div>

      {/* Selected Person Details */}
      <AnimatePresence>
        {selectedPerson && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8 p-6 bg-vexl-gray-900/50 rounded-lg border border-vexl-gray-800"
          >
            <div className="flex items-start gap-6">
              <Image
                src={selectedPerson.avatar}
                alt={selectedPerson.name}
                width={80}
                height={80}
                className="rounded-full"
              />
              <div className="flex-1">
                <h4 className="text-2xl font-bold mb-2">{selectedPerson.name}</h4>
                <p className="text-xl text-vexl-yellow mb-4">{selectedPerson.skill}</p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-vexl-gray-400" />
                    <span>{selectedPerson.mutualFriends} mutual friends</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-vexl-gray-400" />
                    <span>Trust Score: {selectedPerson.trustScore}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-vexl-gray-400" />
                    <span>Verified by network</span>
                  </div>
                </div>

                {selectedPerson.testimonial && (
                  <div className="p-4 bg-vexl-gray-800/50 rounded-lg italic">
                    "{selectedPerson.testimonial}" - Friend of friend
                  </div>
                )}
              </div>
              
              <button
                onClick={() => setSelectedPerson(null)}
                className="text-vexl-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Insights */}
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-br from-green-950/30 to-transparent border border-green-900/50 rounded-lg">
          <h4 className="font-bold mb-2">Trust Through Friends</h4>
          <p className="text-sm text-vexl-gray-400">
            Every person here is connected through mutual friends. No strangers, just extended community.
          </p>
        </div>
        <div className="p-6 bg-gradient-to-br from-blue-950/30 to-transparent border border-blue-900/50 rounded-lg">
          <h4 className="font-bold mb-2">Skills Everywhere</h4>
          <p className="text-sm text-vexl-gray-400">
            Your neighbors have valuable skills. They're not just friends - they're your service network.
          </p>
        </div>
        <div className="p-6 bg-gradient-to-br from-purple-950/30 to-transparent border border-purple-900/50 rounded-lg">
          <h4 className="font-bold mb-2">Bitcoin Enables Trade</h4>
          <p className="text-sm text-vexl-gray-400">
            P2P bitcoin lets these skills flow freely without banks or platforms taking a cut.
          </p>
        </div>
      </div>
    </div>
  )
}