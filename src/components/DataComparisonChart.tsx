'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function DataComparisonChart() {
  const dataPoints = [
    { item: 'Your email address', ratings: true, vexl: false },
    { item: 'Your full name', ratings: true, vexl: false },
    { item: 'Your ID/passport', ratings: true, vexl: false },
    { item: 'Every transaction amount', ratings: true, vexl: false },
    { item: 'Transaction history', ratings: true, vexl: false },
    { item: 'Who you trade with', ratings: true, vexl: false },
    { item: 'Your location data', ratings: true, vexl: false },
    { item: 'Your trading patterns', ratings: true, vexl: false },
    { item: 'Your review history', ratings: true, vexl: false },
    { item: 'Your bank details', ratings: true, vexl: false },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h4 className="text-2xl text-center mb-8" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
        What They Collect vs What We <span className="text-vexl-yellow">Don't</span>
      </h4>
      
      <div className="bg-vexl-gray-900 rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 border-b border-vexl-gray-800">
          <div className="p-4">
            <h5 className="font-bold text-vexl-gray-400">Data Collected</h5>
          </div>
          <div className="p-4 text-center border-x border-vexl-gray-800">
            <h5 className="font-bold text-red-400">Rating Platforms</h5>
          </div>
          <div className="p-4 text-center">
            <h5 className="font-bold text-green-400">Vexl</h5>
          </div>
        </div>
        
        {dataPoints.map((point, index) => (
          <motion.div
            key={point.item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="grid grid-cols-3 border-b border-vexl-gray-800 hover:bg-vexl-gray-800/50 transition-colors"
          >
            <div className="p-4">
              <span className="text-vexl-gray-300">{point.item}</span>
            </div>
            <div className="p-4 text-center border-x border-vexl-gray-800">
              {point.ratings ? (
                <Check className="w-5 h-5 text-red-400 mx-auto" />
              ) : (
                <X className="w-5 h-5 text-green-400 mx-auto" />
              )}
            </div>
            <div className="p-4 text-center">
              {point.vexl ? (
                <Check className="w-5 h-5 text-red-400 mx-auto" />
              ) : (
                <X className="w-5 h-5 text-green-400 mx-auto" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-center"
      >
        <p className="text-lg text-vexl-gray-300 italic">
          "We can't become a honeypot if we don't collect the honey"
        </p>
        <a 
          href="https://github.com/vexl-it/vexl"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 text-vexl-yellow hover:underline"
        >
          <span>Verify on GitHub</span>
          <span>→</span>
        </a>
      </motion.div>
    </div>
  )
}