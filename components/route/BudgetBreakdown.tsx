'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Bed, Bus, Utensils, Compass, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { getBudgetTier } from '@/lib/engine/budget-calculator'
import type { BudgetBreakdown as BudgetBreakdownType } from '@/lib/types'

const BUDGET_ITEMS = [
  { key: 'accommodation', label: 'Accommodation', icon: Bed,          color: '#6366f1' },
  { key: 'transport',     label: 'Transport',      icon: Bus,          color: '#06b6d4' },
  { key: 'food',          label: 'Food & Drinks',  icon: Utensils,     color: '#10b981' },
  { key: 'activities',    label: 'Activities',     icon: Compass,      color: '#f59e0b' },
  { key: 'misc',          label: 'Misc & Buffer',  icon: MoreHorizontal, color: '#8b5cf6' },
] as const

export function BudgetBreakdown({ breakdown }: { breakdown: BudgetBreakdownType }) {
  const tier = getBudgetTier(breakdown.perDay)

  const chartData = BUDGET_ITEMS
    .map(item => ({ name: item.label, value: breakdown[item.key], color: item.color }))
    .filter(d => d.value > 0)

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 dark:text-gray-400 uppercase tracking-wide">Estimated Total</p>
            <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
              ${breakdown.total.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-0.5">
              ${breakdown.perDay}/day ·{' '}
              <span className={tier.color}>{tier.label}</span>
            </p>
          </div>
          <div className="text-2xl">{tier.emoji}</div>
        </div>
      </div>

      {/* Chart + breakdown */}
      <div className="p-5">
        <div className="flex gap-5 items-center">
          <div className="w-28 h-28 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%" cy="50%"
                  innerRadius={26} outerRadius={50}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`$${v}`, '']}
                  contentStyle={{
                    background: '#1e293b',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    color: '#f1f5f9',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-2">
            {BUDGET_ITEMS.map((item) => {
              const value = breakdown[item.key]
              const pct = Math.round((value / breakdown.total) * 100)
              return (
                <div key={item.key} className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-sm flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-xs text-slate-500 dark:text-gray-400 flex-1 truncate">{item.label}</span>
                  <span className="text-xs text-slate-400 dark:text-gray-500">{pct}%</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white w-12 text-right">
                    ${value}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="px-5 pb-4">
        <p className="text-xs text-slate-400 dark:text-gray-600 leading-relaxed">
          * Estimates based on real backpacker spending. Costs vary by season and travel style.
        </p>
      </div>
    </div>
  )
}
