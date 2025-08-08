export default function TimelineModule({ events = [] }: any) {
  return (
    <div className="space-y-4">
      {events.map((event: any, i: number) => (
        <div key={i} className="flex items-start space-x-4">
          <div className="w-3 h-3 bg-vexl-yellow rounded-full mt-1.5 flex-shrink-0"></div>
          <div>
            <p className="text-sm text-vexl-gray-400">{event.date}</p>
            <p className="font-bold text-white">{event.title}</p>
            <p className="text-sm text-vexl-gray-400">{event.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}