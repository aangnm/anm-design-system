import type { HTMLAttributes, ReactNode } from 'react'
import { ChevronRight, Circle, CircleAlert, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the List component set (Data Display page): vertical rows with a
// leading icon, title/subtitle, and trailing content, divided by hairlines,
// with State=Default/Empty/Loading/Error. Data-driven (`items`) because the
// row shape is the component's whole behaviour — same call as Breadcrumb.

export type ListState = 'default' | 'empty' | 'loading' | 'error'

export interface ListItem {
  title: ReactNode
  subtitle?: ReactNode
  /** Trailing content on the right (a value, tag, etc.). */
  value?: ReactNode
  /** Leading icon; defaults to an outline circle. */
  icon?: ReactNode
  /** When set, the row becomes a button and gets a hover state. */
  onSelect?: () => void
}

export interface ListProps extends HTMLAttributes<HTMLDivElement> {
  items?: ListItem[]
  state?: ListState
  emptyMessage?: string
  errorMessage?: string
  /** Skeleton rows rendered while loading. */
  loadingRows?: number
}

const container = 'w-full overflow-hidden rounded-lg border border-border-subtle bg-surface-container'
// Every non-Default variant is padded to the Default's height (198px = three 66px
// rows) on purpose, so swapping states never makes the container jump.
const statePad = 'min-h-[198px]'
const rowLayout = 'flex w-full items-center gap-12px px-16px py-12px'

export function List({
  items = [],
  state = 'default',
  emptyMessage = 'Sin movimientos para esta cuenta.',
  errorMessage = 'No se pudo cargar el historial.',
  loadingRows = 3,
  className,
  ...props
}: ListProps) {
  if (state === 'loading') {
    return (
      <div className={cn(container, statePad, className)} aria-busy="true" {...props}>
        {Array.from({ length: loadingRows }).map((_, i) => (
          <div key={i} className="flex w-full items-center gap-12px p-16px">
            <div className="size-5 shrink-0 rounded-full bg-border-subtle" />
            <div className="flex min-w-0 flex-1 flex-col gap-6px">
              <div className="h-12px w-[70px] rounded-sm bg-border-subtle" />
              <div className="h-[10px] w-[110px] rounded-sm bg-border-subtle" />
            </div>
            <div className="h-12px w-[36px] rounded-sm bg-border-subtle" />
          </div>
        ))}
      </div>
    )
  }

  if (state === 'empty' || state === 'error') {
    const isError = state === 'error'
    const Icon = isError ? CircleAlert : Inbox
    return (
      <div className={cn(container, statePad, 'flex flex-col items-center justify-center gap-8px px-16px py-24px', className)} {...props}>
        <Icon className={cn('size-24px', isError ? 'text-semantic-error' : 'text-icon-muted')} aria-hidden />
        <p className="text-text-xs leading-5 text-text-secondary">{isError ? errorMessage : emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn(container, 'flex flex-col divide-y divide-border-subtle', className)} {...props}>
      {items.map((item, i) => {
        const interactive = typeof item.onSelect === 'function'
        const Row = interactive ? 'button' : 'div'
        return (
          <Row
            key={i}
            type={interactive ? 'button' : undefined}
            onClick={item.onSelect}
            className={cn(rowLayout, 'text-left', interactive && 'state-layer hover:state-hover active:state-pressed')}
          >
            <span className="shrink-0 text-icon-muted" aria-hidden>
              {item.icon ?? <Circle className="size-5" />}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-2px">
              <span className="truncate text-sm font-medium text-text-primary">{item.title}</span>
              {item.subtitle != null && (
                <span className="truncate text-text-xs leading-5 text-text-secondary">{item.subtitle}</span>
              )}
            </span>
            {item.value != null && (
              <span className="shrink-0 text-text-xs font-medium leading-5 text-text-secondary">{item.value}</span>
            )}
            <ChevronRight className="size-4 shrink-0 text-icon-muted" aria-hidden />
          </Row>
        )
      })}
    </div>
  )
}
