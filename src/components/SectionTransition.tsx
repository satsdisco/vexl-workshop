'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionTransitionProps {
  children: ReactNode
  index: number
}

export default function SectionTransition({ children, index }: SectionTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }}
      viewport={{ once: false, amount: 0.3 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}