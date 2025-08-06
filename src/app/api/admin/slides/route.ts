import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all slide content
export async function GET(request: NextRequest) {
  try {
    const slides = await prisma.slideContent.findMany({
      where: { isActive: true },
      orderBy: { sectionId: 'asc' }
    })
    
    // Convert to object keyed by sectionId
    const content = slides.reduce((acc, slide) => {
      acc[slide.sectionId] = {
        title: slide.title,
        subtitle: slide.subtitle,
        description: slide.description,
        cta: slide.cta,
        ...JSON.parse(slide.content || '{}')
      }
      return acc
    }, {} as Record<string, any>)
    
    return NextResponse.json({ success: true, content })
  } catch (error) {
    console.error('Failed to fetch slides:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch slide content' 
    }, { status: 500 })
  }
}

// POST/PUT slide content
export async function POST(request: NextRequest) {
  try {
    const { sectionId, content } = await request.json()
    
    // Extract standard fields
    const { title, subtitle, description, cta, ...rest } = content
    
    // Upsert slide content
    const slide = await prisma.slideContent.upsert({
      where: { sectionId },
      update: {
        title,
        subtitle,
        description,
        cta,
        content: JSON.stringify(rest),
        version: { increment: 1 }
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
    
    // Save version for rollback
    await prisma.contentVersion.create({
      data: {
        entityType: 'slide',
        entityId: slide.id,
        content: JSON.stringify(content),
        version: slide.version
      }
    })
    
    return NextResponse.json({ 
      success: true, 
      slide,
      message: 'Slide content saved successfully' 
    })
  } catch (error) {
    console.error('Failed to save slide:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save slide content' 
    }, { status: 500 })
  }
}