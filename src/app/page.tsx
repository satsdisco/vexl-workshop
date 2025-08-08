'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Presentation, BookOpen, Gamepad2, Users, 
  ArrowRight, ExternalLink, Github, FileText,
  Palette, Play, Sparkles, Zap, Globe,
  ChevronRight, Download
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const mainProjects = [
    {
      title: 'Workshop Presentation',
      description: 'Interactive presentation explaining Vexl\'s vision for peer-to-peer Bitcoin trading',
      icon: Presentation,
      href: '/workshop',
      color: 'from-vexl-yellow to-yellow-600',
      badge: 'Interactive',
      features: ['11 Slides', 'Keyboard Navigation', 'Edit Mode']
    },
    {
      title: 'Vexl Jeopardy',
      description: 'Test your knowledge about Bitcoin, privacy, and Vexl in a fun game format',
      icon: Gamepad2,
      href: '/jeopardy',
      color: 'from-vexl-green to-green-600',
      badge: 'Game',
      features: ['Multiple Categories', 'Score Tracking', 'Team Play'],
      comingSoon: true
    },
    {
      title: 'Family Feud: Vexl Edition',
      description: 'Survey says... Learn about Vexl through this popular game show format',
      icon: Users,
      href: '/family-feud',
      color: 'from-vexl-blue to-blue-600',
      badge: 'Game',
      features: ['Survey Questions', 'Multiplayer', 'Sound Effects'],
      comingSoon: true
    }
  ]

  const brandAssets = [
    {
      title: 'Brand Manual',
      description: 'Complete brand guidelines and visual identity',
      icon: BookOpen,
      href: '/brand-manual',
      external: false
    },
    {
      title: 'Logo Assets',
      description: 'Download logos in various formats',
      icon: Palette,
      href: '/assets/logos',
      external: false
    },
    {
      title: 'Typography Guide',
      description: 'Font usage and text styling rules',
      icon: FileText,
      href: '/assets/typography',
      external: false
    },
    {
      title: 'Color Palette',
      description: 'Official Vexl colors and usage',
      icon: Sparkles,
      href: '/assets/colors',
      external: false
    }
  ]

  const quickLinks = [
    {
      title: 'Vexl Website',
      href: 'https://vexl.it',
      icon: Globe,
      external: true
    },
    {
      title: 'GitHub',
      href: 'https://github.com/vexl-it',
      icon: Github,
      external: true
    },
    {
      title: 'Download App',
      href: 'https://vexl.it/download',
      icon: Download,
      external: true
    }
  ]

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-vexl-yellow/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-vexl-green/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-vexl-gray-800 bg-vexl-black/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              <VexlLogo />
              <div>
                <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Monument Extended' }}>
                  Vexl Hub
                </h1>
                <p className="text-sm text-vexl-gray-400">Educational Resources & Tools</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4"
            >
              {quickLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="p-2 text-vexl-gray-400 hover:text-white transition-colors"
                  title={link.title}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Monument Extended' }}>
              Welcome to <span className="text-vexl-yellow">Vexl Hub</span>
            </h2>
            <p className="text-xl text-vexl-gray-300 max-w-3xl mx-auto mb-8">
              Your gateway to all Vexl educational resources, interactive presentations, 
              brand assets, and community tools.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Link
                href="/workshop"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-vexl-yellow text-black rounded-lg font-semibold hover:bg-vexl-yellow/90 transition-all transform hover:scale-105"
              >
                <Play className="w-5 h-5" />
                <span>Launch Workshop</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/admin"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-vexl-gray-800 text-white rounded-lg font-semibold hover:bg-vexl-gray-700 transition-all"
              >
                <span>Admin Panel</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Projects Grid */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Interactive Projects</h3>
            <p className="text-vexl-gray-400">Engage with Vexl through presentations and games</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainProjects.map((project, index) => (
              <motion.div
                key={project.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link
                  href={project.comingSoon ? '#' : project.href}
                  className={`
                    block relative group h-full
                    ${project.comingSoon ? 'cursor-not-allowed' : ''}
                  `}
                >
                  <div className={`
                    relative overflow-hidden rounded-2xl border-2 border-vexl-gray-800 
                    bg-gradient-to-br from-vexl-gray-900 to-vexl-black
                    hover:border-vexl-yellow transition-all duration-300
                    ${project.comingSoon ? 'opacity-60' : 'group-hover:transform group-hover:scale-105'}
                  `}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    
                    {/* Content */}
                    <div className="relative p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className={`p-3 bg-gradient-to-br ${project.color} rounded-xl`}>
                          <project.icon className="w-8 h-8 text-white" />
                        </div>
                        <span className={`
                          px-3 py-1 text-xs font-bold rounded-full
                          ${project.comingSoon 
                            ? 'bg-vexl-gray-800 text-vexl-gray-400' 
                            : 'bg-vexl-yellow/20 text-vexl-yellow'
                          }
                        `}>
                          {project.comingSoon ? 'Coming Soon' : project.badge}
                        </span>
                      </div>

                      <h4 className="text-2xl font-bold text-white mb-3">
                        {project.title}
                      </h4>
                      
                      <p className="text-vexl-gray-300 mb-6">
                        {project.description}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.features.map((feature) => (
                          <span 
                            key={feature}
                            className="px-3 py-1 bg-vexl-gray-800 text-vexl-gray-300 text-sm rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Action */}
                      <div className={`
                        flex items-center text-vexl-yellow font-semibold
                        ${project.comingSoon ? '' : 'group-hover:translate-x-2 transition-transform'}
                      `}>
                        <span>{project.comingSoon ? 'In Development' : 'Launch Project'}</span>
                        {!project.comingSoon && <ChevronRight className="w-5 h-5 ml-2" />}
                      </div>
                    </div>

                    {/* Hover Effect */}
                    {!project.comingSoon && (
                      <div className="absolute inset-0 bg-vexl-yellow opacity-0 group-hover:opacity-5 transition-opacity" />
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets Section */}
      <section className="relative z-10 py-16 border-t border-vexl-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Brand Resources</h3>
            <p className="text-vexl-gray-400">Access brand guidelines, assets, and documentation</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandAssets.map((asset, index) => (
              <motion.div
                key={asset.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Link
                  href={asset.href}
                  className="block group"
                >
                  <div className="p-6 bg-vexl-gray-900 rounded-xl border border-vexl-gray-800 hover:border-vexl-yellow transition-all hover:transform hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      <asset.icon className="w-6 h-6 text-vexl-yellow" />
                      <ExternalLink className="w-4 h-4 text-vexl-gray-600 group-hover:text-vexl-yellow transition-colors" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {asset.title}
                    </h4>
                    <p className="text-sm text-vexl-gray-400">
                      {asset.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-vexl-yellow mb-2">11</div>
              <div className="text-vexl-gray-400">Workshop Slides</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-vexl-green mb-2">3</div>
              <div className="text-vexl-gray-400">Interactive Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-vexl-blue mb-2">20+</div>
              <div className="text-vexl-gray-400">Brand Assets</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-vexl-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <VexlLogo />
              <div>
                <p className="text-sm text-vexl-gray-400">
                  © 2024 Vexl. Building the future of peer-to-peer Bitcoin trading.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <a href="https://vexl.it" target="_blank" rel="noopener noreferrer" className="text-vexl-gray-400 hover:text-white transition-colors">
                Website
              </a>
              <a href="https://github.com/vexl-it" target="_blank" rel="noopener noreferrer" className="text-vexl-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com/vexl" target="_blank" rel="noopener noreferrer" className="text-vexl-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}