'use client'

import Link from 'next/link'
import { BookOpen, Shield, Wifi, DollarSign, MapPin, Smartphone } from 'lucide-react'
import { MountFadeIn } from '@/components/ui/FadeIn'
import { Button } from '@/components/ui/Button'

const GUIDES = [
  { icon: MapPin, title: 'Visa Guide', desc: 'Entry requirements for every SEA country — e-visas, on-arrival, and border runs explained.', href: '/guides/visas', tag: 'Essential', color: 'from-brand-500 to-violet-600' },
  { icon: Shield, title: 'Travel Insurance', desc: 'SafetyWing vs World Nomads — the honest breakdown for backpackers.', href: '/guides/insurance', tag: 'Safety', color: 'from-emerald-500 to-teal-600' },
  { icon: Smartphone, title: 'eSIM Guide', desc: 'Best eSIMs for SEA — stay connected from Bangkok to Bali without a local SIM.', href: '/guides/esim', tag: 'Connectivity', color: 'from-cyan-500 to-blue-600' },
  { icon: DollarSign, title: 'Budget Guide', desc: 'Real daily budgets by country — from $20/day Vietnam to $50/day Singapore.', href: '/guides/budget', tag: 'Money', color: 'from-amber-500 to-orange-600' },
  { icon: Wifi, title: 'Digital Nomad Setup', desc: 'Best coworking spaces in Chiang Mai, Bali, Penang and Bangkok.', href: '/guides/nomad', tag: 'Work', color: 'from-violet-500 to-purple-600' },
  { icon: BookOpen, title: 'Packing List', desc: 'The definitive 35L backpack packing list for long-term SEA travel.', href: '/guides/packing', tag: 'Gear', color: 'from-rose-500 to-pink-600' },
]

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        <MountFadeIn direction="up">
          <p className="text-xs text-brand-400 font-semibold uppercase tracking-wider mb-2">Free guides</p>
          <h1 className="text-4xl font-black text-white mb-3">Backpacker Guides</h1>
          <p className="text-slate-400 max-w-xl mb-12">
            Everything you need to travel Southeast Asia — visas, money, gear, connectivity, and more.
          </p>
        </MountFadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GUIDES.map(({ icon: Icon, title, desc, href, tag, color }, i) => (
            <MountFadeIn key={title} delay={i * 60} direction="up">
              <Link href={href} className="group block h-full rounded-2xl border border-white/8 bg-bg-elevated p-6 hover:border-white/15 transition-all hover:-translate-y-1">
                <div className={`h-11 w-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs font-medium text-brand-400 mb-2 block">{tag}</span>
                <h3 className="font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">{title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
              </Link>
            </MountFadeIn>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-brand-500/30 bg-brand-500/10 p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2">Ready to plan your route?</h2>
          <p className="text-slate-400 mb-5">Use our free route planner to build a complete itinerary.</p>
          <Link href="/plan">
            <Button variant="primary" size="lg">Plan my route — free</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
