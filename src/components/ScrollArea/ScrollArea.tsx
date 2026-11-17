import { useEffect, useRef, useState, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Scroll Area (Core page, Figma v1.3): a region that scrolls inside a fixed
// height or width — a long legend, a chat history, a side panel's list — with
// a thin token-coloured scrollbar and soft edges that say there is more.
//
// Why — native scrollbars differ per platform and can be invisible on macOS
// until you scroll, so a clipped list can look complete. The edge fades
// (surface to transparent, 16px) appear only on a side that has more content,
// which is the cue; the scrollbar is the browser's own, thinned and coloured
// with border/default so it keeps native behaviour (dragging, page clicks,
// assistive tech). A region that scrolls is focusable and named, so keyboard
// users can reach and scroll it (WCAG 2.1.1).

export interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the region for assistive tech; required because the region is focusable. */
  'aria-label': string
  orientation?: 'vertical' | 'horizontal'
  /** Max height (vertical) or width (horizontal) in px; or size the area with a class. */
  maxSize?: number
  /** Colour behind the content, for the edge fades. */
  surface?: 'page' | 'container' | 'container-high'
}

const SURFACE = { page: 'var(--surface-page)', container: 'var(--surface-container)', 'container-high': 'var(--surface-container-high)' }

export function ScrollArea({ orientation = 'vertical', maxSize, surface = 'container', className, children, style, ...props }: ScrollAreaProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState({ start: false, end: false })
  const vertical = orientation === 'vertical'

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const pos = vertical ? el.scrollTop : el.scrollLeft
      const max = vertical ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth
      setEdges({ start: pos > 1, end: pos < max - 1 })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [vertical])

  const fade = (side: 'start' | 'end') =>
    cn(
      'pointer-events-none absolute transition-opacity',
      vertical ? cn('inset-x-0 h-16px', side === 'start' ? 'top-0' : 'bottom-0') : cn('inset-y-0 w-16px', side === 'start' ? 'left-0' : 'right-0'),
      edges[side] ? 'opacity-100' : 'opacity-0',
    )
  const bg = SURFACE[surface]
  const dir = (side: 'start' | 'end') => (vertical ? (side === 'start' ? 'to bottom' : 'to top') : side === 'start' ? 'to right' : 'to left')

  return (
    <div className={cn('relative', className)}>
      <div
        ref={ref}
        role="region"
        tabIndex={0}
        className={cn(
          'outline-none focus-visible:focus-ring [scrollbar-color:var(--border-default)_transparent] [scrollbar-width:thin]',
          vertical ? 'overflow-y-auto overflow-x-hidden' : 'overflow-x-auto overflow-y-hidden',
        )}
        style={{ ...(maxSize ? (vertical ? { maxHeight: maxSize } : { maxWidth: maxSize }) : {}), ...style }}
        {...props}
      >
        {children}
      </div>
      <div aria-hidden className={fade('start')} style={{ background: `linear-gradient(${dir('start')}, ${bg}, transparent)` }} />
      <div aria-hidden className={fade('end')} style={{ background: `linear-gradient(${dir('end')}, ${bg}, transparent)` }} />
    </div>
  )
}
