'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Zap, Map, Wallet, Users, ArrowRight, TrendingUp,
  Globe, Star, Train, Plane, Ship, Bus, ChevronRight,
  Sparkles,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RouteCard } from '@/components/route/RouteCard'
import { RoutePlanner } from '@/components/route/RoutePlanner'
import { Badge } from '@/components/ui/Badge'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'
import { cn } from '@/lib/utils/cn'

// ─── Marquee data ─────────────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  '🇻🇳 Vietnam for €380', '🇹🇭 Thailand Backpacker Route', '🇰🇭 Angkor Wat Sunrise',
  '🏝️ Bali Digital Nomad', '🚂 Best Night Trains', '🇱🇦 Mekong Slow Boat',
  '🎒 4 Weeks SEA for $400', '🌴 Koh Phangan Full Moon', '☕ Chiang Mai Coworking',
  '🏄 Canggu Surf Hostel', '🍜 Penang Street Food', '🏛️ Luang Prabang Temples',
]

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '47K+', label: 'Routes planned', icon: Map },
  { value: '$28', label: 'Avg daily budget', icon: Wallet },
  { value: '16', label: 'Countries covered', icon: Globe },
  { value: '12K+', label: 'Happy nomads', icon: Users },
]

// ─── Trending tags ────────────────────────────────────────────────────────────
const TRENDING_SEARCHES = [
  'Vietnam for €400', '2 weeks Thailand', 'Bali digital nomad', 'Cheapest SEA route',
  'Best sleeper trains', 'Cambodia temples', 'Laos slow boat',
]

// ─── Why NomadRoute ───────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: Map,
    title: 'Visual route maps',
    desc: 'See your entire journey animated on an interactive map. Every stop, every transport leg.',
    color: 'from-brand-500 to-violet-500',
  },
  {
    icon: Wallet,
    title: 'Real budget tracking',
    desc: 'Accurate cost estimates based on real backpacker data. No more budget surprises.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Train,
    title: 'Transport discovery',
    desc: 'Buses, sleeper trains, ferries, flights — every option with live affiliate booking.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Globe,
    title: 'Multi-country routes',
    desc: 'Seamlessly cross borders with visa info, entry requirements, and local tips.',
    color: 'from-amber-500 to-orange-500',
  },
]

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <div className="min-h-screen bg-bg-base">

      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-center"
      >
        {/* Background atmosphere */}
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-glow" />

        {/* Animated map background (SVG placeholder — replace with Mapbox) */}
        <div className="absolute inset-0 opacity-20">
          <svg
            viewBox="0 0 1440 900"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Dot grid via SVG pattern — 6 nodes instead of 1000 */}
            <defs>
              <pattern id="dots" x="0" y="0" width="38" height="38" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.25)" />
              </pattern>
            </defs>
            <rect width="800" height="400" fill="url(#dots)" />
            {/* Route lines */}
            <path
              d="M 200 400 Q 400 200 600 350 T 900 300 T 1200 380"
              stroke="url(#glow1)"
              strokeWidth="2"
              fill="none"
              className="route-line"
              style={{ strokeDasharray: 1200, strokeDashoffset: 1200, animation: 'routeDraw 4s ease-in-out infinite alternate' }}
            />
            <path
              d="M 300 500 Q 500 350 700 450 T 1000 400 T 1300 480"
              stroke="rgba(6, 182, 212, 0.4)"
              strokeWidth="1.5"
              fill="none"
              style={{ strokeDasharray: 1200, strokeDashoffset: 1200, animation: 'routeDraw 5s ease-in-out 1s infinite alternate' }}
            />
            {/* City dots */}
            {[
              { cx: 280, cy: 420, label: 'Hanoi' },
              { cx: 480, cy: 380, label: 'Bangkok' },
              { cx: 620, cy: 450, label: 'Siem Reap' },
              { cx: 780, cy: 350, label: 'Chiang Mai' },
              { cx: 950, cy: 400, label: 'Bali' },
              { cx: 1100, cy: 320, label: 'Singapore' },
            ].map(({ cx, cy, label }) => (
              <g key={label}>
                <circle cx={cx} cy={cy} r="6" fill="#eab308" opacity="0.9" />
                <circle cx={cx} cy={cy} r="12" fill="#eab308" opacity="0.2" className="animate-ping-slow" />
                <text x={cx + 16} y={cy + 4} fontSize="11" fill="rgba(255,255,255,0.5)" fontFamily="Inter">{label}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Content */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left: headline */}
            <div className="space-y-8">
              <MountFadeIn direction="up">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-sm text-brand-300 mb-6">
                  <Sparkles className="h-3.5 w-3.5" />
                  The Backpacker OS for Southeast Asia
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
                  <span className="text-white">Plan your</span>{' '}
                  <br />
                  <span className="gradient-text">perfect route</span>
                  <br />
                  <span className="text-white">through Asia</span>
                </h1>

                <p className="mt-6 text-lg text-slate-400 leading-relaxed max-w-lg">
                  Enter your start city, budget, and travel style — get a complete multi-country
                  backpacker itinerary with transport options, hostel picks, and day-by-day breakdown.
                  <span className="text-brand-300"> Free. Instant. Beautiful.</span>
                </p>
              </MountFadeIn>

              {/* Trending searches */}
              <MountFadeIn delay={200} direction="up" className="space-y-3">
                <p className="text-xs text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Trending routes
                </p>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((search) => (
                    <Link
                      key={search}
                      href={`/plan?q=${encodeURIComponent(search)}`}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-400 hover:border-brand-500/40 hover:text-brand-300 hover:bg-brand-500/10 transition-all"
                    >
                      {search}
                    </Link>
                  ))}
                </div>
              </MountFadeIn>

              {/* Stats */}
              <MountFadeIn delay={400} className="grid grid-cols-4 gap-4">
                {STATS.map(({ value, label, icon: Icon }) => (
                  <div key={label} className="text-center">
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </MountFadeIn>
            </div>

            {/* Right: Planner widget */}
            <MountFadeIn delay={150} direction="left" className="relative">
              {/* Glow effect behind card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-brand-500/20 to-violet-500/20 blur-2xl" />

              <div className="relative rounded-3xl border border-white/10 bg-bg-surface/80 backdrop-blur-xl p-6 shadow-elevated">
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-slate-400">Route generator</span>
                </div>
                <RoutePlanner compact />
              </div>
            </MountFadeIn>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
            <div className="h-2 w-0.5 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* ─── MARQUEE ───────────────────────────────────────────────────────── */}
      <div className="border-y border-white/5 bg-bg-surface/50 py-4 overflow-hidden">
        <div className="marquee-inner gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex-shrink-0 text-sm text-slate-500 px-6">
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ─── FEATURED ROUTES ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs text-brand-400 font-semibold uppercase tracking-wider mb-2">
              Backpacker classics
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Most popular routes
            </h2>
            <p className="text-slate-400 mt-2">
              Tried & tested itineraries from thousands of backpackers
            </p>
          </div>
          <Link href="/routes" className="hidden sm:flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-300 transition-colors">
            View all routes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_ROUTES.slice(0, 8).map((route, i) => (
            <RouteCard key={route.id} route={route} index={i} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/routes">
            <Button variant="secondary" size="md">
              View all routes
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ─── BUDGET SHOWCASE ───────────────────────────────────────────────── */}
      <section className="py-24 bg-bg-surface/40 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-2">
              Real budget data
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How far does your money go?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Based on real backpacker spending data across Southeast Asia
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { country: 'Vietnam', emoji: '🇻🇳', perDay: 25, weeks2: 380, highlight: 'Best value' },
              { country: 'Thailand', emoji: '🇹🇭', perDay: 32, weeks2: 490, highlight: 'Most popular' },
              { country: 'Cambodia', emoji: '🇰🇭', perDay: 28, weeks2: 420, highlight: 'Budget gem' },
              { country: 'Bali', emoji: '🇮🇩', perDay: 40, weeks2: 620, highlight: 'Nomad hub' },
            ].map(({ country, emoji, perDay, weeks2, highlight }, i) => (
              <FadeIn key={country} delay={i * 80} direction="up">
                <div className="rounded-2xl border border-white/8 bg-bg-elevated p-5 hover:border-white/15 transition-colors h-full">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{emoji}</span>
                  <Badge variant="success" size="sm">{highlight}</Badge>
                </div>
                <h3 className="text-lg font-bold text-white">{country}</h3>
                <p className="text-3xl font-black text-emerald-400 mt-2">${perDay}</p>
                <p className="text-xs text-slate-500">per day (backpacker)</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-sm text-slate-400">
                    2 weeks: <span className="text-white font-semibold">${weeks2}</span>
                  </p>
                </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRANSPORT SECTION ─────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-cyan-400 font-semibold uppercase tracking-wider mb-2">
              Transport discovery
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Every way to get<br />across Southeast Asia
            </h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              From overnight sleeper trains to budget flights and legendary slow boats
              down the Mekong — we surface every option and link you straight to booking.
            </p>

            <div className="space-y-4">
              {[
                { icon: Train, label: 'Sleeper Trains', desc: 'Vietnam Reunification Express, Bangkok–CM overnight', color: 'text-violet-400', bg: 'bg-violet-500/10' },
                { icon: Ship, label: 'Ferries & Slow Boats', desc: '2-day Mekong slow boat, island ferries', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { icon: Bus, label: 'Buses & Minivans', desc: 'Cross-border buses, local transport', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: Plane, label: 'Budget Flights', desc: 'AirAsia, VietJet, Scoot — the cheap ones', color: 'text-amber-400', bg: 'bg-amber-500/10' },
              ].map(({ icon: Icon, label, desc, color, bg }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0', bg)}>
                    <Icon className={cn('h-5 w-5', color)} />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transport visual */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-cyan-500/10 to-brand-500/10 blur-2xl" />
            <div className="relative rounded-3xl border border-white/10 bg-bg-surface p-6 space-y-3">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-4">Popular transport legs</p>
              {[
                { from: 'Hanoi', to: 'Hoi An', type: '🚂 Sleeper train', duration: '16h', price: '$18' },
                { from: 'Bangkok', to: 'Chiang Mai', type: '🚂 Night train', duration: '12h', price: '$15' },
                { from: 'Chiang Mai', to: 'Luang Prabang', type: '⛵ Slow boat', duration: '2 days', price: '$55' },
                { from: 'Siem Reap', to: 'Bangkok', type: '🚌 VIP bus', duration: '9h', price: '$18' },
                { from: 'KL', to: 'Bali', type: '✈️ Flight', duration: '2.5h', price: '$28' },
              ].map(({ from, to, type, duration, price }) => (
                <div
                  key={`${from}-${to}`}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-bg-elevated px-4 py-3 hover:border-white/10 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{from} → {to}</p>
                    <p className="text-xs text-slate-500">{type} · {duration}</p>
                  </div>
                  <span className="text-emerald-400 font-bold text-sm flex-shrink-0">
                    {price}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-bg-surface/30 border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for real backpackers
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto">
              Not a generic booking site. A purpose-built tool for the way backpackers actually travel.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
              <FadeIn key={title} delay={i * 80} direction="up">
                <div className="rounded-2xl border border-white/8 bg-bg-elevated p-6 hover:border-white/15 transition-all hover:-translate-y-1 group h-full">
                  <div className={cn(
                    'h-11 w-11 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4',
                    color,
                  )}>
                    <Icon className="h-5 w-5 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DIGITAL NOMAD CTA ─────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600/30 via-violet-600/20 to-cyan-600/20" />
          <div className="absolute inset-0 border border-brand-500/20 rounded-3xl" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }}
          />

          <div className="relative p-12 sm:p-16 text-center">
            <div className="text-5xl mb-6">💻</div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Digital nomad circuits
            </h2>
            <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Chiang Mai → Bali → Penang → Bangkok. Pre-built nomad circuits
              with coworking spaces, visa runs, and reliable internet guides baked in.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/plan?style=digital-nomad">
                <Button variant="primary" size="lg">
                  <Zap className="h-5 w-5" />
                  Plan nomad route
                </Button>
              </Link>
              <Link href="/routes/digital-nomad-thailand">
                <Button variant="glass" size="lg">
                  View example circuit
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-bg-surface/30 border-t border-white/5">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="text-6xl mb-6">🌏</div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Ready to go?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join 12,000+ backpackers who planned their SEA route with NomadRoute.
          </p>
          <Link href="/plan">
            <Button variant="primary" size="xl">
              <Zap className="h-5 w-5" />
              Plan my route — it's free
            </Button>
          </Link>
          <p className="text-xs text-slate-600 mt-4">
            No account required. Instant results. Share your route with friends.
          </p>
        </div>
      </section>
    </div>
  )
}
