import { motion } from 'framer-motion'

export default function HookSection() {
  return (
    <div className="max-w-6xl mx-auto relative z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-6xl md:text-8xl mb-8 leading-tight text-center uppercase"
        style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}
      >
        <span className="text-vexl-yellow relative">
          KYC
          <span className="absolute bottom-0 left-0 w-full h-2 bg-vexl-yellow"></span>
        </span>{' '}
        is killing<br />Bitcoin
      </motion.h1>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <p className="text-xl md:text-2xl text-vexl-gray-400 max-w-3xl mx-auto">
          Every time you upload your ID to buy bitcoin,
          <br />
          you're building the surveillance state.
        </p>
      </motion.div>

      <div className="mt-12 space-y-8 text-xl md:text-2xl text-vexl-gray-400 max-w-3xl mx-auto text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-vexl-yellow text-vexl-black border-4 border-vexl-black transition-all cursor-pointer text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-20 h-20 bg-vexl-pink rounded-full -translate-x-1/2 translate-y-1/2 opacity-50"></div>
            <div className="text-3xl lg:text-4xl mb-4 uppercase relative z-10" style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}>500M+</div>
            <p className="text-sm lg:text-base font-semibold relative z-10">KYC records leaked in crypto exchange hacks</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-vexl-black border-4 border-vexl-yellow transition-all cursor-pointer text-center relative overflow-hidden"
          >
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-vexl-green-light rounded-full translate-x-1/2 -translate-y-1/2 opacity-30"></div>
            <div className="text-3xl lg:text-4xl text-vexl-yellow mb-4 uppercase relative z-10" style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}>100%</div>
            <p className="text-sm lg:text-base text-vexl-white relative z-10">of your transactions tracked forever</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="p-8 bg-vexl-green-dark text-vexl-white border-4 border-vexl-black transition-all cursor-pointer text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-24 h-24 bg-vexl-yellow rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
            <div className="text-3xl lg:text-4xl mb-4 uppercase relative z-10" style={{ fontFamily: 'Monument Extended', fontWeight: 900 }}>0</div>
            <p className="text-sm lg:text-base relative z-10">privacy once you're in the system</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-20 flex justify-center"
      >
        <div className="inline-flex items-center gap-3 bg-vexl-black px-8 py-4 border-4 border-vexl-yellow">
          <span className="text-2xl md:text-3xl text-vexl-yellow" style={{ fontFamily: 'TT Satoshi', fontWeight: 700 }}>There's a better way</span>
          <motion.svg 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-8 h-8 md:w-10 md:h-10 text-vexl-yellow" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </div>
      </motion.div>
    </div>
  )
}