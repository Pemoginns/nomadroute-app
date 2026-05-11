import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const ALLOWED_PARTNERS = ['hostelworld', 'booking', 'kiwi', 'skyscanner', '12go', 'airalo', 'safety-wing', 'wise'] as const

const BodySchema = z.object({
  partner: z.enum(ALLOWED_PARTNERS),
  url: z.string().url().max(500).refine(
    (url) => {
      // Only allow known affiliate domains — prevents open redirect logging abuse
      const allowed = [
        'hostelworld.com', 'booking.com', 'kiwi.com', 'skyscanner.net',
        '12go.asia', 'airalo.com', 'safetywing.com', 'wise.com',
      ]
      try {
        const host = new URL(url).hostname
        return allowed.some(d => host === d || host.endsWith(`.${d}`))
      } catch {
        return false
      }
    },
    { message: 'URL must be a known affiliate domain' },
  ),
  routeId: z.string().max(100).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = BodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ success: false }, { status: 400 })
    }
    const { partner, url, routeId } = parsed.data
    // TODO: persist to database with userId from session
    console.log('[Affiliate]', { partner, url, routeId, ts: new Date().toISOString() })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ success: false }, { status: 400 })
  }
}
