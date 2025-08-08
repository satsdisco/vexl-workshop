'use client'

interface HeadingModuleProps {
  config?: any
  content?: any
}

export default function HeadingModule({ config, content }: HeadingModuleProps) {
  const text = content?.text || 'Add your heading text'
  const subtext = content?.subtext || ''
  const highlightWord = content?.highlightWord || ''
  const size = config?.size || content?.size || 'xl'
  const alignment = config?.alignment || content?.alignment || 'center'

  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  const highlightText = (text: string) => {
    if (!highlightWord) return text
    const parts = text.split(new RegExp(`(${highlightWord})`, 'gi'))
    return parts.map((part, i) => 
      part.toLowerCase() === highlightWord.toLowerCase() 
        ? <span key={i} className="text-vexl-yellow">{part}</span>
        : part
    )
  }

  return (
    <div className={`w-full h-full flex flex-col justify-center p-4 ${alignClasses[alignment as keyof typeof alignClasses]}`}>
      <h1 className={`font-bold text-white mb-2 ${sizeClasses[size as keyof typeof sizeClasses]}`}>
        {highlightText(text)}
      </h1>
      {subtext && (
        <p className="text-lg text-vexl-gray-400">{subtext}</p>
      )}
    </div>
  )
}