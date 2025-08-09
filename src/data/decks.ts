// Presentation Deck Definitions
// Each deck is a tailored presentation for a specific audience

export interface Deck {
  id: string
  name: string
  description: string
  duration: number // in minutes
  audience: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  slides: string[] // Section IDs to include
  icon: string // emoji or icon name
  color: string // Tailwind color class
  tags: string[]
}

export const decks: Deck[] = [
  {
    id: 'main-workshop',
    name: 'Complete Workshop',
    description: 'The full Vexl experience - comprehensive overview of all features and philosophy',
    duration: 45,
    audience: 'General audience',
    difficulty: 'intermediate',
    slides: [
      'hook', 'pitch', 'trust', 'privacy', 'profile-setup',
      'finding-offers', 'contact-trading', 'clubs', 'demo', 'vision', 'get-started'
    ],
    icon: '🎯',
    color: 'bg-vexl-yellow',
    tags: ['complete', 'workshop', 'comprehensive']
  },
  {
    id: 'technical-deep-dive',
    name: 'Technical Architecture',
    description: 'Deep dive into Vexl\'s P2P architecture, encryption, and privacy features',
    duration: 30,
    audience: 'Developers & Engineers',
    difficulty: 'advanced',
    slides: [
      'hook', 'privacy', 'technical-architecture', 'encryption-deep-dive',
      'p2p-networking', 'security-model', 'api-overview', 'get-started'
    ],
    icon: '🔧',
    color: 'bg-purple-600',
    tags: ['technical', 'developers', 'architecture']
  },
  {
    id: 'beginner-friendly',
    name: 'Bitcoin Basics with Vexl',
    description: 'Introduction to Bitcoin and how Vexl makes it easy and safe',
    duration: 20,
    audience: 'Bitcoin newcomers',
    difficulty: 'beginner',
    slides: [
      'what-is-bitcoin', 'why-privacy-matters', 'pitch', 'simple-demo',
      'getting-started-easy', 'support-resources'
    ],
    icon: '🌱',
    color: 'bg-green-600',
    tags: ['beginner', 'introduction', 'easy']
  },
  {
    id: 'privacy-focused',
    name: 'Privacy & Freedom',
    description: 'Why privacy matters and how Vexl protects your rights',
    duration: 25,
    audience: 'Privacy advocates',
    difficulty: 'intermediate',
    slides: [
      'surveillance-problem', 'privacy', 'no-kyc-philosophy', 'encryption-overview',
      'anonymous-trading', 'trust', 'vision', 'get-started'
    ],
    icon: '🔒',
    color: 'bg-vexl-gray-800',
    tags: ['privacy', 'security', 'freedom']
  },
  {
    id: 'keynote-overview',
    name: 'Executive Summary',
    description: 'Quick 5-minute overview perfect for keynotes and lightning talks',
    duration: 5,
    audience: 'Conference attendees',
    difficulty: 'intermediate',
    slides: [
      'hook', 'pitch', 'trust', 'demo-quick', 'get-started'
    ],
    icon: '⚡',
    color: 'bg-blue-600',
    tags: ['quick', 'keynote', 'lightning']
  },
  {
    id: 'community-builders',
    name: 'Building Local Networks',
    description: 'How to grow Vexl adoption in your local Bitcoin community',
    duration: 30,
    audience: 'Meetup organizers',
    difficulty: 'intermediate',
    slides: [
      'hook', 'pitch', 'trust', 'clubs', 'community-growth',
      'network-effects', 'local-adoption', 'organizing-tips', 'get-started'
    ],
    icon: '🤝',
    color: 'bg-orange-600',
    tags: ['community', 'meetups', 'growth']
  },
  {
    id: 'investor-pitch',
    name: 'Grant & Funding Pitch',
    description: 'Presentation for potential funders and grant committees',
    duration: 15,
    audience: 'Investors & Grant committees',
    difficulty: 'intermediate',
    slides: [
      'hook', 'pitch', 'market-opportunity', 'traction-metrics',
      'roadmap', 'team', 'funding-needs', 'vision'
    ],
    icon: '💰',
    color: 'bg-vexl-yellow',
    tags: ['funding', 'grants', 'investors']
  }
]

// Get deck by ID
export function getDeck(id: string): Deck | undefined {
  return decks.find(deck => deck.id === id)
}

// Get decks by tag
export function getDecksByTag(tag: string): Deck[] {
  return decks.filter(deck => deck.tags.includes(tag))
}

// Get decks by difficulty
export function getDecksByDifficulty(difficulty: Deck['difficulty']): Deck[] {
  return decks.filter(deck => deck.difficulty === difficulty)
}