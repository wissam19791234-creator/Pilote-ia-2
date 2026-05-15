import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// In-memory rate limit store (resets on server restart)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

const RATE_LIMIT_MAX = 20       // max requests per window
const RATE_LIMIT_WINDOW = 60_000 // 1 minute in ms

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return '127.0.0.1'
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only rate-limit API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const ip = getClientIP(request)
  const now = Date.now()
  const record = rateLimitStore.get(ip)

  if (!record || now > record.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW })
    return NextResponse.next()
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return NextResponse.json(
      { error: 'Trop de requêtes. Réessayez dans quelques secondes.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((record.resetAt - now) / 1000)),
          'X-RateLimit-Limit': String(RATE_LIMIT_MAX),
          'X-RateLimit-Remaining': '0',
        },
      },
    )
  }

  record.count++
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
