'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to the CMS admin
    router.push('/admin/cms')
  }, [router])
  
  return (
    <div className="min-h-screen bg-vexl-black flex items-center justify-center">
      <p className="text-vexl-gray-400">Redirecting to CMS...</p>
    </div>
  )
}