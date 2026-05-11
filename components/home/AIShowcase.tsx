import Link from 'next/link'
import { ArrowRight, Sparkles, Check } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { cn } from '@/lib/utils/cn'

const AI_CAPABILITIES = [
  {
    icon: '🧠',
    title: 'Route optimisation',
    desc: 'Finds the cheapest combination of transport modes across your entire multi-stop journey.',
    tag: 'Algorithm + AI',
    tagColor: 'text-brand-400 border-brand-500/30 bg-brand-500/8',
  },
  {
    icon: '💰',
    title: 'Budget guardian',
    desc: 'Real-time alerts when a leg pushes you over budget, with instant cheaper alternatives.',
    tag: 'Live tracking',
    tagColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/8',
  },
  {
    icon: '🌐',
    title: 'Smart layovers',
    desc: 'Recommends overnight stops genuinely worth staying in — not just transit hubs.',
    tag: 'Curated data',
    tagColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/8',
  },
  {
    icon: '📅',
    title: 'Itinerary builder',
    desc: 'Full day-by-day plan with activities, hostels, transport, and budget — instantly generated.',
    tag: 'AI enhanced',
    tagColor: 'text-violet-400 border-violet-500/30 bg-violet-500/8',
  },
  {
    icon: '🔔',
    title: 'Price drop alerts',
    desc: 'Get notified when flight or train prices drop on your saved routes. Never overpay again.',
    tag: 'Pro feature',
    tagColor: 'text-pink-400 border-pink-500/30 bg-pink-500/8',
  },
  {
    icon: '🛂',
    title: 'Visa intelligence',
    desc: 'Automatic visa requirements and border crossing info for every nationality on every route.',
    tag: 'Always updated',
    tagColor: 'text-orange-400 border-orange-500/30 bg-orange-500/8',
  },
]

// Simulated AI output card
const AI_DEMO_LINES = [
  { label: '🗺️  Route found', value: 'Bangkok → Chiang Mai → Luang Prabang → Hanoi', dim: false },
  { label: '⏱️  Total duration', value: '21 days', dim: false },
  { label: '💰  Total cost', value: '$412 (under your $500 budget)', dim: false },
  { label: '🚂  Best leg', value: 'Night train BKK→CM — $15, saves $45 vs flight', dim: false },
  { label: '⛵  Hidden gem', value: 'Mekong slow boat CM→LP — unmissable, 2 days', dim: false },
  { label: '🏠  Avg hostel', value: '$9/night · 4 hostels pre-selected', dim: false },
  { label: '✅  Visa status', value: 'All clear for 🇬🇧 🇺🇸 🇩🇪 🇦🇺 passports', dim: false },
]

export function AIShowcase() {
  return (
    <section className="py-24 bg-bg-surface/30 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — copy */}
          <div>
            <FadeIn direction="right">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-xs text-brand-300 mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                AI-powered planning engine
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
                Not just search.<br />
                <span className="gradient-text">Intelligent planning.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Most travel tools show you prices. NomadRoute builds your entire trip — then explains exactly why each choice saves you money.
                Our engine runs on real backpacker data from 47,000+ routes, not guesses.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {AI_CAPABILITIES.map((cap, i) => (
                  <FadeIn key={cap.title} delay={i * 60} direction="up">
                    <div className="rounded-xl border border-white/8 bg-bg-elevated p-4 hover:border-white/15 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-2xl leading-none">{cap.icon}</span>
                        <span className={cn(
                          'text-xs rounded-full border px-2 py-0.5 font-medium',
                          cap.tagColor,
                        )}>
                          {cap.tag}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mb-1">{cap.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{cap.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>

              <FadeIn direction="up">
                <Link
                  href="/plan"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  See it in action
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </FadeIn>
            </FadeIn>
          </div>

          {/* Right — AI output demo card */}
          <FadeIn direction="left">
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-brand-500/8 blur-3xl pointer-events-none" />

              <div className="relative rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl overflow-hidden shadow-elevated">

                {/* Terminal header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/8 bg-white/2">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-3 text-xs text-slate-500 font-mono">
                    nomadroute · route analysis
                  </span>
                  <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    live
                  </span>
                </div>

                {/* Input line */}
                <div className="px-4 py-3 border-b border-white/5 bg-white/1">
                  <p className="text-xs font-mono">
                    <span className="text-brand-400">→</span>
                    <span className="text-slate-400"> plan</span>
                    <span className="text-white"> --from Bangkok --budget 500 --style backpacker</span>
                  </p>
                </div>

                {/* Output lines */}
                <div className="p-4 space-y-2.5 font-mono">
                  {AI_DEMO_LINES.map((line, i) => (
                    <div
                      key={i}
                      className="flex gap-3 text-xs"
                      style={{ animation: `stepFadeIn 0.4s ease-out ${i * 0.15 + 0.3}s both` }}
                    >
                      <span className="text-slate-600 flex-shrink-0 w-36 leading-relaxed">{line.label}</span>
                      <span className="text-slate-200 leading-relaxed">{line.value}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 border-t border-white/8 bg-brand-500/5 flex items-center gap-3">
                  <Check className="h-4 w-4 text-brand-400 flex-shrink-0" />
                  <p className="text-xs text-brand-300 font-medium">
                    Route ready — $88 under budget · Generated in 4.2s
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  )
}
