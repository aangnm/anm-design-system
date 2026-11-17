import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Kbd (Core page, Figma v1.3): a keyboard key or shortcut, shown inline in
// text, menus, tooltips and the Command Menu footer.
//
// Why — shortcuts are how power users and agents' operators move fast, but
// only if they are visible where the action is. One key per Kbd keeps the
// keycap readable; `keys` renders a chord with the keys side by side and no
// "+" between them, which is how macOS menus show it and reads faster. Keys
// sit on surface/container-high with a border/default edge so they read as
// objects, not as code. Text is 11px Medium on text/secondary: a hint, never
// the most important thing in its row.

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** Several keys pressed together (a chord), e.g. ['⌘', 'K']. Use children for a single key. */
  keys?: string[]
}

const key = 'inline-flex h-20px min-w-20px items-center justify-center rounded-xs border border-border-default bg-surface-container-high px-4px font-sans text-text-xxs font-medium leading-4 text-text-secondary'

export function Kbd({ keys, children, className, ...props }: KbdProps) {
  if (keys) {
    return (
      <kbd className={cn('inline-flex items-center gap-2px', className)} {...props}>
        {keys.map((k) => (
          <kbd key={k} className={key}>{k}</kbd>
        ))}
      </kbd>
    )
  }
  return (
    <kbd className={cn(key, className)} {...props}>
      {children}
    </kbd>
  )
}
