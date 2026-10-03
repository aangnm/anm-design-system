import { forwardRef, useEffect, useRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Checkbox component (Core page): Value (Unchecked/Checked/
// Indeterminate) x State (Default/Hover/Focus/Disabled) — Value is the real
// checked/indeterminate state, State is :hover (on the row, box tint),
// :focus-visible (focus/ring border) and [disabled]; every combination
// renders. Row is 24 high (the target). `indeterminate` has no HTML attribute — React
// requires setting it via a DOM ref, same as vanilla JS — but the resulting
// `:indeterminate` CSS pseudo-class still drives the styling below.
//
// Structure: input, box, check-icon, and dash-icon are four siblings (not
// nested) inside the wrapper — Tailwind's peer-* variants only reach true
// siblings of `.peer`, not a sibling's descendants, so the icons have to sit
// alongside the box rather than inside it, positioned on top via absolute.

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  indeterminate?: boolean
  label?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, indeterminate, label, id, disabled, ...props }, forwardedRef) => {
    const innerRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (innerRef.current) innerRef.current.indeterminate = Boolean(indeterminate)
    }, [indeterminate])

    const setRefs = (node: HTMLInputElement | null) => {
      innerRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }

    return (
      <label
        htmlFor={id}
        className={cn(
          'relative inline-flex min-h-24px items-center gap-8px text-sm text-text-primary',
          disabled ? 'cursor-not-allowed text-text-disabled' : 'group cursor-pointer pointer-coarse:after:absolute pointer-coarse:after:left-0 pointer-coarse:after:top-1/2 pointer-coarse:after:w-full pointer-coarse:after:h-48px pointer-coarse:after:min-w-48px pointer-coarse:after:-translate-y-1/2',
          className,
        )}
      >
        <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
          <input ref={setRefs} id={id} type="checkbox" disabled={disabled} className="peer sr-only" {...props} />
          <span
            className={cn(
              'absolute inset-0 rounded-sm border border-border-emphasis bg-surface-subtle transition-colors',
              'group-hover:bg-interactive-default',
              'peer-checked:border-transparent peer-checked:bg-interactive-primary group-hover:peer-checked:bg-interactive-primary-hover',
              'peer-indeterminate:border-transparent peer-indeterminate:bg-interactive-primary group-hover:peer-indeterminate:bg-interactive-primary-hover',
              'peer-focus-visible:border-focus-ring peer-checked:peer-focus-visible:border-focus-ring peer-indeterminate:peer-focus-visible:border-focus-ring',
              'peer-disabled:border-border-subtle peer-disabled:bg-interactive-disabled peer-checked:peer-disabled:border-border-subtle peer-checked:peer-disabled:bg-interactive-disabled peer-indeterminate:peer-disabled:border-border-subtle peer-indeterminate:peer-disabled:bg-interactive-disabled',
            )}
          />
          <Check className="pointer-events-none absolute size-3 text-interactive-primary-foreground opacity-0 peer-checked:opacity-100 peer-disabled:text-text-disabled" />
          <Minus className="pointer-events-none absolute size-2.5 text-interactive-primary-foreground opacity-0 peer-indeterminate:opacity-100 peer-disabled:text-text-disabled" />
        </span>
        {label ? <span>{label}</span> : null}
      </label>
    )
  },
)
Checkbox.displayName = 'Checkbox'
