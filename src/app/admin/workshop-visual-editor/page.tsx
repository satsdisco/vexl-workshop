'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Edit3, Save, Eye, EyeOff, Type, Plus, Trash2,
  ChevronLeft, ChevronRight, Monitor, Smartphone,
  Bold, Italic, AlignLeft, AlignCenter, AlignRight,
  RefreshCw, Layers, Image
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'

// Import actual sections to preview
import dynamic from 'next/dynamic'
const HookSection = dynamic(() => import('@/components/sections/HookSection'))
const PitchSection = dynamic(() => import('@/components/sections/PitchSection'))
const TrustSection = dynamic(() => import('@/components/sections/TrustSection'))
const PrivacySection = dynamic(() => import('@/components/sections/PrivacySection'))
const ProfileSetupSection = dynamic(() => import('@/components/sections/ProfileSetupSection'))
const FindingOffersSection = dynamic(() => import('@/components/sections/FindingOffersSection'))
const ContactTradingSection = dynamic(() => import('@/components/sections/ContactTradingSection'))
const ClubsSection = dynamic(() => import('@/components/sections/ClubsSection'))
const DemoSection = dynamic(() => import('@/components/sections/DemoSection'))
const VisionSection = dynamic(() => import('@/components/sections/VisionSection'))
const GetStartedSection = dynamic(() => import('@/components/sections/GetStartedSection'))
const BetterEditableSection = dynamic(() => import('@/components/sections/BetterEditableSection'))
const AssetLibraryPanel = dynamic(() => import('@/components/AssetLibraryPanel'))

// Section configuration
const SECTIONS = [
  {
    id: 'hookSection',
    name: 'Hook',
    component: HookSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'KYC is killing Bitcoin' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', default: "Every time you upload your ID to buy bitcoin, you're building the surveillance state." },
      { key: 'cta', label: 'Call to Action', type: 'text', default: "There's a better way" },
      { 
        key: 'stats', 
        label: 'Statistics', 
        type: 'array',
        fields: [
          { key: 'value', label: 'Value', type: 'text' },
          { key: 'label', label: 'Label', type: 'text' }
        ],
        default: [
          { id: 'stat1', value: '500M+', label: 'KYC records leaked in crypto exchange hacks' },
          { id: 'stat2', value: '100%', label: 'of your transactions tracked forever' },
          { id: 'stat3', value: '0', label: 'privacy once you\'re in the system' }
        ]
      }
    ]
  },
  {
    id: 'pitchSection',
    name: 'Vexl Pitch',
    component: PitchSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'Your social network.' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: 'With a Bitcoin layer.' },
      { key: 'description', label: 'Description', type: 'textarea', default: "Vexl isn't a marketplace - it's the strongest network that already exists: your phone contacts" },
      {
        key: 'items',
        label: 'Pitch Items',
        type: 'array',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'content', label: 'Content', type: 'textarea' }
        ],
        default: [
          { id: 'what', title: 'What?', content: 'Your existing social network, enhanced with bitcoin trading.' },
          { id: 'why', title: 'Why?', content: 'Bitcoin as Satoshi intended - peer-to-peer, no middlemen.' },
          { id: 'who', title: 'Who?', content: 'Open source, community-funded. Built for humans who value trust.' },
          { id: 'when', title: 'When?', content: 'Available now. Free forever. No KYC because we\'re not a business.' },
          { id: 'where', title: 'Where?', content: 'Wherever people want to trade bitcoin for cash.' },
          { id: 'how', title: 'How?', content: 'Import contacts. Find traders. Build trust.' }
        ]
      }
    ]
  },
  {
    id: 'trustSection',
    name: 'Trust > Ratings',
    component: TrustSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'TRUST BEATS RATINGS' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'Your network is more valuable than stranger reviews' },
      { key: 'mainQuote', label: 'Main Quote', type: 'textarea', default: "Trust isn't a number - it's people you know vouching for people they know" },
      { key: 'question', label: 'Question', type: 'text', default: 'Who would you rather trade with?' }
    ]
  },
  {
    id: 'privacySection',
    name: 'Privacy First',
    component: PrivacySection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'PRIVACY FIRST' },
      { key: 'subtitle', label: 'Subtitle', type: 'textarea', default: 'We refuse to track your trades because we refuse to become a honeypot' },
      { 
        key: 'principles', 
        label: 'Privacy Principles', 
        type: 'array',
        fields: [
          { key: 'icon', label: 'Icon', type: 'text' },
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' }
        ],
        default: [
          { icon: '🔒', title: 'NO SURVEILLANCE BY DESIGN', description: 'Rating systems require tracking every transaction. We chose trust over surveillance.' },
          { icon: '🛡️', title: 'YOUR HISTORY STAYS YOURS', description: 'Your trading history belongs to you, not our database.' },
          { icon: '✓', title: 'VERIFY EVERYTHING', description: 'Open source means you can verify we\'re not tracking you.' }
        ]
      },
      {
        key: 'contactCategories',
        label: 'Contact Import Categories',
        type: 'array',
        fields: [
          { key: 'icon', label: 'Icon', type: 'text' },
          { key: 'name', label: 'Category Name', type: 'text' },
          { key: 'description', label: 'Description', type: 'text' },
          { key: 'count', label: 'Contact Count', type: 'text' }
        ],
        default: [
          { icon: '👥', name: 'Close Friends', description: 'Your inner circle', count: '~5 contacts → 10 network reach' },
          { icon: '🤝', name: 'Acquaintances', description: 'People you know casually', count: '~20 contacts → 60 network reach' },
          { icon: '🛠️', name: 'Service Providers', description: 'Barber, mechanic, cleaner', count: '~15 contacts → 75 network reach' },
          { icon: '🏪', name: 'Local Businesses', description: 'Shops, restaurants, cafes', count: '~25 contacts → 100 network reach' },
          { icon: '🏘️', name: 'Community Groups', description: 'Gym, clubs, meetups', count: '~30 contacts → 180 network reach' }
        ]
      },
      { key: 'warningTitle', label: 'Warning Title', type: 'text', default: 'Limited Network Warning' },
      { key: 'warningMessage', label: 'Warning Message', type: 'textarea', default: 'Only importing close friends severely limits your trading opportunities. Your barber might be the bridge to 50+ bitcoin traders!' }
    ]
  },
  {
    id: 'profileSetupSection',
    name: 'Profile Setup',
    component: ProfileSetupSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'Your profile, your rules' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: 'As private or public as you want' },
      {
        key: 'items',
        label: 'Setup Steps',
        type: 'array',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'content', label: 'Content', type: 'textarea' }
        ],
        default: [
          { id: 'step1', title: 'Choose your identity', content: 'Real name for friends, pseudonym for extended network' },
          { id: 'step2', title: 'Set your preferences', content: 'Buy, sell, or both. Your terms.' },
          { id: 'step3', title: 'Control visibility', content: 'Decide who sees your offers' }
        ]
      }
    ]
  },
  {
    id: 'findingOffersSection',
    name: 'Finding Offers',
    component: FindingOffersSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'Find offers instantly' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: 'From people you can actually trust' },
      {
        key: 'items',
        label: 'Filter Options',
        type: 'array',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'content', label: 'Content', type: 'text' }
        ],
        default: [
          { id: 'filter1', title: '1st degree', content: 'Your direct contacts' },
          { id: 'filter2', title: '2nd degree', content: 'Friends of friends' },
          { id: 'filter3', title: 'Location-based', content: 'Find traders near you' }
        ]
      }
    ]
  },
  {
    id: 'contactTradingSection',
    name: 'Contact Trading',
    component: ContactTradingSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'Trade on your terms' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: "You're in control of every interaction" },
      {
        key: 'items',
        label: 'Features',
        type: 'array',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'content', label: 'Content', type: 'text' }
        ],
        default: [
          { id: 'feature1', title: 'Encrypted chat', content: 'Negotiate privately' },
          { id: 'feature2', title: 'Flexible payments', content: 'Cash, bank transfer, whatever works' },
          { id: 'feature3', title: 'No middleman', content: 'Direct peer-to-peer trades' }
        ]
      }
    ]
  },
  {
    id: 'clubsSection',
    name: 'Vexl Clubs',
    component: ClubsSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'Vexl Clubs' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: 'Extend your network strategically' },
      { key: 'description', label: 'Description', type: 'textarea', default: 'Join communities aligned with your values' },
      {
        key: 'items',
        label: 'Club Types',
        type: 'array',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'content', label: 'Content', type: 'text' }
        ],
        default: [
          { id: 'club1', title: 'Location clubs', content: 'Prague Bitcoiners, Austin Node Runners' },
          { id: 'club2', title: 'Interest clubs', content: 'Privacy Maximalists, Lightning Network' },
          { id: 'club3', title: 'Event clubs', content: 'Conference attendees, Meetup groups' }
        ]
      }
    ]
  },
  {
    id: 'demoSection',
    name: 'Live Demo',
    component: DemoSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'See it in action' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: "Let's do a live demo" },
      { key: 'description', label: 'Description', type: 'textarea', default: 'Watch how easy it is to find and complete a trade' }
    ]
  },
  {
    id: 'visionSection',
    name: 'Vision',
    component: VisionSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'Your network is your net worth' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: 'Build local circular economies' },
      { key: 'description', label: 'Description', type: 'textarea', default: 'Imagine your whole neighborhood trading directly' },
      {
        key: 'items',
        label: 'Vision Points',
        type: 'array',
        fields: [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'content', label: 'Content', type: 'text' }
        ],
        default: [
          { id: 'vision1', title: 'Local first', content: 'Strengthen community bonds through trade' },
          { id: 'vision2', title: 'Circular economy', content: 'Keep value in your community' },
          { id: 'vision3', title: 'Financial sovereignty', content: 'No permission needed to transact' }
        ]
      }
    ]
  },
  {
    id: 'getStartedSection',
    name: 'Get Started',
    component: GetStartedSection,
    fields: [
      { key: 'title', label: 'Main Title', type: 'text', default: 'Ready to join the revolution?' },
      { key: 'subtitle', label: 'Subtitle', type: 'text', default: 'Get Vexl. Import contacts. Start trading.' },
      { key: 'cta', label: 'Call to Action', type: 'text', default: 'Download Vexl' },
      { key: 'description', label: 'Description', type: 'text', default: 'Available on iOS and Android' }
    ]
  }
]

export default function WorkshopVisualEditor() {
  const router = useRouter()
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [editMode, setEditMode] = useState(true)
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop')
  const [sectionContent, setSectionContent] = useState<Record<string, any>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const currentSection = SECTIONS[currentSectionIndex]

  // Load content from CMS
  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/content', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        const contentMap: Record<string, any> = {}
        
        // Handle both array and object responses
        if (Array.isArray(data.content)) {
          data.content.forEach((item: any) => {
            contentMap[item.sectionId] = item.content
          })
        } else if (data.content) {
          // If it's a single object, use it directly
          Object.keys(data.content).forEach(key => {
            contentMap[key] = data.content[key]
          })
        }
        
        setSectionContent(contentMap)
      }
    } catch (error) {
      console.error('Error loading content:', error)
      // Set default content if loading fails
      const defaultContent: Record<string, any> = {}
      SECTIONS.forEach(section => {
        defaultContent[section.id] = {}
        section.fields.forEach(field => {
          defaultContent[section.id][field.key] = field.default
        })
      })
      setSectionContent(defaultContent)
    } finally {
      setLoading(false)
    }
  }

  const updateField = (sectionId: string, key: string, value: any) => {
    setSectionContent(prev => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [key]: value
      }
    }))
    setHasUnsavedChanges(true)
    
    // Auto-save after 1 second of no changes
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    saveTimeoutRef.current = setTimeout(() => {
      saveContent()
    }, 1000)
  }

  const updateArrayItem = (sectionId: string, arrayKey: string, index: number, field: string, value: any) => {
    setSectionContent(prev => {
      const section = prev[sectionId] || {}
      const array = section[arrayKey] || []
      const newArray = [...array]
      
      if (!newArray[index]) {
        newArray[index] = { id: `${arrayKey}_${index}` }
      }
      
      // Preserve the id field
      newArray[index] = {
        ...newArray[index],
        [field]: value
      }
      
      return {
        ...prev,
        [sectionId]: {
          ...section,
          [arrayKey]: newArray
        }
      }
    })
  }

  const addArrayItem = (sectionId: string, arrayKey: string, defaultItem: any) => {
    setSectionContent(prev => {
      const section = prev[sectionId] || {}
      const array = section[arrayKey] || []
      
      return {
        ...prev,
        [sectionId]: {
          ...section,
          [arrayKey]: [...array, defaultItem]
        }
      }
    })
  }

  const removeArrayItem = (sectionId: string, arrayKey: string, index: number) => {
    setSectionContent(prev => {
      const section = prev[sectionId] || {}
      const array = section[arrayKey] || []
      
      return {
        ...prev,
        [sectionId]: {
          ...section,
          [arrayKey]: array.filter((_: any, i: number) => i !== index)
        }
      }
    })
  }

  const saveContent = async () => {
    try {
      setSaving(true)
      
      // Build the complete content object
      const fullContent: Record<string, any> = {}
      
      for (const section of SECTIONS) {
        const content = sectionContent[section.id] || {}
        
        // Merge with defaults
        const sectionData: any = {}
        section.fields.forEach(field => {
          sectionData[field.key] = content[field.key] || field.default
        })
        
        fullContent[section.id] = sectionData
      }
      
      // Save all content at once
      await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        },
        body: JSON.stringify({
          content: fullContent
        })
      })
      
      setHasUnsavedChanges(false)
      
      // Trigger revalidation to update the main site
      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('vexl-admin-token')}`
        }
      })
      
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content')
    } finally {
      setSaving(false)
    }
  }

  const getValue = (sectionId: string, key: string = '', defaultValue: any = {}) => {
    if (key === '') {
      return sectionContent[sectionId] || defaultValue
    }
    return sectionContent[sectionId]?.[key] || defaultValue
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-vexl-black flex items-center justify-center">
        <div className="text-white">Loading content...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-vexl-black flex flex-col">
      {/* Header */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800 px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <VexlLogo />
            <h1 className="text-lg font-bold text-white">Workshop Visual Editor</h1>
            
            {/* Section Tabs */}
            <div className="flex items-center space-x-2">
              {SECTIONS.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSectionIndex(index)}
                  className={`px-3 py-1 rounded text-xs ${
                    index === currentSectionIndex 
                      ? 'bg-vexl-yellow text-black' 
                      : 'bg-vexl-gray-800 text-white hover:bg-vexl-gray-700'
                  }`}
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center space-x-1 px-3 py-1 rounded ${
                editMode ? 'bg-vexl-yellow text-black' : 'bg-vexl-gray-800 text-white'
              }`}
            >
              {editMode ? <Edit3 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="text-sm">{editMode ? 'Editing' : 'Preview'}</span>
            </button>
            
            <button
              onClick={() => setDevicePreview(devicePreview === 'desktop' ? 'mobile' : 'desktop')}
              className="p-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
            >
              {devicePreview === 'desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </button>

            <button
              onClick={loadContent}
              className="p-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <button
              onClick={saveContent}
              disabled={saving || !hasUnsavedChanges}
              className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${
                hasUnsavedChanges 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-vexl-gray-800 text-vexl-gray-400'
              } disabled:opacity-50`}
            >
              <Save className="w-4 h-4" />
              <span className="text-sm">
                {saving ? 'Saving...' : hasUnsavedChanges ? 'Save Changes' : 'Saved'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Asset Library Panel (left) */}
        {editMode && (
          <div className="w-80 bg-vexl-gray-900 border-r border-vexl-gray-800 overflow-hidden">
            <AssetLibraryPanel
              onAddAsset={(asset) => {
                console.log('Add asset:', asset)
                // TODO: Add asset to current section
              }}
            />
          </div>
        )}

        {/* Preview Area */}
        <div className="flex-1 overflow-auto bg-black relative">
          {/* Edit Mode Indicator */}
          {editMode && (
            <div className="absolute top-4 left-4 z-50 bg-vexl-yellow text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              Click any text to edit
            </div>
          )}
          
          <div className={`${devicePreview === 'mobile' ? 'max-w-md mx-auto' : ''} min-h-screen`}>
            {/* Force refresh of section by updating CMS content */}
            <div className="min-h-screen flex items-center justify-center p-8">
              {editMode ? (
                <BetterEditableSection
                  sectionId={currentSection.id}
                  content={getValue(currentSection.id, '', {})}
                  onUpdate={(key, value) => {
                    // Handle nested updates for arrays
                    if (key.includes('.')) {
                      const parts = key.split('.')
                      const field = parts[0]
                      const index = parseInt(parts[1])
                      const subfield = parts[2]
                      
                      if (field === 'stats' || field === 'items') {
                        const current = getValue(currentSection.id, field, [])
                        const updated = [...current]
                        if (!updated[index]) updated[index] = {}
                        updated[index][subfield] = value
                        updateField(currentSection.id, field, updated)
                      }
                    } else {
                      updateField(currentSection.id, key, value)
                    }
                  }}
                  editMode={editMode}
                >
                  <currentSection.component />
                </BetterEditableSection>
              ) : (
                <currentSection.component />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-vexl-gray-900 border-t border-vexl-gray-800 px-4 py-2">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
            disabled={currentSectionIndex === 0}
            className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-vexl-gray-400">
              Section {currentSectionIndex + 1} of {SECTIONS.length}
            </span>
          </div>

          <button
            onClick={() => setCurrentSectionIndex(Math.min(SECTIONS.length - 1, currentSectionIndex + 1))}
            disabled={currentSectionIndex === SECTIONS.length - 1}
            className="flex items-center space-x-1 px-3 py-1 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 disabled:opacity-50"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}