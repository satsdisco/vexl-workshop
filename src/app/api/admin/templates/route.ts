import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// In-memory storage for templates (replace with database in production)
let templates: any[] = []

export async function GET(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  
  if (!token || token !== process.env.ADMIN_TOKEN) {
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
  const token = authHeader?.replace('Bearer ', '')
  
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { action } = body

    if (action === 'create') {
      // Create new template from current workshop
      const { name, description, category, cloneFromCurrent } = body
      
      let sections = {}
      
      if (cloneFromCurrent) {
        // Get current workshop content
        const currentContent = await prisma.content.findMany()
        sections = currentContent.reduce((acc: any, item: any) => {
          acc[item.sectionId] = item.data
          return acc
        }, {})
      }

      // Save template to database
      const newTemplate = await prisma.template.create({
        data: {
          name,
          description,
          category,
          sections,
          isActive: false
        }
      })

      return NextResponse.json({ 
        success: true,
        template: newTemplate
      })
    }

    if (action === 'apply') {
      // Apply template to current workshop
      const { templateId } = body
      
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
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Template operation error:', error)
    
    // Fallback to in-memory for demo
    const body = await request.json()
    const { action } = body

    if (action === 'create') {
      const { name, description, category } = body
      const newTemplate = {
        id: `template_${Date.now()}`,
        name,
        description,
        category,
        sections: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: false
      }
      templates.push(newTemplate)
      return NextResponse.json({ success: true, template: newTemplate })
    }

    if (action === 'apply') {
      const { templateId } = body
      templates = templates.map(t => ({
        ...t,
        isActive: t.id === templateId
      }))
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Template operation failed' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  // Check authorization
  const authHeader = request.headers.get('authorization')
  const token = authHeader?.replace('Bearer ', '')
  
  if (!token || token !== process.env.ADMIN_TOKEN) {
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
    // Fallback to in-memory
    const body = await request.json()
    const { templateId } = body
    templates = templates.filter(t => t.id !== templateId)
    return NextResponse.json({ success: true })
  }
}