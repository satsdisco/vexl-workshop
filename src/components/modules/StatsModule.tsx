import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Stat {
  value: string
  label: string
  suffix?: string
}

interface StatsModuleProps {
  stats?: Stat[]
  config?: {
    layout?: 'row' | 'column' | 'grid'
    animate?: boolean
  }
}

export default function StatsModule({ 
  stats = [], 
  config = {} 
}: StatsModuleProps) {
  const { layout = 'row', animate = true } = config
  const [isVisible, setIsVisible] = useState(!animate)

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [animate])

  const layoutClasses = {
    row: 'flex flex-row justify-around items-center space-x-8',
    column: 'flex flex-col space-y-6',
    grid: 'grid grid-cols-2 gap-6'
  }

  const AnimatedNumber = ({ value }: { value: string }) => {
    const [displayValue, setDisplayValue] = useState(animate ? '0' : value)
    
    useEffect(() => {
      if (!animate || !isVisible) return
      
      const numericValue = parseInt(value.replace(/\D/g, ''))
      if (isNaN(numericValue)) {
        setDisplayValue(value)
        return
      }

      const duration = 2000
      const steps = 60
      const increment = numericValue / steps
      let current = 0
      
      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.floor(current).toString() + value.replace(/[\d]/g, ''))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }, [value, isVisible])

    return <span>{displayValue}</span>
  }

  return (
    <div className={layoutClasses[layout]}>
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={animate ? { opacity: 0, scale: 0.8 } : {}}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl md:text-6xl font-bold text-vexl-yellow mb-2">
            <AnimatedNumber value={stat.value} />
            {stat.suffix && <span className="text-3xl md:text-5xl ml-1">{stat.suffix}</span>}
          </div>
          <div className="text-lg text-vexl-gray-400">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}