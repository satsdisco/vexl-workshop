'use client'

import { useState } from 'react'
import Image from 'next/image'

interface PhoneMockupProps {
  config?: {
    device?: 'iphone14pro' | 'iphone13' | 'android'
    screen?: 'offer-feed' | 'common-friends' | 'chat' | 'network' | 'custom'
    orientation?: 'portrait' | 'landscape'
    theme?: 'dark' | 'light'
    angle?: number
    scale?: number
    customContent?: React.ReactNode
  }
}

export default function PhoneMockup({ config }: PhoneMockupProps) {
  const device = config?.device || 'iphone14pro'
  const screen = config?.screen || 'offer-feed'
  const orientation = config?.orientation || 'portrait'
  const theme = config?.theme || 'dark'
  const angle = config?.angle || 0
  const scale = config?.scale || 1

  const renderScreen = () => {
    switch (screen) {
      case 'offer-feed':
        return <OfferFeedScreen theme={theme} />
      case 'common-friends':
        return <CommonFriendsScreen theme={theme} />
      case 'chat':
        return <ChatScreen theme={theme} />
      case 'network':
        return <NetworkScreen theme={theme} />
      case 'custom':
        return config?.customContent || <div>Custom Content</div>
      default:
        return <OfferFeedScreen theme={theme} />
    }
  }

  return (
    <div 
      className="relative inline-block"
      style={{
        transform: `rotate(${angle}deg) scale(${scale})`,
        transition: 'transform 0.3s ease'
      }}
    >
      {/* Phone Frame */}
      <div className="relative bg-black rounded-[3rem] p-2 shadow-2xl">
        {/* Notch */}
        {device === 'iphone14pro' && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-black rounded-b-3xl z-10" />
        )}
        
        {/* Screen */}
        <div className={`
          relative bg-gray-900 overflow-hidden
          ${orientation === 'portrait' ? 'w-[375px] h-[812px] rounded-[2.5rem]' : 'w-[812px] h-[375px] rounded-[2.5rem]'}
        `}>
          {renderScreen()}
        </div>

        {/* Home Indicator */}
        {device === 'iphone14pro' && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
        )}
      </div>
    </div>
  )
}

// Screen Components
function OfferFeedScreen({ theme }: { theme: string }) {
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-white' : 'text-black'

  return (
    <div className={`h-full ${bgColor} ${textColor} p-4`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-8">
        <h1 className="text-2xl font-bold">Vexl</h1>
        <div className="flex space-x-2">
          <div className="w-8 h-8 bg-vexl-yellow rounded-full" />
          <div className="w-8 h-8 bg-gray-700 rounded-full" />
        </div>
      </div>

      {/* Offer Cards */}
      <div className="space-y-4">
        <OfferCard 
          location="Zimbabwe" 
          amount="500 BTC" 
          rate="5%" 
          seller="Mokstoshe"
          commonFriends={2}
        />
        <OfferCard 
          location="Berlin" 
          amount="1000 EUR" 
          rate="€10K" 
          seller="Local trader"
          commonFriends={3}
        />
        <OfferCard 
          location="Prague" 
          amount="2000 USD" 
          rate="3%" 
          seller="CryptoJan"
          commonFriends={1}
        />
      </div>
    </div>
  )
}

function OfferCard({ location, amount, rate, seller, commonFriends }: any) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="text-sm text-gray-400">{location}</div>
          <div className="text-lg font-bold">{amount}</div>
        </div>
        <div className="text-vexl-yellow font-bold">{rate}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm">{seller}</div>
        {commonFriends > 0 && (
          <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
            {commonFriends} common friends
          </div>
        )}
      </div>
    </div>
  )
}

function CommonFriendsScreen({ theme }: { theme: string }) {
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white'
  const textColor = theme === 'dark' ? 'text-white' : 'text-black'

  return (
    <div className={`h-full ${bgColor} ${textColor} p-4 flex items-center justify-center`}>
      <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">3 Common Friends</h2>
        <div className="space-y-3">
          <FriendRow name="Sarah Miller" />
          <FriendRow name="John Doe" />
          <FriendRow name="Emma Wilson" />
        </div>
        <button className="w-full mt-6 py-3 bg-vexl-yellow text-black font-bold rounded-lg">
          View Profile
        </button>
      </div>
    </div>
  )
}

function FriendRow({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-600 rounded-full" />
        <span>{name}</span>
      </div>
      <button className="text-sm text-vexl-yellow">Call</button>
    </div>
  )
}

function ChatScreen({ theme }: { theme: string }) {
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white'
  
  return (
    <div className={`h-full ${bgColor} p-4`}>
      <div className="flex items-center space-x-3 mb-4 pt-8">
        <div className="w-10 h-10 bg-gray-600 rounded-full" />
        <div>
          <div className="font-bold text-white">Local Trader</div>
          <div className="text-xs text-green-400">Online</div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="bg-gray-800 rounded-lg p-3 max-w-[70%]">
          <p className="text-white">Hi, I want to buy 0.01 BTC</p>
        </div>
        <div className="bg-vexl-yellow rounded-lg p-3 max-w-[70%] ml-auto">
          <p className="text-black">Sure! Let's meet at the usual spot</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-3 max-w-[70%]">
          <p className="text-white">Great, see you at 3pm</p>
        </div>
      </div>
    </div>
  )
}

function NetworkScreen({ theme }: { theme: string }) {
  return (
    <div className="h-full bg-gray-900 p-4 flex items-center justify-center">
      <div className="relative w-full h-full">
        {/* Simple network visualization */}
        <svg className="w-full h-full" viewBox="0 0 400 400">
          {/* Connections */}
          <line x1="200" y1="200" x2="100" y2="100" stroke="#FFD700" strokeWidth="2" />
          <line x1="200" y1="200" x2="300" y2="100" stroke="#FFD700" strokeWidth="2" />
          <line x1="200" y1="200" x2="100" y2="300" stroke="#90EE90" strokeWidth="1" />
          <line x1="200" y1="200" x2="300" y2="300" stroke="#87CEEB" strokeWidth="1" />
          
          {/* Nodes */}
          <circle cx="200" cy="200" r="20" fill="#FFD700" />
          <circle cx="100" cy="100" r="15" fill="#90EE90" />
          <circle cx="300" cy="100" r="15" fill="#90EE90" />
          <circle cx="100" cy="300" r="15" fill="#87CEEB" />
          <circle cx="300" cy="300" r="15" fill="#87CEEB" />
          
          {/* Labels */}
          <text x="200" y="240" textAnchor="middle" fill="white" fontSize="12">You</text>
          <text x="100" y="130" textAnchor="middle" fill="white" fontSize="10">Friend</text>
          <text x="300" y="130" textAnchor="middle" fill="white" fontSize="10">Mom</text>
        </svg>
      </div>
    </div>
  )
}