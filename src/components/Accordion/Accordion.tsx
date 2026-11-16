import { useId, useState } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/Badge'
import { cn } from '@/lib/utils'

// Mirrors the Accordion component (Core page): State=Collapsed/Expanded.
// Why (from Figma) — content that belongs on the page but need not always be
// visible; Drawer/Modal block the page, this does not. The chevron rotates
// 180deg (no icon swap). Stack items with a shared bottom hairline; there is
// no container component beyond a plain wrapper (as Menu Item to Menu).
// Hit area (from Figma) — the whole 48px header row (already the 48px touch
// target, so nothing extra on touch).
//
// Size = MD (48 high, 14px title, 16px chevron, flush) / LG (the touch size:
// 56 high, 16px title, 16px side padding, 20px chevron). The header row has
// 12px spacing, so the optional Leading icon (Figma's "Leading icon" + "Icon")
// never touches the title. `count` is Figma's "Show count": an Info Badge,
// because a count on a header should read as a count.

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
  /** Figma's Size. LG is the touch size. */
  size?: 'md' | 'lg'
  /** Figma's "Leading icon" + "Icon". */
  icon?: ReactNode
  /** Figma's "Show count": an Info Badge after the title. */
  count?: number
}

export function AccordionItem({
  title,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  size = 'md',
  icon,
  count,
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
            'flex w-full items-center justify-between gap-12px text-left font-medium text-text-primary outline-none',
            'focus-visible:focus-ring',
            size === 'lg' ? 'h-56px px-16px text-text-base leading-6' : 'h-48px text-text-sm leading-5',
          )}
        >
          {icon ? <span className={cn('shrink-0 text-icon-default', size === 'lg' ? '[&>svg]:size-5' : '[&>svg]:size-4')}>{icon}</span> : null}
          <span className="flex flex-1 items-center gap-8px">
            {title}
            {count !== undefined ? <Badge color="info">{count}</Badge> : null}
          </span>
          <ChevronDown
            className={cn('shrink-0 text-icon-muted transition-transform', size === 'lg' ? 'size-5' : 'size-4', open && 'rotate-180')}
            aria-hidden
          />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-header`}
        hidden={!open}
        className={cn('pb-16px text-text-xs leading-5 text-text-secondary', size === 'lg' && 'px-16px')}
      >
        {children}
      </div>
    </div>
  )
}
