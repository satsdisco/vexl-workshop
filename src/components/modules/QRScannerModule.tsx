export default function QRScannerModule({ instructions = 'Scan QR Code' }: any) {
  return (
    <div className="vexl-card p-8 text-center">
      <div className="text-6xl mb-4">📱</div>
      <p className="text-xl text-white mb-4">{instructions}</p>
      <div className="w-48 h-48 mx-auto bg-vexl-gray-800 rounded-lg flex items-center justify-center">
        <span className="text-vexl-gray-400">QR Scanner Demo</span>
      </div>
    </div>
  )
}