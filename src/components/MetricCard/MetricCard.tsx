import type { HTMLAttributes, ReactNode } from 'react'
import { Card } from '@/components/Card'
import { Tag, type TagProps } from '@/components/Tag'
import { cn } from '@/lib/utils'

// Mirrors the Metric Card component (App Ref: Product Patterns page): a
// dashboard KPI card — title + context, a hero value with unit, and a
// category tag. Why (from Figma) — deliberately kept off Core and Data
// Display: it's assembled entirely from Card + Tag so it inherits their
// tokens rather than forking new ones. Use Stat instead for a compact
// label/value/delta tile. Hit area — not interactive; the category Tag is a
// label. If the whole card becomes a link, the card is the target.

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  context: string
  value: ReactNode
  valueContext: string
  tagLabel: string
  tagColor?: TagProps['color']
}

export function MetricCard({ title, context, value, valueContext, tagLabel, tagColor = 'neutral', className, ...props }: MetricCardProps) {
  return (
    <Card className={cn('w-full max-w-[300px] gap-16px', className)} {...props}>
      <div className="flex w-full flex-col gap-4px">
        <p className="text-base font-semibold leading-6 text-text-primary">{title}</p>
        <p className="text-text-xs leading-5 text-text-secondary">{context}</p>
      </div>
      <div className="flex w-full flex-col gap-2px">
        <p className="text-3xl font-semibold text-text-primary">{value}</p>
        <p className="text-text-xs leading-5 text-text-secondary">{valueContext}</p>
      </div>
      <div className="flex w-full items-start justify-end">
        <Tag color={tagColor}>{tagLabel}</Tag>
      </div>
    </Card>
  )
}
