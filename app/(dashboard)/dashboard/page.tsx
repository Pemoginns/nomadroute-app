'use client'

import Link from 'next/link'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import {
  Map, Bookmark, TrendingUp, Zap, Clock,
  Wallet, Globe, ArrowRight, Plus, Star
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RouteCard } from '@/components/route/RouteCard'
import { Badge } from '@/components/ui/Badge'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'

const MOCK_USER = {
  name: 'Alex Nomad',
  avatar: null,
  routesPlanned: 7,
  countriesVisited: 5,
  totalDays: 63,
  savedRoutes: 12,
}

const MOCK_RECENT = FEATURED_ROUTES.slice(0, 3)

const QUICK_ACTIONS = [
  { label: 'Plan new route', icon: Plus, href: '/plan', variant: 'primary' as const },
  { label: 'Saved routes', icon: Bookmark, href: '/trips', variant: 'secondary' as const },
  { label: 'Explore popular', icon: TrendingUp, href: '/routes', variant: 'secondary' as const },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">

        {/* Welcome header */}
        <MountFadeIn direction="up" className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center text-xl font-bold text-white shadow-glow">
              {MOCK_USER.name.charAt(0)}
            </div>
            <div>
              <p className="text-slate-400 text-sm">Welcome back</p>
              <h1 className="text-2xl font-black text-white">{MOCK_USER.name} 🎒</h1>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Routes planned', value: MOCK_USER.routesPlanned, icon: Map, color: 'text-brand-400' },
              { label: 'Countries visited', value: MOCK_USER.countriesVisited, icon: Globe, color: 'text-cyan-400' },
              { label: 'Days on the road', value: MOCK_USER.totalDays, icon: Clock, color: 'text-amber-400' },
              { label: 'Saved routes', value: MOCK_USER.savedRoutes, icon: Bookmark, color: 'text-violet-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/8 bg-bg-elevated p-4"
              >
                <Icon className={`h-5 w-5 mb-2 ${color}`} />
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </MountFadeIn>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-3 mb-12">
          {QUICK_ACTIONS.map(({ label, icon: Icon, href, variant }) => (
            <Link key={label} href={href}>
              <Button variant={variant} size="md">
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent routes */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-white">Recently viewed</h2>
              <Link href="/routes" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
                All routes <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOCK_RECENT.map((route, i) => (
                <RouteCard key={route.id} route={route} index={i} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Next trip */}
            <div className="rounded-2xl border border-brand-500/30 bg-brand-500/10 p-5">
              <p className="text-xs text-brand-400 uppercase tracking-wide mb-2">Upcoming trip</p>
              <h3 className="font-bold text-white mb-1">Vietnam in 3 weeks</h3>
              <p className="text-sm text-slate-400">Starting in Hanoi · 14 days</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-white/10">
                  <div className="h-full w-1/3 rounded-full bg-brand-500" />
                </div>
                <span className="text-xs text-slate-500">23 days to go</span>
              </div>
            </div>

            {/* Budget tracker */}
            <div className="rounded-2xl border border-white/8 bg-bg-elevated p-5">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-3">Budget tracker</p>
              {[
                { label: 'Flights', spent: 280, total: 300 },
                { label: 'Accommodation', spent: 120, total: 350 },
                { label: 'Activities', spent: 45, total: 150 },
              ].map(({ label, spent, total }) => (
                <div key={label} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-white">${spent} / ${total}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${(spent / total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Premium upsell */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-amber-400" />
                <span className="text-sm font-semibold text-amber-300">Premium</span>
              </div>
              <p className="text-sm text-slate-300 mb-4">
                Unlock AI itinerary summaries, unlimited saved trips, and exclusive nomad routes.
              </p>
              <Button variant="outline" size="sm" className="border-amber-500/40 text-amber-400 w-full">
                Upgrade — $5/mo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
