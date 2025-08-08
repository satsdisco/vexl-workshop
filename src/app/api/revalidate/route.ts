import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    // Simple auth check
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unauthorized' 
      }, { status: 401 })
    }

    // Revalidate the main page and all sections
    revalidatePath('/', 'page')
    revalidatePath('/api/admin/content')
    revalidateTag('cms-content')
    
    return NextResponse.json({ 
      success: true, 
      message: 'Cache revalidated successfully',
      revalidated: true,
      now: Date.now()
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to revalidate' 
    }, { status: 500 })
  }
}