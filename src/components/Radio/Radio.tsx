import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Radio component (Core page): State=Unselected/Selected/
// Disabled. Same peer + sibling-overlay structure as Checkbox — see the
// note there on why the inner dot can't be nested inside the circle span.

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, disabled, ...props }, ref) => (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-8px text-text-primary',
        disabled ? 'cursor-not-allowed text-text-disabled' : 'cursor-pointer',
        className,
      )}
    >
      <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
        <input ref={ref} id={id} type="radio" disabled={disabled} className="peer sr-only" {...props} />
        <span
          className={cn(
            'absolute inset-0 rounded-full border border-border-emphasis bg-surface-subtle transition-colors',
            'peer-checked:border-interactive-primary',
            'peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring',
            'peer-disabled:border-border-subtle peer-disabled:bg-interactive-disabled',
          )}
        />
        <span className="pointer-events-none absolute size-2 rounded-full bg-interactive-primary opacity-0 peer-checked:opacity-100" />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  ),
)
Radio.displayName = 'Radio'
