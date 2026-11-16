import type { ReactNode } from 'react'
import { Stepper } from '@/components/Stepper'
import { cn } from '@/lib/utils'

// Mirrors the Count Row component set (Core page, Touch input): a label on
// the left and a Stepper LG on the right, 64 high, 8px / 16px padding.
// State = Default / Filled: Filled adds a full-width surface/highlight band
// and a semibold label — this item already holds a value.
//
// Why (from Figma) — among eight rows, bolding alone did not make the filled
// ones findable. The row has no outline of its own (the Stepper carries the
// control border), and a filled row gets the highlight band, the same
// resource Choice Tile's Done state uses, so "already has a value" reads the
// same everywhere. Stack rows edge to edge with no hairlines. `filled`
// defaults to `value > 0`.

export interface CountRowProps {
  label: ReactNode
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step?: number
  filled?: boolean
  disabled?: boolean
  className?: string
}

export function CountRow({ label, value, onChange, min = 0, max, step, filled, disabled, className }: CountRowProps) {
  const isFilled = filled ?? value > 0
  return (
    <div
      className={cn(
        'flex min-h-64px w-full items-center justify-between gap-12px px-16px py-8px',
        isFilled && 'bg-surface-highlight',
        className,
      )}
    >
      <span className={cn('min-w-0 truncate text-text-base leading-6 text-text-primary', isFilled ? 'font-semibold' : 'font-medium')}>{label}</span>
      <Stepper size="lg" value={value} onChange={onChange} min={min} max={max} step={step} disabled={disabled} />
    </div>
  )
}
