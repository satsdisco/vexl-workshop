'use client'

import { motion } from 'framer-motion'
import { Heart, QrCode, Gift, Target, Bitcoin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function SupportMission() {
  const [showQR, setShowQR] = useState(false)
  const geyserFundUrl = 'https://geyser.fund/project/vexl'

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black mb-6"
        >
          Support the <span className="text-vexl-yellow">Mission</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-vexl-gray-300 max-w-3xl mx-auto"
        >
          We couldn't do this without you. Every sat contributed keeps Vexl independent and surveillance-free.
        </motion.p>
      </div>

      {/* Impact Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-green-950/30 to-transparent border border-green-900/50 rounded-lg text-center"
        >
          <Target className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Your Impact</h3>
          <p className="text-3xl font-bold text-green-500 mb-2">$10</p>
          <p className="text-sm text-vexl-gray-400">Helps onboard 100 new users to P2P Bitcoin</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-blue-950/30 to-transparent border border-blue-900/50 rounded-lg text-center"
        >
          <Heart className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Community Power</h3>
          <p className="text-3xl font-bold text-blue-500 mb-2">2,847</p>
          <p className="text-sm text-vexl-gray-400">Contributors keeping Vexl free forever</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-purple-950/30 to-transparent border border-purple-900/50 rounded-lg text-center"
        >
          <Bitcoin className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Stay Independent</h3>
          <p className="text-3xl font-bold text-purple-500 mb-2">0%</p>
          <p className="text-sm text-vexl-gray-400">VC funding = 100% community owned</p>
        </motion.div>
      </div>

      {/* Donation CTA */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="p-8 bg-gradient-to-br from-vexl-yellow/20 via-vexl-yellow/10 to-transparent rounded-2xl border-2 border-vexl-yellow/50 mb-12"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">Contribute to Freedom</h3>
          <p className="text-lg text-vexl-gray-300 mb-6">
            When you support Vexl, you're not funding a company - 
            you're building the infrastructure for human freedom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Geyser Fund Link */}
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4">Donate with Bitcoin</h4>
            <a
              href={geyserFundUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-vexl-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-all hover:scale-105 mb-4"
            >
              Support on Geyser Fund →
            </a>
            <p className="text-sm text-vexl-gray-400">
              Lightning & On-chain accepted
            </p>
          </div>

          {/* QR Code */}
          <div className="text-center">
            <h4 className="text-xl font-bold mb-4">Scan to Donate</h4>
            <button
              onClick={() => setShowQR(!showQR)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg transition-all"
            >
              <QrCode className="w-5 h-5" />
              {showQR ? 'Hide' : 'Show'} QR Code
            </button>
            
            {showQR && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4 p-4 bg-white rounded-lg inline-block"
              >
                <div className="w-48 h-48 bg-vexl-gray-300 flex items-center justify-center text-black">
                  {/* In production, this would be an actual QR code image */}
                  <div className="text-center">
                    <QrCode className="w-24 h-24 mx-auto mb-2" />
                    <p className="text-xs">geyser.fund/project/vexl</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Merch Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-center mb-8">Get Vexl Gear, Support Privacy</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Privacy Matters Tee', price: '₿0.0005', icon: '👕' },
            { name: 'P2P Forever Hoodie', price: '₿0.001', icon: '🧥' },
            { name: 'Vexl Sticker Pack', price: '₿0.0001', icon: '🏷️' },
            { name: 'No KYC Cap', price: '₿0.0003', icon: '🧢' },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-4 bg-vexl-gray-900/50 rounded-lg text-center border border-vexl-gray-800 hover:border-vexl-yellow transition-all cursor-pointer"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h4 className="font-semibold mb-1">{item.name}</h4>
              <p className="text-vexl-yellow">{item.price}</p>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-sm text-vexl-gray-400 mt-4">
          100% of merch proceeds support Vexl development
        </p>
      </div>

      {/* Thank You Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center p-8 bg-vexl-gray-900/30 rounded-lg"
      >
        <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">From Our Hearts to Yours</h3>
        <p className="text-lg text-vexl-gray-300 max-w-2xl mx-auto">
          Whether you contribute sats, spread the word, or just use Vexl - 
          you're part of something bigger. Together, we're building the future 
          where privacy is a human right, not a luxury.
        </p>
        <p className="text-xl font-bold text-vexl-yellow mt-6">
          Thank you for believing in the mission. 🧡
        </p>
      </motion.div>
    </div>
  )
}