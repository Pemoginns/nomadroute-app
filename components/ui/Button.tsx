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
          'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-gray-300',
        ghost:
          'text-slate-500 hover:text-slate-700 hover:bg-gray-100',
        danger:
          'bg-red-50 border border-red-200 text-red-600 hover:bg-red-100',
        outline:
          'border border-brand-500/50 text-brand-600 hover:bg-brand-50',
        glass:
          'bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-gray-300',
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
