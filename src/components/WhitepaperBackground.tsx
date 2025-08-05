'use client'

import { motion } from 'framer-motion'

export default function WhitepaperBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main whitepaper text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2 }}
        className="absolute top-20 left-10 right-10 font-mono text-xs md:text-sm leading-relaxed text-vexl-gray-400"
        style={{ fontFamily: 'Space Mono, monospace' }}
      >
        <div className="max-w-4xl">
          <p className="mb-6 text-base md:text-lg font-bold">
            Bitcoin: A Peer-to-Peer Electronic Cash System
          </p>
          <p className="mb-4">
            A purely peer-to-peer version of electronic cash would allow online
            payments to be sent directly from one party to another without going
            through a financial institution.
          </p>
          <p className="mb-4 opacity-70">
            Digital signatures provide part of the solution, but the main
            benefits are lost if a trusted third party is still required to
            prevent double-spending.
          </p>
          <p className="opacity-50">
            We propose a solution to the double-spending problem using a
            peer-to-peer network. The network timestamps transactions by hashing
            them into an ongoing chain of hash-based proof-of-work...
          </p>
        </div>
      </motion.div>

      {/* Subtle code-like elements */}
      <div className="absolute bottom-10 right-10 font-mono text-xs opacity-5">
        <pre>
{`function verifyTransaction(tx) {
  const hash = sha256(tx);
  return validateSignature(hash);
}`}
        </pre>
      </div>

      {/* ASCII-style decorative elements */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 font-mono text-xs opacity-5">
        <pre>
{`┌─────────────────┐
│ peer-to-peer    │
│ electronic cash │
└─────────────────┘`}
        </pre>
      </div>
    </div>
  )
}