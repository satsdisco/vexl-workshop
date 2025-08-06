'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'

export default function DataComparisonChart() {
  const dataPoints = [
    { 
      item: 'Government-issued photo ID', 
      details: 'Passport, national ID, driver\'s license',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Live selfie/biometric verification', 
      details: 'Video liveness check, facial recognition',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Full legal name', 
      details: 'As appears on government documents',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Date of birth', 
      details: 'Complete birthdate for identity verification',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Physical address', 
      details: 'Full residential address with postal code',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Proof of address', 
      details: 'Utility bill, bank statement, rental contract',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Phone number', 
      details: 'For 2FA and account recovery',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Email address', 
      details: 'Primary contact and notifications',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Tax ID/Social Security Number', 
      details: 'Required in U.S. and many jurisdictions',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Bank account details', 
      details: 'For fiat deposits/withdrawals',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Every transaction recorded', 
      details: 'Amount, time, parties, purpose',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Device & location fingerprints', 
      details: 'IP address, browser data, GPS location',
      kyc: true, 
      vexl: false 
    },
    { 
      item: 'Behavioral analytics', 
      details: 'Trading patterns, login times, clickstreams',
      kyc: true, 
      vexl: false 
    },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <h4 className="text-2xl text-center mb-8" style={{ fontFamily: 'Monument Extended', fontWeight: 700 }}>
        <span className="text-red-400">KYC: All Your Data</span> vs <span className="text-green-400">Vexl: Zero Data</span>
      </h4>
      
      <div className="bg-vexl-gray-900 rounded-lg overflow-hidden border-2 border-vexl-gray-800">
        <div className="grid grid-cols-12 border-b-2 border-vexl-gray-800 bg-vexl-gray-900/80">
          <div className="col-span-7 p-4">
            <h5 className="font-bold text-vexl-gray-300 text-lg">Data Required</h5>
          </div>
          <div className="col-span-3 p-4 text-center border-x-2 border-vexl-gray-800 bg-red-900/10">
            <h5 className="font-bold text-red-400 text-lg">KYC Exchanges</h5>
            <p className="text-xs text-red-400/70 mt-1">Coinbase, Kraken, Binance, Relai</p>
          </div>
          <div className="col-span-2 p-4 text-center bg-green-900/10">
            <h5 className="font-bold text-green-400 text-lg">Vexl</h5>
          </div>
        </div>
        
        {dataPoints.map((point, index) => (
          <motion.div
            key={point.item}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-12 border-b border-vexl-gray-800 hover:bg-vexl-gray-800/30 transition-colors"
          >
            <div className="col-span-7 p-4">
              <div className="font-medium text-vexl-gray-200">{point.item}</div>
              {point.details && (
                <div className="text-sm text-vexl-gray-500 mt-1">{point.details}</div>
              )}
            </div>
            <div className="col-span-3 p-4 text-center border-x-2 border-vexl-gray-800 bg-red-900/5">
              {point.kyc ? (
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5 text-red-400" />
                  <span className="text-red-400 font-medium">REQUIRED</span>
                </div>
              ) : (
                <X className="w-5 h-5 text-green-400 mx-auto" />
              )}
            </div>
            <div className="col-span-2 p-4 text-center bg-green-900/5">
              {point.vexl ? (
                <Check className="w-5 h-5 text-red-400 mx-auto" />
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <X className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-medium">NONE</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {/* Summary row */}
        <div className="grid grid-cols-12 bg-vexl-gray-800/50">
          <div className="col-span-7 p-4">
            <div className="font-bold text-lg">Total Data Points Collected</div>
          </div>
          <div className="col-span-3 p-4 text-center border-x-2 border-vexl-gray-800 bg-red-900/10">
            <div className="text-2xl font-bold text-red-400">ALL OF IT</div>
          </div>
          <div className="col-span-2 p-4 text-center bg-green-900/10">
            <div className="text-2xl font-bold text-green-400">ZERO</div>
          </div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-8 text-center"
      >
        <p className="text-xl font-bold text-vexl-gray-200">
          KYC exchanges create honeypots of millions of users' complete identities. Vexl creates nothing.
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