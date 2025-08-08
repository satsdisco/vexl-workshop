import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

interface ButtonModuleProps {
  text?: string
  url?: string
  config?: {
    style?: 'primary' | 'secondary' | 'outline'
    size?: 'small' | 'medium' | 'large'
    fullWidth?: boolean
  }
}

export default function ButtonModule({ 
  text = 'Click Here', 
  url = '#',
  config = {} 
}: ButtonModuleProps) {
  const { style = 'primary', size = 'large', fullWidth = false } = config

  const styleClasses = {
    primary: 'bg-vexl-yellow text-black hover:bg-vexl-yellow/90',
    secondary: 'bg-vexl-gray-800 text-white hover:bg-vexl-gray-700',
    outline: 'border-2 border-vexl-yellow text-vexl-yellow hover:bg-vexl-yellow hover:text-black'
  }

  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }

  const handleClick = () => {
    if (url.startsWith('http')) {
      window.open(url, '_blank')
    } else {
      window.location.href = url
    }
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        ${styleClasses[style]} 
        ${sizeClasses[size]} 
        ${fullWidth ? 'w-full' : ''} 
        rounded-lg font-bold transition-colors flex items-center justify-center space-x-2
      `}
    >
      <span>{text}</span>
      {url.startsWith('http') && <ExternalLink className="w-4 h-4" />}
    </motion.button>
  )
}