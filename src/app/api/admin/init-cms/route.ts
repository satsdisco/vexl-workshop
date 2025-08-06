import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { defaultCMSContent } from '@/lib/initialize-cms-content'

export async function POST(request: NextRequest) {
  try {
    // Initialize all sections with default content
    for (const [sectionId, content] of Object.entries(defaultCMSContent)) {
      const { title, subtitle, description, cta, ...rest } = content as any
      
      await prisma.slideContent.upsert({
        where: { sectionId },
        update: {
          title: title || null,
          subtitle: subtitle || null,
          description: description || null,
          cta: cta ? JSON.stringify(cta) : null,
          content: JSON.stringify(rest),
          isActive: true
        },
        create: {
          sectionId,
          title: title || null,
          subtitle: subtitle || null,
          description: description || null,
          cta: cta ? JSON.stringify(cta) : null,
          content: JSON.stringify(rest),
          isActive: true
        }
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'CMS content initialized successfully',
      sections: Object.keys(defaultCMSContent).length
    })
  } catch (error) {
    console.error('Failed to initialize CMS:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to initialize CMS content' 
    }, { status: 500 })
  }
}