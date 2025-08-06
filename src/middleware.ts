import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect /admin routes (not /admin/login)
  if (request.nextUrl.pathname === '/admin') {
    // This is client-side auth, so we just let it through
    // The page itself will check for auth token
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
}