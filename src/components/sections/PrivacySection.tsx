'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import WebOfTrustDemo from '@/components/WebOfTrustDemo'
import HashExplanationDemo from '@/components/HashExplanationDemo'
import ContactImportDemo from '@/components/ContactImportDemo'

export default function PrivacySection() {
  const [activeDemo, setActiveDemo] = useState<'web' | 'hash' | 'import'>('web')

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-black text-center mb-16"
      >
        Privacy <span className="text-vexl-yellow">First</span>
      </motion.h2>

      <div className="mb-12">
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <motion.button
            onClick={() => setActiveDemo('web')}
            className={`px-6 py-3 font-bold transition-all ${
              activeDemo === 'web' 
                ? 'bg-vexl-yellow text-black' 
                : 'bg-vexl-gray-800 hover:bg-vexl-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Web of Trust
          </motion.button>
          <motion.button
            onClick={() => setActiveDemo('hash')}
            className={`px-6 py-3 font-bold transition-all ${
              activeDemo === 'hash' 
                ? 'bg-vexl-yellow text-black' 
                : 'bg-vexl-gray-800 hover:bg-vexl-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Privacy Tech
          </motion.button>
          <motion.button
            onClick={() => setActiveDemo('import')}
            className={`px-6 py-3 font-bold transition-all ${
              activeDemo === 'import' 
                ? 'bg-vexl-yellow text-black' 
                : 'bg-vexl-gray-800 hover:bg-vexl-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Import Strategy
          </motion.button>
        </div>

        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeDemo === 'web' && <WebOfTrustDemo />}
          {activeDemo === 'hash' && <HashExplanationDemo />}
          {activeDemo === 'import' && <ContactImportDemo />}
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="vexl-card group hover:border-vexl-yellow transition-all">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-vexl-yellow text-3xl">🔒</span>
              Phone Number Never Leaves Your Device
            </h3>
            <p className="text-vexl-gray-400">
              Your contacts are hashed locally. We literally cannot see your phone number or who you know.
            </p>
          </div>

          <div className="vexl-card group hover:border-vexl-yellow transition-all">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-vexl-yellow text-3xl">🛡️</span>
              Microservices Can't Communicate
            </h3>
            <p className="text-vexl-gray-400">
              Our architecture is designed so services cannot share data. Even if we wanted to KYC you, we couldn't.
            </p>
          </div>

          <div className="vexl-card group hover:border-vexl-yellow transition-all">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
              <span className="text-vexl-yellow text-3xl">🌐</span>
              Open Source & Nonprofit
            </h3>
            <p className="text-vexl-gray-400">
              Funded by Human Rights Foundation & OpenSats. No business model = no surveillance incentive.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="bg-vexl-gray-900 p-8 rounded-none border border-vexl-gray-800">
            <h4 className="text-xl font-bold mb-6 text-center">Vexl vs KYC Exchanges</h4>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-vexl-gray-400">Personal Data Required</span>
                <div className="flex gap-4">
                  <span className="text-red-500">KYC: ALL</span>
                  <span className="text-green-500">Vexl: NONE</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-vexl-gray-400">Government Access</span>
                <div className="flex gap-4">
                  <span className="text-red-500">KYC: YES</span>
                  <span className="text-green-500">Vexl: NO</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-vexl-gray-400">Data Breaches Risk</span>
                <div className="flex gap-4">
                  <span className="text-red-500">KYC: HIGH</span>
                  <span className="text-green-500">Vexl: ZERO</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-vexl-gray-400">Transaction Privacy</span>
                <div className="flex gap-4">
                  <span className="text-red-500">KYC: NONE</span>
                  <span className="text-green-500">Vexl: FULL</span>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-6 -right-6 bg-vexl-yellow text-black px-6 py-3 font-bold text-lg"
          >
            No Database = No Honeypot
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-8 p-6 bg-vexl-gray-900/50 border border-vexl-gray-800">
          <Image 
            src="/logos/human rights foundation /HRF-Logo.png" 
            alt="Human Rights Foundation" 
            width={120} 
            height={60}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
          <span className="text-vexl-gray-600">+</span>
          <Image 
            src="/logos/opensats/opensats-logo.png" 
            alt="OpenSats" 
            width={120} 
            height={60}
            className="opacity-80 hover:opacity-100 transition-opacity"
          />
          <span className="text-vexl-gray-600">=</span>
          <span className="font-bold text-xl">100% Nonprofit</span>
        </div>
      </motion.div>
    </div>
  )
}