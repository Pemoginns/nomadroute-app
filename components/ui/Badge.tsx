import { cn } from '@/lib/utils/cn'
import type { TransportType } from '@/lib/types'

const TRANSPORT_COLORS: Record<TransportType, string> = {
  bus: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  train: 'bg-violet-500/15 text-violet-400 border-violet-500/30',
  ferry: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  flight: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  van: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
  'tuk-tuk': 'bg-pink-500/15 text-pink-400 border-pink-500/30',
  walk: 'bg-green-500/15 text-green-400 border-green-500/30',
}

const TRANSPORT_ICONS: Record<TransportType, string> = {
  bus: '🚌',
  train: '🚂',
  ferry: '⛵',
  flight: '✈️',
  van: '🚐',
  'tuk-tuk': '🛺',
  walk: '🚶',
}

interface TransportBadgeProps {
  type: TransportType
  label?: string
  size?: 'sm' | 'md'
}

export function TransportBadge({ type, label, size = 'sm' }: TransportBadgeProps) {
  const colors = TRANSPORT_COLORS[type] ?? 'bg-white/10 text-white border-white/20'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        colors,
      )}
    >
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
    default: 'bg-white/10 text-slate-300 border-white/10',
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/15 text-red-400 border-red-500/30',
    brand: 'bg-brand-500/15 text-brand-400 border-brand-500/30',
    outline: 'border-white/20 text-slate-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
