import { Fragment } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Breadcrumb component (Navigation page). Data-driven rather
// than composable children: the "last item is the current page" rule
// (text/primary, not a link, aria-current) is the whole behaviour of this
// component, and deriving it from an array is more reliable than trusting
// every caller to remember it.

export interface BreadcrumbItem {
  label: string
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-8px text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li>
                {isLast || !item.href ? (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={cn(isLast ? 'text-text-primary' : 'text-text-secondary')}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    className="rounded-xs text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:ring-1 focus-visible:ring-focus-ring"
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="size-3.5 text-icon-muted" />
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
