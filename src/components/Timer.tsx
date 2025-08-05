import { useState, useEffect } from 'react'

interface TimerProps {
  sections: Array<{ id: string; name: string; duration: number }>
  currentSection: number
}

export default function Timer({ sections, currentSection }: TimerProps) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const [sectionTime, setSectionTime] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1)
      setSectionTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setSectionTime(0)
  }, [currentSection])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentSectionDuration = sections[currentSection].duration * 60
  const progress = (sectionTime / currentSectionDuration) * 100

  return (
    <div className="timing-indicator">
      <div className="text-xs text-vexl-gray-600">Total: {formatTime(elapsedTime)}</div>
      <div className="font-bold text-lg">{formatTime(sectionTime)} / {sections[currentSection].duration}min</div>
      <div className="w-32 h-1 bg-vexl-gray-300 mt-2 overflow-hidden">
        <div 
          className="h-full bg-vexl-black transition-all duration-1000"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  )
}