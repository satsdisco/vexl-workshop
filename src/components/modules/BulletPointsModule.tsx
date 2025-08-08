import { motion } from 'framer-motion'
import { Check, ChevronRight, Circle } from 'lucide-react'

interface BulletPoint {
  text: string
  subtext?: string
}

interface BulletPointsModuleProps {
  points?: BulletPoint[]
  config?: {
    animated?: boolean
    bulletStyle?: 'bullet' | 'number' | 'check' | 'arrow'
  }
}

export default function BulletPointsModule({ 
  points = [], 
  config = {} 
}: BulletPointsModuleProps) {
  const { animated = true, bulletStyle = 'check' } = config

  const getBulletIcon = (index: number) => {
    switch (bulletStyle) {
      case 'check':
        return <Check className="w-5 h-5 text-vexl-yellow flex-shrink-0 mt-1" />
      case 'arrow':
        return <ChevronRight className="w-5 h-5 text-vexl-yellow flex-shrink-0 mt-1" />
      case 'number':
        return <span className="text-vexl-yellow font-bold mr-2">{index + 1}.</span>
      default:
        return <Circle className="w-2 h-2 text-vexl-yellow flex-shrink-0 mt-2" fill="currentColor" />
    }
  }

  return (
    <div className="space-y-4">
      {points.map((point, index) => (
        <motion.div
          key={index}
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start space-x-3"
        >
          {getBulletIcon(index)}
          <div className="flex-1">
            <p className="text-white text-lg">{point.text}</p>
            {point.subtext && (
              <p className="text-vexl-gray-400 text-sm mt-1">{point.subtext}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}