'use client'

import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-brand-500 to-violet-600 text-white shadow-glow-sm hover:shadow-glow hover:brightness-110',
        secondary:
          'bg-bg-elevated border border-white/10 text-slate-200 hover:bg-bg-overlay hover:border-white/20',
        ghost:
          'text-slate-400 hover:text-slate-200 hover:bg-white/5',
        danger:
          'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20',
        outline:
          'border border-brand-500/50 text-brand-400 hover:bg-brand-500/10',
        glass:
          'bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10',
      },
      size: {
        xs: 'h-7 px-3 text-xs',
        sm: 'h-8 px-3.5 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        xl: 'h-14 px-8 text-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'secondary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
