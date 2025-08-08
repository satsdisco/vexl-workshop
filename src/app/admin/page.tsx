'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Edit3, Layers, LogOut, ArrowRight,
  Palette, Database, Eye
} from 'lucide-react'
import VexlLogo from '@/components/VexlLogo'

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('vexl-admin-token')
    if (!token) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('vexl-admin-token')
    router.push('/admin/login')
  }

  const adminTools = [
    {
      title: 'Ultimate Slide Editor',
      description: 'The best way to edit and create slides',
      icon: Edit3,
      href: '/admin/ultimate-editor',
      color: 'bg-vexl-yellow',
      primary: true
    },
    {
      title: 'Visual Editor (Classic)',
      description: 'Original workshop content editor',
      icon: Layers,
      href: '/admin/workshop-visual-editor',
      color: 'bg-vexl-green'
    },
    {
      title: 'Asset Library',
      description: 'Browse available components and modules',
      icon: Palette,
      href: '/admin/assets',
      color: 'bg-vexl-blue'
    },
    {
      title: 'View Workshop',
      description: 'Preview the live workshop presentation',
      icon: Eye,
      href: '/',
      color: 'bg-vexl-purple',
      external: true
    }
  ]

  return (
    <div className="min-h-screen bg-vexl-black">
      {/* Header */}
      <div className="bg-vexl-gray-900 border-b border-vexl-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <VexlLogo />
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-vexl-gray-800 text-white rounded hover:bg-vexl-gray-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Workshop Management</h2>
          <p className="text-vexl-gray-400">Manage your Vexl workshop content and presentation</p>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              target={tool.external ? '_blank' : undefined}
              className={`
                relative group overflow-hidden rounded-lg border-2 
                ${tool.primary ? 'border-vexl-yellow' : 'border-vexl-gray-800'}
                hover:border-vexl-yellow transition-all duration-300
              `}
            >
              <div className="p-6 bg-vexl-gray-900">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${tool.color} rounded-lg`}>
                    <tool.icon className="w-6 h-6 text-vexl-black" />
                  </div>
                  {tool.primary && (
                    <span className="px-2 py-1 bg-vexl-yellow text-vexl-black text-xs font-bold rounded">
                      MAIN
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2">
                  {tool.title}
                </h3>
                
                <p className="text-vexl-gray-400 text-sm mb-4">
                  {tool.description}
                </p>

                <div className="flex items-center text-vexl-yellow group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-medium">
                    {tool.external ? 'Open' : 'Launch'}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-vexl-yellow opacity-0 group-hover:opacity-5 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-vexl-gray-900 rounded-lg p-6 border border-vexl-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vexl-gray-400 text-sm">Total Sections</p>
                <p className="text-2xl font-bold text-white mt-1">11</p>
              </div>
              <Database className="w-8 h-8 text-vexl-gray-600" />
            </div>
          </div>
          
          <div className="bg-vexl-gray-900 rounded-lg p-6 border border-vexl-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vexl-gray-400 text-sm">Components</p>
                <p className="text-2xl font-bold text-white mt-1">20+</p>
              </div>
              <Palette className="w-8 h-8 text-vexl-gray-600" />
            </div>
          </div>
          
          <div className="bg-vexl-gray-900 rounded-lg p-6 border border-vexl-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-vexl-gray-400 text-sm">Last Updated</p>
                <p className="text-2xl font-bold text-white mt-1">Today</p>
              </div>
              <Edit3 className="w-8 h-8 text-vexl-gray-600" />
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-vexl-gray-900 rounded-lg p-6 border border-vexl-gray-800">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Guide</h3>
          <ul className="space-y-2 text-sm text-vexl-gray-400">
            <li className="flex items-start">
              <span className="text-vexl-yellow mr-2">•</span>
              <span>Use the <strong className="text-white">Workshop Visual Editor</strong> to edit all workshop content and see live previews</span>
            </li>
            <li className="flex items-start">
              <span className="text-vexl-yellow mr-2">•</span>
              <span>Browse the <strong className="text-white">Asset Library</strong> to see all available components and modules</span>
            </li>
            <li className="flex items-start">
              <span className="text-vexl-yellow mr-2">•</span>
              <span>Changes save automatically and update the live workshop within 2 seconds</span>
            </li>
            <li className="flex items-start">
              <span className="text-vexl-yellow mr-2">•</span>
              <span>Use arrow keys to navigate between sections in the workshop</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}