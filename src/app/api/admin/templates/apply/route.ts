import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { templates } from '@/lib/templates'

export async function POST(request: NextRequest) {
  try {
    const { templateKey } = await request.json()
    
    const template = templates[templateKey as keyof typeof templates]
    if (!template) {
      return NextResponse.json({ 
        success: false, 
        error: 'Template not found' 
      }, { status: 404 })
    }
    
    console.log(`Applying template: ${template.name}`)
    
    // Apply slide content
    if (template.slides) {
      for (const [sectionId, content] of Object.entries(template.slides)) {
        const { title, subtitle, description, cta, ...rest } = content as any
        
        await prisma.slideContent.upsert({
          where: { sectionId },
          update: {
            title: title || null,
            subtitle: subtitle || null,
            description: description || null,
            cta: cta || null,
            content: JSON.stringify(rest),
            version: { increment: 1 }
          },
          create: {
            sectionId,
            title: title || null,
            subtitle: subtitle || null,
            description: description || null,
            cta: cta || null,
            content: JSON.stringify(rest)
          }
        })
      }
    }
    
    // Apply features
    if (template.features) {
      for (const [feature, enabled] of Object.entries(template.features)) {
        await prisma.featureToggle.upsert({
          where: { feature },
          update: { enabled: enabled as boolean },
          create: { 
            feature, 
            enabled: enabled as boolean,
            section: null
          }
        })
      }
    }
    
    // Apply config
    if (template.config) {
      for (const [key, value] of Object.entries(template.config)) {
        await prisma.globalConfig.upsert({
          where: { key },
          update: { 
            value: JSON.stringify(value),
            category: key.includes('Color') ? 'theme' : 'settings'
          },
          create: { 
            key,
            value: JSON.stringify(value),
            category: key.includes('Color') ? 'theme' : 'settings'
          }
        })
      }
    }
    
    // Save template info
    await prisma.presetTemplate.upsert({
      where: { name: template.name },
      update: {
        description: template.description,
        config: JSON.stringify(template.config || {}),
        slides: JSON.stringify(template.slides || {}),
        components: JSON.stringify({})
      },
      create: {
        name: template.name,
        description: template.description,
        config: JSON.stringify(template.config || {}),
        slides: JSON.stringify(template.slides || {}),
        components: JSON.stringify({})
      }
    })
    
    return NextResponse.json({ 
      success: true,
      message: `Template "${template.name}" applied successfully`
    })
  } catch (error) {
    console.error('Failed to apply template:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to apply template' 
    }, { status: 500 })
  }
}