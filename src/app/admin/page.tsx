'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the workshop editor
    router.push('/admin/workshop')
  }, [router])
  
  return (
    <div className="min-h-screen bg-vexl-black flex items-center justify-center">
      <p className="text-vexl-gray-400">Redirecting to Workshop Editor...</p>
    </div>
  )
}