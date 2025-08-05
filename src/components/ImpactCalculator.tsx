'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Zap } from 'lucide-react'

export default function ImpactCalculator() {
  const [monthlySpending, setMonthlySpending] = useState(1000)
  const [localPercentage, setLocalPercentage] = useState(50)
  const [multiplierEffect, setMultiplierEffect] = useState(0)
  const [jobsCreated, setJobsCreated] = useState(0)
  const [communityWealth, setCommunityWealth] = useState(0)

  useEffect(() => {
    // Calculate multiplier effect (money changes hands 7 times locally vs 1.5 times with banks)
    const localAmount = (monthlySpending * 12 * localPercentage) / 100
    const bankAmount = (monthlySpending * 12 * (100 - localPercentage)) / 100
    
    const localImpact = localAmount * 7
    const bankImpact = bankAmount * 1.5
    
    setMultiplierEffect(Math.round(localImpact))
    
    // Rough calculation: Every $50k in local spending = 1 job
    setJobsCreated(Math.floor(localImpact / 50000))
    
    // Community wealth is the difference between local cycling and bank extraction
    setCommunityWealth(Math.round(localImpact - bankImpact))
  }, [monthlySpending, localPercentage])

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">What If You Kept Your Money Local?</h3>
        <p className="text-vexl-gray-400">See the real impact of spending bitcoin in your community</p>
      </div>

      <div className="space-y-8">
        {/* Monthly Spending Slider */}
        <div className="p-6 bg-vexl-gray-900/50 rounded-lg">
          <label className="block mb-4">
            <span className="text-lg font-semibold">Your Monthly Spending</span>
            <span className="text-3xl font-bold text-vexl-yellow ml-4">${monthlySpending}</span>
          </label>
          <input
            type="range"
            min="100"
            max="5000"
            step="100"
            value={monthlySpending}
            onChange={(e) => setMonthlySpending(Number(e.target.value))}
            className="w-full h-3 bg-vexl-gray-800 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-vexl-gray-500 mt-2">
            <span>$100</span>
            <span>$5,000</span>
          </div>
        </div>

        {/* Local vs Bank Slider */}
        <div className="p-6 bg-vexl-gray-900/50 rounded-lg">
          <label className="block mb-4">
            <span className="text-lg font-semibold">How Much Stays Local?</span>
            <span className="text-3xl font-bold ml-4">
              <span className="text-green-500">{localPercentage}%</span> Local / 
              <span className="text-red-500"> {100 - localPercentage}%</span> Bank
            </span>
          </label>
          <div className="relative">
            <div className="absolute inset-0 flex">
              <div 
                className="bg-green-500/20 rounded-l-lg transition-all"
                style={{ width: `${localPercentage}%` }}
              />
              <div 
                className="bg-red-500/20 rounded-r-lg transition-all"
                style={{ width: `${100 - localPercentage}%` }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={localPercentage}
              onChange={(e) => setLocalPercentage(Number(e.target.value))}
              className="relative w-full h-3 bg-transparent rounded-lg appearance-none cursor-pointer slider z-10"
            />
          </div>
          <div className="flex justify-between text-sm text-vexl-gray-500 mt-2">
            <span>All to Banks</span>
            <span>All Local</span>
          </div>
        </div>

        {/* Impact Visualization */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-6 bg-gradient-to-br from-green-950/30 to-transparent border-2 border-green-900/50 rounded-lg text-center"
          >
            <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-sm text-vexl-gray-400 mb-2">Economic Activity Generated</p>
            <p className="text-4xl font-bold text-green-500">
              ${multiplierEffect.toLocaleString()}
            </p>
            <p className="text-xs text-vexl-gray-500 mt-2">
              Your ${(monthlySpending * 12 * localPercentage / 100).toLocaleString()} circulates 7x
            </p>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            className="p-6 bg-gradient-to-br from-blue-950/30 to-transparent border-2 border-blue-900/50 rounded-lg text-center"
          >
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <p className="text-sm text-vexl-gray-400 mb-2">Local Jobs Supported</p>
            <p className="text-4xl font-bold text-blue-500">
              {jobsCreated}
            </p>
            <p className="text-xs text-vexl-gray-500 mt-2">
              Every $50k = 1 local job
            </p>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="p-6 bg-gradient-to-br from-yellow-950/30 to-transparent border-2 border-yellow-900/50 rounded-lg text-center"
          >
            <Zap className="w-12 h-12 text-vexl-yellow mx-auto mb-4" />
            <p className="text-sm text-vexl-gray-400 mb-2">Community Wealth Created</p>
            <p className="text-4xl font-bold text-vexl-yellow">
              ${communityWealth.toLocaleString()}
            </p>
            <p className="text-xs text-vexl-gray-500 mt-2">
              Stays in your neighborhood
            </p>
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-6 bg-gradient-to-r from-vexl-yellow/20 to-transparent border-l-4 border-vexl-yellow">
          <h4 className="text-xl font-bold mb-2">This Could Be Your Impact!</h4>
          <p className="text-vexl-gray-400 mb-4">
            Imagine if 100 people in your community did this. That's{' '}
            <span className="text-vexl-yellow font-bold">
              ${(multiplierEffect * 100).toLocaleString()}
            </span>{' '}
            in local economic activity!
          </p>
          <button className="px-6 py-3 bg-vexl-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-all">
            Start Trading Locally with Vexl →
          </button>
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