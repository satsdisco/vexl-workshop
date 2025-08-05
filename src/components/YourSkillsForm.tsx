'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Plus, Sparkles, CheckCircle } from 'lucide-react'

interface SkillCategory {
  id: string
  name: string
  icon: string
  skills: string[]
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'professional',
    name: 'Professional Services',
    icon: '💼',
    skills: ['Web Development', 'Graphic Design', 'Accounting', 'Legal Advice', 'Marketing', 'Translation', 'Writing', 'Photography']
  },
  {
    id: 'trades',
    name: 'Skilled Trades',
    icon: '🔧',
    skills: ['Plumbing', 'Electrical', 'Carpentry', 'Auto Repair', 'HVAC', 'Painting', 'Landscaping', 'Welding']
  },
  {
    id: 'services',
    name: 'Personal Services',
    icon: '🤝',
    skills: ['Dog Walking', 'House Sitting', 'Tutoring', 'Personal Training', 'Hair Styling', 'Cleaning', 'Babysitting', 'Elder Care']
  },
  {
    id: 'creative',
    name: 'Creative & Crafts',
    icon: '🎨',
    skills: ['Music Lessons', 'Art Classes', 'Jewelry Making', 'Sewing', 'Woodworking', 'Pottery', 'Baking', 'Brewing']
  },
  {
    id: 'goods',
    name: 'Homemade Goods',
    icon: '🥖',
    skills: ['Fresh Bread', 'Garden Vegetables', 'Honey', 'Eggs', 'Preserves', 'Crafts', 'Furniture', 'Clothing']
  },
  {
    id: 'digital',
    name: 'Digital Services',
    icon: '💻',
    skills: ['Social Media', 'Video Editing', 'SEO', 'Data Entry', 'Virtual Assistant', 'Online Teaching', 'Crypto Consulting', 'Tech Support']
  }
]

export default function YourSkillsForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState('')
  const [showResults, setShowResults] = useState(false)

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const addCustomSkill = () => {
    if (customSkill && !selectedSkills.includes(customSkill)) {
      setSelectedSkills([...selectedSkills, customSkill])
      setCustomSkill('')
    }
  }

  const findMatches = () => {
    if (selectedSkills.length > 0) {
      setShowResults(true)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">What Skills Can You Offer?</h3>
        <p className="text-vexl-gray-400">Everyone has something valuable to share</p>
      </div>

      {!showResults ? (
        <>
          {/* Category Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {SKILL_CATEGORIES.map(category => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-vexl-yellow bg-vexl-yellow/10'
                    : 'border-vexl-gray-800 bg-vexl-gray-900/50 hover:border-vexl-gray-600'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-sm font-semibold">{category.name}</div>
              </motion.button>
            ))}
          </div>

          {/* Skills Selection */}
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h4 className="text-xl font-bold mb-4">
                Select your {SKILL_CATEGORIES.find(c => c.id === selectedCategory)?.name.toLowerCase()}:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {SKILL_CATEGORIES.find(c => c.id === selectedCategory)?.skills.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedSkills.includes(skill)
                        ? 'border-vexl-yellow bg-vexl-yellow text-black font-semibold'
                        : 'border-vexl-gray-700 bg-vexl-gray-800 hover:border-vexl-gray-600'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Custom Skill Input */}
          <div className="mb-8 p-6 bg-vexl-gray-900/50 rounded-lg">
            <h4 className="text-lg font-semibold mb-4">Have a unique skill?</h4>
            <div className="flex gap-3">
              <input
                type="text"
                value={customSkill}
                onChange={(e) => setCustomSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomSkill()}
                placeholder="Add your own skill..."
                className="flex-1 px-4 py-3 bg-vexl-gray-800 border border-vexl-gray-700 rounded-lg focus:border-vexl-yellow focus:outline-none"
              />
              <button
                onClick={addCustomSkill}
                className="px-6 py-3 bg-vexl-yellow text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4">Your selected skills:</h4>
              <div className="flex flex-wrap gap-3">
                {selectedSkills.map(skill => (
                  <motion.span
                    key={skill}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-2 bg-vexl-yellow text-black rounded-full font-semibold flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          )}

          {/* Find Matches Button */}
          <div className="text-center">
            <button
              onClick={findMatches}
              disabled={selectedSkills.length === 0}
              className={`px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                selectedSkills.length > 0
                  ? 'bg-vexl-yellow text-black hover:bg-yellow-400 hover:scale-105'
                  : 'bg-vexl-gray-800 text-vexl-gray-500 cursor-not-allowed'
              }`}
            >
              Find People Who Need Your Skills
            </button>
          </div>
        </>
      ) : (
        /* Results Display */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Sparkles className="w-16 h-16 text-vexl-yellow mx-auto mb-6" />
          
          <h3 className="text-3xl font-bold mb-6">Your Skills Are Valuable!</h3>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            <div className="p-6 bg-gradient-to-br from-green-950/30 to-transparent border border-green-900/50 rounded-lg">
              <h4 className="text-6xl font-bold text-green-500 mb-2">127</h4>
              <p className="text-lg font-semibold">People in your network</p>
              <p className="text-sm text-vexl-gray-400">need {selectedSkills[0] || 'your skills'}</p>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-blue-950/30 to-transparent border border-blue-900/50 rounded-lg">
              <h4 className="text-6xl font-bold text-blue-500 mb-2">₿0.5</h4>
              <p className="text-lg font-semibold">Potential monthly income</p>
              <p className="text-sm text-vexl-gray-400">from your {selectedSkills.length} skills</p>
            </div>
          </div>

          <div className="p-6 bg-vexl-gray-900/50 rounded-lg mb-8">
            <h4 className="text-xl font-bold mb-4">Your Next Steps:</h4>
            <ol className="text-left max-w-md mx-auto space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-vexl-yellow font-bold">1.</span>
                <span>Download Vexl and import your contacts</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-vexl-yellow font-bold">2.</span>
                <span>Post your first service offer: "{selectedSkills[0]}"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-vexl-yellow font-bold">3.</span>
                <span>Start earning bitcoin from your community</span>
              </li>
            </ol>
          </div>

          <button
            onClick={() => setShowResults(false)}
            className="px-6 py-3 bg-vexl-gray-800 hover:bg-vexl-gray-700 rounded-lg font-semibold transition-colors"
          >
            Add More Skills
          </button>
        </motion.div>
      )}
    </div>
  )
}