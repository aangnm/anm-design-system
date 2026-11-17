import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Input Group (Core page, Figma v1.3): an Input with add-ons — a fixed text
// before or after the value ("https://", "USD", "%"), an icon inside, or a
// small control at the end (a Kbd hint, a copy or clear Icon Button, a unit
// Select).
//
// Why — values with a unit or a fixed prefix are read and typed more
// accurately when the fixed part is shown but not editable; putting it in
// the placeholder makes it vanish as soon as typing starts. `prefix` and
// `suffix` sit on surface/container-high behind a border/subtle seam so they
// read as part of the field but clearly not the value. The whole group is one
// field: one border, one focus ring (when the input inside has focus), one
// error state, at the same SM / MD / LG heights as Input.

export interface InputGroupProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  /** Fixed text before the value, outside the editable area ("https://"). */
  prefix?: ReactNode
  /** Fixed text after the value ("USD", "%"). */
  suffix?: ReactNode
  /** Icon inside the field, before the value. */
  leadingIcon?: ReactNode
  /** A small control inside the field, after the value (Kbd, an Icon Button). */
  trailing?: ReactNode
  /** Classes for the outer group. */
  className?: string
}

const heights = { sm: 'h-control-sm rounded-sm text-text-xs', md: 'h-control-md rounded-md text-sm', lg: 'h-control-lg rounded-md text-base' }
const pad = { sm: 'px-10px', md: 'px-12px', lg: 'px-16px' }

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  ({ size = 'md', error = false, prefix, suffix, leadingIcon, trailing, className, disabled, ...props }, ref) => (
    <div
      className={cn(
        'flex w-full items-stretch overflow-hidden border bg-surface-container text-text-primary transition-colors has-[input:focus-visible]:focus-ring',
        heights[size],
        error ? 'border-semantic-error' : 'border-border-default hover:border-border-emphasis',
        disabled && 'cursor-not-allowed border-border-subtle bg-interactive-disabled text-text-disabled hover:border-border-subtle',
        className,
      )}
    >
      {prefix ? <span className={cn('flex shrink-0 items-center border-r border-border-subtle bg-surface-container-high text-text-secondary', pad[size])}>{prefix}</span> : null}
      <span className={cn('flex min-w-0 flex-1 items-center gap-8px', pad[size], trailing && 'pr-6px')}>
        {leadingIcon ? <span className="shrink-0 text-icon-muted [&>svg]:size-4" aria-hidden>{leadingIcon}</span> : null}
        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={error || undefined}
          className="h-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-secondary disabled:cursor-not-allowed"
          {...props}
        />
        {trailing ? <span className="flex shrink-0 items-center gap-4px">{trailing}</span> : null}
      </span>
      {suffix ? <span className={cn('flex shrink-0 items-center border-l border-border-subtle bg-surface-container-high text-text-secondary', pad[size])}>{suffix}</span> : null}
    </div>
  ),
)
InputGroup.displayName = 'InputGroup'
