import type { HTMLAttributes, ReactNode } from 'react'
import { Tag } from '@/components/Tag'
import { cn } from '@/lib/utils'

// Mirrors the Date Indicator component (Navigation page): a date with an
// optional context tag. Why (from Figma) — generalized deliberately: the tag
// is an optional slot for any short context label (a week, a period, an
// environment), not domain vocabulary baked into the library. Body Default
// Medium date, 10px gap, a neutral Tag. Static, not interactive.

export interface DateIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** The formatted date, e.g. "Wednesday, May 27, 2026". */
  date: ReactNode
  /** Optional short context label shown as a Tag, e.g. "SEM 22". Figma's "Show tag". */
  tag?: ReactNode
}

export function DateIndicator({ date, tag, className, ...props }: DateIndicatorProps) {
  return (
    <div className={cn('inline-flex items-center gap-10px', className)} {...props}>
      <span className="whitespace-nowrap text-text-sm font-medium leading-5 text-text-primary">{date}</span>
      {tag ? <Tag>{tag}</Tag> : null}
    </div>
  )
}
