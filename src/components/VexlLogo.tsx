export default function VexlLogo({ className = "w-32 h-auto" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5L20 30L30 5M30 5L40 30L50 5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M60 10H75V15H65V20H73V25H65V30H75V35H60V10Z" fill="currentColor"/>
      <path d="M80 10L85 20L90 10M90 10L95 20L100 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M105 10H110V30H115V35H105V10Z" fill="currentColor"/>
    </svg>
  )
}