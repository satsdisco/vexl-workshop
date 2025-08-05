interface NavigationProps {
  sections: Array<{ id: string; name: string; duration: number }>
  currentSection: number
}

export default function Navigation({ sections, currentSection }: NavigationProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <div className="flex flex-col gap-4">
        {sections.map((section, index) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="group flex items-center gap-3"
            aria-label={`Navigate to ${section.name}`}
          >
            <div className={`nav-dot ${currentSection === index ? 'active' : ''}`} />
            <span className={`text-sm transition-opacity duration-300 ${
              currentSection === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`} style={{ fontFamily: 'TT Satoshi', fontWeight: 500 }}>
              {section.name}
            </span>
          </button>
        ))}
      </div>
    </nav>
  )
}