import { NextRequest, NextResponse } from 'next/server';

const ADMIN_PASSWORD = 'P2Pnokyc';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();
    
    if (password === ADMIN_PASSWORD) {
      // Simple auth - in production you'd want proper session management
      return NextResponse.json({ 
        success: true,
        token: Buffer.from(`vexl-admin-${Date.now()}`).toString('base64')
      });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Invalid password' 
    }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Authentication failed' 
    }, { status: 500 });
  }
}