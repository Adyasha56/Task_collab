// badge.jsx
import * as React from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-purple-600/20 text-purple-300 border-purple-600/30',
        secondary: 'border-transparent bg-white/5 text-white/60 border-white/10',
        destructive: 'border-transparent bg-red-950/50 text-red-400 border-red-800/50',
        outline: 'text-white/60 border-white/15',
        success: 'border-transparent bg-emerald-950/50 text-emerald-400 border-emerald-800/50',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

// avatar.jsx
export function Avatar({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function AvatarFallback({ className, children, gradient, ...props }) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white',
        gradient || 'from-purple-500 to-violet-700',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// separator.jsx
export function Separator({ className, orientation = 'horizontal', ...props }) {
  return (
    <div
      className={cn(
        'shrink-0 bg-white/8',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...props}
    />
  )
}

// textarea.jsx
export const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[80px] w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500/50 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
      className
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'
