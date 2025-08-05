'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import NeighborhoodTalentMap from '@/components/NeighborhoodTalentMap'
import TrustComparison from '@/components/TrustComparison'
import SkillSharingCarousel from '@/components/SkillSharingCarousel'
import YourSkillsForm from '@/components/YourSkillsForm'
import NetworkEffectCalculator from '@/components/NetworkEffectCalculator'
import EnhancedWebOfTrust from '@/components/EnhancedWebOfTrust'

export default function VisionSection() {
  const [activeTab, setActiveTab] = useState('web')

  const tabs = [
    { id: 'web', label: 'Web of Trust', icon: '🕸️' },
    { id: 'talent', label: 'Talent Network', icon: '🌐' },
    { id: 'trust', label: 'Trust = Business', icon: '🤝' },
    { id: 'trades', label: 'Real Trades', icon: '🔄' },
    { id: 'skills', label: 'Your Skills', icon: '💪' },
    { id: 'network', label: 'Network Power', icon: '📈' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl text-center mb-4"
        style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
      >
        Your Network is Your <span className="text-vexl-yellow">Net Worth</span>
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-center text-vexl-gray-400 mb-12 max-w-3xl mx-auto"
      >
        Stop selling your time to one employer. Start serving your community with all your skills.
      </motion.p>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-vexl-yellow text-black'
                : 'bg-vexl-gray-900 hover:bg-vexl-gray-800'
            }`}
          >
            <span className="text-xl">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'web' && (
          <div className="space-y-8">
            <EnhancedWebOfTrust />
          </div>
        )}

        {activeTab === 'talent' && (
          <div className="space-y-8">
            <NeighborhoodTalentMap />
            
            <div className="mt-12 p-8 bg-gradient-to-r from-vexl-yellow/10 to-transparent border-l-4 border-vexl-yellow">
              <h3 className="text-2xl font-bold mb-4">This is Your Real Economy</h3>
              <p className="text-vexl-gray-300 text-lg">
                Every person in your network has skills. Every skill has value. Vexl connects these dots 
                through trust relationships, not corporate platforms. Your plumber knows an electrician. 
                Your barber knows a web developer. This is how economies actually work.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'trust' && (
          <div className="space-y-8">
            <TrustComparison />
          </div>
        )}

        {activeTab === 'trades' && (
          <div className="space-y-8">
            <SkillSharingCarousel />
            
            <div className="mt-8 text-center p-6 bg-vexl-gray-900/50 rounded-lg">
              <h4 className="text-xl font-bold mb-3">Notice the Pattern?</h4>
              <p className="text-vexl-gray-400">
                No corporations. No platforms taking 20% fees. Just neighbors helping neighbors, 
                settling up with bitcoin. This is the future of work.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-8">
            <YourSkillsForm />
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-8">
            <NetworkEffectCalculator />
          </div>
        )}
      </motion.div>

      {/* Presenter Notes */}
      <div className="mt-16 p-6 bg-vexl-gray-900/30 rounded-lg border border-vexl-gray-800">
        <h4 className="text-sm font-bold text-vexl-gray-500 mb-2">PRESENTER NOTE:</h4>
        <p className="text-sm text-vexl-gray-400">
          {activeTab === 'talent' && "Click on people to show their skills and connections. Ask: 'Who here has a skill they could monetize?'"}
          {activeTab === 'trust' && "Let audience choose. Most will pick the trusted option. Point out this is exactly what Vexl enables at scale."}
          {activeTab === 'trades' && "Let carousel run. These are real examples of P2P economy. Ask: 'What could you trade with your neighbors?'"}
          {activeTab === 'skills' && "Get someone to volunteer their skills. Show them their potential customer base. Make it personal."}
          {activeTab === 'network' && "Adjust sliders together. Show how even introverts have massive economic networks through friends of friends."}
        </p>
      </div>

      {/* Workshop Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-16 text-center p-8 bg-gradient-to-br from-vexl-yellow/20 via-transparent to-vexl-yellow/10 rounded-2xl border border-vexl-yellow/30"
      >
        <h3 className="text-3xl font-bold mb-4">Ready to Join the P2P Economy?</h3>
        <p className="text-xl text-vexl-gray-300 mb-6 max-w-2xl mx-auto">
          Your skills + Your network + Bitcoin = Economic freedom
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-vexl-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-all hover:scale-105">
            "I'm posting my first skill offer today!"
          </button>
          <button className="px-8 py-4 bg-vexl-gray-800 font-bold rounded-lg hover:bg-vexl-gray-700 transition-all">
            "Show me local Vexl groups"
          </button>
        </div>
      </motion.div>
    </div>
  )
}