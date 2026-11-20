import { useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { panelClass, usePopover } from '@/lib/usePopover'

// Date Range Picker (Core page, Figma v1.0): a trigger showing the active range
// and a panel with presets on the left and two months on the right. A preset
// applies at once; a custom range is two clicks (start, then end), with the
// days between tinted.
//
// Why — analytics questions are almost always about a period, and most
// periods are standard ones (last 7 days, this quarter). Presets make the
// common case one click and name it in the trigger ("Last 30 days"), which
// reads better in a report header than two raw dates. Date Picker stays the
// single-date control; this is the range one, built from the same day cells.
//
// Accessibility — every day is a button with its full date as its name;
// start and end are aria-pressed, days in between say "in range". The active
// preset is aria-pressed. Inside the calendar the arrow keys move a day (left
// and right) or a week (up and down), paging the months when needed; Home and
// End jump to the start and end of the week. Escape closes and returns focus
// to the trigger.

export interface DateRange {
  from: Date
  to: Date
}

export interface DateRangePreset {
  label: string
  range: (today: Date) => DateRange
}

const DAY = 86_400_000
const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const addDays = (d: Date, n: number) => new Date(startOfDay(d).getTime() + n * DAY)
const sameDay = (a: Date, b: Date) => startOfDay(a).getTime() === startOfDay(b).getTime()
const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

export const DEFAULT_DATE_RANGE_PRESETS: DateRangePreset[] = [
  { label: 'Today', range: (t) => ({ from: startOfDay(t), to: startOfDay(t) }) },
  { label: 'Yesterday', range: (t) => ({ from: addDays(t, -1), to: addDays(t, -1) }) },
  { label: 'Last 7 days', range: (t) => ({ from: addDays(t, -6), to: startOfDay(t) }) },
  { label: 'Last 30 days', range: (t) => ({ from: addDays(t, -29), to: startOfDay(t) }) },
  { label: 'This month', range: (t) => ({ from: new Date(t.getFullYear(), t.getMonth(), 1), to: startOfDay(t) }) },
  { label: 'Last month', range: (t) => ({ from: new Date(t.getFullYear(), t.getMonth() - 1, 1), to: new Date(t.getFullYear(), t.getMonth(), 0) }) },
  { label: 'This quarter', range: (t) => ({ from: new Date(t.getFullYear(), Math.floor(t.getMonth() / 3) * 3, 1), to: startOfDay(t) }) },
  { label: 'Year to date', range: (t) => ({ from: new Date(t.getFullYear(), 0, 1), to: startOfDay(t) }) },
]

const fmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
const fmtShort = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' })
const fmtLong = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const monthTitle = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' })
const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/** "May 1 – 27, 2026" style label for a range. */
export function formatDateRange({ from, to }: DateRange) {
  if (sameDay(from, to)) return fmt.format(from)
  if (from.getFullYear() === to.getFullYear()) return `${fmtShort.format(from)} – ${fmt.format(to)}`
  return `${fmt.format(from)} – ${fmt.format(to)}`
}

function weeksOf(month: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const offset = (first.getDay() + 6) % 7
  const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cells: (Date | null)[] = [...Array(offset).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))]
  while (cells.length % 7) cells.push(null)
  return Array.from({ length: cells.length / 7 }, (_, i) => cells.slice(i * 7, i * 7 + 7))
}

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange) => void
  presets?: DateRangePreset[]
  /** "Today" for presets and the calendar; defaults to the real date (set it for stable stories and tests). */
  today?: Date
  /** Months shown side by side (1 or 2; default 2). */
  months?: 1 | 2
  /** Disable days after today. */
  disableFuture?: boolean
  placeholder?: string
  className?: string
}

export function DateRangePicker({
  value,
  onChange,
  presets = DEFAULT_DATE_RANGE_PRESETS,
  today: todayProp,
  months = 2,
  disableFuture = true,
  placeholder = 'Pick a date range',
  className,
}: DateRangePickerProps) {
  const today = startOfDay(todayProp ?? new Date())
  const { open, setOpen, rootRef, triggerProps, panelId } = usePopover()
  const [view, setView] = useState(() => {
    const anchor = value?.to ?? today
    return new Date(anchor.getFullYear(), anchor.getMonth() - (months - 1), 1)
  })
  const [pendingFrom, setPendingFrom] = useState<Date | null>(null)
  const [hover, setHover] = useState<Date | null>(null)

  const activePreset = value ? presets.find((p) => { const r = p.range(today); return sameDay(r.from, value.from) && sameDay(r.to, value.to) }) : undefined
  const label = activePreset ? activePreset.label : value ? formatDateRange(value) : placeholder

  const apply = (range: DateRange) => {
    onChange?.(range)
    setPendingFrom(null)
    setOpen(false)
  }
  const pick = (day: Date) => {
    if (!pendingFrom) return setPendingFrom(day)
    apply(day < pendingFrom ? { from: day, to: pendingFrom } : { from: pendingFrom, to: day })
  }

  const shown: DateRange | null = pendingFrom
    ? hover
      ? hover < pendingFrom ? { from: hover, to: pendingFrom } : { from: pendingFrom, to: hover }
      : { from: pendingFrom, to: pendingFrom }
    : value ?? null

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        {...triggerProps}
        className="inline-flex h-control-md items-center gap-8px rounded-md border border-border-default bg-surface-container px-12px text-sm text-text-primary outline-none transition-colors hover:border-border-emphasis focus-visible:focus-ring"
      >
        <CalendarDays className="size-4 text-icon-muted" aria-hidden />
        <span className={cn(!value && 'text-text-secondary')}>{label}</span>
        {activePreset && value ? <span className="text-text-xs text-text-secondary">· {formatDateRange(value)}</span> : null}
      </button>

      {open ? (
        <div id={panelId} role="dialog" aria-label="Choose a date range" className={cn(panelClass, 'flex w-max max-w-[calc(100vw-32px)] flex-col gap-12px p-12px sm:flex-row')}>
          <ul className="m-0 flex list-none flex-row flex-wrap gap-2px p-0 sm:w-[140px] sm:flex-col sm:border-r sm:border-border-subtle sm:pr-12px">
            {presets.map((p) => (
              <li key={p.label}>
                <button
                  type="button"
                  aria-pressed={activePreset?.label === p.label}
                  onClick={() => apply(p.range(today))}
                  className={cn(
                    'w-full rounded-sm px-8px py-6px text-left text-text-xs leading-5 outline-none transition-colors state-layer hover:state-hover focus-visible:focus-ring',
                    activePreset?.label === p.label ? 'bg-interactive-default font-medium text-text-primary' : 'text-text-primary',
                  )}
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-8px">
            <div
              className="flex flex-wrap gap-16px"
              onKeyDown={(e) => {
                const key = (e.target as HTMLElement).dataset?.day
                if (!key) return
                const [y, m, d] = key.split('-').map(Number)
                const current = new Date(y, m - 1, d)
                const weekday = (current.getDay() + 6) % 7
                const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -weekday, End: 6 - weekday }[e.key]
                if (step === undefined) return
                e.preventDefault()
                const next = addDays(current, step)
                const first = new Date(view.getFullYear(), view.getMonth(), 1)
                const afterLast = new Date(view.getFullYear(), view.getMonth() + months, 1)
                const root = e.currentTarget
                const focusNext = () => root.querySelector<HTMLButtonElement>(`[data-day="${dayKey(next)}"]:not(:disabled)`)?.focus()
                if (next < first) setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
                else if (next >= afterLast) setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
                else return focusNext()
                // The month changed: focus once the new days have rendered.
                requestAnimationFrame(focusNext)
              }}
            >
              {Array.from({ length: months }, (_, m) => {
                const month = new Date(view.getFullYear(), view.getMonth() + m, 1)
                return (
                  <div key={m} className="flex flex-col gap-6px">
                    <div className="flex h-24px items-center">
                      {m === 0 ? (
                        <button type="button" aria-label="Previous month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))} className="relative rounded-xs text-icon-muted outline-none after:absolute after:left-1/2 after:top-1/2 after:size-24px after:-translate-x-1/2 after:-translate-y-1/2 focus-visible:focus-ring">
                          <ChevronLeft className="size-4" />
                        </button>
                      ) : <span className="size-16px" />}
                      <p className="m-0 flex-1 text-center text-sm font-medium leading-5 text-text-primary">{monthTitle.format(month)}</p>
                      {m === months - 1 ? (
                        <button type="button" aria-label="Next month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))} className="relative rounded-xs text-icon-muted outline-none after:absolute after:left-1/2 after:top-1/2 after:size-24px after:-translate-x-1/2 after:-translate-y-1/2 focus-visible:focus-ring">
                          <ChevronRight className="size-4" />
                        </button>
                      ) : <span className="size-16px" />}
                    </div>
                    <div className="grid grid-cols-7">
                      {WEEKDAYS.map((w, i) => (
                        <span key={i} aria-hidden className="flex h-20px w-32px items-center justify-center text-text-xxs leading-4 text-text-secondary">{w}</span>
                      ))}
                      {weeksOf(month).flat().map((day, i) => {
                        if (!day) return <span key={i} className="size-32px" />
                        const disabled = disableFuture && day > today
                        const isStart = !!shown && sameDay(day, shown.from)
                        const isEnd = !!shown && sameDay(day, shown.to)
                        const inside = !!shown && day > shown.from && day < shown.to
                        return (
                          <span key={i} className={cn('flex size-32px items-center justify-center', (inside || (isStart && !isEnd) || (isEnd && !isStart)) && 'bg-surface-highlight', isStart && !isEnd && 'rounded-l-full', isEnd && !isStart && 'rounded-r-full')}>
                            <button
                              type="button"
                              disabled={disabled}
                              aria-label={`${fmtLong.format(day)}${inside ? ', in range' : ''}`}
                              aria-pressed={isStart || isEnd}
                              data-day={dayKey(day)}
                              onClick={() => pick(day)}
                              onMouseEnter={() => pendingFrom && setHover(day)}
                              className={cn(
                                'flex size-[30px] items-center justify-center rounded-full border border-transparent text-text-xs leading-5 outline-none transition-colors focus-visible:focus-ring',
                                disabled && 'cursor-not-allowed text-text-disabled',
                                isStart || isEnd ? 'bg-interactive-primary text-interactive-primary-foreground' : !disabled && 'text-text-primary state-layer hover:state-hover',
                                sameDay(day, today) && !(isStart || isEnd) && 'border-interactive-primary',
                              )}
                            >
                              {day.getDate()}
                            </button>
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="m-0 text-text-xs leading-5 text-text-secondary" aria-live="polite">
              {pendingFrom ? `From ${fmt.format(pendingFrom)} — pick the end date` : value ? formatDateRange(value) : 'Pick a start date'}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
