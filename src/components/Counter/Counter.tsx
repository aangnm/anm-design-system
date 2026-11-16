import { useId } from 'react'
import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Counter component set (Core page, Touch input): large numeric
// entry for a small count — − / value / + with 64px buttons and a 36px value.
// State = Default / Focus / Disabled / Error.
//
// Why (from Figma) — Stepper tops out at 48 high with a small glyph: right for
// a form row, wrong for entering counts standing up, where the number is the
// whole task. Counter makes the number the largest thing on the screen and
// gives each step a 64px target. The value field uses border/default (a
// control boundary); − / + are filled (interactive/default) with a
// border/subtle edge, identified by their glyph. Focus is the shared ring
// around the field; Error is a semantic/error border (`error`).
//
// The value is a real numeric input (inputmode numeric) so it can also be
// typed; − / + clamp to `min` / `max`. The value is Display XL
// Semibold (`text-display-xl`).

export interface CounterProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  error?: boolean
  /** Accessible name for the value field. */
  label?: string
  className?: string
}

const stepButton =
  'flex size-64px shrink-0 items-center justify-center rounded-md border border-border-subtle bg-interactive-default text-icon-default outline-none transition-colors ' +
  'state-layer hover:state-hover active:state-pressed focus-visible:focus-ring disabled:pointer-events-none disabled:bg-interactive-disabled disabled:text-text-disabled'

export function Counter({ value, onChange, min = 0, max = Infinity, step = 1, disabled, error, label = 'Quantity', className }: CounterProps) {
  const id = useId()
  const clamp = (v: number) => Math.min(max, Math.max(min, v))
  return (
    <div className={cn('flex w-full items-center gap-12px', className)}>
      <button type="button" className={stepButton} aria-label="Decrease" disabled={disabled || value <= min} onClick={() => onChange(clamp(value - step))}>
        <Minus className="size-6" aria-hidden />
      </button>
      <input
        id={id}
        aria-label={label}
        inputMode="numeric"
        disabled={disabled}
        aria-invalid={error || undefined}
        value={Number.isFinite(value) ? value : ''}
        onChange={(e) => {
          const n = Number(e.target.value.replace(/\D/g, ''))
          if (!Number.isNaN(n)) onChange(clamp(n))
        }}
        className={cn(
          'h-64px min-w-0 flex-1 rounded-md border bg-surface-container text-center text-display-xl font-semibold text-text-primary outline-none transition-colors',
          'focus-visible:focus-ring disabled:bg-interactive-disabled disabled:text-text-disabled',
          error ? 'border-semantic-error' : 'border-border-default',
          disabled && 'border-border-subtle',
        )}
      />
      <button type="button" className={stepButton} aria-label="Increase" disabled={disabled || value >= max} onClick={() => onChange(clamp(value + step))}>
        <Plus className="size-6" aria-hidden />
      </button>
    </div>
  )
}
