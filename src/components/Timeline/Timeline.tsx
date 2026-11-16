import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Timeline component (Product Patterns page): an ordered event
// history per account — payments, reconciliations, transfers — a coloured marker per event
// type joined by a connecting line, with a relative timestamp and one line of
// detail per entry. Event colours reuse the semantic palette already
// established by Benchmark Table's tier chips (success / info / warning), not a
// new marker palette.
// Why (from Figma) — speculative rather than a confirmed gap: inferred from
// sample copy already present in Drawer ("Revisar zona norte...") and Benchmark
// Table, not from a screen that has needed one yet. Kept intentionally simple —
// no filtering, grouping or pagination modelled; those are questions the first
// real usage should answer.
// Hit area — not interactive. If entries open a detail, each entry is the target.

export type TimelineTone = 'success' | 'info' | 'warning'

export interface TimelineEntry {
  title: ReactNode
  /** Relative timestamp, e.g. "Today · 09:12". */
  time: ReactNode
  detail?: ReactNode
  /** Marker colour — success / info / warning, same as Benchmark Table's chips. */
  tone?: TimelineTone
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  entries: TimelineEntry[]
}

const toneClass: Record<TimelineTone, string> = {
  success: 'bg-semantic-success',
  info: 'bg-semantic-info',
  warning: 'bg-semantic-warning',
}

export function Timeline({ entries, className, ...props }: TimelineProps) {
  return (
    <ol className={cn('flex w-full max-w-[360px] flex-col', className)} {...props}>
      {entries.map((entry, i) => {
        const isLast = i === entries.length - 1
        return (
          <li key={i} className="flex items-stretch gap-14px">
            <div className="flex w-10px shrink-0 flex-col items-center gap-4px" aria-hidden>
              <span className={cn('size-10px shrink-0 rounded-full', toneClass[entry.tone ?? 'info'])} />
              {!isLast ? <span className="w-[2px] flex-1 bg-border-emphasis" /> : null}
            </div>
            <div className={cn('flex min-w-0 flex-1 flex-col gap-2px', !isLast && 'pb-16px')}>
              <div className="flex items-center gap-8px">
                <p className="text-text-xs font-medium leading-5 text-text-primary">{entry.title}</p>
                <p className="text-text-xxs leading-4 text-text-secondary">{entry.time}</p>
              </div>
              {entry.detail ? <p className="text-text-xs leading-5 text-text-secondary">{entry.detail}</p> : null}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
