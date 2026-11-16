import { Minus, Plus } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Mirrors the Stepper component set (Core page): Size x State.
// Why (from Figma) — for small precise values only (hours, counts); disable
// − at min and + at max. Use Input for free-form numeric entry, Slider for a
// range — a stepper implies a bounded range and a meaningful increment.
//
// Size — SM 32 / MD 36 / LG 48 high, 120 / 140 / 160 wide; each button cell is
// a square as tall as the control (that is the pointer hit area).
// States — Hover / Focus / Disabled are real :hover / :focus-visible / disabled
// (the `disabled` prop here, since the control is made of two buttons);
// Error is a prop (`error`); Focus + Error = error border plus an outer 2px
// focus ring (`ring-2 ring-focus-ring`, drawn outside the border).

const stepperVariants = cva(
  'group inline-flex items-center border bg-surface-container transition-colors ' +
    'has-[:focus-visible]:focus-ring',
  {
    variants: {
      size: {
        sm: 'h-32px w-[120px] rounded-sm text-text-xs leading-5',
        md: 'h-36px w-[140px] rounded-md text-sm',
        lg: 'h-48px w-[160px] rounded-md text-base',
      },
      error: {
        // Error border wins over hover/focus borders; Focus + Error adds the ring.
        true: 'border-semantic-error hover:border-semantic-error has-[:focus-visible]:border-semantic-error',
        false: 'border-border-default hover:border-border-emphasis',
      },
      disabled: {
        true: 'cursor-not-allowed border-border-subtle bg-interactive-disabled text-text-disabled hover:border-border-subtle',
        false: 'text-text-primary',
      },
    },
    defaultVariants: { size: 'md', error: false, disabled: false },
  },
)

const cell =
  'flex aspect-square h-full shrink-0 items-center justify-center rounded-[inherit] outline-none transition-colors ' +
  'hover:bg-interactive-default focus-visible:bg-interactive-default disabled:pointer-events-none disabled:text-text-disabled disabled:hover:bg-transparent'

const divider = 'h-full w-px shrink-0 bg-border-default group-hover:bg-border-emphasis'

export interface StepperProps extends Omit<VariantProps<typeof stepperVariants>, 'disabled'> {
  value: number
  min?: number
  max?: number
  step?: number
  onChange: (value: number) => void
  /** Maps to Figma's State=Disabled: both buttons off, disabled surface. */
  disabled?: boolean
  className?: string
}

export function Stepper({
  value,
  min = -Infinity,
  max = Infinity,
  step = 1,
  onChange,
  size,
  error,
  disabled = false,
  className,
}: StepperProps) {
  const canDecrement = !disabled && value - step >= min
  const canIncrement = !disabled && value + step <= max
  const iconSize = size === 'lg' ? 'size-4' : 'size-3.5'

  return (
    // Joined without cn(): tailwind-merge reads text-text-xs as a colour and would
    // drop text-text-primary / text-text-disabled (and vice versa).
    <div className={[stepperVariants({ size, error, disabled }), className].filter(Boolean).join(' ')} aria-invalid={error || undefined}>
      <button
        type="button"
        disabled={!canDecrement}
        onClick={() => onChange(Math.max(min, value - step))}
        aria-label="Disminuir"
        className={cell}
      >
        <Minus className={iconSize} />
      </button>
      <div className={cn(divider, disabled && 'bg-border-subtle group-hover:bg-border-subtle')} />
      <span className="flex h-full flex-1 items-center justify-center">{value}</span>
      <div className={cn(divider, disabled && 'bg-border-subtle group-hover:bg-border-subtle')} />
      <button
        type="button"
        disabled={!canIncrement}
        onClick={() => onChange(Math.min(max, value + step))}
        aria-label="Aumentar"
        className={cell}
      >
        <Plus className={iconSize} />
      </button>
    </div>
  )
}
