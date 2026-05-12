import { cn } from '@/lib/utils/cn'
import type { TransportType } from '@/lib/types'

const TRANSPORT_COLORS: Record<TransportType, string> = {
  bus:       'bg-blue-100   dark:bg-blue-500/15   text-blue-700   dark:text-blue-400   border-blue-200   dark:border-blue-500/30',
  train:     'bg-violet-100 dark:bg-violet-500/15 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-500/30',
  ferry:     'bg-cyan-100   dark:bg-cyan-500/15   text-cyan-700   dark:text-cyan-400   border-cyan-200   dark:border-cyan-500/30',
  flight:    'bg-amber-100  dark:bg-amber-500/15  text-amber-700  dark:text-amber-400  border-amber-200  dark:border-amber-500/30',
  van:       'bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30',
  'tuk-tuk': 'bg-pink-100   dark:bg-pink-500/15   text-pink-700   dark:text-pink-400   border-pink-200   dark:border-pink-500/30',
  walk:      'bg-green-100  dark:bg-green-500/15  text-green-700  dark:text-green-400  border-green-200  dark:border-green-500/30',
}

const TRANSPORT_ICONS: Record<TransportType, string> = {
  bus: '🚌', train: '🚂', ferry: '⛵', flight: '✈️', van: '🚐', 'tuk-tuk': '🛺', walk: '🚶',
}

export function TransportBadge({ type, label, size = 'sm' }: { type: TransportType; label?: string; size?: 'sm' | 'md' }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full border font-medium',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      TRANSPORT_COLORS[type] ?? 'bg-gray-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-white/20',
    )}>
      <span>{TRANSPORT_ICONS[type]}</span>
      {label ?? type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  )
}

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'brand' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  const variants = {
    default: 'bg-gray-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-white/10',
    success: 'bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
    warning: 'bg-amber-50  dark:bg-amber-500/15  text-amber-700  dark:text-amber-400  border-amber-200  dark:border-amber-500/30',
    danger:  'bg-red-50    dark:bg-red-500/15    text-red-700    dark:text-red-400    border-red-200    dark:border-red-500/30',
    brand:   'bg-brand-50  dark:bg-brand-500/15  text-brand-700  dark:text-brand-400  border-brand-200  dark:border-brand-500/30',
    outline: 'border-gray-300 dark:border-white/20 text-slate-500 dark:text-slate-400 bg-transparent',
  }

  return (
    <span className={cn(
      'inline-flex items-center rounded-full border font-medium',
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
      variants[variant],
      className,
    )}>
      {children}
    </span>
  )
}
