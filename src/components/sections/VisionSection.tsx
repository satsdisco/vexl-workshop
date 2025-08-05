'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import CircularEconomyViz from '@/components/CircularEconomyViz'
import LocalNetworkMap from '@/components/LocalNetworkMap'
import ImpactCalculator from '@/components/ImpactCalculator'
import EconomyChallenge from '@/components/EconomyChallenge'

export default function VisionSection() {
  const [activeTab, setActiveTab] = useState('vision')

  const tabs = [
    { id: 'vision', label: 'Money Flow', icon: '💸' },
    { id: 'network', label: 'Local Network', icon: '🗺️' },
    { id: 'impact', label: 'Your Impact', icon: '📊' },
    { id: 'challenge', label: 'Take Action', icon: '🎯' },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-black text-center mb-4"
      >
        Build Your Local <span className="text-vexl-yellow">Bitcoin Economy</span>
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-center text-vexl-gray-400 mb-12 max-w-3xl mx-auto"
      >
        Stop letting banks extract wealth from your community. Keep money circulating locally with P2P bitcoin.
      </motion.p>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
              activeTab === tab.id
                ? 'bg-vexl-yellow text-black'
                : 'bg-vexl-gray-900 hover:bg-vexl-gray-800'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span>{tab.label}</span>
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
        {activeTab === 'vision' && (
          <div className="space-y-8">
            <CircularEconomyViz />
            
            <div className="mt-12 p-8 bg-gradient-to-r from-vexl-yellow/10 to-transparent border-l-4 border-vexl-yellow">
              <h3 className="text-2xl font-bold mb-4">The Choice is Clear</h3>
              <p className="text-vexl-gray-300 text-lg">
                Every dollar you spend at a bank-dependent business eventually leaves your community. 
                Every sat you spend P2P stays local, multiplying its impact 7x as it changes hands 
                between neighbors, local shops, and service providers.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-8">
            <LocalNetworkMap />
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="p-6 bg-vexl-gray-900/50 rounded-lg text-center">
                <div className="text-4xl mb-3">🤝</div>
                <h4 className="font-bold mb-2">Direct P2P</h4>
                <p className="text-sm text-vexl-gray-400">No intermediaries extracting value</p>
              </div>
              <div className="p-6 bg-vexl-gray-900/50 rounded-lg text-center">
                <div className="text-4xl mb-3">🔄</div>
                <h4 className="font-bold mb-2">Circular Flow</h4>
                <p className="text-sm text-vexl-gray-400">Money stays in your neighborhood</p>
              </div>
              <div className="p-6 bg-vexl-gray-900/50 rounded-lg text-center">
                <div className="text-4xl mb-3">📈</div>
                <h4 className="font-bold mb-2">Compound Growth</h4>
                <p className="text-sm text-vexl-gray-400">Each connection strengthens all others</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="space-y-8">
            <ImpactCalculator />
          </div>
        )}

        {activeTab === 'challenge' && (
          <div className="space-y-8">
            <EconomyChallenge />
          </div>
        )}
      </motion.div>

      {/* Presenter Notes */}
      <div className="mt-16 p-6 bg-vexl-gray-900/30 rounded-lg border border-vexl-gray-800">
        <h4 className="text-sm font-bold text-vexl-gray-500 mb-2">PRESENTER NOTE:</h4>
        <p className="text-sm text-vexl-gray-400">
          {activeTab === 'vision' && "Click 'Start Money Flow' to show the difference. Let it run for 10 seconds to build impact."}
          {activeTab === 'network' && "Invite audience members to suggest local businesses. Add them live to show network effects."}
          {activeTab === 'impact' && "Ask someone their monthly spending. Adjust sliders together to show their personal impact."}
          {activeTab === 'challenge' && "Challenge the audience: 'Who can connect 5 businesses this week?' Create friendly competition."}
        </p>
      </div>
    </div>
  )
}