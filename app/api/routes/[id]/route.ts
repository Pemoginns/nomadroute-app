import { NextRequest, NextResponse } from 'next/server'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const route = FEATURED_ROUTES.find(r => r.slug === id || r.id === id)

  if (!route) {
    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: route })
}
