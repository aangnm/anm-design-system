import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Pagination component (Navigation page): 32px square items,
// radius/sm, active item filled with interactive/primary.
//
// The Figma prev/next controls are literal "‹" / "›" text glyphs — a
// drawing shortcut. Using the real Lucide chevrons here instead: the same
// file uses Lucide chevron-right for Breadcrumb separators, so this is the
// system's own iconography rather than a deviation from it.

const itemClass =
  'inline-flex size-32px items-center justify-center rounded-sm text-sm font-medium outline-none transition-colors ' +
  'focus-visible:ring-1 focus-visible:ring-focus-ring ' +
  'disabled:pointer-events-none disabled:text-text-disabled'

export interface PaginationProps {
  /** Current page, 1-indexed. */
  page: number
  pageCount: number
  onPageChange?: (page: number) => void
  className?: string
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)

  return (
    <nav aria-label="Paginación" className={cn('flex items-center gap-4px', className)}>
      <button
        type="button"
        className={cn(itemClass, 'text-text-secondary hover:text-text-primary')}
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        aria-label="Página anterior"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((p) => {
        const isActive = p === page
        return (
          <button
            key={p}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              itemClass,
              isActive
                ? 'bg-interactive-primary text-interactive-primary-foreground'
                : 'text-text-secondary hover:bg-interactive-default hover:text-text-primary',
            )}
            onClick={() => onPageChange?.(p)}
          >
            {p}
          </button>
        )
      })}

      <button
        type="button"
        className={cn(itemClass, 'text-text-secondary hover:text-text-primary')}
        disabled={page >= pageCount}
        onClick={() => onPageChange?.(page + 1)}
        aria-label="Página siguiente"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
