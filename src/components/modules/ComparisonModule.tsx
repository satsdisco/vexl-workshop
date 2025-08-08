export default function ComparisonModule({ leftTitle = 'Option A', rightTitle = 'Option B', leftPoints = [], rightPoints = [] }: any) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="vexl-card">
        <h3 className="text-xl font-bold mb-4 text-red-500">{leftTitle}</h3>
        {leftPoints.map((point: any, i: number) => (
          <p key={i} className="text-vexl-gray-400 mb-2">• {point.text}</p>
        ))}
      </div>
      <div className="vexl-card">
        <h3 className="text-xl font-bold mb-4 text-green-500">{rightTitle}</h3>
        {rightPoints.map((point: any, i: number) => (
          <p key={i} className="text-vexl-gray-400 mb-2">✓ {point.text}</p>
        ))}
      </div>
    </div>
  )
}