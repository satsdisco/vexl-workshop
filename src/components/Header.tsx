import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-vexl-gray-800"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image 
            src="/logos/vexl/Logopack - Secondary logo/Vexl Secondary logo Digital/secondary-logo-white.png"
            alt="Vexl"
            width={100}
            height={40}
            className="h-10 w-auto"
            priority
            unoptimized
          />
          <span className="text-sm text-vexl-gray-500 hidden md:block">
            P2P Bitcoin Without KYC • Community Funded
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <motion.a
            href="https://vexl.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:text-vexl-yellow transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            vexl.it
          </motion.a>
          <Image 
            src="/logos/vexl/symbol/Vexl Sunglasses Digital/White glasses.svg"
            alt="Vexl Symbol"
            width={30}
            height={30}
            className="opacity-80"
          />
        </div>
      </div>
    </motion.header>
  )
}