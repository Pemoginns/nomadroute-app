'use client'

import { Star } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils/cn'

const TESTIMONIALS = [
  {
    name: 'Sarah K.', origin: '🇬🇧 London', badge: 'Budget backpacker',
    badgeColor: 'text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/30',
    avatar: 'SK', avatarBg: 'bg-violet-600', saved: '$610 saved',
    route: 'Bangkok → Chiang Mai → Luang Prabang → Hanoi', duration: '5 weeks',
    quote: 'Planned my entire Southeast Asia trip in under 10 minutes. Found a night train from Bangkok to Chiang Mai for $15 that I never would have discovered on my own.',
    rating: 5,
  },
  {
    name: 'Marco B.', origin: '🇩🇪 Berlin', badge: 'Solo traveler',
    badgeColor: 'text-brand-700 dark:text-brand-400 border-brand-200 dark:border-brand-800 bg-brand-50 dark:bg-brand-900/30',
    avatar: 'MB', avatarBg: 'bg-brand-600', saved: '$340 saved',
    route: 'Hanoi → Hoi An → Ho Chi Minh → Siem Reap', duration: '3 weeks',
    quote: 'The slow boat from Chiang Mai to Luang Prabang — I had no idea this existed. NomadRoute surfaced it over a flight that was 3× the price.',
    rating: 5,
  },
  {
    name: 'Anya L.', origin: '🇺🇸 New York', badge: 'Digital nomad',
    badgeColor: 'text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-900/30',
    avatar: 'AL', avatarBg: 'bg-cyan-700', saved: '$890 saved',
    route: 'Bali → Singapore → Penang → Bangkok', duration: '6 weeks',
    quote: 'I was juggling Rome2Rio, Hostelworld, Skyscanner, Google Maps, and blog posts. NomadRoute replaced all five.',
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
    <section className="py-24 bg-white dark:bg-gray-950 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <FadeIn direction="up" className="text-center mb-14">
        <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-widest mb-3">Real backpackers · Real trips</p>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">Trusted by 12,000+ travelers</h2>
        <p className="text-slate-500 dark:text-gray-400 max-w-lg mx-auto">From first-time backpackers to seasoned nomads — here's what they saved.</p>
      </FadeIn>

      <div className="grid sm:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={t.name} delay={i * 100} direction="up">
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 flex flex-col h-full hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <Stars count={t.rating} />
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-full px-2.5 py-0.5">
                  {t.saved}
                </span>
              </div>
              <blockquote className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</blockquote>
              <div className="rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-700 px-3 py-2 mb-4">
                <p className="text-xs text-slate-400 dark:text-gray-500 mb-0.5">Route · {t.duration}</p>
                <p className="text-xs text-slate-600 dark:text-gray-300 font-medium leading-relaxed">{t.route}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={cn('h-9 w-9 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0', t.avatarBg)}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-slate-400 dark:text-gray-500">{t.origin}</p>
                </div>
                <span className={cn('ml-auto text-xs rounded-full border px-2 py-0.5 font-medium', t.badgeColor)}>{t.badge}</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn direction="up" className="mt-10 text-center">
        <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-3">
          <Stars count={5} />
          <span className="text-slate-900 dark:text-white font-bold text-sm">4.9 / 5</span>
          <span className="text-slate-400 dark:text-gray-500 text-sm">from 2,300+ reviews</span>
        </div>
      </FadeIn>
    </section>
  )
}
