'use client'

import { motion } from 'framer-motion'

interface AsciiDividerProps {
  variant?: 'horizontal' | 'vertical'
  message?: string
  className?: string
}

export default function AsciiDivider({ variant = 'horizontal', message, className = '' }: AsciiDividerProps) {
  if (variant === 'horizontal') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`font-mono text-xs text-vexl-gray-700 overflow-hidden whitespace-nowrap ${className}`}
        style={{ fontFamily: 'Space Mono, monospace' }}
      >
        <div className="animate-pulse">
          {message ? (
            `\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 [ ${message} ] \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550`
          ) : (
            '\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550'
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`font-mono text-xs text-vexl-gray-700 ${className}`}
      style={{ fontFamily: 'Space Mono, monospace' }}
    >
      <pre className="animate-pulse">
{`│
│
│`}
      </pre>
    </motion.div>
  )
}