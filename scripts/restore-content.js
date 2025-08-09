// Script to restore all workshop content from defaultContent.ts

const defaultContent = {
  hookSection: {
    title: "KYC is killing Bitcoin",
    subtitle: "Every time you upload your ID to buy bitcoin, you're building the surveillance state.",
    stats: [
      { id: "stat1", value: "500M+", label: "KYC records leaked in crypto exchange hacks" },
      { id: "stat2", value: "100%", label: "of your transactions tracked forever" },
      { id: "stat3", value: "0", label: "privacy once you're in the system" }
    ],
    cta: "There's a better way"
  },
  
  pitchSection: {
    title: "YOUR SOCIAL NETWORK.",
    subtitle: "WITH A BITCOIN LAYER.",
    description: "Vexl isn't a marketplace - it's the strongest network that already exists: your phone contacts",
    items: [
      { id: "what", title: "What?", content: "Your existing social network, enhanced with bitcoin trading. Every contact is a potential trade partner." },
      { id: "why", title: "Why?", content: "Bitcoin as Satoshi intended - peer-to-peer, no middlemen. Real relationships, not fake ratings." },
      { id: "who", title: "Who?", content: "Open source, community-funded. Built for humans who value trust over algorithms." },
      { id: "when", title: "When?", content: "Available now. Free forever. No KYC because we're not a business extracting your data." },
      { id: "where", title: "Where?", content: "Wherever people want to trade bitcoin for cash. Starting with your local community." },
      { id: "how", title: "How?", content: "Import contacts. Find traders. Build trust. Every trade strengthens real relationships." }
    ]
  },

  trustSection: {
    title: "Trust beats ratings",
    subtitle: "Every. Single. Time.",
    description: "Ratings can be faked. Relationships can't.",
    items: [
      { id: "ratings", title: "Platform Ratings", content: "Anonymous strangers, Fake reviews (50% on major platforms), No real accountability, Trust a number, not a person" },
      { id: "relationships", title: "Real Relationships", content: "Your actual contacts, Friends of friends you can verify, Social reputation at stake, Trust built over years" }
    ]
  },

  privacySection: {
    title: "Privacy is not optional",
    subtitle: "It's the whole point",
    items: [
      { id: "tech1", title: "End-to-end encryption", content: "Only you and your trade partner can read messages" },
      { id: "tech2", title: "No servers, no logs", content: "P2P architecture means no central point of failure" },
      { id: "tech3", title: "Onion routing", content: "Your IP address stays private" },
      { id: "tech4", title: "Zero personal data", content: "We don't know who you are, and we like it that way" }
    ]
  },

  profileSetupSection: {
    title: "Your profile, your rules",
    subtitle: "As private or public as you want",
    items: [
      { id: "step1", title: "Choose your identity", content: "Real name for friends, pseudonym for extended network" },
      { id: "step2", title: "Set your preferences", content: "Buy, sell, or both. Your terms." },
      { id: "step3", title: "Control visibility", content: "Decide who sees your offers" }
    ]
  },

  findingOffersSection: {
    title: "Find offers instantly",
    subtitle: "From people you can actually trust",
    items: [
      { id: "filter1", title: "1st degree", content: "Your direct contacts" },
      { id: "filter2", title: "2nd degree", content: "Friends of friends" },
      { id: "filter3", title: "Location-based", content: "Find traders near you" }
    ]
  },

  contactTradingSection: {
    title: "Trade on your terms",
    subtitle: "You're in control of every interaction",
    items: [
      { id: "feature1", title: "Encrypted chat", content: "Negotiate privately" },
      { id: "feature2", title: "Flexible payments", content: "Cash, bank transfer, whatever works" },
      { id: "feature3", title: "No middleman", content: "Direct peer-to-peer trades" }
    ]
  },

  clubsSection: {
    title: "Vexl Clubs",
    subtitle: "Extend your network strategically",
    items: [
      { id: "benefit1", title: "Create clubs", content: "Form trusted trading groups" },
      { id: "benefit2", title: "Join existing clubs", content: "Connect with local Bitcoin communities" },
      { id: "benefit3", title: "Enhanced privacy", content: "Trade within vetted groups" }
    ]
  },

  demoSection: {
    title: "See It In Action",
    subtitle: "Live Demo Time",
    description: "Let me show you how easy it is to find and complete a trade on Vexl"
  },

  visionSection: {
    title: "Your Network = Your Net Worth",
    subtitle: "Building the future of P2P Bitcoin",
    items: [
      { id: "vision1", title: "Mass adoption through trust", content: "Bitcoin spreads person to person, not corporation to customer" },
      { id: "vision2", title: "Circular economies", content: "Spend Bitcoin, don't just hodl it" },
      { id: "vision3", title: "True decentralization", content: "No company, no servers, no single point of failure" }
    ]
  },

  getStartedSection: {
    title: "Get Started Today",
    subtitle: "Join the revolution",
    cta: "Download Vexl",
    items: [
      { id: "ios", title: "iOS", content: "Download from App Store" },
      { id: "android", title: "Android", content: "Get it on Google Play" },
      { id: "apk", title: "APK", content: "Direct download" }
    ]
  }
};

async function restoreContent() {
  const url = 'http://localhost:3000/api/admin/content';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer test-token'
      },
      body: JSON.stringify(defaultContent)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Content restored successfully!');
    } else {
      console.error('❌ Failed to restore content:', result.message);
    }
  } catch (error) {
    console.error('❌ Error restoring content:', error);
  }
}

restoreContent();