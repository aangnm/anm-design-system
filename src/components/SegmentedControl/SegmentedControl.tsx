import { cn } from '@/lib/utils'

// Mirrors the Segmented Control component (Core page): a mutually exclusive
// view/scope switch (e.g. Día/Semana/Mes). Why (from Figma) — the active
// segment is raised on surface/default over a surface/muted track,
// deliberately not an underline (that's Tabs' job): Tabs switches view,
// Segmented Control switches scope within one view. Data-driven — Figma
// models exactly 3 fixed segments, but "use for 2-4 options" per the
// description means the real contract is a list, not a fixed arity.

export interface SegmentedControlOption {
  label: string
  value: string
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export function SegmentedControl({ options, value, onChange, className }: SegmentedControlProps) {
  return (
    <div role="radiogroup" className={cn('inline-flex items-center gap-2px rounded-md bg-surface-muted p-2px', className)}>
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              'rounded-sm px-12px py-6px text-text-xs font-medium leading-5 transition-colors',
              active ? 'bg-surface-default text-text-primary' : 'text-text-secondary hover:text-text-primary',
            )}
          >
            {option.label}
          </button>
        )
      })}
    </div>
  )
}
