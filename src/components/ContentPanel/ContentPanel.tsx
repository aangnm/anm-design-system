import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Content Panel component (App Ref: Product Patterns page): a
// titled surface that frames a graph, table, or content block — header
// (title + optional controls) over a content area. Why (from Figma) — the
// primary dashboard container for the product; a nested chart is overridden
// borderless rather than rebuilt without a border, so chart fixes still
// propagate. Same idea here: pass a chart/table `children` with its own
// border/background classes stripped via `className` (twMerge dedupes it),
// not a special "borderless" prop on the chart itself.

export interface ContentPanelProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  controls?: ReactNode
  children: ReactNode
}

export function ContentPanel({ title, controls, children, className, ...props }: ContentPanelProps) {
  return (
    <div
      className={cn('flex w-[440px] flex-col items-start gap-12px rounded-lg border border-border-default bg-surface-container p-16px', className)}
      {...props}
    >
      <div className="flex w-full items-center">
        <p className="flex-1 text-base font-semibold leading-6 text-text-primary">{title}</p>
        {controls}
      </div>
      {children}
    </div>
  )
}
