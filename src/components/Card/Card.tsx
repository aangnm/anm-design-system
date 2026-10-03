import type { HTMLAttributes, ReactNode } from 'react'
import { CircleAlert, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Card component set (Data Display page): a generic surface for
// grouping related content, with State=Default/Empty/Loading/Error. Default
// renders arbitrary children (compose with CardTitle/CardDescription for the
// canonical title+body); the other three are built-in data states so callers
// don't reimplement the same skeleton/empty/error treatment per usage.

export type CardState = 'default' | 'empty' | 'loading' | 'error'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Maps to Figma's "State" variant. `default` renders children. */
  state?: CardState
  /** Message shown in the empty state. */
  emptyMessage?: string
  /** Message shown in the error state. */
  errorMessage?: string
  children?: ReactNode
}

// bg + border + radius + padding are the shared surface, identical across
// every state (surface/subtle, border/subtle, radius/lg, spacing/20 in Figma).
const surface = 'w-full rounded-lg border border-border-subtle bg-surface-subtle p-20px'
// Every non-Default variant is padded to the Default's height (108px) on purpose:
// swapping a populated card for its Empty state must not collapse the container.
const statePad = 'min-h-[108px]'

export function Card({
  state = 'default',
  emptyMessage = 'Sin datos para mostrar.',
  errorMessage = 'Error al cargar los datos.',
  className,
  children,
  ...props
}: CardProps) {
  if (state === 'loading') {
    return (
      <div className={cn(surface, statePad, 'flex flex-col items-start gap-10px', className)} aria-busy="true" {...props}>
        {/* Skeleton bars — arbitrary dims (not tokens), fill = border/muted. */}
        <div className="h-[16px] w-[140px] rounded-sm bg-border-muted" />
        <div className="h-[12px] w-[260px] rounded-sm bg-border-muted" />
        <div className="h-[12px] w-[180px] rounded-sm bg-border-muted" />
      </div>
    )
  }

  if (state === 'empty' || state === 'error') {
    const isError = state === 'error'
    const Icon = isError ? CircleAlert : Inbox
    return (
      <div className={cn(surface, statePad, 'flex flex-col items-center justify-center gap-8px', className)} {...props}>
        <Icon className={cn('size-20px', isError ? 'text-semantic-error' : 'text-icon-muted')} aria-hidden />
        <p className="text-text-xs leading-5 text-text-secondary">{isError ? errorMessage : emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={cn(surface, 'flex flex-col items-start gap-8px', className)} {...props}>
      {children}
    </div>
  )
}

/** Title Small/Semibold — the card's heading. */
export function CardTitle({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('w-full text-sm font-semibold text-text-primary', className)} {...props} />
}

/** Body Default/Regular — supporting copy under the title. */
export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('w-full text-sm text-text-secondary', className)} {...props} />
}
