import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()
    if (url.pathname === '/') {
        url.pathname = '/rooms'
        return NextResponse.redirect(url)
    } else {
        return;
    }
}

export const config = {
    matcher: '/',
}