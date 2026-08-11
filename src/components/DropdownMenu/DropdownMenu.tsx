import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Menu } from '@/components/Menu'

// Mirrors the Dropdown Menu component (Navigation page), which has two
// static states — Closed (trigger only) and Open (trigger + Menu panel).
// Code needs the behaviour those two frames imply, so this owns open state
// plus the two dismissals a real menu can't ship without: click-outside
// and Escape.
//
// Positioning is a plain absolute panel below the trigger — no viewport
// collision handling. That's a deliberate limit, not an oversight: proper
// flipping/shifting is a Floating UI concern, and adding the dependency
// isn't justified until a screen actually needs it.

export interface DropdownMenuProps {
  /** Trigger label. Ignored when `trigger` is provided. */
  label?: string
  /** Custom trigger. Receives nothing — wire your own onClick via the wrapper. */
  trigger?: ReactNode
  children: ReactNode
  className?: string
  defaultOpen?: boolean
}

export function DropdownMenu({ label = 'Opciones', trigger, children, className, defaultOpen = false }: DropdownMenuProps) {
  const [open, setOpen] = useState(defaultOpen)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setOpen((v) => !v)}>
        {trigger ?? (
          <Button
            variant="outline"
            size="sm"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={open ? menuId : undefined}
            trailingIcon={
              <ChevronDown className={cn('size-3.5 text-icon-muted transition-transform', open && 'rotate-180')} />
            }
          >
            {label}
          </Button>
        )}
      </div>

      {open ? (
        <Menu id={menuId} className="absolute left-0 top-[calc(100%+8px)] z-50">
          {children}
        </Menu>
      ) : null}
    </div>
  )
}
