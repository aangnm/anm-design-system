import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Radio component (Core page): Value (Unselected/Selected) x
// State (Default/Hover/Focus/Disabled). Hover tints the circle with
// interactive/default (pointer only); Focus is the focus/ring border; every
// combination renders. Row is 24 high (the target). Same peer + sibling-overlay structure as Checkbox — see the
// note there on why the inner dot can’t be nested inside the circle span.

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, disabled, ...props }, ref) => (
    <label
      htmlFor={id}
      className={cn(
        'relative inline-flex min-h-24px items-center gap-8px text-sm text-text-primary',
        disabled ? 'cursor-not-allowed text-text-disabled' : 'group cursor-pointer pointer-coarse:after:absolute pointer-coarse:after:left-0 pointer-coarse:after:top-1/2 pointer-coarse:after:w-full pointer-coarse:after:h-48px pointer-coarse:after:min-w-48px pointer-coarse:after:-translate-y-1/2',
        className,
      )}
    >
      <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
        <input ref={ref} id={id} type="radio" disabled={disabled} className="peer sr-only" {...props} />
        <span
          className={cn(
            'absolute inset-0 rounded-full border border-border-emphasis bg-surface-container transition-colors',
            'group-hover:bg-interactive-default',
            'peer-checked:border-interactive-primary',
            'peer-focus-visible:focus-ring peer-focus-visible:bg-surface-container',
            'peer-disabled:border-border-subtle peer-disabled:bg-interactive-disabled peer-checked:peer-disabled:border-border-subtle',
          )}
        />
        <span className="pointer-events-none absolute size-2 rounded-full bg-interactive-primary opacity-0 peer-checked:opacity-100 peer-disabled:bg-text-disabled" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  ),
)
Radio.displayName = 'Radio'
