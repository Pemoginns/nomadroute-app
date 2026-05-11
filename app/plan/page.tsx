'use client'

import { Suspense } from 'react'
import { Zap, Map, Clock, Wallet } from 'lucide-react'
import { RoutePlanner } from '@/components/route/RoutePlanner'
import { RouteCard } from '@/components/route/RouteCard'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'

const TIPS = [
  { icon: Zap, text: 'Generated instantly using real transport data' },
  { icon: Map, text: 'Interactive map with animated route lines' },
  { icon: Clock, text: 'Day-by-day breakdown with flexible editing' },
  { icon: Wallet, text: 'Accurate budget split by category' },
]

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12">

          {/* Left: info */}
          <div className="space-y-10">
            <MountFadeIn direction="up">
              <p className="text-xs text-brand-400 font-semibold uppercase tracking-wider mb-2">
                Route generator
              </p>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                Build your perfect<br />
                <span className="gradient-text">backpacker route</span>
              </h1>
              <p className="text-slate-400 mt-4 text-lg leading-relaxed max-w-lg">
                Enter your trip details — we generate a complete multi-stop itinerary with
                transport, hostels, budget, and visa info. Completely free.
              </p>
            </MountFadeIn>

            {/* Tips */}
            <div className="grid sm:grid-cols-2 gap-4">
              {TIPS.map(({ icon: Icon, text }, i) => (
                <MountFadeIn key={text} delay={i * 80 + 150} direction="up">
                  <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-bg-elevated p-4">
                    <div className="h-8 w-8 rounded-lg bg-brand-500/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-brand-400" />
                    </div>
                    <p className="text-sm text-slate-300">{text}</p>
                  </div>
                </MountFadeIn>
              ))}
            </div>

            {/* Sample routes */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 mb-4">
                Or start from a popular template:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {FEATURED_ROUTES.slice(0, 4).map((route, i) => (
                  <RouteCard key={route.id} route={route} index={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Right: planner form */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <MountFadeIn direction="left" delay={100}>
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-brand-500/15 to-violet-500/15 blur-xl" />
                <div className="relative rounded-3xl border border-white/10 bg-bg-surface p-6 shadow-elevated">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-sm font-medium text-slate-300">Route generator</span>
                    <span className="ml-auto text-xs text-slate-600">Free</span>
                  </div>
                  <Suspense>
                    <RoutePlanner />
                  </Suspense>
                </div>
              </div>
            </MountFadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
