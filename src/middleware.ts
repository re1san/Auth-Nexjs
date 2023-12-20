import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // This NextRequest has a property that tells us on what path you are
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
  // These are public paths and should not be visible to someone who has token!
  const token = request.cookies.get('token')?.value || '' // that 'token' can be there/not (expired or deleted by user)

  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ],
}