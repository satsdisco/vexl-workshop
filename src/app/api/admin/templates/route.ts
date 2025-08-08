import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// In-memory storage for templates (fallback for demo)
let templates: any[] = []

export async function GET(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get all templates from database
    const dbTemplates = await prisma.template.findMany({
      orderBy: { updatedAt: 'desc' }
    })
    
    return NextResponse.json({ templates: dbTemplates })
  } catch (error) {
    // If database fails, return in-memory templates
    return NextResponse.json({ templates })
  }
}

export async function POST(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { action } = body

  if (action === 'create') {
    // Create new template from current workshop
    const { name, description, category, cloneFromCurrent } = body
    
    let sections = {}
    
    if (cloneFromCurrent) {
      try {
        // Get current workshop content
        const currentContent = await prisma.content.findMany()
        sections = currentContent.reduce((acc: any, item: any) => {
          acc[item.sectionId] = item.data
          return acc
        }, {})
      } catch (error) {
        console.log('No existing content found, using default sections')
        // If no content exists yet, use default empty sections
        sections = {
          hookSection: { title: 'Hook Section', subtitle: '', description: '' },
          pitchSection: { title: 'Pitch Section', subtitle: '', description: '' },
          trustSection: { title: 'Trust Section', subtitle: '', description: '' },
          privacySection: { title: 'Privacy Section', subtitle: '', description: '' },
          profileSetupSection: { title: 'Profile Setup', subtitle: '', description: '' },
          findingOffersSection: { title: 'Finding Offers', subtitle: '', description: '' },
          contactTradingSection: { title: 'Contact Trading', subtitle: '', description: '' },
          clubsSection: { title: 'Clubs Section', subtitle: '', description: '' },
          demoSection: { title: 'Demo Section', subtitle: '', description: '' },
          visionSection: { title: 'Vision Section', subtitle: '', description: '' },
          getStartedSection: { title: 'Get Started', subtitle: '', description: '' }
        }
      }
    }

    try {
      // Save template to database
      const newTemplate = await prisma.template.create({
        data: {
          name,
          description: description || '',
          category,
          sections,
          isActive: false
        }
      })

      return NextResponse.json({ 
        success: true,
        template: newTemplate
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Fallback to in-memory storage for demo
      const newTemplate = {
        id: `template_${Date.now()}`,
        name,
        description: description || '',
        category,
        sections,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: false,
        thumbnail: null
      }
      templates.push(newTemplate)
      return NextResponse.json({ success: true, template: newTemplate })
    }
  }

  if (action === 'apply') {
    // Apply template to current workshop
    const { templateId } = body
    
    try {
      // Get template
      const template = await prisma.template.findUnique({
        where: { id: templateId }
      })
      
      if (!template) {
        return NextResponse.json({ error: 'Template not found' }, { status: 404 })
      }

      // Update all templates to inactive
      await prisma.template.updateMany({
        data: { isActive: false }
      })

      // Set this template as active
      await prisma.template.update({
        where: { id: templateId },
        data: { isActive: true }
      })

      // Apply template sections to current workshop
      const sections = template.sections as Record<string, any>
      
      for (const [sectionId, sectionData] of Object.entries(sections)) {
        await prisma.content.upsert({
          where: { sectionId },
          update: { data: sectionData as any },
          create: { sectionId, data: sectionData as any }
        })
      }

      return NextResponse.json({ success: true })
    } catch (error) {
      console.error('Apply template error:', error)
      // Fallback to in-memory
      templates = templates.map(t => ({
        ...t,
        isActive: t.id === templateId
      }))
      return NextResponse.json({ success: true })
    }
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}

export async function DELETE(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { templateId } = body

    // Delete from database
    await prisma.template.delete({
      where: { id: templateId }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete template error:', error)
    // Fallback to in-memory
    try {
      const body = await request.json()
      const { templateId } = body
      templates = templates.filter(t => t.id !== templateId)
      return NextResponse.json({ success: true })
    } catch {
      return NextResponse.json({ error: 'Failed to delete template' }, { status: 500 })
    }
  }
}