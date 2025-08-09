import VexlLogo from '@/components/VexlLogo'
import { motion } from 'framer-motion'
import { Users, TrendingUp, Globe, Heart, Sparkles, Network } from 'lucide-react'
import LocalNetworkMap from '@/components/LocalNetworkMap'
import NetworkEffectCalculator from '@/components/NetworkEffectCalculator'

export default function CommunityGrowthSection() {
  return (
    <div className="max-w-6xl mx-auto w-full">
      <div className="text-center mb-12">
        <VexlLogo className="w-32 h-auto mx-auto mb-6" />
        <h2 className="text-4xl md:text-6xl mb-4" style={{ 
          fontFamily: 'Monument Extended', 
          fontWeight: 900,
          color: '#FFFFFF'
        }}>
          COMMUNITY GROWTH
        </h2>
        <p className="text-xl text-vexl-gray-300">
          How Vexl spreads through real connections
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Growth Principles */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-4">Growth Principles</h3>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-start space-x-4 p-4 bg-vexl-gray-900 rounded-lg"
          >
            <Users className="w-8 h-8 text-vexl-yellow mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Person to Person</h4>
              <p className="text-vexl-gray-400">
                Every new user brings their entire contact network
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-start space-x-4 p-4 bg-vexl-gray-900 rounded-lg"
          >
            <TrendingUp className="w-8 h-8 text-vexl-green mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Exponential Effect</h4>
              <p className="text-vexl-gray-400">
                10 users → 1,500 connections → 225,000 second-degree
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-start space-x-4 p-4 bg-vexl-gray-900 rounded-lg"
          >
            <Heart className="w-8 h-8 text-red-500 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Trust-Based Adoption</h4>
              <p className="text-vexl-gray-400">
                People join because their friends recommend it
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-start space-x-4 p-4 bg-vexl-gray-900 rounded-lg"
          >
            <Globe className="w-8 h-8 text-vexl-blue mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">Local First</h4>
              <p className="text-vexl-gray-400">
                Start with your neighborhood, expand naturally
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interactive Network Map */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">Your Local Network</h3>
          <div className="bg-vexl-gray-900 rounded-xl p-6 h-[400px]">
            <LocalNetworkMap />
          </div>
        </div>
      </div>

      {/* Network Effect Calculator */}
      <div className="bg-gradient-to-br from-vexl-gray-900 to-vexl-black rounded-xl p-8 border border-vexl-gray-800">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Calculate Your Network Impact
        </h3>
        <NetworkEffectCalculator />
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Sparkles className="w-12 h-12 text-vexl-yellow mx-auto mb-4" />
          <p className="text-xl text-white mb-2">
            Every connection counts
          </p>
          <p className="text-2xl font-bold text-vexl-yellow">
            Start growing your network today
          </p>
        </motion.div>
      </div>
    </div>
  )
}