'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Clock, Users, ChevronRight, Play, Download,
  Filter, Search, Sparkles, ArrowLeft, Edit3
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'
import { decks, Deck } from '@/data/decks'

export default function DecksPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  // Get all unique tags
  const allTags = Array.from(new Set(decks.flatMap(deck => deck.tags)))

  // Filter decks
  const filteredDecks = decks.filter(deck => {
    const matchesSearch = deck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          deck.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = selectedDifficulty === 'all' || deck.difficulty === selectedDifficulty
    const matchesTag = selectedTag === 'all' || deck.tags.includes(selectedTag)
    
    return matchesSearch && matchesDifficulty && matchesTag
  })

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <header className="border-b border-vexl-gray-800 bg-vexl-black/50 backdrop-blur-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-vexl-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <VexlLogo />
              <div>
                <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Monument Extended' }}>
                  Presentation Decks
                </h1>
                <p className="text-sm text-vexl-gray-400">Choose the perfect presentation for your audience</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-vexl-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search presentations..."
                className="w-full pl-10 pr-4 py-3 bg-vexl-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
              />
            </div>
          </div>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-4 py-3 bg-vexl-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-3 bg-vexl-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-vexl-yellow"
          >
            <option value="all">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-vexl-gray-900 rounded-lg p-4 border border-vexl-gray-800">
            <div className="text-2xl font-bold text-white mb-1">{decks.length}</div>
            <div className="text-sm text-vexl-gray-400">Total Decks</div>
          </div>
          <div className="bg-vexl-gray-900 rounded-lg p-4 border border-vexl-gray-800">
            <div className="text-2xl font-bold text-vexl-yellow mb-1">11</div>
            <div className="text-sm text-vexl-gray-400">Core Slides</div>
          </div>
          <div className="bg-vexl-gray-900 rounded-lg p-4 border border-vexl-gray-800">
            <div className="text-2xl font-bold text-vexl-green mb-1">5-45</div>
            <div className="text-sm text-vexl-gray-400">Minutes Range</div>
          </div>
          <div className="bg-vexl-gray-900 rounded-lg p-4 border border-vexl-gray-800">
            <div className="text-2xl font-bold text-vexl-blue mb-1">100%</div>
            <div className="text-sm text-vexl-gray-400">Customizable</div>
          </div>
        </div>

        {/* Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecks.map((deck, index) => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group"
            >
              <div className="bg-vexl-gray-900 rounded-xl border-2 border-vexl-gray-800 hover:border-vexl-yellow transition-all overflow-hidden h-full flex flex-col">
                {/* Deck Header */}
                <div className={`${deck.color} p-6 relative`}>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/50" />
                  <div className="relative">
                    <div className="text-4xl mb-2">{deck.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: 'Monument Extended' }}>
                      {deck.name}
                    </h3>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {deck.duration} min
                      </span>
                      <span className="px-2 py-0.5 bg-black/30 rounded-full">
                        {deck.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Deck Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-vexl-gray-300 mb-4">
                    {deck.description}
                  </p>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-vexl-gray-400 mb-2">
                      <Users className="w-4 h-4" />
                      <span>{deck.audience}</span>
                    </div>
                    <div className="text-sm text-vexl-gray-500">
                      {deck.slides.length} slides
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                    {deck.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-vexl-gray-800 text-vexl-gray-300 text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/workshop?deck=${deck.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-vexl-yellow text-black rounded-lg hover:bg-vexl-yellow/90 transition-colors font-semibold"
                    >
                      <Play className="w-4 h-4" />
                      <span>Present</span>
                    </Link>
                    <Link
                      href={`/admin/deck-builder-v3?edit=${deck.id}`}
                      className="flex items-center justify-center p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      title="Edit Deck"
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <button
                      className="flex items-center justify-center p-2 bg-vexl-gray-800 text-white rounded-lg hover:bg-vexl-gray-700 transition-colors"
                      title="Export as PDF"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDecks.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="w-16 h-16 text-vexl-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No decks found</h3>
            <p className="text-vexl-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  )
}