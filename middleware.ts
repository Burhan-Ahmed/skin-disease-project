import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the pathname starts with protected routes
  const isProtectedRoute = 
    pathname.startsWith('/dashboard') || 
    pathname.startsWith('/upload') || 
    pathname.startsWith('/payment') || 
    pathname.startsWith('/pdf');
  
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });
  
  // If the user is not authenticated and trying to access a protected route
  if (isProtectedRoute && !token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  // If the user is authenticated and trying to access auth pages
  if ((pathname.startsWith('/login') || pathname.startsWith('/register')) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/upload/:path*',
    '/payment/:path*',
    '/pdf/:path*',
    '/login',
    '/register',
  ],
};