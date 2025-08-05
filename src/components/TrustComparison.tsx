'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield, Users, Star, ThumbsUp, X } from 'lucide-react'
import Image from 'next/image'

export default function TrustComparison() {
  const [userChoice, setUserChoice] = useState<'craigslist' | 'trusted' | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleChoice = (choice: 'craigslist' | 'trusted') => {
    setUserChoice(choice)
    setShowResult(true)
  }

  const reset = () => {
    setUserChoice(null)
    setShowResult(false)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Trust = Business</h3>
        <p className="text-xl text-vexl-gray-400">Your toilet is broken. Who do you call?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Random Craigslist Plumber */}
        <motion.div
          whileHover={{ scale: userChoice ? 1 : 1.02 }}
          className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
            userChoice === 'craigslist' 
              ? 'border-red-500 bg-red-950/20' 
              : 'border-red-900/50 bg-gradient-to-br from-red-950/10 to-transparent hover:border-red-700'
          }`}
          onClick={() => !userChoice && handleChoice('craigslist')}
        >
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold mb-2 text-red-400">Random Plumber</h4>
            <p className="text-vexl-gray-400">Found on Craigslist</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 bg-vexl-gray-800 rounded-full flex items-center justify-center">
                <span className="text-6xl">👤</span>
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">?</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <X className="w-5 h-5" />
              <span>0 mutual friends</span>
            </div>
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span>No verification</span>
            </div>
            <div className="flex items-center gap-3 text-red-400">
              <Star className="w-5 h-5" />
              <span>Fake reviews possible</span>
            </div>
            <div className="flex items-center gap-3 text-red-400">
              <Shield className="w-5 h-5" />
              <span>Risk: Unknown person in your home</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-red-950/30 rounded-lg">
            <p className="text-sm italic text-red-300">
              "Great plumber! 5 stars!" - Anonymous123
            </p>
            <p className="text-xs text-red-400 mt-1">
              (Could be anyone, even themselves)
            </p>
          </div>
        </motion.div>

        {/* Tom's Friend Sarah */}
        <motion.div
          whileHover={{ scale: userChoice ? 1 : 1.02 }}
          className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
            userChoice === 'trusted' 
              ? 'border-green-500 bg-green-950/20' 
              : 'border-green-900/50 bg-gradient-to-br from-green-950/10 to-transparent hover:border-green-700'
          }`}
          onClick={() => !userChoice && handleChoice('trusted')}
        >
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold mb-2 text-green-400">James Wright</h4>
            <p className="text-vexl-gray-400">Tom's friend</p>
          </div>

          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src="/avatars/avatar7.svg"
                alt="James Wright"
                width={128}
                height={128}
                className="rounded-full border-4 border-green-600"
              />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-green-400">
              <Users className="w-5 h-5" />
              <span>3 mutual friends</span>
            </div>
            <div className="flex items-center gap-3 text-green-400">
              <Shield className="w-5 h-5" />
              <span>Verified by your network</span>
            </div>
            <div className="flex items-center gap-3 text-green-400">
              <Star className="w-5 h-5" />
              <span>Real reviews from real people</span>
            </div>
            <div className="flex items-center gap-3 text-green-400">
              <ThumbsUp className="w-5 h-5" />
              <span>Tom personally recommends</span>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-950/30 rounded-lg">
            <p className="text-sm italic text-green-300">
              "James fixed our bathroom last month. Fair price, great work!"
            </p>
            <p className="text-xs text-green-400 mt-1">
              - Tom Rodriguez (your actual friend)
            </p>
          </div>
        </motion.div>
      </div>

      {/* Results */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-8 rounded-2xl bg-vexl-gray-900/50 border border-vexl-gray-800"
        >
          {userChoice === 'craigslist' ? (
            <div className="text-center">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h4 className="text-2xl font-bold mb-4 text-red-400">Risky Choice!</h4>
              <p className="text-lg text-vexl-gray-300 mb-4">
                You're inviting a complete stranger into your home. No accountability, no trust network, no recourse if something goes wrong.
              </p>
              <p className="text-vexl-gray-400">
                Traditional platforms profit from connecting you with strangers. Vexl connects you with trusted community members.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Shield className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h4 className="text-2xl font-bold mb-4 text-green-400">Smart Choice!</h4>
              <p className="text-lg text-vexl-gray-300 mb-4">
                James has skin in the game - his reputation with your mutual friends. Tom vouches for him. Real accountability.
              </p>
              <p className="text-vexl-gray-400">
                This is how business has always worked - through trust networks. Vexl just makes it digital and adds bitcoin.
              </p>
            </div>
          )}
          
          <div className="text-center mt-6">
            <button
              onClick={reset}
              className="px-6 py-3 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg font-semibold transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      )}

      {/* Key Insight */}
      <div className="mt-8 p-6 bg-gradient-to-r from-vexl-yellow/10 to-transparent border-l-4 border-vexl-yellow">
        <h4 className="text-xl font-bold mb-2">The Vexl Difference</h4>
        <p className="text-vexl-gray-300">
          Every service provider on Vexl comes through your extended network. Not anonymous strangers - 
          real people with real reputations among your mutual friends. Trust isn't a rating - it's relationships.
        </p>
      </div>
    </div>
  )
}