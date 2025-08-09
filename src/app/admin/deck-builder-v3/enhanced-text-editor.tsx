import { useState, useEffect } from 'react'
import { Check, X, AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react'

// Enhanced text editor component with better UX
export const EnhancedTextEditor = ({ content, onUpdate, id, onClose }: any) => {
  const [plainText, setPlainText] = useState(content.text || 'Click to edit')
  const [words, setWords] = useState<Array<{text: string, color: string}>>([])
  const [style, setStyle] = useState(content.style || 'body')
  const [align, setAlign] = useState(content.align || 'left')
  const [weight, setWeight] = useState(content.weight || 'normal')
  const [customSize, setCustomSize] = useState(content.customSize || null)
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null)

  // Brand colors
  const brandColors: Record<string, string> = {
    white: '#FFFFFF',
    yellow: '#FCD34D',
    green: '#10B981',
    blue: '#3B82F6',
    gray: '#6B7280',
    red: '#EF4444',
    purple: '#9333EA',
    orange: '#FB923C'
  }

  // Initialize words from content
  useEffect(() => {
    if (content.richText && content.richText.length > 0) {
      setWords(content.richText)
      setPlainText(content.richText.map((w: any) => w.text).join(' '))
    } else if (plainText) {
      const wordArray = plainText.split(' ').filter(w => w.length > 0)
      setWords(wordArray.map(word => ({ text: word, color: 'white' })))
    }
  }, [])

  const handleTextChange = (text: string) => {
    setPlainText(text)
    const wordArray = text.split(' ').filter(w => w.length > 0)
    
    // Preserve existing colors when possible
    const newWords = wordArray.map((word, index) => {
      if (words[index] && words[index].text === word) {
        return words[index] // Keep existing color
      }
      return { text: word, color: 'white' }
    })
    
    setWords(newWords)
  }

  const updateWordColor = (index: number, color: string) => {
    const newWords = [...words]
    newWords[index].color = color
    setWords(newWords)
  }

  const applyChanges = () => {
    onUpdate(id, {
      text: plainText,
      richText: words,
      style,
      align,
      weight,
      customSize
    })
    onClose()
  }

  return (
    <div className="bg-vexl-gray-950 rounded-xl p-6 shadow-2xl border border-vexl-gray-800 max-w-2xl w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Text Editor</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-vexl-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-vexl-gray-400" />
        </button>
      </div>

      {/* Text Input */}
      <div className="mb-6">
        <label className="text-sm text-vexl-gray-400 mb-2 block">Text Content</label>
        <textarea
          value={plainText}
          onChange={(e) => handleTextChange(e.target.value)}
          className="w-full px-4 py-3 bg-vexl-gray-900 text-white rounded-lg resize-none text-base border border-vexl-gray-700 focus:border-vexl-yellow focus:outline-none transition-colors"
          rows={3}
          placeholder="Enter your text..."
          style={{ 
            fontFamily: (style === 'title' || style === 'subtitle') ? 'Monument Extended' : 'inherit'
          }}
        />
      </div>

      {/* Style Controls */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="text-sm text-vexl-gray-400 mb-2 block">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full px-3 py-2 bg-vexl-gray-900 text-white rounded-lg border border-vexl-gray-700 focus:border-vexl-yellow focus:outline-none"
          >
            <option value="title">Title</option>
            <option value="subtitle">Subtitle</option>
            <option value="large">Large</option>
            <option value="body">Body</option>
            <option value="small">Small</option>
            <option value="caption">Caption</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-vexl-gray-400 mb-2 block">Weight</label>
          <select
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 bg-vexl-gray-900 text-white rounded-lg border border-vexl-gray-700 focus:border-vexl-yellow focus:outline-none"
          >
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
            <option value="semibold">Semibold</option>
            <option value="bold">Bold</option>
            <option value="black">Black</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-vexl-gray-400 mb-2 block">Custom Size</label>
          <input
            type="number"
            value={customSize || ''}
            onChange={(e) => setCustomSize(e.target.value ? parseInt(e.target.value) : null)}
            placeholder="Auto"
            className="w-full px-3 py-2 bg-vexl-gray-900 text-white rounded-lg border border-vexl-gray-700 focus:border-vexl-yellow focus:outline-none"
            min="8"
            max="200"
          />
        </div>
      </div>

      {/* Alignment */}
      <div className="mb-6">
        <label className="text-sm text-vexl-gray-400 mb-2 block">Alignment</label>
        <div className="flex gap-2">
          {['left', 'center', 'right'].map((a) => (
            <button
              key={a}
              onClick={() => setAlign(a)}
              className={`flex-1 p-2 rounded-lg transition-colors ${
                align === a
                  ? 'bg-vexl-yellow text-black'
                  : 'bg-vexl-gray-900 text-white hover:bg-vexl-gray-800'
              }`}
            >
              {a === 'left' && <AlignLeft className="w-4 h-4 mx-auto" />}
              {a === 'center' && <AlignCenter className="w-4 h-4 mx-auto" />}
              {a === 'right' && <AlignRight className="w-4 h-4 mx-auto" />}
            </button>
          ))}
        </div>
      </div>

      {/* Word Color Editor */}
      <div className="mb-6">
        <label className="text-sm text-vexl-gray-400 mb-2 block">Color Individual Words</label>
        <div className="bg-vexl-gray-900 p-4 rounded-lg border border-vexl-gray-700">
          <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
            {words.length > 0 ? (
              words.map((word, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedWordIndex(index === selectedWordIndex ? null : index)}
                  className={`px-3 py-1.5 rounded-lg text-base font-medium transition-all hover:scale-105 ${
                    selectedWordIndex === index
                      ? 'ring-2 ring-vexl-yellow ring-offset-2 ring-offset-vexl-gray-900'
                      : 'hover:bg-vexl-gray-800'
                  }`}
                  style={{
                    color: brandColors[word.color] || brandColors.white,
                    backgroundColor: selectedWordIndex === index ? 'rgba(252, 211, 77, 0.1)' : 'transparent'
                  }}
                >
                  {word.text}
                </button>
              ))
            ) : (
              <span className="text-vexl-gray-500">Type some text above to style it</span>
            )}
          </div>

          {/* Color Palette */}
          {selectedWordIndex !== null && words[selectedWordIndex] && (
            <div className="pt-4 border-t border-vexl-gray-800">
              <div className="text-sm text-vexl-gray-400 mb-3">
                Choose color for "{words[selectedWordIndex].text}":
              </div>
              <div className="flex gap-2">
                {Object.entries(brandColors).map(([colorName, colorValue]) => (
                  <button
                    key={colorName}
                    onClick={() => {
                      updateWordColor(selectedWordIndex, colorName)
                      setSelectedWordIndex(null)
                    }}
                    className={`w-10 h-10 rounded-lg border-2 transition-all hover:scale-110 ${
                      words[selectedWordIndex].color === colorName
                        ? 'border-white shadow-lg'
                        : 'border-vexl-gray-700 hover:border-vexl-gray-500'
                    }`}
                    style={{ backgroundColor: colorValue }}
                    title={colorName}
                  >
                    {words[selectedWordIndex].color === colorName && (
                      <Check className="w-5 h-5 mx-auto text-black" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="mb-6">
        <label className="text-sm text-vexl-gray-400 mb-2 block">Preview</label>
        <div className="bg-black p-6 rounded-lg border border-vexl-gray-700 min-h-[100px] flex items-center">
          <div
            className="w-full"
            style={{
              textAlign: align as any,
              fontSize: customSize ? `${customSize}px` : style === 'title' ? '48px' : style === 'subtitle' ? '32px' : '18px',
              fontWeight: weight === 'black' ? 900 : weight === 'bold' ? 700 : weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 400,
              fontFamily: (style === 'title' || style === 'subtitle') ? 'Monument Extended' : 'inherit'
            }}
          >
            {words.map((word, index) => (
              <span
                key={index}
                style={{ color: brandColors[word.color] || brandColors.white }}
              >
                {word.text}{index < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={applyChanges}
          className="flex-1 px-4 py-2.5 bg-vexl-yellow text-black rounded-lg font-semibold hover:bg-vexl-yellow/90 transition-colors"
        >
          Apply Changes
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2.5 bg-vexl-gray-800 text-white rounded-lg font-medium hover:bg-vexl-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}