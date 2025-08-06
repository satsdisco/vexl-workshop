'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  fallback?: string
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  fallback = '/images/placeholder.svg'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.01
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  // Generate blur placeholder if not provided
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL
    
    // Simple SVG blur placeholder
    const svg = `
      <svg width="${width || 100}" height="${height || 100}" xmlns="http://www.w3.org/2000/svg">
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
        </filter>
        <rect width="100%" height="100%" fill="#1a1a1a" filter="url(#blur)" />
      </svg>
    `
    // Use btoa for browser compatibility
    return `data:image/svg+xml;base64,${btoa(svg)}`
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-vexl-gray-800 animate-pulse" />
      )}

      {/* Error fallback */}
      {hasError && fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-vexl-gray-900">
          <Image
            src={fallback}
            alt={alt}
            width={width || 100}
            height={height || 100}
            className="opacity-50"
          />
        </div>
      )}

      {/* Main image */}
      {isInView && !hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full h-full"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            quality={quality}
            priority={priority}
            placeholder={placeholder}
            blurDataURL={placeholder === 'blur' ? getBlurDataURL() : undefined}
            onLoad={handleLoad}
            onError={handleError}
            className={`object-cover ${className}`}
            fill={!width || !height}
            sizes={!width || !height ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
          />
        </motion.div>
      )}
    </div>
  )
}