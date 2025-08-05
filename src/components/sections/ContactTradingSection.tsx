'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MessageCircle, UserCheck, CheckCircle2, Lock } from 'lucide-react'
import PhoneMockup from '@/components/PhoneMockup'

export default function ContactTradingSection() {
  const [checkedItems, setCheckedItems] = useState<number[]>([])

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const checklistItems = [
    "Verify identity matches profile",
    "Agree on payment method",
    "Confirm exchange rate", 
    "Choose safe meeting location",
    "Complete the trade"
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl text-center mb-8"
        style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
      >
        From Contact to <span className="text-vexl-yellow">Completed Trade</span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-center text-vexl-gray-400 mb-12 max-w-3xl mx-auto"
      >
        This isn't KYC - it's vouching
      </motion.p>

      {/* Multi-step flow */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {/* Step 1: Chat Initiation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 bg-vexl-yellow text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
            1
          </div>
          
          <div className="text-center">
            <PhoneMockup 
              imageSrc="/placeholder-image.png"
              imageAlt="Chat initiation screenshot"
              className="mb-4"
            />
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <MessageCircle className="w-5 h-5 text-vexl-yellow" />
              <h3 className="text-lg font-bold">Start Encrypted Chat</h3>
            </div>
            
            <div className="flex items-center justify-center gap-2 bg-green-900/20 border border-green-900/50 py-2 px-4 rounded-full inline-flex">
              <Lock className="w-4 h-4 text-green-500" />
              <p className="text-sm text-green-400">E2E Encrypted</p>
            </div>
          </div>
        </motion.div>

        {/* Step 2: Identity Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 bg-vexl-yellow text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
            2
          </div>
          
          <div className="text-center">
            <PhoneMockup 
              imageSrc="/placeholder-image.png"
              imageAlt="Identity reveal process"
              className="mb-4"
            />
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <UserCheck className="w-5 h-5 text-vexl-yellow" />
              <h3 className="text-lg font-bold">Reveal Identity</h3>
            </div>
            
            <p className="text-sm text-vexl-gray-400">
              Both parties choose when to share real names and photos
            </p>
          </div>
        </motion.div>

        {/* Step 3: Trade Completion */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 bg-vexl-yellow text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
            3
          </div>
          
          <div className="text-center">
            <PhoneMockup 
              imageSrc="/placeholder-image.png"
              imageAlt="Trade completion checklist"
              className="mb-4"
            />
            
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-vexl-yellow" />
              <h3 className="text-lg font-bold">Complete Trade</h3>
            </div>
            
            <p className="text-sm text-vexl-gray-400">
              Follow the checklist to ensure smooth P2P exchange
            </p>
          </div>
        </motion.div>
      </div>

      {/* Interactive Checklist Demo */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-vexl-gray-900 to-vexl-gray-900/50 border-2 border-vexl-yellow/30 p-8 rounded-none"
      >
        <h3 className="text-2xl font-bold mb-6 text-center">Trade Checklist - Try It!</h3>
        
        <div className="max-w-md mx-auto space-y-4">
          {checklistItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleCheck(index)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                checkedItems.includes(index)
                  ? 'bg-green-900/20 border-green-900/50'
                  : 'bg-vexl-gray-800 border-vexl-gray-700 hover:border-vexl-gray-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
                  checkedItems.includes(index)
                    ? 'bg-green-500 border-green-500'
                    : 'border-vexl-gray-600'
                }`}>
                  {checkedItems.includes(index) && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-4 h-4 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
                <span className={checkedItems.includes(index) ? 'text-green-400' : ''}>
                  {item}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {checkedItems.length === checklistItems.length && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center gap-2 bg-green-900/30 border border-green-900/50 px-6 py-3 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="text-lg font-bold text-green-400">Trade Complete!</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Key Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-center"
      >
        <p className="text-xl text-vexl-gray-400">
          No surveillance. No tracking. Just <span className="text-vexl-yellow font-bold">human trust</span>.
        </p>
      </motion.div>
    </div>
  )
}