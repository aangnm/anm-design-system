import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Toggle Group (Core page, Figma v1.3): a row of toggle buttons — one or
// several can be on. Text formatting, which series a chart shows, list or
// grid view with independent options.
//
// Why — Segmented Control already covers "choose exactly one scope"
// (Day / Week / Month) as a radio group. Toggle Group is for on/off options:
// `type="multiple"` lets several be on at once, and `type="single"` allows
// none, which a radio group cannot. Pressed items take surface/highlight, the
// same selection tint as a Data Table row, so "on" means one thing across the
// system. Each item is a real button with aria-pressed; icon-only items must
// still carry a label, which becomes their accessible name and tooltip.

export interface ToggleGroupItem {
  value: string
  label: string
  icon?: ReactNode
}

interface Base {
  items: ToggleGroupItem[]
  /** What the toggles control, read before them. */
  'aria-label': string
  size?: 'sm' | 'md'
  /** Shows icons only; labels become the accessible name and a tooltip. */
  iconOnly?: boolean
  disabled?: boolean
  className?: string
}

export type ToggleGroupProps = Base &
  (
    | { type: 'single'; value: string | null; onChange: (value: string | null) => void }
    | { type: 'multiple'; value: string[]; onChange: (value: string[]) => void }
  )

export function ToggleGroup(props: ToggleGroupProps) {
  const { items, size = 'md', iconOnly = false, disabled, className } = props
  const isOn = (v: string) => (props.type === 'single' ? props.value === v : props.value.includes(v))
  const toggle = (v: string) => {
    if (props.type === 'single') props.onChange(props.value === v ? null : v)
    else props.onChange(props.value.includes(v) ? props.value.filter((x) => x !== v) : [...props.value, v])
  }

  return (
    <div role="group" aria-label={props['aria-label']} className={cn('inline-flex items-stretch gap-2px rounded-md border border-border-default p-2px', size === 'sm' ? 'h-control-sm' : 'h-control-md', className)}>
      {items.map((item) => {
        const on = isOn(item.value)
        return (
          <button
            key={item.value}
            type="button"
            aria-pressed={on}
            aria-label={iconOnly ? item.label : undefined}
            title={iconOnly ? item.label : undefined}
            disabled={disabled}
            onClick={() => toggle(item.value)}
            className={cn(
              'relative inline-flex items-center justify-center gap-6px rounded-sm font-medium outline-none transition-colors focus-visible:focus-ring [&_svg]:size-4',
              size === 'sm' ? 'px-8px text-text-xs leading-5' : 'px-10px text-sm leading-5',
              iconOnly && 'aspect-square px-0',
              on ? 'bg-surface-highlight text-text-primary' : 'text-text-secondary state-layer hover:state-hover hover:text-text-primary',
              'disabled:pointer-events-none disabled:text-text-disabled',
            )}
          >
            {item.icon}
            {iconOnly ? null : item.label}
          </button>
        )
      })}
    </div>
  )
}
