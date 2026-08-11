import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Menu Item + Menu components (Navigation page). Menu is the
// elevated surface (surface/emphasis, radius/md, elevation/shadow-lg);
// MenuItem is the row. Hover is a real :hover — only Disabled needs a prop.

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {}

export function Menu({ className, children, ...props }: MenuProps) {
  return (
    <div
      role="menu"
      className={cn(
        // w-fit + a 232px floor: Figma draws the panel at a fixed 232px, but
        // a block-level flex column would otherwise stretch to fill whatever
        // it's dropped into. Hugging content with a minimum keeps the Figma
        // width for typical items without pinning wider content.
        'flex w-fit min-w-[232px] flex-col gap-2px rounded-md bg-surface-emphasis p-6px shadow-lg',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
}

export const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, icon, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      role="menuitem"
      type="button"
      disabled={disabled}
      className={cn(
        'flex w-full items-center gap-10px rounded-sm px-12px py-6px text-left text-sm outline-none transition-colors',
        'text-text-primary hover:bg-interactive-default',
        'focus-visible:bg-interactive-default focus-visible:ring-1 focus-visible:ring-focus-ring',
        'disabled:pointer-events-none disabled:text-text-disabled',
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className={cn('shrink-0 [&>svg]:size-4', disabled ? 'text-text-disabled' : 'text-icon-muted')}>
          {icon}
        </span>
      ) : null}
      <span className="flex-1">{children}</span>
    </button>
  ),
)
MenuItem.displayName = 'MenuItem'
