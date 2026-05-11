import { NextRequest, NextResponse } from 'next/server'
import { generateRoute } from '@/lib/engine/route-generator'
import { DESTINATIONS } from '@/lib/data/destinations'
import type { RoutePlannerInput } from '@/lib/types'
import { z } from 'zod'

// Bounded LRU-style cache — evict oldest when full
const routeCache = new Map<string, { route: unknown; timestamp: number }>()
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour
const CACHE_MAX = 200

// Simple per-IP rate limiting (replace with Redis sliding window in prod)
const ipRequests = new Map<string, { count: number; windowStart: number }>()
const RATE_LIMIT = 20 // requests per window
const RATE_WINDOW_MS = 60 * 1000 // 1 minute

const InputSchema = z.object({
  startDestinationId: z.string().min(1).max(50),
  endDestinationId: z.string().min(1).max(50).optional(),
  durationDays: z.number().int().min(2).max(90),
  budget: z.number().min(50).max(50000),
  travelStyle: z.enum(['cheapest', 'backpacker', 'scenic', 'adventure', 'nightlife', 'digital-nomad', 'fastest']),
  transportPreferences: z.array(z.enum(['bus', 'train', 'ferry', 'flight', 'van', 'tuk-tuk', 'walk'])).min(1),
  travelers: z.number().int().min(1).max(10).default(1),
  mustVisit: z.array(z.string()).optional(),
})

function getCacheKey(input: RoutePlannerInput): string {
  const prefs = [...input.transportPreferences].sort().join(',')
  return `${input.startDestinationId}|${input.endDestinationId ?? ''}|${input.durationDays}|${Math.round(input.budget / 50) * 50}|${input.travelStyle}|${prefs}`
}

function evictExpiredCache() {
  const now = Date.now()
  for (const [key, val] of routeCache.entries()) {
    if (now - val.timestamp > CACHE_TTL_MS) routeCache.delete(key)
  }
  // If still too large, delete oldest entries
  if (routeCache.size > CACHE_MAX) {
    const oldest = [...routeCache.entries()].sort((a, b) => a[1].timestamp - b[1].timestamp)
    oldest.slice(0, routeCache.size - CACHE_MAX).forEach(([k]) => routeCache.delete(k))
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const existing = ipRequests.get(ip)
  if (!existing || now - existing.windowStart > RATE_WINDOW_MS) {
    ipRequests.set(ip, { count: 1, windowStart: now })
    return true
  }
  if (existing.count >= RATE_LIMIT) return false
  existing.count++
  return true
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please wait a minute.' },
      { status: 429, headers: { 'Retry-After': '60' } },
    )
  }

  try {
    const body = await req.json()
    const parsed = InputSchema.safeParse(body.input)
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid input', errors: parsed.error.flatten() },
        { status: 400 },
      )
    }

    const input = parsed.data as RoutePlannerInput

    // Validate destination exists
    if (!DESTINATIONS[input.startDestinationId]) {
      return NextResponse.json(
        { success: false, message: 'Unknown start destination' },
        { status: 400 },
      )
    }

    const start = Date.now()
    evictExpiredCache()

    const cacheKey = getCacheKey(input)
    const cached = routeCache.get(cacheKey)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({
        route: cached.route,
        cached: true,
        processingTime: Date.now() - start,
        success: true,
      })
    }

    const route = await generateRoute(input)
    routeCache.set(cacheKey, { route, timestamp: Date.now() })

    return NextResponse.json({
      route,
      cached: false,
      processingTime: Date.now() - start,
      success: true,
    })
  } catch (error) {
    console.error('Route generation error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to generate route' },
      { status: 500 },
    )
  }
}
