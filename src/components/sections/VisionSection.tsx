export default function VisionSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        The Circular Economy Vision
      </h2>

      <div className="space-y-12">
        <div className="text-center">
          <p className="text-2xl text-white/80 mb-8">
            Imagine a world where bitcoin is <span className="text-vexl-orange font-semibold">money</span>,
            <br />
            not just an investment.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-vexl-orange/20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-vexl-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Local First</h3>
            <p className="text-white/60">Buy coffee, pay rent, get paid - all in bitcoin, all in your community</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-vexl-orange/20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-vexl-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No Permission</h3>
            <p className="text-white/60">No banks, no governments, no surveillance. Just people trading value</p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-vexl-orange/20 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-vexl-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Network Effect</h3>
            <p className="text-white/60">Every new user makes the network stronger. Every trade builds the future</p>
          </div>
        </div>

        <div className="bg-vexl-gray/30 p-8 rounded-2xl">
          <h3 className="text-2xl font-semibold mb-4">This is bigger than an app</h3>
          <p className="text-lg text-white/80 mb-4">
            Vexl is infrastructure for the bitcoin circular economy. When you use Vexl, you're not just trading - 
            you're building a parallel economy that can't be stopped, censored, or surveilled.
          </p>
          <p className="text-lg text-white/80">
            Every local community that adopts Vexl becomes a node in a global network of free trade. 
            <span className="text-vexl-orange font-semibold"> Be part of the revolution.</span>
          </p>
        </div>

        <div className="text-center">
          <p className="text-3xl font-bold">
            The best time to start was yesterday.
            <br />
            <span className="text-vexl-orange">The second best time is now.</span>
          </p>
        </div>
      </div>
    </div>
  )
}