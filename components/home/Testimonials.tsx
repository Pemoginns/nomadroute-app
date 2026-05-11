'use client'

import { Star } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils/cn'

const TESTIMONIALS = [
  {
    name: 'Sarah K.',
    origin: '🇬🇧 London',
    route: 'Bangkok → Chiang Mai → Luang Prabang → Hanoi',
    duration: '5 weeks',
    badge: 'Budget backpacker',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    avatar: 'SK',
    avatarBg: 'bg-violet-600',
    saved: '$610 saved',
    quote:
      'Planned my entire Southeast Asia trip in under 10 minutes. Found a night train from Bangkok to Chiang Mai for $15 that I never would have discovered on my own. Used to spend hours across 6 different tabs.',
    rating: 5,
  },
  {
    name: 'Marco B.',
    origin: '🇩🇪 Berlin',
    route: 'Hanoi → Hoi An → Ho Chi Minh → Siem Reap',
    duration: '3 weeks',
    badge: 'Solo traveler',
    badgeColor: 'text-brand-400 border-brand-500/30 bg-brand-500/10',
    avatar: 'MB',
    avatarBg: 'bg-brand-600',
    saved: '$340 saved',
    quote:
      'The slow boat from Chiang Mai to Luang Prabang — I had no idea this existed. NomadRoute surfaced it over a flight that was 3× the price. The whole trip felt way more authentic because of it.',
    rating: 5,
  },
  {
    name: 'Anya L.',
    origin: '🇺🇸 New York',
    route: 'Bali → Singapore → Penang → Bangkok',
    duration: '6 weeks',
    badge: 'Digital nomad',
    badgeColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    avatar: 'AL',
    avatarBg: 'bg-cyan-700',
    saved: '$890 saved',
    quote:
      'I was juggling Rome2Rio, Hostelworld, Skyscanner, Google Maps, and blog posts simultaneously. NomadRoute replaced all five. The coworking recommendations built into the route are genuinely useful.',
    rating: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-brand-400 text-brand-400" />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FadeIn direction="up" className="text-center mb-14">
        <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-3">
          Real backpackers · Real trips
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
          Trusted by 12,000+ travelers
        </h2>
        <p className="text-slate-400 max-w-lg mx-auto">
          From first-time backpackers to seasoned nomads — here's what they saved.
        </p>
      </FadeIn>

      <div className="grid sm:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={t.name} delay={i * 100} direction="up">
            <div className="rounded-2xl border border-white/8 bg-bg-elevated p-6 flex flex-col h-full hover:border-white/15 transition-colors">

              {/* Stars + saved */}
              <div className="flex items-center justify-between mb-4">
                <Stars count={t.rating} />
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-0.5">
                  {t.saved}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-slate-300 text-sm leading-relaxed flex-1 mb-5">
                "{t.quote}"
              </blockquote>

              {/* Route pill */}
              <div className="rounded-lg bg-white/4 border border-white/6 px-3 py-2 mb-4">
                <p className="text-xs text-slate-500 mb-0.5">Route · {t.duration}</p>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{t.route}</p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={cn(
                  'h-9 w-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0',
                  t.avatarBg,
                )}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.origin}</p>
                </div>
                <span className={cn(
                  'ml-auto text-xs rounded-full border px-2 py-0.5 font-medium',
                  t.badgeColor,
                )}>
                  {t.badge}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Aggregate rating */}
      <FadeIn direction="up" className="mt-10 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/3 px-6 py-3">
          <Stars count={5} />
          <span className="text-white font-bold text-sm">4.9 / 5</span>
          <span className="text-slate-500 text-sm">from 2,300+ reviews</span>
        </div>
      </FadeIn>
    </section>
  )
}
