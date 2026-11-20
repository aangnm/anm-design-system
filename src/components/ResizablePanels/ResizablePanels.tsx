import { Children, Fragment, useEffect, useId, useRef, useState, type HTMLAttributes, type KeyboardEvent, type PointerEvent, type ReactNode } from 'react'
import { GripVertical } from 'lucide-react'
import { cn } from '@/lib/utils'

// Resizable Panels (Data Display page, Figma v1.2): two or more panels side by
// side (or stacked) with a handle between each pair that drags to resize.
// Dashboards use it for a chart beside its table, a list beside its detail,
// or an AI chat beside the canvas it works on.
//
// Why — dashboards are read differently by different people, so the split
// should be theirs to set, inside limits the layout can survive (`minSizes`).
// The handle is a 1px border/subtle line, the same weight as a card edge, so a
// resizable layout looks like a normal one until it is touched; hover and drag
// raise it to border/emphasis. `withHandle` adds a grip for layouts where the
// affordance must be obvious (a first-run dashboard, touch screens).
//
// Accessibility — each handle is a focusable separator with its panel's size
// as aria-valuenow. Arrow keys move it 2% (Shift: 10%), Home / End go to the
// limits, Enter or a double click resets the default split. Dragging is never
// the only way: the keyboard and the reset cover it.
//
// Hit area — the line is 1px but its hit area is 17px (25px on touch), centred
// on the line.
//
// Narrow screens — a side-by-side split under about 640px leaves both panels
// too thin to read, and dragging a 1px line with a thumb is a poor control.
// Below `stackBelow` (container width) the panels stack at their natural
// height in source order and the handles go away; the split comes back when
// there is room.

export interface ResizablePanelsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** One child per panel; handles go between them. */
  children: ReactNode
  /** `horizontal` puts panels side by side; `vertical` stacks them. */
  direction?: 'horizontal' | 'vertical'
  /** Starting sizes in percent, one per panel; defaults to equal. */
  defaultSizes?: number[]
  /** Smallest size in percent, one per panel; defaults to 10 each. */
  minSizes?: number[]
  /** Accessible name of each panel, used to label its handle. */
  panelLabels?: string[]
  /** Shows a grip on each handle. */
  withHandle?: boolean
  onSizesChange?: (sizes: number[]) => void
  /** Container width (px) below which panels stack and handles hide; 0 never stacks. Default 640. */
  stackBelow?: number
}

const STEP = 2
const BIG_STEP = 10

export function ResizablePanels({
  children,
  direction = 'horizontal',
  defaultSizes,
  minSizes,
  panelLabels,
  withHandle = false,
  onSizesChange,
  stackBelow = 640,
  className,
  ...props
}: ResizablePanelsProps) {
  const panels = Children.toArray(children)
  const n = panels.length
  const initial = defaultSizes ?? Array(n).fill(100 / n)
  const mins = minSizes ?? Array(n).fill(10)
  const [sizes, setSizes] = useState<number[]>(initial)
  const [dragging, setDragging] = useState<number | null>(null)
  const groupRef = useRef<HTMLDivElement>(null)
  const [stacked, setStacked] = useState(false)
  const horizontal = direction === 'horizontal'

  useEffect(() => {
    const el = groupRef.current
    if (!el || !stackBelow) return
    const ro = new ResizeObserver(([entry]) => setStacked(entry.contentRect.width < stackBelow))
    ro.observe(el)
    return () => ro.disconnect()
  }, [stackBelow])

  const commit = (next: number[]) => {
    setSizes(next)
    onSizesChange?.(next)
  }
  // Moves the boundary after panel i by `delta` percent, within both panels' limits.
  const move = (i: number, delta: number, from = sizes) => {
    const pair = from[i] + from[i + 1]
    const a = Math.max(mins[i], Math.min(pair - mins[i + 1], from[i] + delta))
    const next = [...from]
    next[i] = a
    next[i + 1] = pair - a
    commit(next)
  }
  const reset = () => commit(initial)

  const onPointerDown = (i: number) => (e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    const rect = groupRef.current!.getBoundingClientRect()
    const total = horizontal ? rect.width : rect.height
    const start = horizontal ? e.clientX : e.clientY
    const from = sizes
    setDragging(i)
    const onMoveEvent = (ev: globalThis.PointerEvent) => move(i, (((horizontal ? ev.clientX : ev.clientY) - start) / total) * 100, from)
    const target = e.currentTarget
    const end = () => {
      setDragging(null)
      target.removeEventListener('pointermove', onMoveEvent)
      target.removeEventListener('pointerup', end)
      target.removeEventListener('pointercancel', end)
    }
    target.addEventListener('pointermove', onMoveEvent)
    target.addEventListener('pointerup', end)
    target.addEventListener('pointercancel', end)
  }

  const onKeyDown = (i: number) => (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? BIG_STEP : STEP
    const back = horizontal ? 'ArrowLeft' : 'ArrowUp'
    const forward = horizontal ? 'ArrowRight' : 'ArrowDown'
    if (e.key === back) move(i, -step)
    else if (e.key === forward) move(i, step)
    else if (e.key === 'Home') move(i, -100)
    else if (e.key === 'End') move(i, 100)
    else if (e.key === 'Enter') reset()
    else return
    e.preventDefault()
  }

  const id = useId()

  if (stacked) {
    return (
      <div ref={groupRef} className={cn('flex w-full flex-col overflow-hidden', className, 'h-auto!')} {...props}>
        {panels.map((panel, i) => (
          <div key={i} className={cn('relative min-w-0', i > 0 && 'border-t border-border-subtle')}>
            {panel}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      ref={groupRef}
      className={cn('flex h-full w-full overflow-hidden', horizontal ? 'flex-row' : 'flex-col', dragging !== null && 'select-none', className)}
      {...props}
    >
      {panels.map((panel, i) => (
        <Fragment key={i}>
          <div id={`${id}-${i}`} className="relative min-h-0 min-w-0 overflow-auto" style={{ flexBasis: 0, flexGrow: sizes[i] }}>
            {panel}
          </div>
          {i < n - 1 ? (
            <div
              role="separator"
              tabIndex={0}
              aria-orientation={horizontal ? 'vertical' : 'horizontal'}
              aria-controls={`${id}-${i}`}
              aria-label={`Resize ${panelLabels?.[i] ?? `panel ${i + 1}`}`}
              aria-valuenow={Math.round(sizes[i])}
              aria-valuemin={mins[i]}
              aria-valuemax={Math.round(sizes[i] + sizes[i + 1] - mins[i + 1])}
              onPointerDown={onPointerDown(i)}
              onKeyDown={onKeyDown(i)}
              onDoubleClick={reset}
              data-dragging={dragging === i || undefined}
              className={cn(
                'group relative z-[1] flex shrink-0 touch-none items-center justify-center bg-border-subtle outline-none transition-colors hover:bg-border-emphasis focus-visible:focus-ring data-[dragging]:bg-border-emphasis',
                'after:absolute after:content-[""]',
                horizontal
                  ? 'w-px cursor-col-resize after:inset-y-0 after:-inset-x-[8px] pointer-coarse:after:-inset-x-[12px]'
                  : 'h-px cursor-row-resize after:inset-x-0 after:-inset-y-[8px] pointer-coarse:after:-inset-y-[12px]',
              )}
            >
              {withHandle ? (
                <span
                  aria-hidden
                  className={cn(
                    'z-[1] flex items-center justify-center rounded-xs border border-border-default bg-surface-container-high text-icon-muted',
                    horizontal ? 'h-24px w-12px' : 'h-12px w-24px',
                  )}
                >
                  <GripVertical className={cn('size-3', !horizontal && 'rotate-90')} />
                </span>
              ) : null}
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  )
}
