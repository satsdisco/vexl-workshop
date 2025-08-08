interface ParagraphModuleProps {
  text?: string
  config?: {
    fontSize?: 'sm' | 'base' | 'lg' | 'xl'
    columns?: number
  }
}

export default function ParagraphModule({ 
  text = 'Enter your paragraph text here...', 
  config = {} 
}: ParagraphModuleProps) {
  const { fontSize = 'base', columns = 1 } = config

  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const columnClasses = {
    1: '',
    2: 'md:columns-2 gap-8',
    3: 'md:columns-3 gap-8'
  }

  return (
    <p className={`${sizeClasses[fontSize]} ${columnClasses[columns]} text-vexl-gray-300 leading-relaxed`}>
      {text}
    </p>
  )
}