'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bitcoin, ArrowRight, Repeat, Users } from 'lucide-react'
import Image from 'next/image'

interface Trade {
  id: number
  person1: { name: string; skill: string; avatar: string }
  person2: { name: string; skill: string; avatar: string }
  trade: { give: string; receive: string }
  story: string
}

const TRADES: Trade[] = [
  {
    id: 1,
    person1: { name: 'Anna', skill: 'Beekeeper', avatar: '/avatars/avatar4.svg' },
    person2: { name: 'Mike', skill: 'Web Developer', avatar: '/avatars/avatar3.svg' },
    trade: { give: '12 jars of honey', receive: 'Business website' },
    story: 'Anna needed a website for her honey business. Mike loves local honey. Perfect match!'
  },
  {
    id: 2,
    person1: { name: 'Sarah', skill: 'Electrician', avatar: '/avatars/avatar2.svg' },
    person2: { name: 'Tom', skill: 'Dog Walker', avatar: '/avatars/avatar5.svg' },
    trade: { give: 'Rewired garage', receive: '3 months dog walking' },
    story: 'Sarah travels for work. Tom needed his garage workshop wired. Win-win!'
  },
  {
    id: 3,
    person1: { name: 'Mike', skill: 'Web Developer', avatar: '/avatars/avatar3.svg' },
    person2: { name: 'Local Beekeepers', skill: 'Collective', avatar: '/avatars/avatar10.svg' },
    trade: { give: 'Marketplace app', receive: '₿0.05 bitcoin' },
    story: 'The local beekeeping collective needed an app. They paid Mike in bitcoin.'
  },
  {
    id: 4,
    person1: { name: 'Lisa', skill: 'Math Tutor', avatar: '/avatars/avatar6.svg' },
    person2: { name: 'David', skill: 'Home Baker', avatar: '/avatars/avatar9.svg' },
    trade: { give: 'SAT prep for son', receive: 'Weekly bread delivery' },
    story: "David's son needed math help. Lisa's family loves fresh bread. Natural trade!"
  },
  {
    id: 5,
    person1: { name: 'James', skill: 'Plumber', avatar: '/avatars/avatar7.svg' },
    person2: { name: 'Maria', skill: 'Graphic Designer', avatar: '/avatars/avatar8.svg' },
    trade: { give: 'Fixed kitchen sink', receive: 'Business cards design' },
    story: 'James was starting his plumbing business. Maria had a leaky sink. Perfect timing!'
  }
]

export default function SkillSharingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % TRADES.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying])

  const currentTrade = TRADES[currentIndex]

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TRADES.length)
    setIsAutoPlaying(false)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TRADES.length) % TRADES.length)
    setIsAutoPlaying(false)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Real People, Real Trades</h3>
        <p className="text-vexl-gray-400">Skills flowing freely in your community</p>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-vexl-gray-900/50 rounded-2xl p-8 border border-vexl-gray-800"
          >
            {/* Trade Visualization */}
            <div className="flex items-center justify-between mb-8">
              {/* Person 1 */}
              <div className="text-center">
                <div className="relative inline-block mb-3">
                  <Image
                    src={currentTrade.person1.avatar}
                    alt={currentTrade.person1.name}
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-vexl-yellow"
                  />
                </div>
                <h4 className="font-bold text-lg">{currentTrade.person1.name}</h4>
                <p className="text-sm text-vexl-gray-400">{currentTrade.person1.skill}</p>
              </div>

              {/* Trade Flow */}
              <div className="flex-1 px-8">
                <div className="relative">
                  {/* Top Arrow */}
                  <div className="flex items-center justify-center mb-2">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                    <ArrowRight className="w-6 h-6 text-green-500 mx-2" />
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-green-500 to-transparent" />
                  </div>
                  
                  {/* Trade Details */}
                  <div className="text-center space-y-1">
                    <p className="text-sm text-green-400">{currentTrade.trade.give}</p>
                    <Repeat className="w-5 h-5 text-vexl-yellow mx-auto" />
                    <p className="text-sm text-blue-400">{currentTrade.trade.receive}</p>
                  </div>
                  
                  {/* Bottom Arrow */}
                  <div className="flex items-center justify-center mt-2">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                    <ArrowRight className="w-6 h-6 text-blue-500 mx-2 rotate-180" />
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Person 2 */}
              <div className="text-center">
                <div className="relative inline-block mb-3">
                  <Image
                    src={currentTrade.person2.avatar}
                    alt={currentTrade.person2.name}
                    width={100}
                    height={100}
                    className="rounded-full border-4 border-vexl-yellow"
                  />
                </div>
                <h4 className="font-bold text-lg">{currentTrade.person2.name}</h4>
                <p className="text-sm text-vexl-gray-400">{currentTrade.person2.skill}</p>
              </div>
            </div>

            {/* Story */}
            <div className="text-center p-6 bg-vexl-gray-800/50 rounded-lg">
              <p className="text-lg italic text-vexl-gray-300">"{currentTrade.story}"</p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Bitcoin className="w-5 h-5 text-vexl-yellow" />
                <span className="text-sm text-vexl-gray-400">Settled with bitcoin P2P</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full p-3 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-full transition-colors"
        >
          <ArrowRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full p-3 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-full transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {TRADES.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? 'w-8 bg-vexl-yellow' 
                : 'bg-vexl-gray-600 hover:bg-vexl-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Key Messages */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="text-center p-4 bg-vexl-gray-900/30 rounded-lg">
          <Bitcoin className="w-8 h-8 text-vexl-yellow mx-auto mb-2" />
          <h5 className="font-semibold mb-1">Direct Value</h5>
          <p className="text-xs text-vexl-gray-400">No platforms taking 20% cuts</p>
        </div>
        <div className="text-center p-4 bg-vexl-gray-900/30 rounded-lg">
          <Repeat className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h5 className="font-semibold mb-1">Skills for Skills</h5>
          <p className="text-xs text-vexl-gray-400">Everyone has something to offer</p>
        </div>
        <div className="text-center p-4 bg-vexl-gray-900/30 rounded-lg">
          <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h5 className="font-semibold mb-1">Trust Network</h5>
          <p className="text-xs text-vexl-gray-400">Real people, real accountability</p>
        </div>
      </div>
    </div>
  )
}