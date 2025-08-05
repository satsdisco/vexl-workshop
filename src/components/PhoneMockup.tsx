'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

interface PhoneMockupProps {
  children?: ReactNode
  imageSrc?: string
  imageAlt?: string
  className?: string
}

export default function PhoneMockup({ children, imageSrc, imageAlt, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto max-w-sm ${className}`}>
      <div className="relative bg-black rounded-[3rem] p-3 shadow-2xl border border-vexl-gray-800">
        <div className="bg-vexl-gray-900 rounded-[2.5rem] p-2">
          <div className="relative aspect-[9/19.5] rounded-[2.25rem] overflow-hidden bg-black">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt || 'App screenshot'}
                fill
                className="object-cover object-top"
                priority
              />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    </div>
  )
}