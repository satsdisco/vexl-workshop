export default function VexlLogo({ className = "w-32 h-auto" }: { className?: string }) {
  return (
    <div className={`font-black text-6xl tracking-tight ${className}`}>
      VEXL
    </div>
  )
}