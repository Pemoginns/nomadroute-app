'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Bed, Bus, Utensils, Compass, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import { getBudgetTier } from '@/lib/engine/budget-calculator'
import type { BudgetBreakdown as BudgetBreakdownType } from '@/lib/types'

const BUDGET_ITEMS = [
  { key: 'accommodation', label: 'Accommodation', icon: Bed, color: '#6366f1' },
  { key: 'transport', label: 'Transport', icon: Bus, color: '#06b6d4' },
  { key: 'food', label: 'Food & Drinks', icon: Utensils, color: '#10b981' },
  { key: 'activities', label: 'Activities', icon: Compass, color: '#f59e0b' },
  { key: 'misc', label: 'Misc & Buffer', icon: MoreHorizontal, color: '#8b5cf6' },
] as const

interface BudgetBreakdownProps {
  breakdown: BudgetBreakdownType
}

export function BudgetBreakdown({ breakdown }: BudgetBreakdownProps) {
  const tier = getBudgetTier(breakdown.perDay)

  const chartData = BUDGET_ITEMS.map(item => ({
    name: item.label,
    value: breakdown[item.key],
    color: item.color,
  })).filter(d => d.value > 0)

  return (
    <div className="rounded-2xl border border-white/8 bg-bg-elevated overflow-hidden">
      <div className="p-5 border-b border-white/8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide">Estimated Total</p>
            <p className="text-3xl font-bold text-white mt-1">${breakdown.total.toLocaleString()}</p>
            <p className="text-sm text-slate-400 mt-0.5">
              ${breakdown.perDay}/day · {' '}
              <span className={tier.color}>{tier.label}</span>
            </p>
          </div>
          <div className="text-2xl">{tier.emoji}</div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex gap-6 items-center">
          {/* Donut chart */}
          <div className="w-32 h-32 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={28}
                  outerRadius={52}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v: number) => [`$${v}`, '']}
                  contentStyle={{
                    background: '#16162A',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.75rem',
                    color: '#f1f5f9',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Items */}
          <div className="flex-1 space-y-2.5">
            {BUDGET_ITEMS.map((item) => {
              const value = breakdown[item.key]
              const pct = Math.round((value / breakdown.total) * 100)
              return (
                <div key={item.key} className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-sm flex-shrink-0"
                    style={{ background: item.color }}
                  />
                  <span className="text-xs text-slate-400 flex-1">{item.label}</span>
                  <span className="text-xs text-slate-500">{pct}%</span>
                  <span className="text-sm font-medium text-white w-14 text-right">
                    ${value}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="px-5 pb-4">
        <p className="text-xs text-slate-600 leading-relaxed">
          * Estimates based on average backpacker spending. Actual costs vary by travel style and season.
        </p>
      </div>
    </div>
  )
}
