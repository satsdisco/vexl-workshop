import VexlLogo from '@/components/VexlLogo'
import { motion } from 'framer-motion'
import { Play, Smartphone, MessageCircle, Shield } from 'lucide-react'
import Image from 'next/image'

export default function QuickDemoSection() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-12">
        <VexlLogo className="w-32 h-auto mx-auto mb-6" />
        <h2 className="text-4xl md:text-6xl mb-4" style={{ 
          fontFamily: 'Monument Extended', 
          fontWeight: 900,
          color: '#FFFFFF'
        }}>
          QUICK DEMO
        </h2>
        <p className="text-xl text-vexl-gray-300">
          See Vexl in action - 3 minute walkthrough
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center p-6 bg-vexl-gray-900 rounded-xl border border-vexl-gray-800"
        >
          <Smartphone className="w-12 h-12 text-vexl-yellow mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">1. Open App</h3>
          <p className="text-vexl-gray-400">
            Download and open Vexl on your phone
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center p-6 bg-vexl-gray-900 rounded-xl border border-vexl-gray-800"
        >
          <MessageCircle className="w-12 h-12 text-vexl-green mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">2. Find Offers</h3>
          <p className="text-vexl-gray-400">
            Browse offers from your trusted network
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center p-6 bg-vexl-gray-900 rounded-xl border border-vexl-gray-800"
        >
          <Shield className="w-12 h-12 text-vexl-blue mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">3. Trade Safely</h3>
          <p className="text-vexl-gray-400">
            Complete your trade with privacy and security
          </p>
        </motion.div>
      </div>

      <div className="bg-vexl-gray-900 rounded-2xl p-8 border border-vexl-gray-800">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              Live Demonstration
            </h3>
            <p className="text-vexl-gray-300 mb-6">
              Watch a real-time demonstration of finding and completing a trade on Vexl. 
              No KYC, no surveillance, just pure peer-to-peer Bitcoin trading.
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-vexl-yellow text-black rounded-lg font-semibold hover:bg-vexl-yellow/90 transition-colors">
              <Play className="w-5 h-5" />
              <span>Start Demo</span>
            </button>
          </div>
          <div className="flex-1">
            <div className="aspect-video bg-vexl-gray-800 rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-vexl-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-lg text-vexl-gray-400">
          Ready to try it yourself?
        </p>
        <p className="text-2xl font-bold text-vexl-yellow mt-2">
          Download Vexl Today
        </p>
      </div>
    </div>
  )
}