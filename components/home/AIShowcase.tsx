import Link from 'next/link'
import { ArrowRight, Sparkles, Check } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils/cn'

const AI_CAPABILITIES = [
  { icon: '🧠', title: 'Route optimisation',  desc: 'Finds the cheapest combination of transport modes across your entire multi-stop journey.', tag: 'Algorithm + AI', tagColor: 'text-brand-700 border-brand-200 bg-brand-50' },
  { icon: '💰', title: 'Budget guardian',      desc: 'Real-time alerts when a leg pushes you over budget, with instant cheaper alternatives.',  tag: 'Live tracking',  tagColor: 'text-emerald-700 border-emerald-200 bg-emerald-50' },
  { icon: '🌐', title: 'Smart layovers',       desc: 'Recommends overnight stops genuinely worth staying in — not just transit hubs.',           tag: 'Curated data',  tagColor: 'text-cyan-700 border-cyan-200 bg-cyan-50' },
  { icon: '📅', title: 'Itinerary builder',    desc: 'Full day-by-day plan with activities, hostels, transport, and budget — instantly.',        tag: 'AI enhanced',   tagColor: 'text-violet-700 border-violet-200 bg-violet-50' },
  { icon: '🔔', title: 'Price drop alerts',    desc: 'Get notified when flight or train prices drop on your saved routes.',                      tag: 'Pro feature',   tagColor: 'text-pink-700 border-pink-200 bg-pink-50' },
  { icon: '🛂', title: 'Visa intelligence',    desc: 'Automatic visa requirements and border crossing info for every nationality on every route.',tag: 'Always updated',tagColor: 'text-orange-700 border-orange-200 bg-orange-50' },
]

const AI_DEMO_LINES = [
  { label: '🗺️  Route found',    value: 'Bangkok → Chiang Mai → Luang Prabang → Hanoi' },
  { label: '⏱️  Total duration', value: '21 days' },
  { label: '💰  Total cost',     value: '$412 (under your $500 budget)' },
  { label: '🚂  Best leg',       value: 'Night train BKK→CM — $15, saves $45 vs flight' },
  { label: '⛵  Hidden gem',     value: 'Mekong slow boat CM→LP — unmissable, 2 days' },
  { label: '🏠  Avg hostel',     value: '$9/night · 4 hostels pre-selected' },
  { label: '✅  Visa status',    value: 'All clear for 🇬🇧 🇺🇸 🇩🇪 🇦🇺 passports' },
]

export function AIShowcase() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs text-brand-700 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                AI-powered planning engine
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                Not just search.<br />
                <span className="gradient-text">Intelligent planning.</span>
              </h2>
              <p className="text-slate-500 dark:text-gray-400 leading-relaxed mb-8">
                Most travel tools show you prices. NomadRoute builds your entire trip — then explains exactly why each choice saves you money.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {AI_CAPABILITIES.map((cap, i) => (
                  <FadeIn key={cap.title} delay={i * 60} direction="up">
                    <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl leading-none">{cap.icon}</span>
                        <span className={cn('text-xs rounded-full border px-2 py-0.5 font-medium', cap.tagColor)}>{cap.tag}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{cap.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">{cap.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <FadeIn direction="up">
                <Link href="/plan" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors">
                  See it in action <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeIn>
            </FadeIn>
          </div>

          {/* Right — terminal card (stays dark intentionally) */}
          <FadeIn direction="left">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-brand-500/8 blur-3xl pointer-events-none" />
              <div className="relative rounded-2xl border border-gray-800 bg-gray-950 overflow-hidden shadow-xl">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-900">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-gray-500 font-mono">nomadroute · route analysis</span>
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />live
                  </span>
                </div>
                <div className="px-4 py-3 border-b border-gray-800 bg-gray-900/50">
                  <p className="text-xs font-mono">
                    <span className="text-brand-400">→</span>
                    <span className="text-gray-400"> plan</span>
                    <span className="text-white"> --from Bangkok --budget 500 --style backpacker</span>
                  </p>
                </div>
                <div className="p-4 space-y-2.5 font-mono">
                  {AI_DEMO_LINES.map((line, i) => (
                    <div key={i} className="flex gap-3 text-xs" style={{ animation: `stepFadeIn 0.4s ease-out ${i * 0.15 + 0.3}s both` }}>
                      <span className="text-gray-600 flex-shrink-0 w-36 leading-relaxed">{line.label}</span>
                      <span className="text-gray-200 leading-relaxed">{line.value}</span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-800 bg-brand-500/10 flex items-center gap-3">
                  <Check className="h-4 w-4 text-brand-400 flex-shrink-0" />
                  <p className="text-xs text-brand-300 font-medium">Route ready — $88 under budget · Generated in 4.2s</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
