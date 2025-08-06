import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { defaultContent } from '@/data/defaultContent';

const CONTENT_FILE = path.join(process.cwd(), 'public', 'content.json');

async function getContent() {
  try {
    const data = await fs.readFile(CONTENT_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // Return default content if file doesn't exist
    return defaultContent;
  }
}

async function saveContent(content: any) {
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

    const { content } = await request.json();
    await saveContent(content);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully' 
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to save content' 
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