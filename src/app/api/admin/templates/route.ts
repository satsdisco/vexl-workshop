import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET templates
export async function GET(request: NextRequest) {
  try {
    const templates = await prisma.presetTemplate.findMany({
      orderBy: { name: 'asc' }
    })
    
    const parsed = templates.map(t => ({
      ...t,
      config: JSON.parse(t.config),
      slides: JSON.parse(t.slides),
      components: JSON.parse(t.components)
    }))
    
    return NextResponse.json({ success: true, templates: parsed })
  } catch (error) {
    console.error('Failed to fetch templates:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch templates' 
    }, { status: 500 })
  }
}

// POST create/update template
export async function POST(request: NextRequest) {
  try {
    const { name, description, config, slides, components, isDefault } = await request.json()
    
    // If setting as default, unset other defaults
    if (isDefault) {
      await prisma.presetTemplate.updateMany({
        where: { isDefault: true },
        data: { isDefault: false }
      })
    }
    
    const template = await prisma.presetTemplate.upsert({
      where: { name },
      update: {
        description,
        config: JSON.stringify(config),
        slides: JSON.stringify(slides),
        components: JSON.stringify(components),
        isDefault
      },
      create: {
        name,
        description,
        config: JSON.stringify(config),
        slides: JSON.stringify(slides),
        components: JSON.stringify(components),
        isDefault
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      template,
      message: `Template "${name}" saved successfully` 
    })
  } catch (error) {
    console.error('Failed to save template:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save template' 
    }, { status: 500 })
  }
}

// PUT apply template
export async function PUT(request: NextRequest) {
  try {
    const { templateName } = await request.json()
    
    const template = await prisma.presetTemplate.findUnique({
      where: { name: templateName }
    })
    
    if (!template) {
      return NextResponse.json({ 
        success: false, 
        error: 'Template not found' 
      }, { status: 404 })
    }
    
    const config = JSON.parse(template.config)
    const slides = JSON.parse(template.slides)
    const components = JSON.parse(template.components)
    
    // Apply slide content
    for (const [sectionId, content] of Object.entries(slides)) {
      const { title, subtitle, description, cta, ...rest } = content as any
      await prisma.slideContent.upsert({
        where: { sectionId },
        update: {
          title,
          subtitle,
          description,
          cta,
          content: JSON.stringify(rest)
        },
        create: {
          sectionId,
          title,
          subtitle,
          description,
          cta,
          content: JSON.stringify(rest)
        }
      })
    }
    
    // Apply component data
    for (const [componentId, data] of Object.entries(components)) {
      const { type, items, config: compConfig, toggles } = data as any
      await prisma.componentData.upsert({
        where: { componentId },
        update: {
          componentType: type,
          data: JSON.stringify(items || []),
          config: JSON.stringify(compConfig || {}),
          toggles: JSON.stringify(toggles || {})
        },
        create: {
          componentId,
          componentType: type,
          data: JSON.stringify(items || []),
          config: JSON.stringify(compConfig || {}),
          toggles: JSON.stringify(toggles || {})
        }
      })
    }
    
    // Apply global config
    for (const [key, value] of Object.entries(config)) {
      await prisma.globalConfig.upsert({
        where: { key },
        update: {
          value: JSON.stringify(value),
          category: 'template'
        },
        create: {
          key,
          value: JSON.stringify(value),
          category: 'template'
        }
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Template "${templateName}" applied successfully` 
    })
  } catch (error) {
    console.error('Failed to apply template:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to apply template' 
    }, { status: 500 })
  }
}