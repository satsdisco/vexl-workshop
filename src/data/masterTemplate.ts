// Master Default Template - The original workshop content
// This serves as the reset point and can always be restored

export const masterTemplate = {
  id: 'master-default',
  name: 'Master Workshop Template',
  description: 'The original Vexl workshop presentation. This is the default template that can always be restored.',
  category: 'default',
  isProtected: true, // Cannot be deleted
  sections: {
    hookSection: {
      title: 'KYC is Killing Bitcoin',
      subtitle: 'The Centralization Problem',
      description: 'When you buy Bitcoin through KYC exchanges, you\'re not just sharing your identity - you\'re creating a permanent record that links you to every transaction.',
      stats: [
        { value: '95%', label: 'of Bitcoin is bought through KYC' },
        { value: '100%', label: 'of your data is stored forever' },
        { value: '0%', label: 'privacy remaining' }
      ]
    },
    pitchSection: {
      title: 'YOUR SOCIAL NETWORK.',
      subtitle: 'WITH A BITCOIN LAYER.',
      description: 'Vexl isn\'t a marketplace - it\'s the strongest network that already exists: your phone contacts',
      features: [
        'No KYC Required',
        'No Trading Fees',
        'True Peer-to-Peer',
        'Your Network, Your Rules'
      ]
    },
    trustSection: {
      title: 'Trust > Ratings',
      subtitle: 'Real relationships beat anonymous reviews',
      description: 'Instead of trusting strangers with 5-star ratings, trade with people connected through your actual social network.',
      points: [
        'First degree: Your direct contacts',
        'Second degree: Friends of friends',
        'Reputation through real relationships',
        'No fake reviews or manipulated ratings'
      ]
    },
    privacySection: {
      title: 'Privacy by Design',
      subtitle: 'Your data never touches our servers',
      description: 'Everything happens on your device. No accounts, no tracking, no data collection. Just pure peer-to-peer communication.',
      features: [
        'End-to-end encryption',
        'No server storage',
        'No user accounts',
        'Disappearing messages',
        'Tor support'
      ]
    },
    profileSetupSection: {
      title: 'Your Identity, Your Control',
      subtitle: 'Set up your profile in seconds',
      description: 'Choose how you appear to your network. Share what you want, when you want, with who you want.',
      steps: [
        'Pick your avatar',
        'Set your username',
        'Import contacts',
        'Start trading'
      ]
    },
    findingOffersSection: {
      title: 'Find Offers in Your Network',
      subtitle: 'See who\'s buying and selling near you',
      description: 'Browse offers from your extended network. Filter by location, amount, payment method, and degree of connection.',
      filters: [
        'Distance',
        'Amount range',
        'Payment methods',
        'Connection degree'
      ]
    },
    contactTradingSection: {
      title: 'Contact & Trade',
      subtitle: 'Communicate securely, trade freely',
      description: 'Once you find a match, chat directly in the app. Agree on terms, meet up, and complete your trade - all without intermediaries.',
      process: [
        'Send encrypted message',
        'Agree on terms',
        'Meet in person',
        'Complete trade'
      ]
    },
    clubsSection: {
      title: 'Vexl Clubs',
      subtitle: 'Exclusive trading groups for your community',
      description: 'Create or join clubs for more trusted trading. Perfect for local Bitcoin meetups, communities, or groups of friends.',
      benefits: [
        'Curated member list',
        'Shared reputation',
        'Group-specific offers',
        'Enhanced trust'
      ]
    },
    demoSection: {
      title: 'See It In Action',
      subtitle: 'Live Demo',
      description: 'Let\'s walk through a real trade on Vexl, from finding an offer to completing the exchange.',
      demoSteps: [
        'Open the app',
        'Browse offers',
        'Send a message',
        'Complete trade'
      ]
    },
    visionSection: {
      title: 'Your Network, Your Money, Your Future',
      subtitle: 'Building the circular economy',
      description: 'Vexl isn\'t just about trading Bitcoin - it\'s about creating a parallel economy where you can truly own and use your money.',
      vision: [
        'Peer-to-peer economy',
        'Financial sovereignty',
        'Community resilience',
        'True Bitcoin adoption'
      ]
    },
    getStartedSection: {
      title: 'Ready to Join?',
      subtitle: 'Download Vexl and start trading',
      description: 'Available on iOS and Android. Join thousands of Bitcoiners who have already taken back control of their financial privacy.',
      cta: {
        primary: 'Download Vexl',
        secondary: 'Learn More',
        urls: {
          ios: 'https://apps.apple.com/app/vexl',
          android: 'https://play.google.com/store/apps/details?id=com.vexl',
          website: 'https://vexl.it'
        }
      }
    }
  }
}