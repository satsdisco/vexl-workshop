import Image from 'next/image'

export default function VexlLogo({ className = "w-32 h-auto", variant = "white" }: { className?: string; variant?: "white" | "black" }) {
  const logoSrc = variant === "black" 
    ? "/logos/vexl/Logopack/Digital/Vexl logo black on transparent.svg"
    : "/logos/vexl/Logopack/Digital/Vexl logo white on transparent.svg"
    
  return (
    <Image 
      src={logoSrc}
      alt="Vexl"
      width={128}
      height={40}
      className={className}
      priority
    />
  )
}