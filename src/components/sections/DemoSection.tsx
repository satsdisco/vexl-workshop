'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const demoSteps = [
  {
    title: "1. Create Your Offer",
    description: "Choose to buy or sell Bitcoin. Set your terms. Stay anonymous.",
    screenshot: "/screenshots/createoffer1.PNG",
    highlights: ["No registration", "No email", "No ID"]
  },
  {
    title: "2. Browse the Marketplace",
    description: "See offers from your web of trust. Friends and friends of friends only.",
    screenshot: "/screenshots/marketplace 2.PNG",
    highlights: ["Web of trust", "Local offers", "Real people"]
  },
  {
    title: "3. See Offer Details",
    description: "Check payment methods, amounts, and trader reputation.",
    screenshot: "/screenshots/offerdetails.PNG",
    highlights: ["Clear terms", "Payment options", "Trust indicators"]
  },
  {
    title: "4. Connect & Trade",
    description: "Chat securely, meet up, exchange cash for sats. That's it.",
    screenshot: "/screenshots/offerdetails2.PNG",
    highlights: ["E2E encrypted", "No middleman", "P2P freedom"]
  }
]

export default function DemoSection() {
  const [currentStep, setCurrentStep] = useState(0)

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-black text-center mb-16"
      >
        Zero to <span className="text-vexl-yellow">Sats</span> in 4 Steps
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="order-2 lg:order-1"
        >
          <div className="space-y-4">
            {demoSteps.map((step, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-full text-left p-6 transition-all border-2 ${
                  currentStep === index 
                    ? 'bg-vexl-yellow text-black border-vexl-yellow' 
                    : 'bg-transparent border-vexl-gray-800 hover:border-vexl-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className={`mb-3 ${currentStep === index ? 'text-black/80' : 'text-vexl-gray-400'}`}>
                  {step.description}
                </p>
                <div className="flex gap-3 flex-wrap">
                  {step.highlights.map((highlight, idx) => (
                    <span 
                      key={idx}
                      className={`text-xs px-3 py-1 ${
                        currentStep === index 
                          ? 'bg-black/20 text-black' 
                          : 'bg-vexl-gray-800 text-vexl-gray-400'
                      }`}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto max-w-sm">
            <motion.div
              animate={{ 
                boxShadow: ["0 0 0 0 rgba(255, 215, 0, 0)", "0 0 0 20px rgba(255, 215, 0, 0.1)", "0 0 0 0 rgba(255, 215, 0, 0)"]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-[3rem]"
            />
            <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl border border-vexl-gray-800">
              <div className="bg-vexl-gray-900 rounded-[2.5rem] p-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-[9/19.5] rounded-[2.25rem] overflow-hidden"
                  >
                    <Image
                      src={demoSteps[currentStep].screenshot}
                      alt={demoSteps[currentStep].title}
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
            >
              {demoSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentStep === index 
                      ? 'w-8 bg-vexl-yellow' 
                      : 'bg-vexl-gray-600 hover:bg-vexl-gray-400'
                  }`}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-20 p-8 bg-gradient-to-r from-vexl-yellow/10 to-transparent border-l-4 border-vexl-yellow"
      >
        <h3 className="text-2xl font-bold mb-4">The Magic: Web of Trust</h3>
        <p className="text-vexl-gray-400 text-lg mb-4">
          You only see offers from people in your extended network. No randos, no scammers, just real bitcoiners connected through mutual contacts.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
            <Image src="/avatars/avatar2.svg" alt="User" width={40} height={40} className="rounded-full border-2 border-black" />
            <Image src="/avatars/avatar3.svg" alt="User" width={40} height={40} className="rounded-full border-2 border-black" />
            <Image src="/avatars/avatar4.svg" alt="User" width={40} height={40} className="rounded-full border-2 border-black" />
            <Image src="/avatars/avatar5.svg" alt="User" width={40} height={40} className="rounded-full border-2 border-black" />
          </div>
          <span className="text-sm text-vexl-gray-500">Your network creates your marketplace</span>
        </div>
      </motion.div>
    </div>
  )
}