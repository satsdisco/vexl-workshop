import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { defaultContent } from '@/data/defaultContent';

// In-memory storage for Vercel deployment
let inMemoryContent: any = null;

const CONTENT_FILE = path.join(process.cwd(), 'public', 'content.json');
const IS_VERCEL = process.env.VERCEL === '1';

async function getContent() {
  // Use in-memory storage on Vercel
  if (IS_VERCEL) {
    return inMemoryContent || defaultContent;
  }
  
  // Use file system locally
  try {
    const data = await fs.readFile(CONTENT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return defaultContent;
  }
}

async function saveContent(content: any) {
  // Use in-memory storage on Vercel
  if (IS_VERCEL) {
    inMemoryContent = content;
    return;
  }
  
  // Use file system locally
  const dir = path.dirname(CONTENT_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  await fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    const content = await getContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to load content',
      content: defaultContent 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Simple auth check - verify token exists
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
    
    // Load existing content
    const existingContent = await getContent();
    
    // Merge with existing content
    const mergedContent = {
      ...existingContent,
      ...contentToSave
    };
    
    await saveContent(mergedContent);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully',
      content: mergedContent
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
    // Reset to default content
    await fs.unlink(CONTENT_FILE).catch(() => {});
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