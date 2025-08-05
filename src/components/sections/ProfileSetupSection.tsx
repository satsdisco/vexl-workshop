'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { QrCode, UserCheck, AlertCircle } from 'lucide-react'

export default function ProfileSetupSection() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl text-center mb-8"
        style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
      >
        Your Profile is Your <span className="text-vexl-yellow">Vouching Tool</span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-center text-vexl-gray-400 mb-12 max-w-3xl mx-auto"
      >
        When you scan someone's QR code, you're sharing your number - make it count
      </motion.p>

      {/* Two-panel comparison */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-vexl-gray-900 border-2 border-red-900/50 p-8 rounded-none"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
            <h3 className="text-2xl font-bold">Empty Profile = Lost Opportunities</h3>
          </div>
          
          {/* Placeholder for screenshot */}
          <div className="bg-vexl-gray-800 rounded-lg p-4 mb-6">
            <Image
              src="/placeholder-image.png"
              alt="Empty profile example"
              width={400}
              height={600}
              className="w-full rounded-lg opacity-50"
            />
          </div>
          
          <ul className="space-y-3 text-vexl-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>People don't know who you are</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>No credibility in your network</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">✗</span>
              <span>Missed trading opportunities</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-vexl-gray-900 border-2 border-green-900/50 p-8 rounded-none"
        >
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-8 h-8 text-green-500" />
            <h3 className="text-2xl font-bold">Complete Profile = Trust Builder</h3>
          </div>
          
          {/* Placeholder for screenshot */}
          <div className="bg-vexl-gray-800 rounded-lg p-4 mb-6">
            <Image
              src="/placeholder-image.png"
              alt="Complete profile example"
              width={400}
              height={600}
              className="w-full rounded-lg"
            />
          </div>
          
          <ul className="space-y-3 text-vexl-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Real name builds instant trust</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>Photo helps people recognize you</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span>More offers from your network</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* QR Code Sharing Process */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-vexl-yellow/10 to-transparent border-l-4 border-vexl-yellow p-8"
      >
        <div className="flex items-center gap-4 mb-4">
          <QrCode className="w-12 h-12 text-vexl-yellow" />
          <h3 className="text-2xl font-bold">How QR Code Sharing Works</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="text-center">
            <div className="text-4xl mb-3">📱</div>
            <h4 className="font-bold mb-2">1. Meet in Person</h4>
            <p className="text-sm text-vexl-gray-400">Face-to-face verification</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🔗</div>
            <h4 className="font-bold mb-2">2. Scan QR Code</h4>
            <p className="text-sm text-vexl-gray-400">Exchange contact info</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🤝</div>
            <h4 className="font-bold mb-2">3. Build Trust Network</h4>
            <p className="text-sm text-vexl-gray-400">Unlock trading opportunities</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}