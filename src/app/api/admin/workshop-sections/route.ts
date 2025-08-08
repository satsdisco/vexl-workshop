import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get workshop sections from database
    const sections = await prisma.workshopSection.findMany({
      orderBy: { order: 'asc' }
    })

    return NextResponse.json({ sections })
  } catch (error) {
    console.error('Error fetching sections:', error)
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token || !verifyAdminToken(token)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { sections } = await request.json()

    // Update or create each section
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      
      await prisma.workshopSection.upsert({
        where: { sectionId: section.id },
        update: {
          name: section.name,
          content: section.content,
          duration: section.duration,
          order: i
        },
        create: {
          sectionId: section.id,
          name: section.name,
          content: section.content,
          duration: section.duration,
          order: i
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving sections:', error)
    return NextResponse.json({ error: 'Failed to save sections' }, { status: 500 })
  }
}