import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Pagination component (Navigation page): 32px square items,
// radius/sm, active item filled with interactive/primary.
//
// The Figma prev/next controls are literal "‹" / "›" text glyphs — a
// drawing shortcut. Using the real Lucide chevrons here instead: the same
// file uses Lucide chevron-right for Breadcrumb separators, so this is the
// system's own iconography rather than a deviation from it.
//
// Hit area — each item is 32 x 32 (above the 24 floor); on touch the target
// extends to 48 x 48 without changing the visual.

const itemClass =
  'relative inline-flex size-32px items-center pointer-coarse:after:absolute pointer-coarse:after:left-1/2 pointer-coarse:after:top-1/2 pointer-coarse:after:size-48px pointer-coarse:after:-translate-x-1/2 pointer-coarse:after:-translate-y-1/2  justify-center rounded-sm text-sm font-medium outline-none transition-colors ' +
  'focus-visible:focus-ring ' +
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
    <nav aria-label="Pagination" className={cn('flex items-center gap-4px', className)}>
      <button
        type="button"
        className={cn(itemClass, 'text-text-secondary hover:text-text-primary')}
        disabled={page <= 1}
        onClick={() => onPageChange?.(page - 1)}
        aria-label="Previous page"
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
        aria-label="Next page"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
