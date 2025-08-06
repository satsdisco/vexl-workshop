// Default content for all sections - this becomes our CMS baseline
export const defaultCMSContent = {
  hookSection: {
    title: "KYC is killing Bitcoin",
    subtitle: "Your network is your net worth. Start with the people you already trust.",
    stats: [
      { value: "93%", label: "of Bitcoin trades tracked" },
      { value: "1984", label: "surveillance state" },
      { value: "P2P", label: "is the solution" }
    ]
  },
  
  pitchSection: {
    title: "What is Vexl?",
    subtitle: "The peer-to-peer Bitcoin marketplace",
    description: "Trade Bitcoin with people you trust, not corporations that track you.",
    features: [
      { icon: "🔒", title: "No KYC", description: "Your identity stays yours" },
      { icon: "🤝", title: "P2P", description: "Direct trades with real people" },
      { icon: "🌐", title: "Network", description: "Leverage your social connections" }
    ]
  },
  
  trustSection: {
    title: "Trust > Ratings",
    subtitle: "Your network is more valuable than stranger reviews",
    description: "A friend of a friend is worth more than a 5-star stranger.",
    comparison: {
      traditional: {
        title: "Traditional Exchanges",
        points: ["Trust strangers", "Fake reviews", "No real accountability"]
      },
      vexl: {
        title: "Vexl Network",
        points: ["Trust your network", "Real relationships", "Social accountability"]
      }
    }
  },
  
  privacySection: {
    title: "Privacy First",
    subtitle: "We refuse to track your trades because we refuse to become a honeypot",
    features: [
      { icon: "🔒", title: "No Surveillance By Design", description: "Rating systems require tracking every transaction. We chose trust over surveillance." },
      { icon: "🛡️", title: "Your History Stays Yours", description: "Your trading history belongs to you, not our database." },
      { icon: "🌐", title: "Verify Everything", description: "Open source means you can verify we're not tracking you." }
    ],
    comparison: {
      kyc: { data: "ALL", breaches: "HIGH", privacy: "NONE" },
      vexl: { data: "NONE", breaches: "ZERO", privacy: "FULL" }
    }
  },
  
  profileSetupSection: {
    title: "Quick Setup",
    subtitle: "Get started in 60 seconds",
    steps: [
      { number: "1", title: "Download", description: "Get Vexl from App Store or Play Store" },
      { number: "2", title: "Create Profile", description: "Just a username - no email, no ID" },
      { number: "3", title: "Import Contacts", description: "Connect with your network" }
    ]
  },
  
  findingOffersSection: {
    title: "Find Offers",
    subtitle: "Browse your network",
    features: [
      { title: "Network Reach", description: "See offers from friends and friends of friends" },
      { title: "Filter Options", description: "By amount, payment method, location" },
      { title: "Privacy First", description: "Browse anonymously until you're ready" }
    ]
  },
  
  contactTradingSection: {
    title: "Safe Trading",
    subtitle: "Connect and trade securely",
    process: [
      { step: "1", title: "Connect", description: "Reach out through encrypted chat" },
      { step: "2", title: "Agree", description: "Set terms that work for both parties" },
      { step: "3", title: "Trade", description: "Meet up or trade remotely" }
    ]
  },
  
  clubsSection: {
    title: "Vexl Clubs",
    subtitle: "Expand your trading network",
    description: "Join communities of Bitcoin traders",
    benefits: [
      { title: "Local Communities", description: "Find traders in your city" },
      { title: "Interest Groups", description: "Connect over shared values" },
      { title: "Event Coordination", description: "Organize and attend meetups" }
    ]
  },
  
  demoSection: {
    title: "Live Demo",
    subtitle: "See it in action",
    description: "Experience the app firsthand",
    demoPoints: [
      "Creating an offer",
      "Finding traders",
      "Making a trade"
    ]
  },
  
  visionSection: {
    title: "Your Network Matters",
    subtitle: "Build your Bitcoin community",
    stats: [
      { value: "150+", label: "Countries" },
      { value: "500K+", label: "Downloads" },
      { value: "0", label: "Data breaches" }
    ],
    vision: "Every connection strengthens the network. Every trade builds trust. Together, we're creating the future of P2P Bitcoin."
  },
  
  getStartedSection: {
    title: "Get Started Today",
    subtitle: "Join the P2P revolution",
    cta: {
      primary: { text: "Download Vexl", url: "https://vexl.it" },
      secondary: { text: "Learn More", url: "https://vexl.it/learn" }
    },
    qrCode: "/images/qr-download.png"
  }
}

export async function initializeCMSContent() {
  try {
    for (const [sectionId, content] of Object.entries(defaultCMSContent)) {
      const response = await fetch('/api/admin/slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sectionId,
          content
        })
      })
      
      if (!response.ok) {
        console.error(`Failed to save ${sectionId}`)
      }
    }
    
    console.log('CMS content initialized successfully')
    return true
  } catch (error) {
    console.error('Failed to initialize CMS content:', error)
    return false
  }
}