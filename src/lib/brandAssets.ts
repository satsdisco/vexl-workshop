// Vexl Brand Assets Library
export interface BrandAsset {
  id: string
  name: string
  category: 'logo' | 'avatar' | 'symbol' | 'screenshot' | 'icon'
  url: string
  description?: string
  width?: number
  height?: number
}

export const brandAssets: BrandAsset[] = [
  // Logos
  {
    id: 'vexl-logo-main',
    name: 'Vexl Logo',
    category: 'logo',
    url: '/vexl-logo.svg',
    description: 'Main Vexl logo'
  },
  {
    id: 'vexl-logo-white',
    name: 'Vexl Logo White',
    category: 'logo',
    url: '/vexl-logo-white.svg',
    description: 'White version of Vexl logo'
  },
  
  // Avatars
  {
    id: 'avatar-1',
    name: 'User Avatar 1',
    category: 'avatar',
    url: '/avatars/avatar1.png',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-2',
    name: 'User Avatar 2',
    category: 'avatar',
    url: '/avatars/avatar2.png',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-3',
    name: 'User Avatar 3',
    category: 'avatar',
    url: '/avatars/avatar3.png',
    description: 'Anonymous user avatar'
  },
  
  // Symbols & Icons
  {
    id: 'bitcoin-symbol',
    name: 'Bitcoin Symbol',
    category: 'symbol',
    url: '/icons/bitcoin.svg',
    description: 'Bitcoin currency symbol'
  },
  {
    id: 'shield-icon',
    name: 'Privacy Shield',
    category: 'symbol',
    url: '/icons/shield.svg',
    description: 'Privacy and security shield'
  },
  {
    id: 'network-icon',
    name: 'Network',
    category: 'symbol',
    url: '/icons/network.svg',
    description: 'Network connection symbol'
  },
  {
    id: 'lock-icon',
    name: 'Lock',
    category: 'symbol',
    url: '/icons/lock.svg',
    description: 'Security lock icon'
  },
  
  // App Screenshots
  {
    id: 'screenshot-chat',
    name: 'Chat Interface',
    category: 'screenshot',
    url: '/screenshots/chat.png',
    description: 'Vexl chat conversation',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-offers',
    name: 'Offers List',
    category: 'screenshot',
    url: '/screenshots/offers.png',
    description: 'Bitcoin offers marketplace',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-profile',
    name: 'Profile Setup',
    category: 'screenshot',
    url: '/screenshots/profile.png',
    description: 'User profile configuration',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-clubs',
    name: 'Vexl Clubs',
    category: 'screenshot',
    url: '/screenshots/clubs.png',
    description: 'Community clubs interface',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-trade',
    name: 'Trade Flow',
    category: 'screenshot',
    url: '/screenshots/trade.png',
    description: 'P2P trading interface',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-security',
    name: 'Security Features',
    category: 'screenshot',
    url: '/screenshots/security.png',
    description: 'Privacy and security settings',
    width: 390,
    height: 844
  }
]

// Helper functions
export const getAssetsByCategory = (category: BrandAsset['category']): BrandAsset[] => {
  return brandAssets.filter(asset => asset.category === category)
}

export const getAssetById = (id: string): BrandAsset | undefined => {
  return brandAssets.find(asset => asset.id === id)
}

// Placeholder image generator for missing assets
export const getPlaceholderUrl = (type: BrandAsset['category'], name: string): string => {
  const colors = {
    logo: '#FCD34D',
    avatar: '#10B981',
    symbol: '#3B82F6',
    screenshot: '#6B7280',
    icon: '#EF4444'
  }
  
  const color = colors[type] || '#6B7280'
  const text = name.substring(0, 2).toUpperCase()
  
  // Return a data URL for a simple SVG placeholder
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="${color}"/><text x="50" y="50" text-anchor="middle" dominant-baseline="middle" fill="white" font-family="sans-serif" font-size="32">${text}</text></svg>`
}