'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DollarSign, Bitcoin } from 'lucide-react'

export default function CircularEconomyViz() {
  const [moneyLeaving, setMoneyLeaving] = useState(0)
  const [moneyStaying, setMoneyStaying] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setMoneyLeaving(prev => prev + Math.floor(Math.random() * 1000) + 500)
        setMoneyStaying(prev => prev + Math.floor(Math.random() * 1000) + 500)
      }, 100)
      
      return () => clearInterval(interval)
    }
  }, [isAnimating])

  const startAnimation = () => {
    setMoneyLeaving(0)
    setMoneyStaying(0)
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 10000)
  }

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Traditional Economy */}
        <div className="relative p-8 bg-gradient-to-br from-red-950/20 to-transparent border-2 border-red-900/50 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6 text-red-400">Traditional Economy</h3>
          
          <div className="relative h-96">
            {/* Bank */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 bg-red-900/50 rounded-full flex items-center justify-center border-2 border-red-600">
                <span className="text-3xl">🏦</span>
              </div>
              <p className="text-center mt-2 text-sm">Bank</p>
            </div>

            {/* Corporation */}
            <div className="absolute bottom-1/3 left-1/4">
              <div className="w-24 h-24 bg-red-900/50 rounded-full flex items-center justify-center border-2 border-red-600">
                <span className="text-3xl">🏢</span>
              </div>
              <p className="text-center mt-2 text-sm">Corporation</p>
            </div>

            {/* Offshore */}
            <div className="absolute bottom-1/3 right-1/4">
              <div className="w-24 h-24 bg-red-900/50 rounded-full flex items-center justify-center border-2 border-red-600">
                <span className="text-3xl">🏝️</span>
              </div>
              <p className="text-center mt-2 text-sm">Offshore</p>
            </div>

            {/* Animated Money Flow */}
            <AnimatePresence>
              {isAnimating && (
                <>
                  <MoneyFlow 
                    from={{ x: '50%', y: '96px' }}
                    to={{ x: '25%', y: '60%' }}
                    color="red"
                    icon={<DollarSign className="w-4 h-4" />}
                  />
                  <MoneyFlow 
                    from={{ x: '25%', y: '60%' }}
                    to={{ x: '75%', y: '60%' }}
                    color="red"
                    icon={<DollarSign className="w-4 h-4" />}
                    delay={0.5}
                  />
                  <MoneyFlow 
                    from={{ x: '75%', y: '60%' }}
                    to={{ x: '100%', y: '20%' }}
                    color="red"
                    icon={<DollarSign className="w-4 h-4" />}
                    delay={1}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 p-4 bg-red-950/30 rounded-lg">
            <p className="text-sm text-red-400 mb-2">Money leaving community:</p>
            <p className="text-3xl font-bold text-red-500">
              ${moneyLeaving.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Vexl Economy */}
        <div className="relative p-8 bg-gradient-to-br from-green-950/20 to-transparent border-2 border-green-900/50 rounded-2xl">
          <h3 className="text-2xl font-bold mb-6 text-green-400">Vexl Economy</h3>
          
          <div className="relative h-96">
            {/* Local Business 1 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 bg-green-900/50 rounded-full flex items-center justify-center border-2 border-green-600">
                <span className="text-3xl">☕</span>
              </div>
              <p className="text-center mt-2 text-sm">Coffee Shop</p>
            </div>

            {/* Neighbor */}
            <div className="absolute bottom-1/3 left-1/4">
              <div className="w-24 h-24 bg-green-900/50 rounded-full flex items-center justify-center border-2 border-green-600">
                <span className="text-3xl">👨‍👩‍👧</span>
              </div>
              <p className="text-center mt-2 text-sm">Neighbor</p>
            </div>

            {/* Local Business 2 */}
            <div className="absolute bottom-1/3 right-1/4">
              <div className="w-24 h-24 bg-green-900/50 rounded-full flex items-center justify-center border-2 border-green-600">
                <span className="text-3xl">🥖</span>
              </div>
              <p className="text-center mt-2 text-sm">Bakery</p>
            </div>

            {/* Animated Bitcoin Flow - Circular */}
            <AnimatePresence>
              {isAnimating && (
                <>
                  <MoneyFlow 
                    from={{ x: '50%', y: '96px' }}
                    to={{ x: '25%', y: '60%' }}
                    color="green"
                    icon={<Bitcoin className="w-4 h-4" />}
                  />
                  <MoneyFlow 
                    from={{ x: '25%', y: '60%' }}
                    to={{ x: '75%', y: '60%' }}
                    color="green"
                    icon={<Bitcoin className="w-4 h-4" />}
                    delay={0.5}
                  />
                  <MoneyFlow 
                    from={{ x: '75%', y: '60%' }}
                    to={{ x: '50%', y: '96px' }}
                    color="green"
                    icon={<Bitcoin className="w-4 h-4" />}
                    delay={1}
                  />
                </>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-8 p-4 bg-green-950/30 rounded-lg">
            <p className="text-sm text-green-400 mb-2">Money cycling locally:</p>
            <p className="text-3xl font-bold text-green-500">
              ${moneyStaying.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={startAnimation}
          disabled={isAnimating}
          className="px-8 py-4 bg-vexl-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnimating ? 'Watching Money Flow...' : 'Start Money Flow Animation'}
        </button>
      </div>
    </div>
  )
}

// Component for animated money flow
function MoneyFlow({ from, to, color, icon, delay = 0 }: any) {
  return (
    <motion.div
      initial={{ 
        left: from.x, 
        top: from.y,
        x: '-50%',
        y: '-50%',
        opacity: 0,
        scale: 0
      }}
      animate={{ 
        left: [from.x, to.x],
        top: [from.y, to.y],
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0]
      }}
      transition={{ 
        duration: 2,
        delay,
        repeat: Infinity,
        repeatDelay: 1
      }}
      className={`absolute w-8 h-8 ${color === 'red' ? 'bg-red-500' : 'bg-green-500'} rounded-full flex items-center justify-center text-white`}
    >
      {icon}
    </motion.div>
  )
}