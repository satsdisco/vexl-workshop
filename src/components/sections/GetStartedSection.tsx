'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import QRCode from 'qrcode'
import SupportMission from '@/components/SupportMission'

export default function GetStartedSection() {
  const [showIOSQR, setShowIOSQR] = useState(false)
  const [showAndroidQR, setShowAndroidQR] = useState(false)
  const [iosQR, setIosQR] = useState('')
  const [androidQR, setAndroidQR] = useState('')
  const [activeTab, setActiveTab] = useState<'start' | 'support'>('start')

  useEffect(() => {
    // Generate QR codes for app store links
    QRCode.toDataURL('https://apps.apple.com/app/vexl/id1627832822', {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then(setIosQR)

    QRCode.toDataURL('https://play.google.com/store/apps/details?id=it.vexl.next', {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then(setAndroidQR)
  }, [])

  const tabs = [
    { id: 'start', label: 'Get Started', icon: '🚀' },
    { id: 'support', label: 'Support Mission', icon: '❤️' },
  ]

  return (
    <div className="max-w-6xl mx-auto h-full flex flex-col">
      {/* Tab Navigation */}
      <div className="flex justify-center gap-4 mb-8">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id as 'start' | 'support')}
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

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'start' ? (
          <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl mb-12"
            style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
          >
            Ready to go <span className="text-vexl-yellow">No-KYC</span>?
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 mb-12"
          >
            <div className="vexl-card">
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 16.97 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <h3 className="text-2xl font-bold">iOS</h3>
              </div>
              <button
                onClick={() => setShowIOSQR(!showIOSQR)}
                className="w-full vexl-button mb-4"
              >
                {showIOSQR ? 'Hide' : 'Show'} QR Code
              </button>
              {showIOSQR && iosQR && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-4"
                >
                  <img src={iosQR} alt="Download Vexl for iOS" className="w-full" />
                </motion.div>
              )}
            </div>

            <div className="vexl-card">
              <div className="flex items-center justify-center gap-3 mb-6">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <h3 className="text-2xl font-bold">Android</h3>
              </div>
              <button
                onClick={() => setShowAndroidQR(!showAndroidQR)}
                className="w-full vexl-button mb-4"
              >
                {showAndroidQR ? 'Hide' : 'Show'} QR Code
              </button>
              {showAndroidQR && androidQR && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-4"
                >
                  <img src={androidQR} alt="Download Vexl for Android" className="w-full" />
                </motion.div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <h3 className="text-3xl mb-8" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>Bitcoin as Satoshi <span className="text-vexl-yellow">Intended</span></h3>
            <div className="grid md:grid-cols-4 gap-6 text-left">
              {[
                { icon: "📱", title: "Install", desc: "No signup required" },
                { icon: "👥", title: "Add Contacts", desc: "Build your network" },
                { icon: "💱", title: "Create Offer", desc: "Buy or sell Bitcoin" },
                { icon: "🤝", title: "Trade", desc: "Meet & exchange" }
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="vexl-card text-center"
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h4 className="font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-vexl-gray-400">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Open Source Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16 bg-vexl-gray-900 p-8 border border-vexl-gray-800"
          >
            <h3 className="text-2xl mb-6" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
              This is Bitcoin, Not <span className="text-red-400">Fintech</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-3 text-vexl-yellow">What We Are:</h4>
                <ul className="space-y-2 text-vexl-gray-300">
                  <li>• Peer-to-peer, no middlemen</li>
                  <li>• Open source, verifiable</li>
                  <li>• Community-funded</li>
                  <li>• Privacy-first by design</li>
                  <li>• No tracking, no surveillance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-red-400">What We're Not:</h4>
                <ul className="space-y-2 text-vexl-gray-300">
                  <li>• Not a business extracting data</li>
                  <li>• Not tracking your transactions</li>
                  <li>• Not building reputation scores</li>
                  <li>• Not selling to VCs</li>
                  <li>• Not another fintech app</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 text-center">
              <a 
                href="https://github.com/vexl-it/vexl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-vexl-yellow hover:underline"
              >
                <span>Verify Everything on GitHub</span>
                <span>→</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-8"
          >
            <h3 className="text-3xl" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>Join the Revolution</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="https://t.me/vexl"
                target="_blank"
                rel="noopener noreferrer"
                className="vexl-button"
              >
                Join Telegram
              </a>
              <a
                href="https://vexl.it"
                target="_blank"
                rel="noopener noreferrer"
                className="vexl-button"
              >
                Visit Website
              </a>
              <button className="vexl-button">
                Become Ambassador
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-12 p-6 border-2 border-vexl-yellow"
          >
            <h4 className="text-2xl font-bold mb-6">Workshop Success Kit</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 bg-vexl-gray-900 hover:bg-vexl-gray-800 transition-colors">
                <span className="text-2xl mb-2 block">📊</span>
                <span className="text-sm">Slide Deck</span>
              </button>
              <button className="p-4 bg-vexl-gray-900 hover:bg-vexl-gray-800 transition-colors">
                <span className="text-2xl mb-2 block">🎥</span>
                <span className="text-sm">Demo Videos</span>
              </button>
              <button className="p-4 bg-vexl-gray-900 hover:bg-vexl-gray-800 transition-colors">
                <span className="text-2xl mb-2 block">📖</span>
                <span className="text-sm">Speaker Notes</span>
              </button>
              <button className="p-4 bg-vexl-gray-900 hover:bg-vexl-gray-800 transition-colors">
                <span className="text-2xl mb-2 block">💬</span>
                <span className="text-sm">Get Support</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12"
          >
            <p className="text-2xl text-vexl-gray-400 mb-4">
              Every person you onboard makes the network stronger.
            </p>
            <p className="text-3xl font-bold">
              Let's build the future of <span className="text-vexl-yellow">Bitcoin</span> together.
            </p>
          </motion.div>
          </div>
        ) : (
          <SupportMission />
        )}
      </div>
    </div>
  )
}