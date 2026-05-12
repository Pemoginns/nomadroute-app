'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Map, Compass, BookOpen, Star, Menu, X, Zap, Globe, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { useTheme } from '@/components/providers/ThemeProvider'

const NAV_LINKS = [
  { href: '/plan', label: 'Plan Route', icon: Compass },
  { href: '/routes', label: 'Routes', icon: Map },
  { href: '/guides', label: 'Guides', icon: BookOpen },
  { href: '/pricing', label: 'Pricing', icon: Star },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white dark:bg-gray-900',
          scrolled ? 'border-b border-gray-200 dark:border-gray-800 shadow-sm' : 'border-b border-gray-100 dark:border-gray-800/50',
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300',
              'bg-gradient-to-br from-brand-400 to-brand-600',
              'group-hover:shadow-glow-sm',
            )}>
              <Globe className="h-4 w-4 text-black" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-900">
              Nomad<span className="text-brand-600">Route</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href
              const isPricing = link.href === '/pricing'
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gray-100 text-slate-900'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100',
                    isPricing && !isActive && 'text-brand-600',
                  )}
                >
                  {isPricing && <Star className="h-3.5 w-3.5" />}
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="rounded-lg p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {theme === 'dark'
                ? <Sun className="h-4.5 w-4.5" />
                : <Moon className="h-4.5 w-4.5" />}
            </button>
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign in</Button>
            </Link>
            <Link href="/plan">
              <Button variant="primary" size="sm">
                <Zap className="h-3.5 w-3.5" />
                Plan my route
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden rounded-lg p-2 text-slate-500 hover:text-slate-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 p-6 md:hidden flex flex-col shadow-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-black text-slate-900">
                  Nomad<span className="text-brand-600">Route</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg p-2 text-slate-500 hover:text-slate-700 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1 flex-1">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                      pathname === link.href
                        ? 'bg-gray-100 text-slate-900'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100',
                      link.href === '/pricing' && pathname !== '/pricing' && 'text-brand-600',
                    )}
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                    {link.href === '/pricing' && (
                      <span className="ml-auto text-xs bg-brand-500/20 text-brand-400 px-1.5 py-0.5 rounded-full border border-brand-500/20">
                        Pro
                      </span>
                    )}
                  </Link>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="secondary" size="lg" className="w-full">Sign in</Button>
                </Link>
                <Link href="/plan" onClick={() => setMobileOpen(false)}>
                  <Button variant="primary" size="lg" className="w-full">
                    <Zap className="h-4 w-4" />
                    Plan my route
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
