import { motion } from 'framer-motion'

export default function HookSection() {
  return (
    <div className="max-w-5xl mx-auto text-center relative z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl mb-8 leading-tight"
        style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
      >
        <span className="text-vexl-yellow">KYC</span> is killing<br />Bitcoin
      </motion.h1>
      
      <div className="space-y-8 text-xl md:text-2xl text-vexl-gray-400 max-w-3xl mx-auto">
        <p className="font-medium">
          Every time you upload your ID to buy bitcoin,
          <br />
          you're building the surveillance state.
        </p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05, borderColor: "#FFD700" }}
            className="vexl-card group border-2 border-vexl-gray-800 transition-all cursor-pointer"
          >
            <div className="text-5xl text-vexl-white mb-3" style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}>500M+</div>
            <p className="text-sm text-vexl-gray-500">KYC records leaked in crypto exchange hacks</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, borderColor: "#FFD700" }}
            className="vexl-card group border-2 border-vexl-gray-800 transition-all cursor-pointer"
          >
            <div className="text-5xl text-vexl-white mb-3" style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}>100%</div>
            <p className="text-sm text-vexl-gray-500">of your transactions tracked forever</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, borderColor: "#FFD700" }}
            className="vexl-card group border-2 border-vexl-gray-800 transition-all cursor-pointer"
          >
            <div className="text-5xl text-vexl-white mb-3" style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}>0</div>
            <p className="text-sm text-vexl-gray-500">privacy once you're in the system</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 inline-flex items-center gap-3"
      >
        <span className="text-2xl" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>There's a better way</span>
        <motion.svg 
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-8 h-8" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </motion.svg>
      </motion.div>
    </div>
  )
}