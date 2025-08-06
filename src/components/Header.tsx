import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-vexl-black border-b-4 border-vexl-yellow"
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
          <span className="text-sm text-vexl-white hidden md:block uppercase font-bold" style={{ fontFamily: 'Monument Extended' }}>
            P2P Bitcoin Without KYC
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <motion.a
            href="https://vexl.it"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-vexl-white hover:text-vexl-yellow transition-colors font-bold uppercase"
            whileHover={{ scale: 1.05 }}
            style={{ fontFamily: 'TT Satoshi' }}
          >
            vexl.it
          </motion.a>
          <div className="bg-vexl-yellow p-2">
            <Image 
              src="/logos/vexl/symbol/Vexl Sunglasses Digital/Black glasses.svg"
              alt="Vexl Symbol"
              width={30}
              height={30}
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}