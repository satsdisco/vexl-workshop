'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Users, Shield, QrCode, CheckCircle, Calendar, MapPin, GraduationCap, Building2 } from 'lucide-react'
import PhoneMockup from '@/components/PhoneMockup'

export default function ClubsSection() {
  const [activeTab, setActiveTab] = useState<'what' | 'how' | 'perfect'>('what')

  const tabs = [
    { id: 'what', label: 'What Are Clubs?', icon: Users },
    { id: 'how', label: 'How Clubs Work', icon: Shield },
    { id: 'perfect', label: 'Perfect For', icon: CheckCircle },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl text-center mb-4"
        style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
      >
        Introducing <span className="text-vexl-yellow">Vexl Clubs</span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl text-center text-vexl-gray-400 mb-12 max-w-3xl mx-auto"
      >
        Private Groups for New Bitcoiners & Local Communities
      </motion.p>

      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-12">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id as 'what' | 'how' | 'perfect')}
              className={`px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-vexl-yellow text-black'
                  : 'bg-vexl-gray-900 hover:bg-vexl-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'what' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Visual representation */}
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative mx-auto w-80 h-80"
                >
                  {/* Avatar circle formation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {[2, 3, 4, 5, 6, 7, 8, 9].map((avatarNum, i) => {
                        const angle = (i * 45) * Math.PI / 180
                        const radius = 120
                        const x = Math.cos(angle) * radius + 160
                        const y = Math.sin(angle) * radius + 160
                        
                        return (
                          <motion.div
                            key={i}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                            className="absolute w-20 h-20 bg-vexl-gray-800 rounded-full flex items-center justify-center border-2 border-vexl-yellow/30 overflow-hidden"
                            style={{ left: x - 40, top: y - 40 }}
                          >
                            <Image
                              src={`/avatars/avatar${avatarNum}.svg`}
                              alt={`Avatar ${avatarNum}`}
                              width={60}
                              height={60}
                              className="object-cover"
                            />
                          </motion.div>
                        )
                      })}
                      {/* Center club icon */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-vexl-yellow rounded-full flex items-center justify-center"
                      >
                        <Shield className="w-12 h-12 text-black" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Club interface mockup */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8"
                >
                  <PhoneMockup 
                    imageSrc="/screenshots/club-interface.png"
                    imageAlt="Club interface"
                  />
                </motion.div>
              </div>

              {/* Key points */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-vexl-gray-900 p-3 rounded-lg">
                    <Shield className="w-6 h-6 text-vexl-yellow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Private groups within Vexl</h3>
                    <p className="text-vexl-gray-400">Curated communities with shared trust and values</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-vexl-gray-900 p-3 rounded-lg">
                    <QrCode className="w-6 h-6 text-vexl-yellow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Invite-only entry</h3>
                    <p className="text-vexl-gray-400">Join via QR codes or direct invites from members</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-vexl-gray-900 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-vexl-yellow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Perfect for users with few contacts</h3>
                    <p className="text-vexl-gray-400">Bootstrap your network without compromising privacy</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-vexl-gray-900 p-3 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-vexl-yellow" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Privacy-conscious onboarding</h3>
                    <p className="text-vexl-gray-400">Trade within trusted groups while building direct connections</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'how' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="space-y-12">
              {/* Step-by-step flow */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    step: 1,
                    title: "Join via QR/invite",
                    desc: "Scan club QR code or receive direct invite",
                    image: "/screenshots/club-join-qr.png"
                  },
                  {
                    step: 2,
                    title: "Moderator approval",
                    desc: "Verified by trusted community members",
                    image: "/screenshots/club-moderator-approval.png"
                  },
                  {
                    step: 3,
                    title: "Trade within club",
                    desc: "Access offers from all club members",
                    image: "/screenshots/club-trading.png"
                  },
                  {
                    step: 4,
                    title: "Graduate to direct connections",
                    desc: "Build your personal network over time",
                    image: "/screenshots/club-graduate.png"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="relative"
                  >
                    {/* Step number */}
                    <div className="absolute -top-4 -left-4 bg-vexl-yellow text-black w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl z-10">
                      {item.step}
                    </div>
                    
                    <div className="bg-vexl-gray-900 border border-vexl-gray-800 p-6 rounded-lg h-full">
                      <PhoneMockup 
                        imageSrc={item.image}
                        imageAlt={item.title}
                        className="mb-4 transform scale-75"
                      />
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-vexl-gray-400">{item.desc}</p>
                    </div>

                    {/* Arrow between steps */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <span className="text-vexl-yellow text-2xl">→</span>
                        </motion.div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Key messaging */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center bg-gradient-to-r from-vexl-yellow/10 to-transparent border-l-4 border-vexl-yellow p-8"
              >
                <h3 className="text-2xl font-bold mb-4">Stepping Stone to Full Vexl Network</h3>
                <p className="text-lg text-vexl-gray-400">
                  Clubs provide a safe environment to learn, trade, and build connections before expanding to the broader network
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'perfect' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Use cases */}
              <div className="space-y-6">
                {[
                  {
                    icon: Building2,
                    title: "Bitcoin meetups",
                    desc: "Perfect for local Bitcoin conferences and regular gatherings",
                    color: "bg-orange-900/20 border-orange-900/50"
                  },
                  {
                    icon: MapPin,
                    title: "Local communities",
                    desc: "Neighborhood groups building circular Bitcoin economies",
                    color: "bg-blue-900/20 border-blue-900/50"
                  },
                  {
                    icon: GraduationCap,
                    title: "New user onboarding",
                    desc: "Gentle introduction for those starting their Bitcoin journey",
                    color: "bg-green-900/20 border-green-900/50"
                  },
                  {
                    icon: Calendar,
                    title: "Event-based trading",
                    desc: "Temporary clubs for conferences, workshops, or gatherings",
                    color: "bg-purple-900/20 border-purple-900/50"
                  }
                ].map((useCase, index) => {
                  const Icon = useCase.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-6 border-2 rounded-lg ${useCase.color} cursor-pointer transition-all`}
                    >
                      <div className="flex items-start gap-4">
                        <Icon className="w-8 h-8 text-vexl-yellow mt-1" />
                        <div>
                          <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                          <p className="text-vexl-gray-400">{useCase.desc}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Security emphasis */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-vexl-gray-900 border-2 border-vexl-yellow/30 p-8 rounded-none h-fit"
              >
                <h3 className="text-2xl font-bold mb-6">Managed Groups = Maximum Security</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-lg">No spam or unwanted contacts</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-lg">Verified members only</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-lg">Community moderation</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-lg">Transparent entry requirements</span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 p-4 bg-vexl-yellow/10 border border-vexl-yellow/30 rounded-lg"
                >
                  <p className="text-center font-semibold">
                    "I can start a club for our local Bitcoin meetup!"
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom messaging */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-12 text-center space-y-4"
      >
        <p className="text-2xl font-bold">
          Clubs <span className="text-vexl-yellow">bootstrap trust</span> and <span className="text-vexl-yellow">liquidity</span>
        </p>
        <p className="text-lg text-vexl-gray-400">
          Graduate from club to full network • Opening space for others by moving to direct connections
        </p>
      </motion.div>
    </div>
  )
}