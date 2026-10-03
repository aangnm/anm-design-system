import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Switch component (Core page): Value (Off/On) x State (Default/
// Hover/Focus/Disabled). Why (Figma) — the Off knob is icon/muted (clears 3:1
// on the track and every surface in both themes) and the Off track carries a
// 1px border/default outline so its edge is visible. Hover moves the track one
// step (interactive/hover off, primary-hover on), pointer only. The Disabled
// knob stays a raw primitive (color/charcoal/600), deliberately not promoted
// to a token — it's this component's one-off choice, inlined as an arbitrary
// value. Row is 24 high (the target).

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, id, disabled, ...props }, ref) => (
    <label
      htmlFor={id}
      className={cn(
        'relative inline-flex min-h-24px items-center gap-8px text-sm text-text-primary',
        disabled ? 'cursor-not-allowed text-text-disabled' : 'group cursor-pointer pointer-coarse:after:absolute pointer-coarse:after:left-0 pointer-coarse:after:top-1/2 pointer-coarse:after:w-full pointer-coarse:after:h-48px pointer-coarse:after:min-w-48px pointer-coarse:after:-translate-y-1/2',
        className,
      )}
    >
      <span className="relative inline-flex h-5 w-9 shrink-0 items-center">
        <input ref={ref} id={id} type="checkbox" role="switch" disabled={disabled} className="peer sr-only" {...props} />
        <span
          className={cn(
            'absolute inset-0 rounded-full border border-border-default bg-interactive-default transition-colors group-hover:bg-interactive-hover',
            'peer-checked:border-transparent peer-checked:bg-interactive-primary group-hover:peer-checked:bg-interactive-primary-hover',
            'peer-focus-visible:border-focus-ring peer-checked:peer-focus-visible:border-focus-ring',
            'peer-disabled:border-transparent peer-disabled:bg-interactive-disabled peer-checked:peer-disabled:bg-interactive-disabled',
          )}
        />
        <span
          className={cn(
            'pointer-events-none relative ml-[2px] size-4 rounded-full bg-icon-muted transition-transform',
            'peer-checked:translate-x-4 peer-checked:bg-interactive-primary-foreground',
            'peer-disabled:bg-[#404040] peer-checked:peer-disabled:bg-[#404040]',
          )}
        />
      </span>
      {label ? <span>{label}</span> : null}
    </label>
  ),
)
Switch.displayName = 'Switch'
