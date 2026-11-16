import { Fragment } from 'react'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Breadcrumb component (Navigation page). Data-driven rather
// than composable children: the "last item is the current page" rule
// (text/primary, not a link, aria-current) is the whole behaviour of this
// component, and deriving it from an array is more reliable than trusting
// every caller to remember it.
// Hit area — each link has a 24px-high target (links are 20px of text, so the
// anchor is padded to 24 without moving the text); on touch it extends to 48.
// The current page is not a link.

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
      <ol className="flex items-center gap-8px text-sm leading-5">
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
                    className="relative inline-flex h-24px items-center rounded-xs text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:focus-ring pointer-coarse:after:absolute pointer-coarse:after:inset-x-0 pointer-coarse:after:top-1/2 pointer-coarse:after:h-48px pointer-coarse:after:-translate-y-1/2"
                  >
                    {item.label}
                  </a>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="size-4 text-icon-muted" />
                </li>
              ) : null}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
