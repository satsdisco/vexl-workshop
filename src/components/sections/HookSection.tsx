export default function HookSection() {
  return (
    <div className="max-w-5xl mx-auto text-center">
      <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
        <span className="text-vexl-yellow">KYC</span> is killing<br />Bitcoin
      </h1>
      
      <div className="space-y-8 text-xl md:text-2xl text-vexl-gray-400 max-w-3xl mx-auto">
        <p className="font-medium">
          Every time you upload your ID to buy bitcoin,
          <br />
          you're building the surveillance state.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="vexl-card group hover:border-vexl-yellow transition-all">
            <div className="text-5xl font-black text-vexl-white mb-3">500M+</div>
            <p className="text-sm text-vexl-gray-500">KYC records leaked in crypto exchange hacks</p>
          </div>
          <div className="vexl-card group hover:border-vexl-yellow transition-all">
            <div className="text-5xl font-black text-vexl-white mb-3">100%</div>
            <p className="text-sm text-vexl-gray-500">of your transactions tracked forever</p>
          </div>
          <div className="vexl-card group hover:border-vexl-yellow transition-all">
            <div className="text-5xl font-black text-vexl-white mb-3">0</div>
            <p className="text-sm text-vexl-gray-500">privacy once you're in the system</p>
          </div>
        </div>
      </div>

      <div className="mt-20 inline-flex items-center gap-3">
        <span className="text-2xl font-bold">There's a better way</span>
        <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
  )
}