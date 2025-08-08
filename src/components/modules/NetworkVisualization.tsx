'use client'

import { useEffect, useRef, useState } from 'react'

interface Node {
  id: string
  label: string
  type: 'primary' | 'bridge' | 'vexl' | 'normal'
  x: number
  y: number
}

interface Connection {
  from: string
  to: string
  strength: 'strong' | 'medium' | 'weak' | 'bridge'
}

interface NetworkVisualizationProps {
  config?: {
    nodes?: Node[]
    connections?: Connection[]
    stats?: {
      totalConnections: number
      vexlUsers: number
      bridges: number
    }
    showLabels?: boolean
    animated?: boolean
    interactive?: boolean
  }
  width?: number
  height?: number
}

export default function NetworkVisualization({ config, width = 600, height = 400 }: NetworkVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const defaultNodes: Node[] = [
    { id: 'you', label: 'You', type: 'primary', x: 50, y: 50 },
    { id: 'mom', label: 'Your Mom', type: 'bridge', x: 70, y: 30 },
    { id: 'friend', label: 'Best Friend', type: 'vexl', x: 30, y: 70 },
    { id: 'coworker', label: 'Coworker', type: 'normal', x: 80, y: 60 },
    { id: 'barber', label: 'Your Barber', type: 'bridge', x: 20, y: 40 }
  ]

  const defaultConnections: Connection[] = [
    { from: 'you', to: 'mom', strength: 'strong' },
    { from: 'you', to: 'friend', strength: 'strong' },
    { from: 'you', to: 'coworker', strength: 'medium' },
    { from: 'you', to: 'barber', strength: 'weak' },
    { from: 'mom', to: 'friend', strength: 'bridge' }
  ]

  const nodes = config?.nodes || defaultNodes
  const connections = config?.connections || defaultConnections
  const showLabels = config?.showLabels !== false
  const animated = config?.animated !== false
  const stats = config?.stats || { totalConnections: 15, vexlUsers: 6, bridges: 3 }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      connections.forEach(connection => {
        const fromNode = nodes.find(n => n.id === connection.from)
        const toNode = nodes.find(n => n.id === connection.to)
        if (!fromNode || !toNode) return

        const fromX = (fromNode.x / 100) * width
        const fromY = (fromNode.y / 100) * height
        const toX = (toNode.x / 100) * width
        const toY = (toNode.y / 100) * height

        ctx.beginPath()
        ctx.moveTo(fromX, fromY)
        ctx.lineTo(toX, toY)

        // Connection styling based on strength
        switch (connection.strength) {
          case 'strong':
            ctx.strokeStyle = '#FFD700'
            ctx.lineWidth = 3
            break
          case 'medium':
            ctx.strokeStyle = '#90EE90'
            ctx.lineWidth = 2
            break
          case 'weak':
            ctx.strokeStyle = '#87CEEB'
            ctx.lineWidth = 1
            break
          case 'bridge':
            ctx.strokeStyle = '#FF69B4'
            ctx.lineWidth = 2
            ctx.setLineDash([5, 5])
            break
        }

        if (animated) {
          ctx.globalAlpha = 0.6 + Math.sin(timeRef.current * 0.002) * 0.4
        }

        ctx.stroke()
        ctx.setLineDash([])
        ctx.globalAlpha = 1

        // Draw animated particles along connections
        if (animated) {
          const progress = (timeRef.current * 0.001) % 1
          const particleX = fromX + (toX - fromX) * progress
          const particleY = fromY + (toY - fromY) * progress
          
          ctx.beginPath()
          ctx.arc(particleX, particleY, 3, 0, Math.PI * 2)
          ctx.fillStyle = '#FFD700'
          ctx.fill()
        }
      })

      // Draw nodes
      nodes.forEach(node => {
        const x = (node.x / 100) * width
        const y = (node.y / 100) * height
        const isHovered = hoveredNode === node.id

        // Node circle
        ctx.beginPath()
        ctx.arc(x, y, isHovered ? 25 : 20, 0, Math.PI * 2)

        // Node styling based on type
        switch (node.type) {
          case 'primary':
            ctx.fillStyle = '#FFD700'
            break
          case 'bridge':
            ctx.fillStyle = '#FF69B4'
            break
          case 'vexl':
            ctx.fillStyle = '#90EE90'
            break
          default:
            ctx.fillStyle = '#87CEEB'
        }

        ctx.fill()
        ctx.strokeStyle = '#FFFFFF'
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw label
        if (showLabels) {
          ctx.fillStyle = '#FFFFFF'
          ctx.font = `${isHovered ? '14px' : '12px'} sans-serif`
          ctx.textAlign = 'center'
          ctx.fillText(node.label, x, y + 35)
        }

        // Draw icon in node
        ctx.fillStyle = '#000000'
        ctx.font = '16px sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        if (node.type === 'primary') ctx.fillText('👤', x, y)
        else if (node.type === 'bridge') ctx.fillText('🌉', x, y)
        else if (node.type === 'vexl') ctx.fillText('V', x, y)
      })

      if (animated) {
        timeRef.current += 16
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [nodes, connections, width, height, showLabels, animated, hoveredNode])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!config?.interactive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    let foundNode: string | null = null
    nodes.forEach(node => {
      const nodeX = (node.x / 100) * width
      const nodeY = (node.y / 100) * height
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2)
      if (distance < 25) {
        foundNode = node.id
      }
    })

    setHoveredNode(foundNode)
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-full"
        onMouseMove={handleMouseMove}
        style={{ cursor: hoveredNode ? 'pointer' : 'default' }}
      />
      
      {/* Stats overlay */}
      <div className="absolute top-4 right-4 bg-black/80 rounded-lg p-3 text-white">
        <div className="text-xs font-semibold mb-2">Network Stats</div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Total Connections</span>
            <span className="font-bold text-vexl-yellow">{stats.totalConnections}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Vexl Users</span>
            <span className="font-bold text-green-400">{stats.vexlUsers}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Bridge Connections</span>
            <span className="font-bold text-pink-400">{stats.bridges}</span>
          </div>
        </div>
      </div>
    </div>
  )
}