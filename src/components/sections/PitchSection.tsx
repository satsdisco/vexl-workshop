import VexlLogo from '@/components/VexlLogo'

export default function PitchSection() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className="mb-12">
          <VexlLogo className="w-48 h-auto mx-auto mb-8" />
        </div>
        <h2 className="text-5xl md:text-7xl font-black mb-6">
          P2P Bitcoin trading.<br />
          <span className="text-vexl-gray-500">No KYC. Ever.</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 mb-16">
        <div className="space-y-8">
          <div className="group">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-vexl-yellow">→</span> What?
            </h3>
            <p className="text-vexl-gray-400 pl-8">A mobile app that connects bitcoin buyers and sellers directly. Trade cash for sats with people in your community.</p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-vexl-yellow">→</span> Why?
            </h3>
            <p className="text-vexl-gray-400 pl-8">Because bitcoin was meant to be peer-to-peer. Not peer-to-surveillance-state-to-peer.</p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-vexl-yellow">→</span> Who?
            </h3>
            <p className="text-vexl-gray-400 pl-8">Built by bitcoiners who got tired of the KYC bullshit. For anyone who values privacy and freedom.</p>
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="group">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-vexl-yellow">→</span> When?
            </h3>
            <p className="text-vexl-gray-400 pl-8">Available now. Free forever. No token, no ICO, no bullshit.</p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-vexl-yellow">→</span> Where?
            </h3>
            <p className="text-vexl-gray-400 pl-8">Wherever people want to trade bitcoin for cash. Starting with your local community.</p>
          </div>
          <div className="group">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span className="text-vexl-yellow">→</span> How?
            </h3>
            <p className="text-vexl-gray-400 pl-8">No email. No phone number. No ID. Just install and start trading. Let me show you...</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <div className="inline-flex items-center gap-6 vexl-card">
          <span className="text-sm text-vexl-gray-500">Available on</span>
          <span className="font-bold text-xl">iOS</span>
          <span className="text-vexl-gray-700">•</span>
          <span className="font-bold text-xl">Android</span>
        </div>
      </div>
    </div>
  )
}