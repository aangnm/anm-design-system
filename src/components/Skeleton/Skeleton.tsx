import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Skeleton component (Core page): Shape=Line/Block/Circle.
// Why (from Figma) — three shapes cover every loading case in the library
// (text row, media block, avatar) rather than a bespoke skeleton per
// component. Filled with border/muted so it reads as absent content, not a
// disabled control; animated here via Tailwind's `animate-pulse`, matching
// the description's "animate opacity 0.5↔1 in code".

export type SkeletonShape = 'line' | 'block' | 'circle'

const shapes: Record<SkeletonShape, string> = {
  line: 'h-12px w-[200px] rounded-sm',
  block: 'h-[64px] w-[200px] rounded-sm',
  circle: 'size-[40px] rounded-full',
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  shape?: SkeletonShape
}

export function Skeleton({ shape = 'line', className, ...props }: SkeletonProps) {
  return <div aria-hidden className={cn('animate-pulse bg-border-muted', shapes[shape], className)} {...props} />
}
