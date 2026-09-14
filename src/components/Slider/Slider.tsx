import { forwardRef } from 'react'
import type { CSSProperties, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Slider component (Core page): a continuous value selector.
// Why (from Figma) — rail = interactive/default, filled portion + thumb =
// interactive/primary; the thumb carries a 2px surface ring so it stays
// legible where it overlaps the filled portion of the rail. A native
// <input type="range"> styled via the vendor pseudo-elements, same "no
// Radix" call as Select/Search — a single-thumb, single-size control with
// no open state. The filled portion is a gradient on the track driven by a
// CSS custom property, since neither vendor prefix exposes a plain
// percentage-fill utility.

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  value: number
  min?: number
  max?: number
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ className, value, min = 0, max = 100, style, ...props }, ref) => {
    const percent = max === min ? 0 : ((value - min) / (max - min)) * 100
    return (
      <input
        ref={ref}
        type="range"
        value={value}
        min={min}
        max={max}
        style={{ ...style, '--slider-pct': `${percent}%` } as CSSProperties}
        className={cn(
          'h-16px w-full cursor-pointer appearance-none bg-transparent',
          '[&::-webkit-slider-runnable-track]:h-4px [&::-webkit-slider-runnable-track]:rounded-pill [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--interactive-primary)_var(--slider-pct),var(--interactive-default)_var(--slider-pct))]',
          '[&::-moz-range-track]:h-4px [&::-moz-range-track]:rounded-pill [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--interactive-primary)_var(--slider-pct),var(--interactive-default)_var(--slider-pct))]',
          '[&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:size-16px [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-interactive-primary [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_var(--surface-page)]',
          '[&::-moz-range-thumb]:size-16px [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-interactive-primary [&::-moz-range-thumb]:shadow-[0_0_0_2px_var(--surface-page)]',
          'focus-visible:outline-none [&::-webkit-slider-thumb]:focus-visible:ring-1 [&::-webkit-slider-thumb]:focus-visible:ring-focus-ring',
          className,
        )}
        {...props}
      />
    )
  },
)
Slider.displayName = 'Slider'
