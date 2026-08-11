import { forwardRef, useEffect, useRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Checkbox component (Core page): State=Unchecked/Checked/
// Indeterminate/Disabled. `indeterminate` has no HTML attribute — React
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
          'inline-flex items-center gap-8px text-text-primary',
          disabled ? 'cursor-not-allowed text-text-disabled' : 'cursor-pointer',
          className,
        )}
      >
        <span className="relative inline-flex size-[18px] shrink-0 items-center justify-center">
          <input ref={setRefs} id={id} type="checkbox" disabled={disabled} className="peer sr-only" {...props} />
          <span
            className={cn(
              'absolute inset-0 rounded-sm border border-border-emphasis bg-surface-subtle transition-colors',
              'peer-checked:border-transparent peer-checked:bg-interactive-primary',
              'peer-indeterminate:border-transparent peer-indeterminate:bg-interactive-primary',
              'peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring',
              'peer-disabled:border-border-subtle peer-disabled:bg-interactive-disabled',
            )}
          />
          <Check className="pointer-events-none absolute size-3 text-interactive-primary-foreground opacity-0 peer-checked:opacity-100" />
          <Minus className="pointer-events-none absolute size-2.5 text-interactive-primary-foreground opacity-0 peer-indeterminate:opacity-100" />
        </span>
        {label ? <span>{label}</span> : null}
      </label>
    )
  },
)
Checkbox.displayName = 'Checkbox'
