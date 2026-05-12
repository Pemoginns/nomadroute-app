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
    color: 'text-brand-600',
    border: 'border-brand-200',
    bg: 'bg-brand-50',
    iconBg: 'bg-brand-100',
    glow: 'shadow-md hover:shadow-lg',
  },
  {
    number: '02',
    icon: GitBranch,
    title: 'We compare every option',
    desc: 'Flights, sleeper trains, buses, ferries, and hostels — all compared simultaneously across your entire route.',
    detail: 'Our engine checks 50+ transport corridors and 300+ hostels in under 5 seconds.',
    color: 'text-cyan-600',
    border: 'border-cyan-200',
    bg: 'bg-cyan-50',
    iconBg: 'bg-cyan-100',
    glow: 'shadow-md hover:shadow-lg',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Book in one click',
    desc: 'Your full itinerary — transport legs, hostel picks, and a day-by-day budget — ready to book instantly.',
    detail: 'Every booking link goes directly to the provider. No middleman markup.',
    color: 'text-emerald-600',
    border: 'border-emerald-200',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    glow: 'shadow-md hover:shadow-lg',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <FadeIn direction="up" className="text-center mb-16">
          <p className="text-xs text-brand-600 font-semibold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
            From idea to itinerary in 60 seconds.
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            No more switching between Hostelworld, Rome2Rio, Skyscanner, and Google Maps.
            One platform handles everything.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 120} direction="up">
              <div className={cn(
                'relative rounded-2xl border p-7 h-full bg-white transition-all hover:-translate-y-1',
                step.border, step.glow,
              )}>
                <div className="flex items-start justify-between mb-6">
                  <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0', step.iconBg)}>
                    <step.icon className={cn('h-6 w-6', step.color)} />
                  </div>
                  <span className="text-4xl font-black text-gray-100 tabular-nums leading-none">{step.number}</span>
                </div>

                <h3 className="font-black text-slate-900 text-lg mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{step.desc}</p>

                <div className={cn('rounded-xl px-4 py-3 border', step.bg, step.border)}>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" className="mt-12 text-center">
          <Link href="/plan" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
            Try it now — free, no account needed
            <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
