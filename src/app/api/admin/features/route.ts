import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { defaultFeatures } from '@/lib/features'

export async function GET(request: NextRequest) {
  try {
    // Get features from database or return defaults
    const dbFeatures = await prisma.featureConfig.findMany({
      orderBy: { featureId: 'asc' }
    })
    
    if (dbFeatures.length === 0) {
      // Initialize with defaults if empty
      for (const feature of defaultFeatures) {
        await prisma.featureConfig.create({
          data: {
            featureId: feature.id,
            name: feature.name,
            description: feature.description,
            enabled: feature.enabled,
            section: feature.section,
            settings: feature.settings || {}
          }
        })
      }
      return NextResponse.json({ success: true, features: defaultFeatures })
    }
    
    // Convert database format to feature format
    const features = dbFeatures.map(f => ({
      id: f.featureId,
      name: f.name,
      description: f.description,
      enabled: f.enabled,
      section: f.section || undefined,
      settings: f.settings as Record<string, any>
    }))
    
    return NextResponse.json({ success: true, features })
  } catch (error) {
    console.error('Failed to fetch features:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch features',
      features: defaultFeatures 
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { features } = await request.json()
    
    if (!features || !Array.isArray(features)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid features data' 
      }, { status: 400 })
    }
    
    // Update or create each feature
    for (const feature of features) {
      await prisma.featureConfig.upsert({
        where: { featureId: feature.id },
        update: {
          name: feature.name,
          description: feature.description,
          enabled: feature.enabled,
          section: feature.section,
          settings: feature.settings || {}
        },
        create: {
          featureId: feature.id,
          name: feature.name,
          description: feature.description,
          enabled: feature.enabled,
          section: feature.section,
          settings: feature.settings || {}
        }
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Features updated successfully' 
    })
  } catch (error) {
    console.error('Failed to save features:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save features' 
    }, { status: 500 })
  }
}