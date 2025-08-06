import VexlLogo from '@/components/VexlLogo'
import { motion } from 'framer-motion'
import { Heart, Shield, Users } from 'lucide-react'
import Image from 'next/image'
import { useContent } from '@/hooks/useContent'

export default function PitchSection() {
  const { content } = useContent('pitchSection')
  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="text-center mb-16">
        <div className="mb-12">
          <VexlLogo className="w-48 h-auto mx-auto mb-8" />
        </div>
        <h2 className="text-5xl md:text-7xl mb-6" style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}>
          {content.title}<br />
          <span className="text-vexl-yellow">{content.subtitle}</span>
        </h2>
        <p className="text-xl text-vexl-gray-400 max-w-2xl mx-auto">
          {content.description}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
        <div className="space-y-8">
          {content.items?.slice(0, 3).map((item) => (
            <div key={item.id} className="group">
              <h3 className="text-2xl mb-3 flex items-center gap-2" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
                <span className="text-vexl-yellow">→</span> {item.title}
              </h3>
              <p className="text-vexl-gray-400 pl-8">{item.content}</p>
            </div>
          ))}
        </div>
        <div className="space-y-8">
          {content.items?.slice(3, 6).map((item) => (
            <div key={item.id} className="group">
              <h3 className="text-2xl mb-3 flex items-center gap-2" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
                <span className="text-vexl-yellow">→</span> {item.title}
              </h3>
              <p className="text-vexl-gray-400 pl-8">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-6 vexl-card">
          <span className="text-sm text-vexl-gray-500">Available on</span>
          <span className="font-bold text-xl">iOS</span>
          <span className="text-vexl-gray-700">•</span>
          <span className="font-bold text-xl">Android</span>
        </div>
      </div>

      {/* Community Funding Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-16 p-8 bg-gradient-to-br from-vexl-yellow/10 via-transparent to-vexl-yellow/5 rounded-2xl border border-vexl-yellow/30"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-vexl-yellow" />
            <h3 className="text-2xl" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>100% Community Funded</h3>
            <Heart className="w-8 h-8 text-vexl-yellow" />
          </div>
          <p className="text-xl text-vexl-gray-300 mb-6">
            No VCs. No Surveillance. No Compromise.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-6 bg-vexl-gray-900/50 rounded-lg">
            <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Grants → Community</h4>
            <p className="text-sm text-vexl-gray-400">
              Started with HRF & OpenSats grants, now powered by users like you
            </p>
          </div>
          <div className="text-center p-6 bg-vexl-gray-900/50 rounded-lg">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Built by Bitcoiners</h4>
            <p className="text-sm text-vexl-gray-400">
              For Bitcoiners who value privacy and freedom above profits
            </p>
          </div>
          <div className="text-center p-6 bg-vexl-gray-900/50 rounded-lg">
            <Heart className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Your Support Matters</h4>
            <p className="text-sm text-vexl-gray-400">
              Every contribution helps us stay independent and surveillance-free
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-vexl-gray-300 italic">
            "This workshop exists because of donations from people like you"
          </p>
        </div>
      </motion.div>
    </div>
  )
}