import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const hasPassword = !!process.env.ADMIN_PASSWORD
  const passwordLength = process.env.ADMIN_PASSWORD?.length || 0
  
  return NextResponse.json({
    hasPassword,
    passwordLength,
    nodeEnv: process.env.NODE_ENV,
    // Show first 4 chars only for debugging
    passwordPrefix: process.env.ADMIN_PASSWORD?.substring(0, 4) || 'NOT_SET'
  })
}