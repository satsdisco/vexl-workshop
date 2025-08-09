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
    id: 'vexl-logo-black',
    name: 'Vexl Logo Black',
    category: 'logo',
    url: '/logos/vexl/Logopack/Digital/Vexl logo black on transparent.svg',
    description: 'Black Vexl logo'
  },
  {
    id: 'vexl-logo-white',
    name: 'Vexl Logo White',
    category: 'logo',
    url: '/logos/vexl/Logopack/Digital/Vexl logo white on transparent.svg',
    description: 'White Vexl logo'
  },
  {
    id: 'vexl-secondary-black',
    name: 'Vexl Secondary Black',
    category: 'logo',
    url: '/logos/vexl/Logopack - Secondary logo/Vexl Secondary logo Digital/Secondary logo black.svg',
    description: 'Secondary black logo'
  },
  {
    id: 'vexl-secondary-white',
    name: 'Vexl Secondary White',
    category: 'logo',
    url: '/logos/vexl/Logopack - Secondary logo/Vexl Secondary logo Digital/Secondary logo white.svg',
    description: 'Secondary white logo'
  },
  {
    id: 'vexl-glasses-black',
    name: 'Vexl Glasses Black',
    category: 'symbol',
    url: '/logos/vexl/symbol/Vexl Sunglasses Digital/Black glasses.svg',
    description: 'Black sunglasses symbol'
  },
  {
    id: 'vexl-glasses-white',
    name: 'Vexl Glasses White',
    category: 'symbol',
    url: '/logos/vexl/symbol/Vexl Sunglasses Digital/White glasses.svg',
    description: 'White sunglasses symbol'
  },
  {
    id: 'vexl-icon',
    name: 'Vexl Icon',
    category: 'logo',
    url: '/vexl-icon.svg',
    description: 'Vexl icon symbol'
  },
  
  // Avatars
  {
    id: 'avatar-2',
    name: 'Avatar 2',
    category: 'avatar',
    url: '/avatars/avatar2.svg',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-3',
    name: 'Avatar 3',
    category: 'avatar',
    url: '/avatars/avatar3.svg',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-4',
    name: 'Avatar 4',
    category: 'avatar',
    url: '/avatars/avatar4.svg',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-5',
    name: 'Avatar 5',
    category: 'avatar',
    url: '/avatars/avatar5.svg',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-6',
    name: 'Avatar 6',
    category: 'avatar',
    url: '/avatars/avatar6.svg',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-7',
    name: 'Avatar 7',
    category: 'avatar',
    url: '/avatars/avatar7.svg',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-8',
    name: 'Avatar 8',
    category: 'avatar',
    url: '/avatars/avatar8.svg',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-9',
    name: 'Avatar 9',
    category: 'avatar',
    url: '/avatars/avatar9.svg',
    description: 'Anonymous user avatar'
  },
  {
    id: 'avatar-10',
    name: 'Avatar 10',
    category: 'avatar',
    url: '/avatars/avatar10.svg',
    description: 'Anonymous user avatar'
  },
  
  // Symbols & Icons - Using favicon as placeholder
  {
    id: 'vexl-symbol',
    name: 'Vexl Symbol',
    category: 'symbol',
    url: '/favicon.svg',
    description: 'Vexl symbol'
  },
  
  // App Screenshots
  {
    id: 'screenshot-chat-start',
    name: 'Chat Start',
    category: 'screenshot',
    url: '/screenshots/chat-start.png',
    description: 'Starting a chat conversation',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-chats-overview',
    name: 'Chats Overview',
    category: 'screenshot',
    url: '/screenshots/chats-overview.png',
    description: 'Overview of all chats',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-club-interface',
    name: 'Club Interface',
    category: 'screenshot',
    url: '/screenshots/club-interface.png',
    description: 'Vexl clubs interface',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-club-join',
    name: 'Join Club QR',
    category: 'screenshot',
    url: '/screenshots/club-join-qr.png.png',
    description: 'QR code to join club',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-club-moderator',
    name: 'Club Moderator',
    category: 'screenshot',
    url: '/screenshots/club-moderator-approval.png',
    description: 'Moderator approval interface',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-club-trading',
    name: 'Club Trading',
    category: 'screenshot',
    url: '/screenshots/club-trading.png',
    description: 'Trading within clubs',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-create-offer-1',
    name: 'Create Offer 1',
    category: 'screenshot',
    url: '/screenshots/createoffer1.PNG',
    description: 'First step of creating offer',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-create-offer-2',
    name: 'Create Offer 2',
    category: 'screenshot',
    url: '/screenshots/createoffer2.PNG',
    description: 'Second step of creating offer',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-create-offer-3',
    name: 'Create Offer 3',
    category: 'screenshot',
    url: '/screenshots/createoffer3.PNG',
    description: 'Third step of creating offer',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-identity',
    name: 'Identity Reveal',
    category: 'screenshot',
    url: '/screenshots/identity-reveal-photo.png',
    description: 'Identity reveal with photo',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-marketplace',
    name: 'Marketplace',
    category: 'screenshot',
    url: '/screenshots/marketplace 2.PNG',
    description: 'Bitcoin marketplace',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-mutual-friends',
    name: 'Mutual Friends',
    category: 'screenshot',
    url: '/screenshots/mutual-friends.png',
    description: 'Mutual friends connection',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-offer-details',
    name: 'Offer Details',
    category: 'screenshot',
    url: '/screenshots/offer-details.png',
    description: 'Detailed offer view',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-offers-feed',
    name: 'Offers Feed',
    category: 'screenshot',
    url: '/screenshots/offers-feed.png',
    description: 'Feed of available offers',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-profile-complete',
    name: 'Complete Profile',
    category: 'screenshot',
    url: '/screenshots/profile-complete.png',
    description: 'Completed user profile',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-profile-empty',
    name: 'Empty Profile',
    category: 'screenshot',
    url: '/screenshots/profile-empty.png',
    description: 'Empty profile to start',
    width: 390,
    height: 844
  },
  {
    id: 'screenshot-trade-checklist',
    name: 'Trade Checklist',
    category: 'screenshot',
    url: '/screenshots/trade-checklist.png',
    description: 'Trade completion checklist',
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