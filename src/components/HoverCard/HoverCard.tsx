import { cloneElement, isValidElement, useEffect, useId, useRef, useState, type ReactElement, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Hover Card (Feedback & Overlays page, Figma v1.3): a preview card that
// opens when a pointer rests on a trigger (or the trigger takes keyboard
// focus) — an account, a person, a linked record, a metric's definition.
//
// Why — dashboards are dense with references (Account 4021, a campaign, a
// teammate). A Hover Card answers "what is this?" without leaving the page;
// a Tooltip is for a short label, a Popover for something you act on. Because
// touch screens have no hover, a Hover Card may only preview what the trigger
// already leads to — never hold the only copy of information or an action.
// It opens after 400ms (so passing the pointer over a table does not flash
// cards), stays while the pointer moves onto it, and closes 150ms after
// leaving or on Escape. Surface/container-high, shadow-lg, 280 wide.

export interface HoverCardProps {
  /** The element that opens the card: a Link, an Avatar, a button. Must be focusable. */
  trigger: ReactNode
  children: ReactNode
  side?: 'bottom' | 'top'
  align?: 'start' | 'center' | 'end'
  /** Open on mount (stories and screenshots). */
  defaultOpen?: boolean
  className?: string
}

const OPEN_DELAY = 400
const CLOSE_DELAY = 150

export function HoverCard({ trigger, children, side = 'bottom', align = 'start', defaultOpen = false, className }: HoverCardProps) {
  const [open, setOpen] = useState(defaultOpen)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const id = useId()
  const later = (next: boolean, ms: number) => {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOpen(next), ms)
  }
  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <span
      className="relative inline-block"
      onPointerEnter={(e) => e.pointerType === 'mouse' && later(true, OPEN_DELAY)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && later(false, CLOSE_DELAY)}
      onFocus={() => later(true, 0)}
      onBlur={() => later(false, CLOSE_DELAY)}
      onKeyDown={(e) => {
        if (e.key === 'Escape' && open) {
          e.stopPropagation()
          clearTimeout(timer.current)
          setOpen(false)
        }
      }}
    >
      {isValidElement(trigger) ? cloneElement(trigger as ReactElement<{ 'aria-describedby'?: string }>, { 'aria-describedby': open ? id : undefined }) : trigger}
      {open ? (
        <div
          id={id}
          role="tooltip"
          className={cn(
            'absolute z-[var(--z-index-popover)] w-[280px] max-w-[calc(100vw-32px)] rounded-md bg-surface-container-high p-16px text-left shadow-lg',
            side === 'bottom' ? 'top-[calc(100%+8px)]' : 'bottom-[calc(100%+8px)]',
            align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2',
            className,
          )}
        >
          {children}
        </div>
      ) : null}
    </span>
  )
}
