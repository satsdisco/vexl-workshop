'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, Shield, Eye } from 'lucide-react'

export default function FindingOffersSection() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl text-center mb-8"
        style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
      >
        See Offers from Your <span className="text-vexl-yellow">Trusted Network</span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-center text-vexl-gray-400 mb-12 max-w-3xl mx-auto"
      >
        Only friends and friends of friends - no strangers
      </motion.p>

      {/* Container showcase */}
      <div className="grid lg:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-vexl-gray-900 border border-vexl-gray-800 p-6 rounded-none"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-vexl-yellow" />
            <h3 className="text-xl font-bold">Offers Feed</h3>
          </div>
          
          <div className="bg-vexl-gray-800 rounded-lg p-4 mb-4">
            <Image
              src="/screenshots/offers-feed.png"
              alt="Offers feed screenshot"
              width={300}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
          
          <p className="text-sm text-vexl-gray-400">
            Browse buy and sell offers from your extended network. 
            See distance in connections.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-vexl-gray-900 border border-vexl-gray-800 p-6 rounded-none"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-vexl-yellow" />
            <h3 className="text-xl font-bold">Mutual Friends</h3>
          </div>
          
          <div className="bg-vexl-gray-800 rounded-lg p-4 mb-4">
            <Image
              src="/placeholder-image.png"
              alt="Mutual friends indicator"
              width={300}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
          
          <p className="text-sm text-vexl-gray-400">
            See exactly who connects you. Your friend vouches for their friend.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-vexl-gray-900 border border-vexl-gray-800 p-6 rounded-none"
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-vexl-yellow" />
            <h3 className="text-xl font-bold">Offer Details</h3>
          </div>
          
          <div className="bg-vexl-gray-800 rounded-lg p-4 mb-4">
            <Image
              src="/placeholder-image.png"
              alt="Offer details view"
              width={300}
              height={400}
              className="w-full rounded-lg"
            />
          </div>
          
          <p className="text-sm text-vexl-gray-400">
            Payment methods, amounts, location preferences. Everything clear upfront.
          </p>
        </motion.div>
      </div>

      {/* Trust Indicator Explanation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-vexl-gray-900/50 border-2 border-vexl-yellow/30 p-8 rounded-none"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Understanding Trust Indicators</h3>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-vexl-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold">1°</span>
            </div>
            <h4 className="font-semibold mb-1">Direct Friend</h4>
            <p className="text-xs text-vexl-gray-500">Your contact</p>
          </div>
          
          <div className="text-center">
            <div className="bg-vexl-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold">2°</span>
            </div>
            <h4 className="font-semibold mb-1">Friend of Friend</h4>
            <p className="text-xs text-vexl-gray-500">One hop away</p>
          </div>
          
          <div className="text-center">
            <div className="bg-vexl-yellow text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">🤝</span>
            </div>
            <h4 className="font-semibold mb-1">Mutual Friends</h4>
            <p className="text-xs text-vexl-gray-500">Shared connections</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-xl">✓</span>
            </div>
            <h4 className="font-semibold mb-1">Verified</h4>
            <p className="text-xs text-vexl-gray-500">Face-to-face</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}