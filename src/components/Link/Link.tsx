import { forwardRef } from 'react'
import type { AnchorHTMLAttributes } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Link component (Core page): State=Default/Hover/Focus/Visited
// plus the External toggle. Hover/Focus/Visited are real :hover,
// :focus-visible and :visited — no props. Why (from Figma) — text/primary
// underlined by default so the affordance never depends on colour alone;
// text/emphasis on hover, the shared focus ring, text/secondary when visited.
// No link-specific colour token on purpose.
// Hit area (from Figma) — standalone links are 24 high; links inside running
// text are exempt. On touch the target grows to 48 x 48 without changing the
// visual (`standalone` opts in; leave it off inside paragraphs).

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Figma "External": adds the inline arrow suffix and opens in a new tab safely. */
  external?: boolean
  /** Standalone (not inside running text): 24px min height, 48px touch target. */
  standalone?: boolean
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, external, standalone, children, target, rel, ...props }, ref) => (
    <a
      ref={ref}
      target={external ? (target ?? '_blank') : target}
      rel={external ? (rel ?? 'noopener noreferrer') : rel}
      className={cn(
        'inline-flex items-center gap-2px rounded-sm text-sm text-text-primary underline underline-offset-2 outline-none transition-colors',
        'hover:text-text-emphasis visited:text-text-secondary visited:hover:text-text-emphasis',
        'focus-visible:focus-ring',
        standalone &&
          'relative min-h-24px [@media(pointer:coarse)]:after:absolute [@media(pointer:coarse)]:after:left-1/2 [@media(pointer:coarse)]:after:top-1/2 [@media(pointer:coarse)]:after:size-48px [@media(pointer:coarse)]:after:-translate-x-1/2 [@media(pointer:coarse)]:after:-translate-y-1/2',
        className,
      )}
      {...props}
    >
      {children}
      {external ? <ArrowUpRight className="size-3 shrink-0" aria-hidden /> : null}
    </a>
  ),
)
Link.displayName = 'Link'
