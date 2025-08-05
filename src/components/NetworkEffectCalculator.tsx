'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Briefcase, TrendingUp, Zap } from 'lucide-react'

export default function NetworkEffectCalculator() {
  const [directContacts, setDirectContacts] = useState(150)
  const [avgContactsPerPerson, setAvgContactsPerPerson] = useState(150)
  const [trustDecay, setTrustDecay] = useState(0.7) // 70% trust through 2nd degree
  
  const [firstDegree, setFirstDegree] = useState(0)
  const [secondDegree, setSecondDegree] = useState(0)
  const [totalReach, setTotalReach] = useState(0)
  const [trustedReach, setTrustedReach] = useState(0)

  useEffect(() => {
    // Calculate network effect
    const first = directContacts
    const second = directContacts * avgContactsPerPerson * trustDecay
    const total = first + second
    const trusted = first + (second * 0.5) // Assume 50% of 2nd degree are high trust
    
    setFirstDegree(first)
    setSecondDegree(Math.floor(second))
    setTotalReach(Math.floor(total))
    setTrustedReach(Math.floor(trusted))
  }, [directContacts, avgContactsPerPerson, trustDecay])

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Your Hidden Economic Network</h3>
        <p className="text-xl text-vexl-gray-400">You're more connected than you think</p>
      </div>

      {/* Input Controls */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="p-6 bg-vexl-gray-900/50 rounded-lg">
          <label className="block mb-4">
            <span className="text-lg font-semibold">Your Direct Contacts</span>
            <span className="text-3xl font-bold text-vexl-yellow ml-4">{directContacts}</span>
          </label>
          <input
            type="range"
            min="50"
            max="500"
            step="10"
            value={directContacts}
            onChange={(e) => setDirectContacts(Number(e.target.value))}
            className="w-full h-3 bg-vexl-gray-800 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-vexl-gray-500 mt-2">
            <span>50 (introvert)</span>
            <span>500 (social butterfly)</span>
          </div>
        </div>

        <div className="p-6 bg-vexl-gray-900/50 rounded-lg">
          <label className="block mb-4">
            <span className="text-lg font-semibold">Average Network Size</span>
            <span className="text-3xl font-bold text-vexl-yellow ml-4">{avgContactsPerPerson}</span>
          </label>
          <input
            type="range"
            min="50"
            max="300"
            step="10"
            value={avgContactsPerPerson}
            onChange={(e) => setAvgContactsPerPerson(Number(e.target.value))}
            className="w-full h-3 bg-vexl-gray-800 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-vexl-gray-500 mt-2">
            <span>50 (rural)</span>
            <span>300 (urban)</span>
          </div>
        </div>
      </div>

      {/* Network Visualization */}
      <div className="relative h-96 mb-12 bg-gradient-to-br from-vexl-gray-900/30 to-vexl-gray-800/30 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Center - You */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute z-30"
          >
            <div className="w-24 h-24 bg-vexl-yellow rounded-full flex items-center justify-center text-black font-bold text-xl">
              YOU
            </div>
          </motion.div>

          {/* First Degree Ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1 }}
            className="absolute w-64 h-64 rounded-full border-4 border-green-500"
          />
          
          {/* Second Degree Ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.2 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute w-96 h-96 rounded-full border-4 border-blue-500"
          />

          {/* Sample Nodes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`first-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 * i }}
              className="absolute"
              style={{
                left: `${50 + 25 * Math.cos((i * Math.PI * 2) / 8)}%`,
                top: `${50 + 25 * Math.sin((i * Math.PI * 2) / 8)}%`,
              }}
            >
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          ))}

          {Array.from({ length: 16 }).map((_, i) => (
            <motion.div
              key={`second-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              transition={{ delay: 0.5 + 0.05 * i }}
              className="absolute"
              style={{
                left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 16)}%`,
                top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 16)}%`,
              }}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/80 px-3 py-1 rounded">
          <span className="text-green-500">● 1st degree</span>
        </div>
        <div className="absolute top-4 right-4 bg-black/80 px-3 py-1 rounded">
          <span className="text-blue-500">● 2nd degree</span>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-green-950/30 to-transparent border border-green-900/50 rounded-lg text-center"
        >
          <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <p className="text-sm text-vexl-gray-400 mb-2">Direct Network</p>
          <p className="text-4xl font-bold text-green-500">{firstDegree}</p>
          <p className="text-xs text-vexl-gray-500 mt-2">High trust</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-blue-950/30 to-transparent border border-blue-900/50 rounded-lg text-center"
        >
          <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <p className="text-sm text-vexl-gray-400 mb-2">Extended Network</p>
          <p className="text-4xl font-bold text-blue-500">{secondDegree.toLocaleString()}</p>
          <p className="text-xs text-vexl-gray-500 mt-2">Through friends</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-purple-950/30 to-transparent border border-purple-900/50 rounded-lg text-center"
        >
          <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <p className="text-sm text-vexl-gray-400 mb-2">Total Reach</p>
          <p className="text-4xl font-bold text-purple-500">{totalReach.toLocaleString()}</p>
          <p className="text-xs text-vexl-gray-500 mt-2">Potential customers</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-gradient-to-br from-yellow-950/30 to-transparent border border-yellow-900/50 rounded-lg text-center"
        >
          <Briefcase className="w-12 h-12 text-vexl-yellow mx-auto mb-4" />
          <p className="text-sm text-vexl-gray-400 mb-2">vs Traditional Job</p>
          <p className="text-4xl font-bold text-vexl-yellow">1</p>
          <p className="text-xs text-vexl-gray-500 mt-2">Single employer</p>
        </motion.div>
      </div>

      {/* Comparison */}
      <div className="bg-gradient-to-r from-vexl-yellow/20 to-transparent border-l-4 border-vexl-yellow p-8 rounded-r-lg">
        <h4 className="text-2xl font-bold mb-4">The Power of P2P Networks</h4>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h5 className="text-lg font-semibold mb-3 text-red-400">Traditional Employment</h5>
            <ul className="space-y-2 text-vexl-gray-400">
              <li>• 1 employer decides your income</li>
              <li>• Limited by company budget</li>
              <li>• Can be fired anytime</li>
              <li>• Skills underutilized</li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-semibold mb-3 text-green-400">Vexl Network Economy</h5>
            <ul className="space-y-2 text-vexl-gray-400">
              <li>• {totalReach.toLocaleString()} potential customers</li>
              <li>• Multiple income streams</li>
              <li>• Reputation = job security</li>
              <li>• All your skills monetized</li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #000;
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          background: #FFD700;
          cursor: pointer;
          border-radius: 50%;
          border: 2px solid #000;
        }
      `}</style>
    </div>
  )
}