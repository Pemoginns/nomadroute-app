import { NextResponse } from 'next/server'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: FEATURED_ROUTES,
    meta: { total: FEATURED_ROUTES.length },
  })
}
