'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function TrustVsRatings() {
  const [showComparison, setShowComparison] = useState(false)
  const [userChoice, setUserChoice] = useState<'stranger' | 'friend' | null>(null)

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl mb-6" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
          Trust Can't Be <span className="text-vexl-yellow">Rated</span>
        </h3>
        <p className="text-xl text-vexl-gray-400 max-w-3xl mx-auto mb-8">
          Trust isn't a number - it's people you know vouching for people they know
        </p>
      </motion.div>

      {/* Interactive Choice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-16"
      >
        <h4 className="text-2xl text-center mb-8" style={{ fontFamily: 'TT Satoshi', fontWeight: 600 }}>
          Who would you rather trade with?
        </h4>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* 5-Star Stranger */}
          <motion.button
            onClick={() => {
              setUserChoice('stranger')
              setShowComparison(true)
            }}
            className={`p-8 border-2 transition-all ${
              userChoice === 'stranger' 
                ? 'border-red-500 bg-red-500/10' 
                : 'border-vexl-gray-800 hover:border-vexl-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🤖</div>
              <h5 className="text-xl mb-2" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>
                5-Star Stranger
              </h5>
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                ))}
              </div>
              <p className="text-vexl-gray-400">
                "BitcoinTrader2024" - 500+ reviews
              </p>
              <p className="text-sm text-vexl-gray-500 mt-2">
                Could be anyone. Or anything.
              </p>
            </div>
          </motion.button>

          {/* Friend's Recommendation */}
          <motion.button
            onClick={() => {
              setUserChoice('friend')
              setShowComparison(true)
            }}
            className={`p-8 border-2 transition-all ${
              userChoice === 'friend' 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-vexl-gray-800 hover:border-vexl-gray-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center">
              <div className="mb-4">
                <Image 
                  src="/avatars/avatar4.svg" 
                  alt="Friend's plumber"
                  width={80}
                  height={80}
                  className="mx-auto rounded-full"
                />
              </div>
              <h5 className="text-xl mb-2" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>
                Your Friend's Plumber
              </h5>
              <div className="flex justify-center gap-1 mb-4">
                <span className="text-vexl-gray-700 text-2xl">No ratings</span>
              </div>
              <p className="text-vexl-gray-400">
                "Mike fixed my sink last week, trades bitcoin too"
              </p>
              <p className="text-sm text-green-400 mt-2">
                Real person. Real trust.
              </p>
            </div>
          </motion.button>
        </div>
      </motion.div>

      {/* Comparison Result */}
      <AnimatePresence>
        {showComparison && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-vexl-gray-900 p-8 rounded-lg"
          >
            {userChoice === 'friend' ? (
              <div className="text-center">
                <h4 className="text-2xl mb-4 text-green-400" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
                  You Get It! 🎯
                </h4>
                <p className="text-lg mb-6">
                  This is exactly how Vexl works. Real trust from real people beats fake ratings every time.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-vexl-gray-800 p-4 rounded">
                    <h5 className="font-bold mb-2">✅ Verified Human</h5>
                    <p className="text-sm text-vexl-gray-400">Your friend knows Mike exists</p>
                  </div>
                  <div className="bg-vexl-gray-800 p-4 rounded">
                    <h5 className="font-bold mb-2">✅ Real Reputation</h5>
                    <p className="text-sm text-vexl-gray-400">Mike values his local reputation</p>
                  </div>
                  <div className="bg-vexl-gray-800 p-4 rounded">
                    <h5 className="font-bold mb-2">✅ Social Accountability</h5>
                    <p className="text-sm text-vexl-gray-400">Your friend's trust is on the line</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h4 className="text-2xl mb-4 text-red-400" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
                  Think Again... 🤔
                </h4>
                <p className="text-lg mb-6">
                  Those 5 stars could be bought, faked, or manipulated. You have no idea who this person really is.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="bg-vexl-gray-800 p-4 rounded">
                    <h5 className="font-bold mb-2">❌ Fake Reviews</h5>
                    <p className="text-sm text-vexl-gray-400">$50 buys 100 five-star reviews</p>
                  </div>
                  <div className="bg-vexl-gray-800 p-4 rounded">
                    <h5 className="font-bold mb-2">❌ No Accountability</h5>
                    <p className="text-sm text-vexl-gray-400">New account when reputation tanks</p>
                  </div>
                  <div className="bg-vexl-gray-800 p-4 rounded">
                    <h5 className="font-bold mb-2">❌ Data Honeypot</h5>
                    <p className="text-sm text-vexl-gray-400">Platform tracks every transaction</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Philosophy Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <div className="inline-block bg-vexl-gray-900 p-6 border border-vexl-gray-800">
          <p className="text-lg italic text-vexl-gray-300">
            "Ratings can be bought, manipulated, faked. Your friend's recommendation can't be."
          </p>
          <p className="text-sm text-vexl-gray-500 mt-2">
            - Vexl Philosophy
          </p>
        </div>
      </motion.div>
    </div>
  )
}