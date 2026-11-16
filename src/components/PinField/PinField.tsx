import { useId, useState } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the PIN Field component set (Core page, Touch input): a label, four
// masked digit boxes (56 high, 12px apart, radius/md) and a helper or error
// line. State = Default / Focus / Error / Disabled x Filled 0–4.
//
// Why (from Figma) — one wide box hides how many digits are in and makes a
// thumb aim at a text line; four boxes show progress at a glance and give a
// target each. The dots are shapes centred in the box, not a text glyph. In
// code it is ONE numeric input (inputmode numeric, autocomplete
// one-time-code, so paste fills every box) laid transparently over the
// boxes, which are presentation only. Focus puts the shared focus ring on
// the next empty box; Error turns every box semantic/error and replaces the
// helper with the error message (`error`).

export interface PinFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  /** Number of digits. Figma documents 4. */
  length?: number
  helperText?: string
  /** Error message; turns every box semantic/error. */
  error?: string
  disabled?: boolean
  /** Called once all digits are entered. */
  onComplete?: (value: string) => void
  className?: string
}

export function PinField({ label, value, onChange, length = 4, helperText, error, disabled, onComplete, className }: PinFieldProps) {
  const id = useId()
  const [focused, setFocused] = useState(false)
  const digits = value.slice(0, length)
  const active = Math.min(digits.length, length - 1)
  const describedBy = error || helperText ? `${id}-help` : undefined

  return (
    <div className={cn('flex w-full max-w-[358px] flex-col gap-8px', className)}>
      <label htmlFor={id} className={cn('text-text-sm font-medium leading-5', disabled ? 'text-text-disabled' : 'text-text-primary')}>
        {label}
      </label>
      <div className="relative flex gap-12px">
        {Array.from({ length }, (_, i) => (
          <div
            key={i}
            aria-hidden
            className={cn(
              'flex h-56px flex-1 items-center justify-center rounded-md border transition-colors',
              disabled ? 'border-border-subtle bg-interactive-disabled' : 'bg-surface-container',
              !disabled && (error ? 'border-semantic-error' : 'border-border-default'),
              focused && !disabled && i === active && digits.length < length && 'focus-ring',
            )}
          >
            {i < digits.length ? (
              <span className={cn('size-12px rounded-pill', disabled ? 'bg-text-disabled' : 'bg-text-primary')} />
            ) : null}
          </div>
        ))}
        <input
          id={id}
          type="password"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={length}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          value={digits}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            const next = e.target.value.replace(/\D/g, '').slice(0, length)
            onChange(next)
            if (next.length === length) onComplete?.(next)
          }}
          className="absolute inset-0 size-full cursor-text opacity-0 disabled:cursor-not-allowed"
        />
      </div>
      {error || helperText ? (
        <p id={`${id}-help`} className={cn('text-text-xs leading-5', error ? 'text-text-error' : 'text-text-secondary')}>
          {error ?? helperText}
        </p>
      ) : null}
    </div>
  )
}
