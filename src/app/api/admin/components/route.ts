import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET component data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const componentId = searchParams.get('id')
    const componentType = searchParams.get('type')
    
    if (componentId) {
      // Get specific component
      const component = await prisma.componentData.findUnique({
        where: { componentId }
      })
      
      if (!component) {
        return NextResponse.json({ 
          success: false, 
          error: 'Component not found' 
        }, { status: 404 })
      }
      
      return NextResponse.json({ 
        success: true, 
        component: {
          ...component,
          data: JSON.parse(component.data),
          config: JSON.parse(component.config),
          toggles: JSON.parse(component.toggles)
        }
      })
    }
    
    // Get all components or by type
    const where = componentType ? { componentType } : {}
    const components = await prisma.componentData.findMany({
      where: { ...where, isActive: true }
    })
    
    const parsed = components.map(c => ({
      ...c,
      data: JSON.parse(c.data),
      config: JSON.parse(c.config),
      toggles: JSON.parse(c.toggles)
    }))
    
    return NextResponse.json({ success: true, components: parsed })
  } catch (error) {
    console.error('Failed to fetch components:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch component data' 
    }, { status: 500 })
  }
}

// POST/PUT component data
export async function POST(request: NextRequest) {
  try {
    const { componentId, componentType, data, config, toggles } = await request.json()
    
    const component = await prisma.componentData.upsert({
      where: { componentId },
      update: {
        componentType,
        data: JSON.stringify(data),
        config: JSON.stringify(config || {}),
        toggles: JSON.stringify(toggles || {}),
        version: { increment: 1 }
      },
      create: {
        componentId,
        componentType,
        data: JSON.stringify(data),
        config: JSON.stringify(config || {}),
        toggles: JSON.stringify(toggles || {})
      }
    })
    
    // Save version
    await prisma.contentVersion.create({
      data: {
        entityType: 'component',
        entityId: component.id,
        content: JSON.stringify({ data, config, toggles }),
        version: component.version
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      component,
      message: 'Component data saved successfully' 
    })
  } catch (error) {
    console.error('Failed to save component:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save component data' 
    }, { status: 500 })
  }
}