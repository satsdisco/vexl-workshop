import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET feature toggles
export async function GET(request: NextRequest) {
  try {
    const features = await prisma.featureToggle.findMany({
      orderBy: { feature: 'asc' }
    })
    
    // Convert to object for easier access
    const toggles = features.reduce((acc, f) => {
      acc[f.feature] = {
        enabled: f.enabled,
        section: f.section,
        config: f.config ? JSON.parse(f.config) : null
      }
      return acc
    }, {} as Record<string, any>)
    
    return NextResponse.json({ success: true, features: toggles })
  } catch (error) {
    console.error('Failed to fetch features:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch feature toggles' 
    }, { status: 500 })
  }
}

// POST toggle feature
export async function POST(request: NextRequest) {
  try {
    const { feature, enabled, section, config } = await request.json()
    
    const toggle = await prisma.featureToggle.upsert({
      where: { feature },
      update: {
        enabled,
        section,
        config: config ? JSON.stringify(config) : null
      },
      create: {
        feature,
        enabled,
        section,
        config: config ? JSON.stringify(config) : null
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      toggle,
      message: `Feature ${feature} ${enabled ? 'enabled' : 'disabled'}` 
    })
  } catch (error) {
    console.error('Failed to toggle feature:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to toggle feature' 
    }, { status: 500 })
  }
}

// PATCH bulk update features
export async function PATCH(request: NextRequest) {
  try {
    const { features } = await request.json()
    
    const updates = await Promise.all(
      Object.entries(features).map(([feature, config]: [string, any]) =>
        prisma.featureToggle.upsert({
          where: { feature },
          update: {
            enabled: config.enabled,
            section: config.section,
            config: config.config ? JSON.stringify(config.config) : null
          },
          create: {
            feature,
            enabled: config.enabled,
            section: config.section,
            config: config.config ? JSON.stringify(config.config) : null
          }
        })
      )
    )
    
    return NextResponse.json({ 
      success: true, 
      updates: updates.length,
      message: 'Features updated successfully' 
    })
  } catch (error) {
    console.error('Failed to update features:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update features' 
    }, { status: 500 })
  }
}