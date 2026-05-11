'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MountFadeIn, FadeIn } from '@/components/ui/FadeIn'
import { Globe, Mail, Lock, User, ArrowRight, Github } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />

      <MountFadeIn direction="up" className="relative w-full max-w-md">
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-r from-brand-500/15 to-violet-500/15 blur-xl" />
        <div className="relative rounded-3xl border border-white/10 bg-bg-surface p-8 shadow-elevated">
          <div className="text-center mb-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-glow mb-4">
              <Globe className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-2xl font-black text-white">Join NomadRoute</h1>
            <p className="text-slate-400 text-sm mt-1">Free. Unlimited routes. No credit card.</p>
          </div>

          <Button variant="secondary" size="lg" className="w-full mb-4">
            <Github className="h-5 w-5" />
            Sign up with GitHub
          </Button>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/8" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-bg-surface px-4 text-xs text-slate-500">or create account</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1.5">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 pl-10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 pl-10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-bg-elevated px-4 py-3 pl-10 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full" loading={loading}>
              Create free account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-5 leading-relaxed">
            By signing up you agree to our{' '}
            <Link href="/terms" className="text-slate-400 hover:text-white">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-slate-400 hover:text-white">Privacy Policy</Link>
          </p>

          <p className="text-center text-sm text-slate-500 mt-4">
            Already have an account?{' '}
            <Link href="/login" className="text-brand-400 hover:text-brand-300">Sign in</Link>
          </p>
        </div>
      </MountFadeIn>
    </div>
  )
}
