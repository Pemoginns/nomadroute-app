export function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)}min`
  if (hours < 24) return `${hours % 1 === 0 ? hours : hours.toFixed(1)}h`
  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24
  return remainingHours > 0 ? `${days}d ${remainingHours}h` : `${days} days`
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`
  return `${km.toLocaleString()}km`
}

export function formatBudgetShort(usd: number): string {
  if (usd >= 1000) return `$${(usd / 1000).toFixed(1)}k`
  return `$${usd}`
}

export function formatNights(nights: number): string {
  return `${nights} night${nights !== 1 ? 's' : ''}`
}

export function formatDays(days: number): string {
  return `${days} day${days !== 1 ? 's' : ''}`
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
