// Preset templates for different audiences and use cases

export const templates = {
  bitcoinMaximalist: {
    name: 'Bitcoin Maximalist',
    description: 'Focus on sovereignty, privacy, and peer-to-peer ideals',
    slides: {
      hookSection: {
        title: 'KYC is DESTROYING Bitcoin',
        subtitle: 'Every KYC exchange is a honeypot waiting to be hacked. Every ID upload is permanent surveillance.',
        stats: [
          { id: 'stat1', value: '500M+', label: 'KYC records leaked forever' },
          { id: 'stat2', value: '100%', label: 'of exchanges will fail or be hacked' },
          { id: 'stat3', value: '0', label: 'privacy once KYC touches your bitcoin' }
        ],
        cta: 'Fix the money, fix the world'
      },
      pitchSection: {
        title: 'Bitcoin as Satoshi intended.',
        subtitle: 'Peer-to-peer. No intermediaries.',
        description: 'Vexl returns Bitcoin to its cypherpunk roots - truly peer-to-peer electronic cash'
      },
      trustSection: {
        title: 'Code is law. But trust is human.',
        subtitle: "Don't trust. Verify. But when you must trust, trust those you know."
      }
    },
    features: {
      showContactImport: true,
      showNetworkVisualization: true,
      showEconomicCalculator: false,
      showSkillSharing: false,
      showTrustComparison: true,
      showDemoSection: true,
      showGamification: false
    },
    config: {
      technicalLevel: 'advanced',
      focusArea: 'privacy',
      economicMultiplier: 1,
      primaryColor: '#FF9500'
    }
  },

  businessFocus: {
    name: 'Business & Commerce',
    description: 'Emphasize local commerce and circular economy benefits',
    slides: {
      hookSection: {
        title: 'Build Your Local Bitcoin Economy',
        subtitle: 'Accept Bitcoin from customers you trust. No merchant fees. No chargebacks.',
        stats: [
          { id: 'stat1', value: '$2.5M', label: 'saved in merchant fees annually' },
          { id: 'stat2', value: '150+', label: 'local businesses accepting Bitcoin' },
          { id: 'stat3', value: '2.7x', label: 'economic multiplier effect' }
        ],
        cta: 'Start accepting Bitcoin today'
      },
      pitchSection: {
        title: 'Your customers. Your terms.',
        subtitle: 'Direct Bitcoin payments.',
        description: 'Connect with customers who want to spend Bitcoin at local businesses'
      },
      visionSection: {
        title: 'Create a Circular Economy',
        subtitle: 'Keep wealth in your community',
        description: 'When businesses and customers trade directly, everyone wins'
      }
    },
    features: {
      showContactImport: true,
      showNetworkVisualization: true,
      showEconomicCalculator: true,
      showSkillSharing: true,
      showTrustComparison: false,
      showDemoSection: true,
      showGamification: true
    },
    config: {
      technicalLevel: 'beginner',
      focusArea: 'economics',
      economicMultiplier: 2.7,
      localSpendingPercentage: 0.75
    }
  },

  communityBuilder: {
    name: 'Community Building',
    description: 'Focus on network effects and social connections',
    slides: {
      hookSection: {
        title: 'Your Network is Your Net Worth',
        subtitle: 'Transform your contacts into a thriving Bitcoin community',
        stats: [
          { id: 'stat1', value: '6 degrees', label: 'of separation to anyone' },
          { id: 'stat2', value: '150', label: 'average contacts per person' },
          { id: 'stat3', value: '22,500', label: 'potential network reach' }
        ],
        cta: 'Activate your network'
      },
      pitchSection: {
        title: 'Community-powered Bitcoin.',
        subtitle: 'Trade with people you trust.',
        description: 'Every contact is a potential Bitcoin trader. Every trade strengthens your community.'
      },
      clubsSection: {
        title: 'Join the Movement',
        subtitle: 'Find your tribe',
        description: 'Connect with like-minded Bitcoiners in your area'
      }
    },
    features: {
      showContactImport: true,
      showNetworkVisualization: true,
      showEconomicCalculator: true,
      showSkillSharing: true,
      showTrustComparison: true,
      showDemoSection: true,
      showGamification: true
    },
    config: {
      technicalLevel: 'intermediate',
      focusArea: 'community',
      networkGrowthRate: 2.0,
      defaultContactCount: 200
    }
  },

  privacyAdvocate: {
    name: 'Privacy Advocate',
    description: 'Maximum focus on privacy, security, and anonymity',
    slides: {
      hookSection: {
        title: 'Privacy is Not a Crime',
        subtitle: 'Financial privacy is a fundamental human right being eroded daily',
        stats: [
          { id: 'stat1', value: 'ZERO', label: 'personal data collected by Vexl' },
          { id: 'stat2', value: 'E2E', label: 'encrypted everything' },
          { id: 'stat3', value: 'TOR', label: 'onion routing built-in' }
        ],
        cta: 'Take back your privacy'
      },
      privacySection: {
        title: 'Privacy by Design',
        subtitle: 'Not by promise',
        description: 'Open source. No servers. No logs. No surveillance.'
      }
    },
    features: {
      showContactImport: false,
      showNetworkVisualization: false,
      showEconomicCalculator: false,
      showSkillSharing: false,
      showTrustComparison: true,
      showDemoSection: true,
      showGamification: false
    },
    config: {
      technicalLevel: 'advanced',
      focusArea: 'privacy',
      animations: false,
      darkMode: true
    }
  },

  workshopQuick: {
    name: 'Quick Workshop (15 min)',
    description: 'Condensed version hitting key points fast',
    slides: {
      hookSection: {
        title: 'KYC-Free Bitcoin Trading',
        subtitle: 'Trade Bitcoin with people you trust',
        cta: 'Let me show you how'
      },
      pitchSection: {
        title: 'Vexl in 30 seconds',
        subtitle: 'Your contacts + Bitcoin',
        description: 'Simple, private, peer-to-peer'
      }
    },
    features: {
      showContactImport: true,
      showNetworkVisualization: false,
      showEconomicCalculator: false,
      showSkillSharing: false,
      showTrustComparison: false,
      showDemoSection: true,
      showGamification: false
    },
    config: {
      technicalLevel: 'beginner',
      focusArea: 'balanced'
    }
  }
}