'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, Map, Star } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const TABS = [
  { href: '/',        label: 'Home',   icon: Home },
  { href: '/plan',    label: 'Plan',   icon: Compass },
  { href: '/routes',  label: 'Routes', icon: Map },
  { href: '/pricing', label: 'Pro',    icon: Star },
]

export function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex h-14">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-0.5 transition-all active:scale-95',
                active
                  ? 'text-brand-500 dark:text-brand-400'
                  : 'text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300',
              )}
            >
              <Icon className={cn('h-[22px] w-[22px] transition-transform', active && 'scale-110')} />
              <span className={cn('text-[10px] font-semibold tracking-wide', active ? 'text-brand-500 dark:text-brand-400' : '')}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
