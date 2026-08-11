import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// The Figma "Tabs" component set is actually a single tab (State=Default/
// Active/Disabled/Hover) — a lone tab isn't usable, so this exports both:
// `Tabs` as the tablist container and `Tab` as the item that maps 1:1 to
// the Figma component. Hover is a real :hover here; Active and Disabled
// are props since neither has a native equivalent on a <button>.

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
        'group flex flex-col items-center rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-focus-ring',
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
