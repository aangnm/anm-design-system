import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Stepper component (Core page): −/value/+ in a bordered field.
// Why (from Figma) — for small precise values only (hours, counts); disable
// − at min and + at max. Use Input for free-form numeric entry, Slider for a
// range — a stepper implies a bounded range and a meaningful increment.

export interface StepperProps {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  className?: string
}

export function Stepper({ value, min = -Infinity, max = Infinity, step = 1, onChange, className }: StepperProps) {
  const canDecrement = value - step >= min
  const canIncrement = value + step <= max

  return (
    <div
      className={cn(
        'inline-flex h-36px w-[140px] items-center rounded-md border border-border-default bg-surface-subtle',
        className,
      )}
    >
      <button
        type="button"
        disabled={!canDecrement}
        onClick={() => onChange(Math.max(min, value - step))}
        aria-label="Disminuir"
        className="flex h-full flex-1 items-center justify-center text-text-primary transition-colors hover:bg-interactive-default disabled:pointer-events-none disabled:text-text-disabled"
      >
        <Minus className="size-3.5" />
      </button>
      <div className="h-full w-px shrink-0 bg-border-default" />
      <span className="flex h-full flex-1 items-center justify-center text-sm font-medium text-text-primary">
        {value}
      </span>
      <div className="h-full w-px shrink-0 bg-border-default" />
      <button
        type="button"
        disabled={!canIncrement}
        onClick={() => onChange(Math.min(max, value + step))}
        aria-label="Aumentar"
        className="flex h-full flex-1 items-center justify-center text-text-primary transition-colors hover:bg-interactive-default disabled:pointer-events-none disabled:text-text-disabled"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  )
}
