export default function MarketMapModule({ location = 'Prague', traderCount = 25 }: any) {
  return (
    <div className="vexl-card p-8 text-center">
      <div className="text-6xl mb-4">🗺️</div>
      <h3 className="text-2xl font-bold mb-2">P2P Traders in {location}</h3>
      <p className="text-4xl text-vexl-yellow font-bold">{traderCount}+</p>
      <p className="text-vexl-gray-400 mt-2">Active traders in your area</p>
    </div>
  )
}