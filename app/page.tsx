'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  Zap, Map, Wallet, Users, ArrowRight, TrendingUp,
  Globe, Train, Plane, Ship, Bus, ChevronRight,
  Sparkles, Check, Star, Shield, Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { RouteCard } from '@/components/route/RouteCard'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import { HeroSearch } from '@/components/home/HeroSearch'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Testimonials } from '@/components/home/Testimonials'
import { AIShowcase } from '@/components/home/AIShowcase'
import { FEATURED_ROUTES } from '@/lib/data/featured-routes'
import { cn } from '@/lib/utils/cn'

// ─── Static data ───────────────────────────────────────────────────────────────

const MARQUEE_ITEMS = [
  { text: 'Vietnam for €380', flag: '🇻🇳' },
  { text: '2 Weeks Thailand', flag: '🇹🇭' },
  { text: 'Angkor Wat Sunrise', flag: '🇰🇭' },
  { text: 'Bali Digital Nomad', flag: '🇮🇩' },
  { text: 'Best Night Trains', flag: '🚂' },
  { text: 'Mekong Slow Boat', flag: '🇱🇦' },
  { text: '4 Weeks SEA for €400', flag: '🌏' },
  { text: 'Full Moon Party', flag: '🌕' },
  { text: 'Chiang Mai Coworking', flag: '💻' },
  { text: 'Penang Street Food', flag: '🍜' },
  { text: 'Luang Prabang Temples', flag: '🏛️' },
  { text: 'Koh Rong Islands', flag: '🏝️' },
]

const TRUST_STATS = [
  { value: '47,000+', label: 'Routes planned', icon: Map },
  { value: '$28', label: 'Avg daily budget', icon: Wallet },
  { value: '16', label: 'Countries covered', icon: Globe },
  { value: '12,000+', label: 'Happy nomads', icon: Users },
  { value: '4.9 ★', label: 'Average rating', icon: Star },
]

const TRUST_BADGES = [
  { icon: Shield, label: 'No hidden fees' },
  { icon: Zap, label: 'Results in 5 seconds' },
  { icon: Globe, label: '16 countries covered' },
  { icon: Clock, label: 'Routes updated daily' },
]

const PARTNERS = [
  { name: 'Hostelworld', desc: 'Accommodation' },
  { name: 'AirAsia', desc: 'Budget flights' },
  { name: '12Go Asia', desc: 'Trains & buses' },
  { name: 'Booking.com', desc: 'Hotels & guesthouses' },
  { name: 'Wise', desc: 'Money transfers' },
  { name: 'SafetyWing', desc: 'Travel insurance' },
]

const TRAVEL_MODES = [
  { emoji: '💰', label: 'Cheapest',     desc: 'Stretch every dollar',     border: 'border-emerald-500/25 hover:border-emerald-500/60', bg: 'hover:bg-emerald-500/10', text: 'text-emerald-400', href: '/plan?style=cheapest' },
  { emoji: '🎒', label: 'Backpacker',   desc: 'Classic SEA circuit',      border: 'border-brand-500/25 hover:border-brand-500/60',   bg: 'hover:bg-brand-500/10',   text: 'text-brand-400',   href: '/plan?style=backpacker' },
  { emoji: '🏔️', label: 'Scenic',       desc: 'Breathtaking landscapes',  border: 'border-blue-500/25 hover:border-blue-500/60',     bg: 'hover:bg-blue-500/10',    text: 'text-blue-400',    href: '/plan?style=scenic' },
  { emoji: '⚡', label: 'Adventure',    desc: 'Thrills & extremes',       border: 'border-orange-500/25 hover:border-orange-500/60', bg: 'hover:bg-orange-500/10',  text: 'text-orange-400',  href: '/plan?style=adventure' },
  { emoji: '🌙', label: 'Nightlife',    desc: 'Bars, clubs & full moons', border: 'border-purple-500/25 hover:border-purple-500/60', bg: 'hover:bg-purple-500/10',  text: 'text-purple-400',  href: '/plan?style=nightlife' },
  { emoji: '💻', label: 'Digital Nomad',desc: 'Work & wander',            border: 'border-cyan-500/25 hover:border-cyan-500/60',     bg: 'hover:bg-cyan-500/10',    text: 'text-cyan-400',    href: '/plan?style=digital-nomad' },
  { emoji: '🚀', label: 'Fastest',      desc: 'Max countries, min time',  border: 'border-pink-500/25 hover:border-pink-500/60',     bg: 'hover:bg-pink-500/10',    text: 'text-pink-400',    href: '/plan?style=fastest' },
  { emoji: '🚂', label: 'Night Train',  desc: 'Sleep between cities',     border: 'border-violet-500/25 hover:border-violet-500/60', bg: 'hover:bg-violet-500/10',  text: 'text-violet-400',  href: '/plan?style=scenic' },
]

const ROUTE_TEMPLATES = [
  { label: 'Vietnam for €380',    emoji: '🇻🇳', duration: '14 days', href: '/routes/vietnam-classic-2-weeks',          image: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&q=80' },
  { label: '2 Weeks Thailand',    emoji: '🇹🇭', duration: '14 days', href: '/routes/digital-nomad-thailand-circuit',   image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80' },
  { label: 'Best Night Trains',   emoji: '🚂', duration: '21 days', href: '/routes/best-night-trains-sea',            image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80' },
  { label: 'Bali 10 Days',        emoji: '🌴', duration: '10 days', href: '/routes/bali-ubud-to-canggu',              image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80' },
  { label: 'Digital Nomad Circuit',emoji: '💻', duration: '30 days', href: '/routes/digital-nomad-thailand-circuit',  image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80' },
  { label: '4 Weeks SEA €400',    emoji: '🌏', duration: '28 days', href: '/routes/southeast-asia-budget-4-weeks',   image: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&q=80' },
]

const PRO_FEATURES = [
  'Unlimited route generations',
  'Save & sync your itineraries',
  'Export to PDF & shareable image',
  'Offline access on mobile',
  'Priority AI generation',
  'Advanced budget breakdown',
]

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY       = useTransform(scrollYProgress, [0, 1],    [0, 90])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  return (
    <div className="min-h-screen bg-bg-base">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Background photo — SEA islands */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1920&q=85"
            alt="Southeast Asia islands"
            fill
            priority
            className="object-cover opacity-90 hero-img"
            sizes="100vw"
          />
          {/* Only darken the very top (nav) and very bottom — let the island show */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px] pointer-events-none" />

        {/* Animated SVG map */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg viewBox="0 0 1440 900" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <radialGradient id="heroMapGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#eab308" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#eab308" stopOpacity="0" />
              </radialGradient>
              <pattern id="heroMapDots" x="0" y="0" width="44" height="44" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.7" fill="rgba(255,255,255,0.1)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroMapDots)" />
            <path
              d="M 140 540 Q 310 400 500 450 T 760 380 T 1020 420 T 1280 360 T 1420 400"
              stroke="url(#heroMapGlow)"
              strokeWidth="2.5"
              fill="none"
              style={{ strokeDasharray: 2800, strokeDashoffset: 2800, animation: 'routeDraw 5.5s ease-in-out 0.8s forwards' }}
            />
            <path
              d="M 240 630 Q 440 510 650 560 T 940 500 T 1180 540"
              stroke="rgba(6,182,212,0.3)"
              strokeWidth="1.5"
              fill="none"
              style={{ strokeDasharray: 1800, strokeDashoffset: 1800, animation: 'routeDraw 4s ease-in-out 2s forwards' }}
            />
            {[
              { cx: 260, cy: 510, label: 'Hanoi' },
              { cx: 500, cy: 450, label: 'Bangkok' },
              { cx: 640, cy: 510, label: 'Siem Reap' },
              { cx: 760, cy: 380, label: 'Chiang Mai' },
              { cx: 1020, cy: 420, label: 'Bali' },
              { cx: 1280, cy: 360, label: 'Singapore' },
            ].map(({ cx, cy, label }, i) => (
              <g key={label} style={{ animation: `fadeIn 0.6s ease-out ${i * 0.7 + 1.8}s forwards`, opacity: 0 }}>
                <circle cx={cx} cy={cy} r="5" fill="#eab308" opacity="0.95" />
                <circle cx={cx} cy={cy} r="11" fill="#eab308" opacity="0.15" style={{ animation: 'ping 3s ease-in-out infinite' }} />
                <text x={cx + 13} y={cy + 4} fontSize="10" fill="rgba(255,255,255,0.5)" fontFamily="Inter, sans-serif">{label}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Hero content — centered */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center"
        >
          <MountFadeIn direction="up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-1.5 text-sm text-brand-300 mb-8">
              <Sparkles className="h-3.5 w-3.5" />
              The Backpacker OS for Southeast Asia
            </div>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white mb-6 drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]">
              Every flight, train,<br />
              bus and hostel —<br />
              <span className="gradient-text">one search.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop switching between Hostelworld, Rome2Rio, Skyscanner, and Google Maps.
              NomadRoute finds every connection, compares every price, and builds your entire
              backpacking itinerary — in one place.
            </p>
          </MountFadeIn>

          {/* Search bar */}
          <MountFadeIn delay={200} direction="up">
            <HeroSearch />
          </MountFadeIn>

          {/* Trending tags */}
          <MountFadeIn delay={400} direction="up" className="mt-8 space-y-3">
            <p className="text-xs text-slate-600 uppercase tracking-widest flex items-center justify-center gap-2">
              <TrendingUp className="h-3 w-3" />
              Trending searches
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Vietnam for €400', '2 weeks Thailand', 'Bali digital nomad', 'Cheapest SEA', 'Best night trains'].map((t) => (
                <Link
                  key={t}
                  href={`/plan?q=${encodeURIComponent(t)}`}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-400 hover:border-brand-500/40 hover:text-brand-300 hover:bg-brand-500/10 transition-all"
                >
                  {t}
                </Link>
              ))}
            </div>
          </MountFadeIn>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40">
          <div className="h-8 w-5 rounded-full border-2 border-white/20 flex justify-center pt-1.5">
            <div className="h-2 w-0.5 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ───────────────────────────────────────────────────── */}
      <div className="border-y border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 py-5">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {TRUST_STATS.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 text-brand-500 flex-shrink-0" />
                <div>
                  <p className="text-slate-900 font-black text-lg leading-none">{value}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MARQUEE ─────────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 py-3 overflow-hidden">
        <div className="marquee-inner gap-0">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="flex-shrink-0 flex items-center gap-2 text-sm text-slate-500 px-5">
              <span>{item.flag}</span>
              {item.text}
              <span className="text-gray-300 ml-4">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <HowItWorks />

      {/* ── TRUST BADGES ────────────────────────────────────────────────── */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 py-6">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-600">
                <Icon className="h-4 w-4 text-brand-500" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRAVEL MODES ────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
        <FadeIn direction="up" className="text-center mb-12">
          <p className="text-xs text-brand-600 font-semibold uppercase tracking-widest mb-3">8 travel identities</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
            How do you like to travel?
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Pick your vibe. Each mode generates different routes, transport choices, stopovers, and hostel types.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {TRAVEL_MODES.map((mode, i) => (
            <FadeIn key={mode.label} delay={i * 45} direction="up">
              <Link
                href={mode.href}
                className={cn(
                  'group flex flex-col gap-3 rounded-2xl border bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-md',
                  'border-gray-200',
                )}
              >
                <span className="text-3xl">{mode.emoji}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900">{mode.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{mode.desc}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FEATURED ROUTES ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-brand-600 font-semibold uppercase tracking-widest mb-2">Most shared itineraries</p>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">Popular routes</h2>
              <p className="text-slate-500 dark:text-gray-400 mt-2">Tried & tested by thousands of backpackers</p>
            </div>
            <Link href="/routes" className="hidden sm:flex items-center gap-1.5 text-sm text-brand-600 hover:text-brand-700 transition-colors">
              View all <ArrowRight className="h-4 w-4" />
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
                View all routes <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <Testimonials />

      {/* ── AI SHOWCASE ─────────────────────────────────────────────────── */}
      <AIShowcase />

      {/* ── ROUTE TEMPLATES ─────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="mb-10">
          <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">Start in one click</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">Jump right in</h2>
          <p className="text-slate-500 dark:text-gray-400 mt-2">Click any template — then remix it for your exact trip.</p>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {ROUTE_TEMPLATES.map((r, i) => (
            <FadeIn key={r.label} delay={i * 55} direction="up">
              <Link href={r.href} className="group relative overflow-hidden rounded-2xl aspect-[3/4] block">
                <Image
                  src={r.image}
                  alt={r.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-0 p-3 flex flex-col justify-end">
                  <p className="text-xl leading-none mb-1">{r.emoji}</p>
                  <p className="text-sm font-bold text-white leading-tight">{r.label}</p>
                  <p className="text-xs text-white/70 mt-0.5">{r.duration}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── BUDGET SHOWCASE ──────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-14">
            <p className="text-xs text-emerald-600 font-semibold uppercase tracking-widest mb-2">Real backpacker data</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">How far does your money go?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Verified spending data from thousands of real trips — not tourist estimates.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { country: 'Vietnam',  emoji: '🇻🇳', perDay: 25, weeks2: 380, highlight: 'Best value',    bar: 62,  slug: 'vietnam' },
              { country: 'Thailand', emoji: '🇹🇭', perDay: 32, weeks2: 490, highlight: 'Most popular', bar: 80,  slug: 'thailand' },
              { country: 'Cambodia', emoji: '🇰🇭', perDay: 28, weeks2: 420, highlight: 'Budget gem',   bar: 70,  slug: 'cambodia' },
              { country: 'Bali',     emoji: '🇮🇩', perDay: 40, weeks2: 620, highlight: 'Nomad hub',    bar: 100, slug: 'bali' },
            ].map(({ country, emoji, perDay, weeks2, highlight, bar, slug }, i) => (
              <FadeIn key={country} delay={i * 80} direction="up">
                <div className="rounded-2xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{emoji}</span>
                    <span className="text-xs rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 px-2 py-0.5 font-medium">{highlight}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{country}</h3>
                  <p className="text-3xl font-black text-emerald-600 mt-1">
                    ${perDay}<span className="text-sm text-slate-400 font-normal"> /day</span>
                  </p>
                  <div className="mt-3 mb-4">
                    <div className="h-1.5 rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400" style={{ width: `${bar}%` }} />
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex-1 flex flex-col justify-end">
                    <p className="text-xs text-slate-400">2 weeks all-in:</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">${weeks2}</p>
                    <Link href={`/plan?country=${slug}`}>
                      <button className="mt-3 text-xs text-brand-600 hover:text-brand-700 flex items-center gap-1 transition-colors font-medium">
                        Plan this trip <ArrowRight className="h-3 w-3" />
                      </button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRANSPORT DISCOVERY ──────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <p className="text-xs text-cyan-600 font-semibold uppercase tracking-widest mb-2">Transport discovery</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-6">Every way to get across Southeast Asia</h2>
            <p className="text-slate-500 dark:text-gray-400 mb-8 leading-relaxed">
              Overnight sleeper trains, legendary Mekong slow boats, budget flights — surfaced side by side with direct booking links.
            </p>
            <div className="space-y-4">
              {[
                { icon: Train, label: 'Sleeper Trains',       desc: 'Vietnam Reunification Express, Bangkok–CM overnight', color: 'text-violet-600', bg: 'bg-violet-50' },
                { icon: Ship,  label: 'Ferries & Slow Boats', desc: '2-day Mekong slow boat, island ferries',              color: 'text-cyan-600',   bg: 'bg-cyan-50' },
                { icon: Bus,   label: 'Buses & Minivans',     desc: 'Cross-border buses, local transport',                color: 'text-blue-600',   bg: 'bg-blue-50' },
                { icon: Plane, label: 'Budget Flights',       desc: 'AirAsia, VietJet, Scoot — the cheap ones',          color: 'text-amber-600',  bg: 'bg-amber-50' },
              ].map(({ icon: Icon, label, desc, color, bg }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className={cn('h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105', bg)}>
                    <Icon className={cn('h-5 w-5', color)} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{label}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-cyan-50 blur-2xl" />
              <div className="relative rounded-3xl border border-gray-200 bg-white p-6 space-y-3 shadow-sm">
                <p className="text-xs text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">Live price comparison</p>
                {[
                  { from: 'Hanoi',      to: 'Hoi An',        type: '🚂 Sleeper train', duration: '16h',    price: '$18', note: 'vs $85 flight' },
                  { from: 'Bangkok',    to: 'Chiang Mai',    type: '🚂 Night train',   duration: '12h',    price: '$15', note: 'vs $60 flight' },
                  { from: 'Chiang Mai', to: 'Luang Prabang', type: '⛵ Slow boat',     duration: '2 days', price: '$55', note: 'iconic route' },
                  { from: 'Siem Reap',  to: 'Bangkok',       type: '🚌 VIP bus',       duration: '9h',     price: '$18', note: 'vs $45 flight' },
                  { from: 'KL',         to: 'Bali',          type: '✈️ Budget flight', duration: '2.5h',   price: '$28', note: 'AirAsia' },
                ].map(({ from, to, type, duration, price, note }) => (
                  <div key={`${from}-${to}`} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 hover:border-gray-200 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{from} → {to}</p>
                      <p className="text-xs text-slate-500">{type} · {duration}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-emerald-600 font-bold text-sm">{price}</p>
                      <p className="text-xs text-slate-400">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DIGITAL NOMAD CTA ────────────────────────────────────────────── */}
      <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-violet-50/50 to-cyan-50/50" />
            <div className="relative p-12 sm:p-16 text-center">
              <div className="text-5xl mb-6">💻</div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Digital nomad circuits</h2>
              <p className="text-slate-500 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                Chiang Mai → Bali → Penang → Bangkok. Pre-built nomad circuits with coworking spaces, visa run info, and fast-internet guides.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/plan?style=digital-nomad">
                  <Button variant="primary" size="lg"><Zap className="h-5 w-5" />Plan nomad route</Button>
                </Link>
                <Link href="/routes/digital-nomad-thailand-circuit">
                  <Button variant="glass" size="lg">View example circuit <ChevronRight className="h-4 w-4" /></Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── PARTNERS ─────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl px-4">
          <FadeIn direction="up" className="text-center mb-10">
            <p className="text-xs text-slate-400 uppercase tracking-widest">Powered by trusted travel APIs</p>
          </FadeIn>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
            {PARTNERS.map((p, i) => (
              <FadeIn key={p.name} delay={i * 60} direction="up">
                <div className="rounded-xl border border-gray-200 bg-white p-4 text-center hover:shadow-sm transition-shadow">
                  <p className="text-sm font-bold text-slate-700 dark:text-gray-200">{p.name}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREMIUM TEASER ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <p className="text-xs text-brand-600 font-semibold uppercase tracking-widest mb-3">Go further with Pro</p>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              Unlimited routes. <span className="gradient-text">$4.99/month.</span>
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">Free gets you started. Pro gets you everywhere.</p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-6 items-center">
            <FadeIn direction="right">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-7">
                <p className="text-sm font-semibold text-slate-500 mb-1">Free</p>
                <p className="text-4xl font-black text-slate-900 mb-6">$0</p>
                <ul className="space-y-3 text-sm text-slate-500">
                  {['3 route generations per day', 'All 16 destinations', 'Budget estimates', 'Basic route sharing'].map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-gray-300 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/plan" className="mt-7 block">
                  <Button variant="secondary" size="md" className="w-full">Start free</Button>
                </Link>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <div className="relative rounded-2xl border-2 border-brand-400 bg-brand-50 p-7">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-1 text-xs font-bold text-black">
                  <Star className="h-3 w-3" />
                  Most popular
                </div>
                <p className="text-sm font-semibold text-brand-600 mb-1">Nomad Pro</p>
                <div className="flex items-end gap-2 mb-6">
                  <p className="text-4xl font-black text-slate-900">$4.99</p>
                  <p className="text-slate-500 text-sm mb-1">/month</p>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  {PRO_FEATURES.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-brand-500 flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link href="/pricing" className="mt-7 block">
                  <Button variant="primary" size="md" className="w-full">Start 7-day free trial</Button>
                </Link>
                <p className="text-center text-xs text-slate-400 mt-2">No credit card required for trial</p>
              </div>
            </FadeIn>
          </div>

          <FadeIn direction="up" className="text-center mt-8">
            <Link href="/pricing" className="text-sm text-brand-600 hover:text-brand-700 transition-colors">
              See all plans including group & crew pricing →
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-28 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <FadeIn direction="up">
            <div className="text-6xl mb-6">🌏</div>
            <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-4">Ready to go?</h2>
            <p className="text-slate-500 dark:text-gray-400 text-lg mb-8">
              Join 12,000+ backpackers who planned their SEA adventure with NomadRoute.
            </p>
            <Link href="/plan">
              <Button variant="primary" size="xl">
                <Zap className="h-5 w-5" />
                Plan my route — it's free
              </Button>
            </Link>
            <p className="text-xs text-slate-600 mt-4">No account required · Instant results · Share your route</p>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
