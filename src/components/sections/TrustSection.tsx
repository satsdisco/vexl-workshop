'use client'

import { motion } from 'framer-motion'
import TrustVsRatings from '@/components/TrustVsRatings'

export default function TrustSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h1 
          className="text-6xl md:text-8xl mb-8 leading-tight"
          style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
        >
          <span className="text-vexl-yellow">Trust</span> beats<br />Ratings
        </h1>
        
        <p className="text-xl md:text-2xl text-vexl-gray-400 max-w-3xl mx-auto">
          Ratings create surveillance databases. Real trust creates freedom.
        </p>
      </motion.div>

      {/* Trust vs Ratings Interactive Demo */}
      <TrustVsRatings />

      {/* Key Messages */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-16 grid md:grid-cols-3 gap-6 text-center"
      >
        <div className="vexl-card">
          <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>
            No Fake Reviews
          </h3>
          <p className="text-vexl-gray-400">
            Your friend's recommendation can't be bought or manipulated
          </p>
        </div>
        
        <div className="vexl-card">
          <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>
            No Surveillance
          </h3>
          <p className="text-vexl-gray-400">
            We don't track trades because we don't do ratings
          </p>
        </div>
        
        <div className="vexl-card">
          <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>
            Real Relationships
          </h3>
          <p className="text-vexl-gray-400">
            Every trade strengthens human connections, not algorithms
          </p>
        </div>
      </motion.div>
    </div>
  )
}