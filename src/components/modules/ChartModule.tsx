export default function ChartModule({ title = 'Chart', data = [] }: any) {
  const maxValue = Math.max(...data.map((d: any) => d.value || 0), 1)
  return (
    <div className="vexl-card p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item: any, i: number) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{item.label}</span>
              <span className="text-sm font-bold">{item.value}</span>
            </div>
            <div className="w-full bg-vexl-gray-800 rounded-full h-2">
              <div 
                className="bg-vexl-yellow h-2 rounded-full transition-all duration-500"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}