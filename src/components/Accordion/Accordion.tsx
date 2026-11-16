import { useId, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Accordion component (Core page): State=Collapsed/Expanded.
// Why (from Figma) — content that belongs on the page but need not always be
// visible; Drawer/Modal block the page, this does not. The chevron rotates
// 180deg (no icon swap). Stack items with a shared bottom hairline; there is
// no container component beyond a plain wrapper (as Menu Item to Menu).
// Hit area (from Figma) — the whole 48px header row (already the 48px touch
// target, so nothing extra on touch).

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {}

export function Accordion({ className, ...props }: AccordionProps) {
  return <div className={cn('w-full', className)} {...props} />
}

export interface AccordionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onChange'> {
  title: ReactNode
  /** Controlled open state. */
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AccordionItem({
  title,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const [openState, setOpenState] = useState(defaultOpen)
  const open = openProp ?? openState
  const id = useId()

  function toggle() {
    if (openProp === undefined) setOpenState(!open)
    onOpenChange?.(!open)
  }

  return (
    <div className={cn('border-b border-border-subtle', className)} {...props}>
      <h3 className="m-0">
        <button
          type="button"
          id={`${id}-header`}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={toggle}
          className={cn(
            'flex h-48px w-full items-center justify-between gap-8px text-left text-sm font-medium text-text-primary outline-none',
            'focus-visible:ring-2 focus-visible:ring-focus-ring',
          )}
        >
          <span className="flex-1">{title}</span>
          <ChevronDown
            className={cn('size-4 shrink-0 text-icon-muted transition-transform', open && 'rotate-180')}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-header`}
        hidden={!open}
        className="pb-16px text-text-xs leading-5 text-text-secondary"
      >
        {children}
      </div>
    </div>
  )
}
