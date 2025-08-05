import { motion } from 'framer-motion'

interface PresenterModeProps {
  currentSection: number
  sections: Array<{ id: string; name: string; duration: number }>
}

const presenterNotes = {
  hook: [
    "Start with a personal story about KYC frustration",
    "Show real examples of data breaches (FTX, Ledger, etc.)",
    "Ask: 'Who here has had to upload their ID to buy bitcoin?'",
    "Emphasize: Every KYC exchange is a honeypot waiting to be hacked",
    "OBJECTION HANDLER: 'But I have nothing to hide' → 'Neither did the 500M people whose data was leaked'"
  ],
  pitch: [
    "Keep it simple: P2P bitcoin trading, no KYC, ever",
    "Emphasize: Built by Satoshi Labs team (Trezor creators)",
    "Funded by Human Rights Foundation & OpenSats - 100% nonprofit",
    "It's free, open source, no token, no business model",
    "OBJECTION HANDLER: 'Sounds sketchy' → 'That's why we're nonprofit & open source - check the code yourself'"
  ],
  privacy: [
    "START WITH WEB OF TRUST DEMO - Let them click and build the network",
    "Key point: Show how pizza guy → 87 trading partners (pause for effect)",
    "SWITCH TO HASH DEMO - Click contacts to show transformation",
    "Emphasize: SHA-256 is one-way, we literally cannot reverse it",
    "END WITH IMPORT STRATEGY - Show selective import = isolation",
    "OBJECTION HANDLER: 'But privacy!' → 'That's why we hash - you get privacy AND network'"
  ],
  demo: [
    "Have the app ready on your phone - real demo is powerful",
    "Start with creating an offer - show how simple it is",
    "Emphasize the web of trust - you only see friends of friends",
    "Show real offers in your area if available",
    "OBJECTION HANDLER: 'What if I get scammed?' → 'Web of trust + reputation system + start small'"
  ],
  vision: [
    "Paint the picture: bitcoin as money, not just an investment",
    "Every Vexl trade weakens the surveillance state",
    "Local circular economies - buy coffee, pay rent, earn in bitcoin",
    "This is infrastructure for freedom",
    "OBJECTION HANDLER: 'This won't scale' → 'It already is - show growth numbers'"
  ],
  'get-started': [
    "Show the QR codes - make it easy to download NOW",
    "Challenge: Make your first trade this week",
    "Join the Telegram - real community support",
    "Offer to help with their first trade after the workshop",
    "OBJECTION HANDLER: 'I'll do it later' → 'The best time was yesterday, second best is now'"
  ]
}

export default function PresenterMode({ currentSection, sections }: PresenterModeProps) {
  const currentSectionId = sections[currentSection].id
  const notes = presenterNotes[currentSectionId as keyof typeof presenterNotes] || []

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-11/12 max-w-4xl presenter-note z-50"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-vexl-yellow font-bold text-lg mb-3">
            {sections[currentSection].name} ({sections[currentSection].duration} min)
          </h3>
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-vexl-yellow mt-1">▸</span>
                <span className={`${note.includes('OBJECTION') ? 'text-vexl-yellow font-semibold' : 'text-white'}`}>
                  {note}
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-right space-y-2">
          <div className="text-xs text-vexl-gray-500">
            Section {currentSection + 1} of {sections.length}
          </div>
          <div className="text-xs space-y-1">
            <div>Cmd+P: Toggle notes</div>
            <div>Shift+Space: Timer</div>
            <div>↑↓: Navigate sections</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}