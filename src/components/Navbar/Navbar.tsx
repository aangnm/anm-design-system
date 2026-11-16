import { forwardRef } from 'react'
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Navbar component (Navigation page). Figma draws one fixed
// composition (logo / three links / search + avatar); the port turns those
// into slots so the shell is reusable, with NavbarLink carrying the
// active-vs-inactive text treatment.
// Hit area — each link has a 24px-high target (marked Hit area in Figma); icon
// actions in the `actions` slot need a 24 x 24 target (the avatar is 32). On
// touch, extend to 48 x 48 without changing the visual. Brand: the horizontal
// lockup at 108px wide is supplied by the app (clear space 8px on every side).

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  brand?: ReactNode
  actions?: ReactNode
}

export function Navbar({ className, brand, actions, children, ...props }: NavbarProps) {
  return (
    <nav
      className={cn(
        'flex h-14 w-full items-center justify-between border-b border-border-subtle bg-surface-container px-24px',
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-8px">{brand}</div>
      {children ? <div className="flex items-center gap-24px">{children}</div> : null}
      <div className="flex items-center gap-16px">{actions}</div>
    </nav>
  )
}

export interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean
}

export const NavbarLink = forwardRef<HTMLAnchorElement, NavbarLinkProps>(
  ({ className, active, children, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative inline-flex h-24px items-center rounded-xs text-sm font-medium outline-none transition-colors focus-visible:focus-ring',
        'pointer-coarse:after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:top-1/2 pointer-coarse:after:h-48px pointer-coarse:after:-translate-y-1/2',
        active ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  ),
)
NavbarLink.displayName = 'NavbarLink'
