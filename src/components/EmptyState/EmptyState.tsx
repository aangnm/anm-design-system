import type { HTMLAttributes, ReactNode } from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Empty State component (Product Patterns page): a whole page or
// panel with nothing in it yet — icon badge, heading, one line of guidance,
// one primary action. Distinct from Card/Stat/List/Table's own built-in empty
// state, which fills only that one component's bounds; this is the bigger
// version for a page or section that has never had data at all.
// Why (from Figma) — the per-component empty states answer "this list has no
// rows right now". They don't answer "this product surface has never been set
// up" (no lotes registered, no campaigns created) — a first-run moment that
// deserves an action, not just an icon and a sentence. It has no border of its
// own and fills whatever space it is given, like Divider and Spinner.
// Hit area — pointer: the action (36 high); on touch it extends to 48 x 48.

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Glyph inside the 56px badge; defaults to the inbox. */
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  /** The one primary action, e.g. `<Button>Añadir lote</Button>`. */
  action?: ReactNode
}

export function EmptyState({ icon, title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div className={cn('flex w-full flex-col items-center justify-center gap-20px px-40px py-64px text-center', className)} {...props}>
      <div className="flex size-56px items-center justify-center rounded-full bg-surface-emphasis text-icon-muted [&>svg]:size-6" aria-hidden>
        {icon ?? <Inbox />}
      </div>
      <div className="flex max-w-[320px] flex-col items-center gap-6px">
        <p className="text-base font-semibold leading-6 text-text-primary">{title}</p>
        {description ? <p className="text-text-xs leading-5 text-text-secondary">{description}</p> : null}
      </div>
      {action}
    </div>
  )
}
