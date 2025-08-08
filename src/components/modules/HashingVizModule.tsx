'use client'
import { useState } from 'react'

export default function HashingVizModule({ inputPlaceholder = 'Enter text...' }: any) {
  const [input, setInput] = useState('')
  const hash = input ? btoa(input).substring(0, 16) + '...' : ''
  
  return (
    <div className="vexl-card p-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={inputPlaceholder}
        className="w-full px-4 py-2 bg-vexl-gray-800 text-white rounded mb-4"
      />
      {hash && (
        <div className="text-center">
          <p className="text-sm text-vexl-gray-400 mb-2">Hashed Output:</p>
          <code className="text-vexl-yellow font-mono">{hash}</code>
        </div>
      )}
    </div>
  )
}