import { Search, GitBranch, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils/cn'

const STEPS = [
  {
    number: '01',
    icon: Search,
    title: 'Tell us your trip',
    desc: "Enter where you're departing from, your total budget, and how you like to travel. Takes 30 seconds.",
    detail: "No destination? That's fine — we'll suggest the best countries for your budget.",
    color: 'text-brand-400',
    border: 'border-brand-500/30',
    bg: 'bg-brand-500/10',
    glow: 'shadow-[0_0_30px_rgba(234,179,8,0.15)]',
  },
  {
    number: '02',
    icon: GitBranch,
    title: 'We compare every option',
    desc: 'Flights, sleeper trains, buses, ferries, and hostels — all compared simultaneously across your entire route.',
    detail: 'Our engine checks 50+ transport corridors and 300+ hostels in under 5 seconds.',
    color: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    glow: 'shadow-[0_0_30px_rgba(6,182,212,0.12)]',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Book in one click',
    desc: 'Your full itinerary — with transport legs, hostel picks, and a day-by-day budget — ready to book instantly.',
    detail: 'Every booking link goes directly to the provider. No middleman markup.',
    color: 'text-emerald-400',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.12)]',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-bg-surface/30 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <FadeIn direction="up" className="text-center mb-16">
          <p className="text-xs text-brand-400 font-semibold uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            From idea to itinerary in 60 seconds.
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto">
            No more switching between Hostelworld, Rome2Rio, Skyscanner, and Google Maps.
            One platform handles everything.
          </p>
        </FadeIn>

        {/* Steps */}
        <div className="grid sm:grid-cols-3 gap-5 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden sm:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 120} direction="up">
              <div className={cn(
                'relative rounded-2xl border p-7 h-full transition-all hover:-translate-y-1',
                step.border,
                'bg-bg-elevated',
                step.glow,
              )}>
                {/* Step number */}
                <div className="flex items-start justify-between mb-6">
                  <div className={cn(
                    'h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0',
                    step.bg,
                  )}>
                    <step.icon className={cn('h-6 w-6', step.color)} />
                  </div>
                  <span className="text-4xl font-black text-white/5 tabular-nums leading-none">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-black text-white text-lg mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{step.desc}</p>

                <div className="rounded-xl bg-white/3 border border-white/6 px-4 py-3">
                  <p className="text-xs text-slate-500 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn direction="up" className="mt-12 text-center">
          <Link
            href="/plan"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            Try it now — free, no account needed
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
