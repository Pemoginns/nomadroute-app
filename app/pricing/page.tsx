import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Zap, Star, Users, Shield, Globe } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils/cn'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for backpackers. Free forever, or go Pro for $4.99/month.',
}

const PLANS = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for planning your first trip',
    border: 'border-white/10',
    badge: null,
    badgeBg: '',
    features: [
      '3 route generations per day',
      'All 16+ SEA destinations',
      'Transport discovery',
      'Budget estimates',
      'Public route library',
      'Basic route sharing',
    ],
    missing: [
      'Saved itineraries',
      'PDF / image export',
      'Offline access',
    ],
    cta: 'Start free',
    ctaHref: '/plan',
    ctaVariant: 'secondary' as const,
    highlight: false,
  },
  {
    name: 'Nomad Pro',
    price: 4.99,
    period: 'per month',
    description: 'For serious backpackers and repeat travelers',
    border: 'border-brand-500/60',
    badge: 'Most popular',
    badgeBg: 'bg-brand-500',
    features: [
      'Unlimited route generations',
      'Save & sync all your routes',
      'Export to PDF & shareable image',
      'Offline access on mobile',
      'Priority AI generation',
      'Advanced budget breakdown',
      'Remove ads',
      'All Free features',
    ],
    missing: [],
    cta: 'Start 7-day free trial',
    ctaHref: '/register?plan=pro',
    ctaVariant: 'primary' as const,
    highlight: true,
  },
  {
    name: 'Crew',
    price: 14.99,
    period: 'per month',
    description: 'For groups, travel agents & nomad communities',
    border: 'border-violet-500/40',
    badge: 'For teams',
    badgeBg: 'bg-violet-600',
    features: [
      'Everything in Nomad Pro',
      'Group itineraries (up to 8 people)',
      'Collaborative real-time planning',
      'Visa & border alert notifications',
      'Hostel group booking links',
      'Custom route branding',
      'Priority support (24h response)',
      'Early access to new features',
    ],
    missing: [],
    cta: 'Contact us',
    ctaHref: 'mailto:hello@nomadroute.app',
    ctaVariant: 'secondary' as const,
    highlight: false,
  },
]

const FAQ = [
  {
    q: 'Do I need a credit card for the free trial?',
    a: 'No. Your 7-day Nomad Pro trial starts immediately — no card required. We\'ll ask for payment details only if you decide to keep Pro after the trial.',
  },
  {
    q: 'What happens to my saved routes if I cancel?',
    a: 'Your routes stay accessible in read-only mode for 30 days. You can export them to PDF before cancelling, which is always free.',
  },
  {
    q: 'Can I use NomadRoute completely free?',
    a: 'Yes. The free tier gives you 3 route generations per day — more than enough for casual planning. No expiry, no nagging.',
  },
  {
    q: 'How does route generation work?',
    a: 'We use a scoring engine built on real backpacker data — transport times, hostel prices, visa requirements, and 47,000+ generated routes. AI only enhances itinerary summaries, keeping costs (and yours) low.',
  },
  {
    q: 'Is the Crew plan good for travel agents?',
    a: 'Yes — Crew lets you build and brand routes for clients, collaborate in real time, and access bulk hostel booking links. Email us to discuss custom needs.',
  },
]

const TRUST_BADGES = [
  { icon: Shield, label: 'No card for trial' },
  { icon: Zap, label: 'Cancel any time' },
  { icon: Globe, label: 'PDF export always free' },
  { icon: Users, label: '12K+ happy nomads' },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-24">
      {/* Header */}
      <div className="mx-auto max-w-3xl px-4 text-center mb-16">
        <FadeIn direction="up">
          <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-3">Simple pricing</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Start free. Upgrade when<br />
            <span className="gradient-text">you're ready to go further.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            No complicated tiers. Free forever for casual planners. Pro for backpackers who plan a lot.
          </p>
        </FadeIn>
      </div>

      {/* Trust badges */}
      <div className="mx-auto max-w-2xl px-4 mb-16">
        <FadeIn direction="up">
          <div className="flex flex-wrap justify-center gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
                <Icon className="h-4 w-4 text-brand-400" />
                {label}
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Plans */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid sm:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan, i) => (
            <FadeIn key={plan.name} delay={i * 100} direction="up" className="h-full">
              <div className={cn(
                'relative rounded-2xl border bg-bg-elevated p-8 flex flex-col h-full',
                plan.border,
                plan.highlight && 'bg-gradient-pricing',
              )}>
                {/* Badge */}
                {plan.badge && (
                  <div className={cn(
                    'absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-bold',
                    plan.badgeBg,
                    plan.highlight ? 'text-black' : 'text-white',
                  )}>
                    <Star className="h-3 w-3" />
                    {plan.badge}
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6">
                  <p className={cn(
                    'text-sm font-semibold mb-1',
                    plan.highlight ? 'text-brand-400' : 'text-slate-400',
                  )}>
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-2 mb-2">
                    <p className="text-4xl font-black text-white">
                      {plan.price === 0 ? '$0' : `$${plan.price}`}
                    </p>
                    <p className="text-slate-500 text-sm mb-1">{plan.period}</p>
                  </div>
                  <p className="text-sm text-slate-500">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className={cn(
                        'h-4 w-4 flex-shrink-0 mt-0.5',
                        plan.highlight ? 'text-brand-400' : 'text-emerald-500',
                      )} />
                      {f}
                    </li>
                  ))}
                  {plan.missing.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600 line-through">
                      <span className="h-4 w-4 flex-shrink-0 mt-0.5 text-slate-700">—</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href={plan.ctaHref}>
                  <Button variant={plan.ctaVariant} size="md" className="w-full">
                    {plan.highlight && <Zap className="h-4 w-4" />}
                    {plan.cta}
                  </Button>
                </Link>
                {plan.highlight && (
                  <p className="text-center text-xs text-slate-600 mt-2">
                    No credit card for 7-day trial
                  </p>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Annual discount banner */}
      <div className="mx-auto max-w-3xl px-4 mb-24">
        <FadeIn direction="up">
          <div className="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-brand-500/8 p-8 text-center">
            <div className="absolute inset-0 dot-grid opacity-20" />
            <div className="relative">
              <p className="text-2xl font-black text-white mb-2">
                Save 2 months with annual billing
              </p>
              <p className="text-slate-400 mb-4">
                Nomad Pro annual = <span className="text-white font-semibold">$49.99/year</span> — that's $4.17/month, billed once.
              </p>
              <Link href="/register?plan=pro-annual">
                <Button variant="primary" size="md">
                  Get annual Pro — save $10
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* FAQ */}
      <div className="mx-auto max-w-3xl px-4 mb-24">
        <FadeIn direction="up" className="mb-10 text-center">
          <h2 className="text-2xl font-black text-white">Frequently asked questions</h2>
        </FadeIn>
        <div className="space-y-4">
          {FAQ.map((item, i) => (
            <FadeIn key={i} delay={i * 60} direction="up">
              <div className="rounded-2xl border border-white/8 bg-bg-elevated p-6">
                <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-2xl px-4 text-center">
        <FadeIn direction="up">
          <div className="text-5xl mb-4">🌏</div>
          <h2 className="text-3xl font-black text-white mb-3">Still not sure?</h2>
          <p className="text-slate-400 mb-6">
            Start free — no card, no commitment. Upgrade only when you need more.
          </p>
          <Link href="/plan">
            <Button variant="primary" size="lg">
              <Zap className="h-5 w-5" />
              Try it free now
            </Button>
          </Link>
        </FadeIn>
      </div>
    </div>
  )
}
