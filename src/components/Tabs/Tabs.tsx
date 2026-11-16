import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// The Figma "Tabs" component set is actually a single tab (State=Default/
// Active/Disabled/Hover) — a lone tab isn't usable, so this exports both:
// `Tabs` as the tablist container and `Tab` as the item that maps 1:1 to
// the Figma component. Hover is a real :hover here; Active and Disabled
// are props since neither has a native equivalent on a <button>.
// Hit area — each tab is 40 high (above the 24 floor); on touch the target
// extends to 48 x 48 with a pseudo-element, the visual does not change.

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {}

export function Tabs({ className, children, ...props }: TabsProps) {
  return (
    <div role="tablist" className={cn('flex items-end', className)} {...props}>
      {children}
    </div>
  )
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ className, active, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      role="tab"
      type="button"
      aria-selected={active}
      disabled={disabled}
      className={cn(
        'group relative flex flex-col items-center rounded-sm outline-none pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:h-48px pointer-coarse:after:w-full pointer-coarse:after:min-w-48px pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2 focus-visible:focus-ring',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'px-12px pt-8px pb-10px text-sm font-medium transition-colors',
          active ? 'text-text-primary' : 'text-text-secondary',
          disabled && 'text-text-disabled',
          !disabled && !active && 'group-hover:text-text-primary',
        )}
      >
        {children}
      </span>
      {/* Always rendered so switching tabs doesn't shift layout — matches
          the Figma component, where the 2px rect exists in every variant
          and only its fill changes. */}
      <span
        aria-hidden
        className={cn('h-[2px] w-full transition-colors', active ? 'bg-interactive-primary' : 'bg-transparent')}
      />
    </button>
  ),
)
Tab.displayName = 'Tab'
