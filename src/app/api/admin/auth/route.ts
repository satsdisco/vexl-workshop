import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_PASSWORD) {
  throw new Error('ADMIN_PASSWORD environment variable is not set')
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (password === ADMIN_PASSWORD) {
      // Generate secure token
      const token = crypto.randomBytes(32).toString('hex')
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
      
      // Save session to database
      await prisma.adminSession.create({
        data: {
          token,
          expiresAt
        }
      })
      
      // Clean up expired sessions
      await prisma.adminSession.deleteMany({
        where: {
          expiresAt: {
            lt: new Date()
          }
        }
      })
      
      return NextResponse.json({ 
        success: true,
        token
      })
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid password' 
    }, { status: 401 })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Authentication failed' 
    }, { status: 500 })
  }
}

// GET validate token
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        success: false, 
        error: 'No token provided' 
      }, { status: 401 })
    }
    
    const token = authHeader.split(' ')[1]
    
    const session = await prisma.adminSession.findUnique({
      where: { token }
    })
    
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid or expired token' 
      }, { status: 401 })
    }
    
    return NextResponse.json({ 
      success: true,
      valid: true
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Token validation failed' 
    }, { status: 500 })
  }
}