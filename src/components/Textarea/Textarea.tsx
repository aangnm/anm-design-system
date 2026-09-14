import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Mirrors the Textarea component (Core page): State=Default/Focus/Disabled/Error.
// Why (from Figma) — mirrors Input's state tokens exactly (Focus→focus-ring,
// Error→semantic-error) rather than defining its own, so a form mixing single-
// and multi-line fields stays visually consistent. Atomic — pair with Form
// Field for label + helper, same as Input.

const textareaVariants = cva(
  'w-full resize-none rounded-md border bg-surface-subtle px-12px py-8px text-sm text-text-primary outline-none transition-colors ' +
    'placeholder:text-text-secondary ' +
    'focus-visible:border-focus-ring ' +
    'disabled:cursor-not-allowed disabled:bg-interactive-disabled disabled:text-text-disabled disabled:placeholder:text-text-disabled disabled:border-border-subtle',
  {
    variants: {
      error: {
        true: 'border-semantic-error',
        false: 'border-border-default',
      },
    },
    defaultVariants: {
      error: false,
    },
  },
)

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, error, rows = 4, ...props }, ref) => (
  <textarea ref={ref} rows={rows} className={cn(textareaVariants({ error }), className)} {...props} />
))
Textarea.displayName = 'Textarea'
