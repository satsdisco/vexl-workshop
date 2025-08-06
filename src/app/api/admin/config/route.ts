import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET configuration
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    const category = searchParams.get('category')
    
    if (key) {
      // Get specific config
      const config = await prisma.globalConfig.findUnique({
        where: { key }
      })
      
      if (!config) {
        return NextResponse.json({ 
          success: false, 
          error: 'Configuration not found' 
        }, { status: 404 })
      }
      
      return NextResponse.json({ 
        success: true, 
        config: {
          ...config,
          value: JSON.parse(config.value)
        }
      })
    }
    
    // Get all configs or by category
    const where = category ? { category } : {}
    const configs = await prisma.globalConfig.findMany({ where })
    
    const parsed = configs.map(c => ({
      ...c,
      value: JSON.parse(c.value)
    }))
    
    return NextResponse.json({ success: true, configs: parsed })
  } catch (error) {
    console.error('Failed to fetch config:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch configuration' 
    }, { status: 500 })
  }
}

// POST/PUT configuration
export async function POST(request: NextRequest) {
  try {
    const { key, value, category, description } = await request.json()
    
    const config = await prisma.globalConfig.upsert({
      where: { key },
      update: {
        value: JSON.stringify(value),
        category,
        description
      },
      create: {
        key,
        value: JSON.stringify(value),
        category,
        description
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      config,
      message: 'Configuration saved successfully' 
    })
  } catch (error) {
    console.error('Failed to save config:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save configuration' 
    }, { status: 500 })
  }
}