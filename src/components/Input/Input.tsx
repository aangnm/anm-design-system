import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Mirrors the Input component set (Core page): Size x State, plus the
// "Leading icon" boolean slot. Hover/Focus/Disabled are real browser states
// here (:hover -> border/emphasis, :focus-visible -> focus/ring border);
// Error has no reliable native CSS hook for arbitrary business-logic
// validity, so it's a real prop (also exposed as aria-invalid), same as the
// Figma State=Error variant. Focus + Error is the error border plus an outer
// 2px focus ring. Heights: SM 32 / MD 36 / LG 48; text 13/20, 14/20, 16/24.

const inputVariants = cva(
  'flex w-full items-center gap-8px border bg-surface-container text-text-primary outline-none transition-colors ' +
    'placeholder:text-text-secondary ' +
    'disabled:cursor-not-allowed disabled:bg-interactive-disabled disabled:text-text-disabled disabled:placeholder:text-text-disabled disabled:border-border-subtle disabled:hover:border-border-subtle ' +
    'has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-interactive-disabled has-[:disabled]:text-text-disabled has-[:disabled]:border-border-subtle has-[:disabled]:hover:border-border-subtle',
  {
    variants: {
      size: {
        sm: 'h-32px rounded-sm px-10px text-text-xs leading-5',
        md: 'h-36px rounded-md px-12px text-sm',
        lg: 'h-48px rounded-md px-16px text-base',
      },
      error: {
        true: 'border-semantic-error focus-visible:focus-ring has-[:focus-visible]:focus-ring',
        false: 'border-border-default hover:border-border-emphasis focus-visible:focus-ring has-[:focus-visible]:focus-ring',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  },
)

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Icon rendered before the value — maps to Figma's "Leading icon" slot. */
  leadingIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, error, leadingIcon, ...props }, ref) => {
    if (!leadingIcon) {
      return <input ref={ref} aria-invalid={error || undefined} className={cn(inputVariants({ size, error }), className)} {...props} />
    }
    return (
      <div className={cn(inputVariants({ size, error }), 'has-[:disabled]:cursor-not-allowed', className)}>
        <span className="shrink-0 text-icon-muted [&>svg]:size-4">{leadingIcon}</span>
        <input
          ref={ref}
          aria-invalid={error || undefined}
          className="w-full bg-transparent outline-none placeholder:text-inherit disabled:cursor-not-allowed"
          {...props}
        />
      </div>
    )
  },
)
Input.displayName = 'Input'
