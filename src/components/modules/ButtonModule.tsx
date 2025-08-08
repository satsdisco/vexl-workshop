'use client'

interface ButtonModuleProps {
  config?: any
  content?: any
}

export default function ButtonModule({ config, content }: ButtonModuleProps) {
  const text = content?.text || 'Click Here'
  const url = content?.url || '#'
  const style = config?.style || content?.style || 'primary'

  const styleClasses = {
    primary: 'bg-vexl-yellow text-black hover:bg-vexl-yellow/90',
    secondary: 'bg-vexl-gray-800 text-white hover:bg-vexl-gray-700',
    outline: 'border-2 border-vexl-yellow text-vexl-yellow hover:bg-vexl-yellow hover:text-black'
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <button
        onClick={() => url !== '#' && window.open(url, '_blank')}
        className={`px-8 py-4 font-bold rounded-lg transition-all transform hover:scale-105 ${styleClasses[style as keyof typeof styleClasses]}`}
      >
        {text}
      </button>
    </div>
  )
}