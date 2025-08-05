'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Target, CheckCircle, Star, Zap, Award } from 'lucide-react'
import Image from 'next/image'

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  points: number
  unlocked: boolean
}

interface Challenge {
  id: string
  title: string
  description: string
  target: number
  current: number
  reward: string
}

const WEEKLY_MISSIONS = [
  "Buy coffee with bitcoin at a local shop",
  "Sell something for sats on Vexl",
  "Introduce Vexl to a local business owner",
  "Complete your first P2P trade",
  "Add 5 contacts to expand your web of trust",
  "Trade with someone 2 degrees away",
  "Organize a bitcoin meetup at a local venue",
  "Help a neighbor set up their Vexl wallet",
]

export default function EconomyChallenge() {
  const [connectedBusinesses, setConnectedBusinesses] = useState<string[]>([])
  const [totalPoints, setTotalPoints] = useState(0)
  const [currentMission, setCurrentMission] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: 'first', title: 'First Connection', description: 'Connect your first local business', icon: Star, points: 10, unlocked: false },
    { id: 'network', title: 'Network Builder', description: 'Connect 5 businesses', icon: Zap, points: 50, unlocked: false },
    { id: 'economy', title: 'Economy Champion', description: 'Connect 10 businesses', icon: Trophy, points: 100, unlocked: false },
    { id: 'leader', title: 'Community Leader', description: 'Complete all challenges', icon: Award, points: 200, unlocked: false },
  ])

  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: 'connect', title: 'Business Connector', description: 'Connect local businesses', target: 10, current: 0, reward: '🏆 Economy Champion Badge' },
    { id: 'trade', title: 'Trade Master', description: 'Complete P2P trades', target: 5, current: 0, reward: '⚡ Lightning Network Pro' },
    { id: 'evangelist', title: 'Vexl Evangelist', description: 'Onboard new users', target: 3, current: 0, reward: '🌟 Community Hero' },
  ])

  const businessTypes = [
    { id: 'cafe', name: 'Local Cafe', icon: '☕', avatar: '/avatars/avatar2.svg' },
    { id: 'grocery', name: 'Grocery Store', icon: '🛒', avatar: '/avatars/avatar3.svg' },
    { id: 'salon', name: 'Hair Salon', icon: '💇', avatar: '/avatars/avatar4.svg' },
    { id: 'garage', name: 'Auto Repair', icon: '🔧', avatar: '/avatars/avatar5.svg' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️', avatar: '/avatars/avatar6.svg' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊', avatar: '/avatars/avatar7.svg' },
    { id: 'hardware', name: 'Hardware Store', icon: '🔨', avatar: '/avatars/avatar8.svg' },
    { id: 'florist', name: 'Florist', icon: '🌸', avatar: '/avatars/avatar9.svg' },
    { id: 'bookshop', name: 'Book Shop', icon: '📚', avatar: '/avatars/avatar10.svg' },
    { id: 'pet', name: 'Pet Store', icon: '🐕', avatar: '/avatars/avatar2.svg' },
  ]

  const connectBusiness = (businessId: string) => {
    if (!connectedBusinesses.includes(businessId)) {
      setConnectedBusinesses([...connectedBusinesses, businessId])
      
      // Update challenges
      setChallenges(prev => prev.map(c => 
        c.id === 'connect' ? { ...c, current: c.current + 1 } : c
      ))
      
      // Check achievements
      const newConnections = connectedBusinesses.length + 1
      const newAchievements = [...achievements]
      let pointsEarned = 10
      
      if (newConnections === 1) {
        newAchievements[0].unlocked = true
        pointsEarned += newAchievements[0].points
      }
      if (newConnections === 5) {
        newAchievements[1].unlocked = true
        pointsEarned += newAchievements[1].points
      }
      if (newConnections === 10) {
        newAchievements[2].unlocked = true
        pointsEarned += newAchievements[2].points
        setShowCelebration(true)
        setTimeout(() => setShowCelebration(false), 5000)
      }
      
      setAchievements(newAchievements)
      setTotalPoints(prev => prev + pointsEarned)
    }
  }

  const generateNewMission = () => {
    setCurrentMission((prev) => (prev + 1) % WEEKLY_MISSIONS.length)
  }

  return (
    <div className="w-full">
      {/* Header Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-vexl-gray-900/50 rounded-lg text-center">
          <Trophy className="w-8 h-8 text-vexl-yellow mx-auto mb-2" />
          <p className="text-2xl font-bold">{totalPoints}</p>
          <p className="text-sm text-vexl-gray-400">Total Points</p>
        </div>
        <div className="p-4 bg-vexl-gray-900/50 rounded-lg text-center">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{connectedBusinesses.length}/10</p>
          <p className="text-sm text-vexl-gray-400">Businesses</p>
        </div>
        <div className="p-4 bg-vexl-gray-900/50 rounded-lg text-center">
          <CheckCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{achievements.filter(a => a.unlocked).length}/4</p>
          <p className="text-sm text-vexl-gray-400">Achievements</p>
        </div>
        <div className="p-4 bg-vexl-gray-900/50 rounded-lg text-center">
          <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <p className="text-2xl font-bold">{Math.floor((connectedBusinesses.length / 10) * 100)}%</p>
          <p className="text-sm text-vexl-gray-400">Progress</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Business Grid */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Connect Local Businesses</h3>
          <div className="grid grid-cols-2 gap-4">
            {businessTypes.map((business) => (
              <motion.button
                key={business.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => connectBusiness(business.id)}
                disabled={connectedBusinesses.includes(business.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  connectedBusinesses.includes(business.id)
                    ? 'bg-green-900/30 border-green-600'
                    : 'bg-vexl-gray-900/50 border-vexl-gray-800 hover:border-vexl-yellow'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image
                      src={business.avatar}
                      alt={business.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    {connectedBusinesses.includes(business.id) && (
                      <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 text-green-500 bg-black rounded-full" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-sm">{business.name}</p>
                    <p className="text-xs text-vexl-gray-400">{business.icon}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Challenges & Achievements */}
        <div className="space-y-6">
          {/* Weekly Mission */}
          <div className="p-6 bg-gradient-to-r from-purple-950/30 to-transparent border-2 border-purple-900/50 rounded-lg">
            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-purple-500" />
              Weekly Mission
            </h4>
            <p className="text-lg mb-4">{WEEKLY_MISSIONS[currentMission]}</p>
            <button
              onClick={generateNewMission}
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Skip to next mission →
            </button>
          </div>

          {/* Active Challenges */}
          <div>
            <h4 className="text-xl font-bold mb-4">Active Challenges</h4>
            <div className="space-y-3">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="p-4 bg-vexl-gray-900/50 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold">{challenge.title}</p>
                      <p className="text-sm text-vexl-gray-400">{challenge.description}</p>
                    </div>
                    <span className="text-sm font-bold">{challenge.current}/{challenge.target}</span>
                  </div>
                  <div className="w-full bg-vexl-gray-800 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(challenge.current / challenge.target) * 100}%` }}
                      className="bg-gradient-to-r from-vexl-yellow to-green-500 h-2 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-vexl-gray-500 mt-2">Reward: {challenge.reward}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="text-xl font-bold mb-4">Achievements</h4>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-vexl-yellow/20 to-transparent border-vexl-yellow'
                        : 'bg-vexl-gray-900/30 border-vexl-gray-800 opacity-50'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-2 ${achievement.unlocked ? 'text-vexl-yellow' : 'text-vexl-gray-600'}`} />
                    <p className="font-semibold text-sm">{achievement.title}</p>
                    <p className="text-xs text-vexl-gray-400">{achievement.points} pts</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-8 p-6 bg-gradient-to-r from-vexl-yellow/20 to-transparent border-l-4 border-vexl-yellow text-center">
        <h4 className="text-2xl font-bold mb-4">Ready to Build Your Local Bitcoin Economy?</h4>
        <p className="text-vexl-gray-400 mb-6">
          Join your local Vexl community and start making a real difference today!
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-vexl-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-all">
            Download Vexl
          </button>
          <button className="px-6 py-3 bg-vexl-gray-800 font-bold rounded-lg hover:bg-vexl-gray-700 transition-all">
            Find Local Groups
          </button>
        </div>
      </div>

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <div className="text-center">
              <Trophy className="w-32 h-32 text-vexl-yellow mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-2">Achievement Unlocked!</h2>
              <p className="text-xl text-vexl-gray-400">You're building a circular economy!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}