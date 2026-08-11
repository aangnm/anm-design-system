import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Switch component (Core page): State=Off/On/Disabled.
// The Off and Disabled knob colors are raw Figma primitives
// (color/charcoal/300, color/charcoal/600) rather than semantic Themes
// tokens — that's the Figma file's own choice, not a gap in this port, so
// they're inlined as arbitrary values rather than invented as new tokens.

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, disabled, ...props }, ref) => (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-8px text-text-primary',
        disabled ? 'cursor-not-allowed text-text-disabled' : 'cursor-pointer',
        className,
      )}
    >
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
        <input ref={ref} id={id} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" {...props} />
        <span
          className={cn(
            'absolute inset-0 rounded-full bg-interactive-default transition-colors',
            'peer-checked:bg-interactive-primary',
            'peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus-ring',
            'peer-disabled:bg-interactive-disabled',
          )}
        />
        <span
          className={cn(
            'pointer-events-none relative ml-[2px] size-4 rounded-full bg-[#c0c0c0] transition-transform',
            'peer-checked:translate-x-4 peer-checked:bg-interactive-primary-foreground',
            'peer-disabled:bg-[#404040]',
          )}
        />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  ),
)
Switch.displayName = 'Switch'
