import { Search, GitBranch, Zap, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils/cn'

const STEPS = [
  {
    number: '01', icon: Search,
    title: 'Tell us your trip',
    desc: "Enter where you're departing from, your total budget, and how you like to travel. Takes 30 seconds.",
    detail: "No destination? That's fine — we'll suggest the best countries for your budget.",
    color: 'text-brand-600 dark:text-brand-400',
    border: 'border-brand-200 dark:border-brand-900',
    iconBg: 'bg-brand-100 dark:bg-brand-900/40',
    detailBg: 'bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-900',
  },
  {
    number: '02', icon: GitBranch,
    title: 'We compare every option',
    desc: 'Flights, sleeper trains, buses, ferries, and hostels — all compared simultaneously across your entire route.',
    detail: 'Our engine checks 50+ transport corridors and 300+ hostels in under 5 seconds.',
    color: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-200 dark:border-cyan-900',
    iconBg: 'bg-cyan-100 dark:bg-cyan-900/40',
    detailBg: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900',
  },
  {
    number: '03', icon: Zap,
    title: 'Book in one click',
    desc: 'Your full itinerary — transport legs, hostel picks, and a day-by-day budget — ready to book instantly.',
    detail: 'Every booking link goes directly to the provider. No middleman markup.',
    color: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-900',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    detailBg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up" className="text-center mb-16">
          <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">From idea to itinerary in 60 seconds.</h2>
          <p className="text-slate-500 dark:text-gray-400 max-w-lg mx-auto">
            No more switching between Hostelworld, Rome2Rio, Skyscanner, and Google Maps. One platform handles everything.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 120} direction="up">
              <div className={cn('relative rounded-2xl border p-7 h-full bg-white dark:bg-gray-800 transition-all hover:-translate-y-1 shadow-sm hover:shadow-md', step.border)}>
                <div className="flex items-start justify-between mb-6">
                  <div className={cn('h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0', step.iconBg)}>
                    <step.icon className={cn('h-6 w-6', step.color)} />
                  </div>
                  <span className="text-4xl font-black text-gray-100 dark:text-gray-700 tabular-nums leading-none">{step.number}</span>
                </div>
                <h3 className="font-black text-slate-900 dark:text-white text-lg mb-2">{step.title}</h3>
                <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed mb-4">{step.desc}</p>
                <div className={cn('rounded-xl px-4 py-3 border', step.detailBg)}>
                  <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{step.detail}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn direction="up" className="mt-12 text-center">
          <Link href="/plan" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors">
            Try it now — free, no account needed <ArrowRight className="h-4 w-4" />
          </Link>
        </FadeIn>
      </div>
    </section>
  )
}
