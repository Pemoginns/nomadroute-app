'use client'

import { Suspense } from 'react'
import { Zap, Map, Clock, Wallet } from 'lucide-react'
import { RoutePlanner } from '@/components/route/RoutePlanner'
import { RouteCard } from '@/components/route/RouteCard'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'

const TIPS = [
  { icon: Zap,    text: 'Generated instantly using real transport data' },
  { icon: Map,    text: 'Interactive map with animated route lines' },
  { icon: Clock,  text: 'Day-by-day breakdown with flexible editing' },
  { icon: Wallet, text: 'Accurate budget split by category' },
]

export default function PlanPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-16 sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">

          {/* Planner form — first on mobile, right on desktop */}
          <div className="order-first lg:order-last lg:sticky lg:top-24 lg:h-fit">
            <MountFadeIn direction="up" delay={50}>
              <div className="relative">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-brand-500/15 to-amber-500/10 blur-xl" />
                <div className="relative rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 sm:p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                    </span>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Route generator</span>
                    <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">Free · No sign-up</span>
                  </div>
                  <Suspense>
                    <RoutePlanner />
                  </Suspense>
                </div>
              </div>
            </MountFadeIn>
          </div>

          {/* Info — second on mobile, left on desktop */}
          <div className="order-last lg:order-first space-y-8">
            <MountFadeIn direction="up">
              <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-wider mb-2">
                Route generator
              </p>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight">
                Build your perfect<br />
                <span className="gradient-text">backpacker route</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-4 text-base sm:text-lg leading-relaxed max-w-lg">
                Enter your trip details — we generate a complete multi-stop itinerary with
                transport, hostels, budget, and visa info. Completely free.
              </p>
            </MountFadeIn>

            {/* Tips */}
            <div className="grid grid-cols-2 gap-3">
              {TIPS.map(({ icon: Icon, text }, i) => (
                <MountFadeIn key={text} delay={i * 80 + 150} direction="up">
                  <div className="flex items-start gap-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 sm:p-4">
                    <div className="h-8 w-8 rounded-lg bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-brand-600 dark:text-brand-400" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-snug">{text}</p>
                  </div>
                </MountFadeIn>
              ))}
            </div>

            {/* Sample routes */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
                Or start from a popular template:
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {FEATURED_ROUTES.slice(0, 4).map((route, i) => (
                  <RouteCard key={route.id} route={route} index={i} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
