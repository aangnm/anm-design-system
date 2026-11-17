import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Button Group (Core page, Figma v1.3): related Buttons and Icon Buttons
// joined into one control — "Previous / Next", "Export / ▾", zoom in and out.
//
// Why — buttons that act on the same thing should read as one object, and
// joining them saves the gap and the doubled borders. The group squares the
// inner corners and overlaps the 1px borders so the seam is one line. Use
// Secondary or Outline buttons: a Primary in a group competes with the
// page's one Primary. Every group needs an aria-label so a screen reader
// announces what the buttons share.

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** What the buttons have in common, read before them. */
  'aria-label': string
  orientation?: 'horizontal' | 'vertical'
  /** Corner radius of the outer ends: match the Button size (SM uses sm, MD and LG use md). */
  size?: 'sm' | 'md'
}

export function ButtonGroup({ orientation = 'horizontal', size = 'md', className, children, ...props }: ButtonGroupProps) {
  const r = size === 'sm' ? 'sm' : 'md'
  return (
    <div
      role="group"
      className={cn(
        'inline-flex [&>*]:rounded-none [&>*:focus-visible]:z-[1]',
        orientation === 'horizontal'
          ? cn('flex-row [&>*+*]:-ml-px', r === 'sm' ? '[&>*:first-child]:rounded-l-sm [&>*:last-child]:rounded-r-sm' : '[&>*:first-child]:rounded-l-md [&>*:last-child]:rounded-r-md')
          : cn('flex-col [&>*+*]:-mt-px', r === 'sm' ? '[&>*:first-child]:rounded-t-sm [&>*:last-child]:rounded-b-sm' : '[&>*:first-child]:rounded-t-md [&>*:last-child]:rounded-b-md'),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
