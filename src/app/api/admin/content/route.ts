import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { defaultContent } from '@/data/defaultContent';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Get all content from database
    const contents = await prisma.content.findMany();
    
    // Convert array to object keyed by sectionId
    const contentMap: any = {};
    contents.forEach(item => {
      contentMap[item.sectionId] = item.data;
    });
    
    // Merge with defaults for any missing sections
    const fullContent = {
      ...defaultContent,
      ...contentMap
    };
    
    return NextResponse.json({ 
      success: true, 
      content: fullContent 
    });
  } catch (error) {
    console.error('Error loading content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to load content',
      content: defaultContent 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Simple auth check
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }

    const body = await request.json();
    console.log('Received content update:', body);
    
    // Handle the content - it should be the full content object
    const contentToSave = body.content || body;
    
    // Save each section to database
    const updates = [];
    for (const [sectionId, data] of Object.entries(contentToSave)) {
      if (typeof data === 'object' && data !== null) {
        updates.push(
          prisma.content.upsert({
            where: { sectionId },
            update: { data },
            create: { sectionId, data }
          })
        );
      }
    }
    
    // Execute all updates
    await Promise.all(updates);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully'
    });
  } catch (error) {
    console.error('Error saving content:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Simple auth check
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 });
    }
    
    // Delete all content to reset to defaults
    await prisma.content.deleteMany({});
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content reset to defaults' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to reset content' 
    }, { status: 500 });
  }
}