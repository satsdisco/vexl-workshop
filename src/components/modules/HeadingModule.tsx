import { motion } from 'framer-motion'

interface HeadingModuleProps {
  text?: string
  subtext?: string
  highlightWord?: string
  config?: {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    alignment?: 'left' | 'center' | 'right'
    animate?: boolean
  }
}

export default function HeadingModule({ 
  text = 'Heading Text', 
  subtext, 
  highlightWord,
  config = {} 
}: HeadingModuleProps) {
  const { size = 'xl', alignment = 'center', animate = true } = config

  const sizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-5xl',
    lg: 'text-5xl md:text-7xl',
    xl: 'text-6xl md:text-8xl'
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  // Highlight specific word if provided
  const renderText = () => {
    if (!highlightWord || !text.includes(highlightWord)) {
      return text
    }

    const parts = text.split(highlightWord)
    return (
      <>
        {parts[0]}
        <span className="text-vexl-yellow relative">
          {highlightWord}
          <span className="absolute bottom-0 left-0 w-full h-2 bg-vexl-yellow"></span>
        </span>
        {parts.slice(1).join(highlightWord)}
      </>
    )
  }

  const content = (
    <div className={`${alignmentClasses[alignment]} w-full`}>
      <h1 
        className={`${sizeClasses[size]} mb-4 leading-tight font-black`}
        style={{ fontFamily: 'Monument Extended, sans-serif' }}
      >
        {renderText()}
      </h1>
      {subtext && (
        <p className="text-lg md:text-xl text-vexl-gray-400">
          {subtext}
        </p>
      )}
    </div>
  )

  if (!animate) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  )
}