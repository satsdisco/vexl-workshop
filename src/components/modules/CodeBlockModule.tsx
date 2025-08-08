export default function CodeBlockModule({ code = '', title = '' }: any) {
  return (
    <div className="bg-vexl-gray-900 rounded-lg p-4">
      {title && <p className="text-sm text-vexl-gray-400 mb-2">{title}</p>}
      <pre className="text-sm text-white font-mono overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  )
}