export interface SlideContent {
  [key: string]: {
    title?: string;
    subtitle?: string;
    description?: string;
    items?: Array<{
      id: string;
      title?: string;
      content: string;
      highlight?: string;
    }>;
    stats?: Array<{
      id: string;
      value: string;
      label: string;
    }>;
    cta?: string;
  };
}

export const defaultContent: SlideContent = {
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
    title: "Your social network.",
    subtitle: "With a Bitcoin layer.",
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
    description: "Join communities aligned with your values",
    items: [
      { id: "club1", title: "Location clubs", content: "Prague Bitcoiners, Austin Node Runners" },
      { id: "club2", title: "Interest clubs", content: "Privacy Maximalists, Lightning Network" },
      { id: "club3", title: "Event clubs", content: "Conference attendees, Meetup groups" }
    ]
  },

  demoSection: {
    title: "See it in action",
    subtitle: "Let's do a live demo",
    description: "Watch how easy it is to find and complete a trade"
  },

  visionSection: {
    title: "Your network is your net worth",
    subtitle: "Build local circular economies",
    description: "Imagine your whole neighborhood trading directly",
    items: [
      { id: "vision1", title: "Local first", content: "Strengthen community bonds through trade" },
      { id: "vision2", title: "Circular economy", content: "Keep value in your community" },
      { id: "vision3", title: "Financial sovereignty", content: "No permission needed to transact" }
    ]
  },

  getStartedSection: {
    title: "Ready to join the revolution?",
    subtitle: "Get Vexl. Import contacts. Start trading.",
    cta: "Download Vexl",
    description: "Available on iOS and Android"
  }
};