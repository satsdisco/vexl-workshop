'use client'

interface ParagraphModuleProps {
  config?: any
  content?: any
}

export default function ParagraphModule({ config, content }: ParagraphModuleProps) {
  const text = content?.text || 'Add your paragraph text here. You can write multiple lines of content that will be displayed beautifully.'
  const fontSize = config?.fontSize || content?.fontSize || 'base'

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <p className={`text-white leading-relaxed ${sizeClasses[fontSize as keyof typeof sizeClasses]}`}>
        {text}
      </p>
    </div>
  )
}