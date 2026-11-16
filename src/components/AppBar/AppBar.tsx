import type { HTMLAttributes, ReactNode } from 'react'
import { Menu as MenuIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the App Bar / Mobile component (Navigation page): a top bar for a
// phone-width screen — menu button, Date Indicator and Avatar, 56 high on
// surface/container over a border/subtle hairline (16px right, 8px left
// padding so the 48px menu target sits at the edge). Why (from Figma) — an
// operations app needs the day and the period on every screen, so the bar
// carries the date in the middle; it is its own component, not a Navbar
// variant, because Navbar is a slot shell. Show date is the `center` slot
// (omit it to hide). The menu and avatar each have a 48 x 48 touch target.

export interface AppBarProps extends HTMLAttributes<HTMLElement> {
  onMenu?: () => void
  menuLabel?: string
  /** Centre slot, usually a DateIndicator. Figma's "Show date". */
  center?: ReactNode
  /** Right slot, usually an Avatar (wrap it in a button if it opens a menu). */
  trailing?: ReactNode
}

export function AppBar({ onMenu, menuLabel = 'Abrir menú', center, trailing, className, ...props }: AppBarProps) {
  return (
    <header
      className={cn(
        'flex h-56px w-full items-center justify-between border-b border-border-subtle bg-surface-container pl-8px pr-16px',
        className,
      )}
      {...props}
    >
      <button
        type="button"
        onClick={onMenu}
        aria-label={menuLabel}
        className="inline-flex size-48px items-center justify-center rounded-md text-icon-default outline-none transition-colors state-layer hover:state-hover active:state-pressed focus-visible:focus-ring"
      >
        <MenuIcon className="size-6" aria-hidden />
      </button>
      {center}
      <div className="flex size-48px items-center justify-center">{trailing}</div>
    </header>
  )
}
