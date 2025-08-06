import { NextRequest, NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/seed-database'

export async function POST(request: NextRequest) {
  try {
    // Proper token-based auth check
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 })
    }
    
    // Validate the token
    const token = authHeader.split(' ')[1]
    const { prisma } = await import('@/lib/prisma')
    const session = await prisma.adminSession.findUnique({
      where: { token }
    })
    
    if (!session || session.expiresAt < new Date()) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid or expired token' 
      }, { status: 401 })
    }
    
    const result = await seedDatabase()
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Database seeded successfully' 
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to seed database' 
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to seed database' 
    }, { status: 500 })
  }
}

// GET endpoint to check if data exists
export async function GET(request: NextRequest) {
  try {
    const { prisma } = await import('@/lib/prisma')
    
    const slideCount = await prisma.slideContent.count()
    const componentCount = await prisma.componentData.count()
    const featureCount = await prisma.featureToggle.count()
    const configCount = await prisma.globalConfig.count()
    
    return NextResponse.json({ 
      success: true,
      counts: {
        slides: slideCount,
        components: componentCount,
        features: featureCount,
        configs: configCount
      },
      hasData: slideCount > 0
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to check database' 
    }, { status: 500 })
  }
}