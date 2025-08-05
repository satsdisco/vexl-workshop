'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SlideContainerProps {
  children: ReactNode
  isActive: boolean
}

export default function SlideContainer({ children, isActive }: SlideContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        x: isActive ? 0 : -100,
        display: isActive ? 'flex' : 'none'
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="section-container"
    >
      {children}
    </motion.div>
  )
}