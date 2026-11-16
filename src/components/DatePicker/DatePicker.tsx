import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Date Picker component (Core page): a calendar shown in a
// popover from a date input. Why (from Figma) — single date only, a range
// picker is not modelled here and should not be faked with two instances.
// Selected day = interactive/primary; today is marked with a ring so the two
// never look the same. Figma's "Junio 2026" grid is a static illustration —
// generalized here to a real month grid computed from `month`, with
// Monday-start weekdays (L M M J V S D) matching the design.
// States (Figma State=Default/Hover/Focus/Disabled): Hover and Focus are real
// :hover / :focus-visible on the day — Hover = the 8% text/primary state layer plus a
// 1px border/default outline (a tint alone is faint on the dark surface); Focus = 2px focus/ring. Disabled days (dates after
// today with `disableFuture`, or anything `isDateDisabled` rejects) are greyed
// and can never be selected. Month arrows are 16px visuals with a 24x24 target.

const WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D']
const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
]

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

// Monday-first weekday index (0 = Monday ... 6 = Sunday).
function mondayIndex(date: Date) {
  return (date.getDay() + 6) % 7
}

function buildWeeks(month: Date) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const firstOffset = mondayIndex(new Date(year, monthIndex, 1))

  const days: (Date | null)[] = [...Array(firstOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, monthIndex, i + 1))]
  while (days.length % 7 !== 0) days.push(null)

  const weeks: (Date | null)[][] = []
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7))
  return weeks
}

export interface DatePickerProps {
  value?: Date
  onChange?: (date: Date) => void
  /** Month currently displayed; defaults to `value`'s month or today. */
  defaultMonth?: Date
  /** Disable every date after today (Figma: "use with disableFuture"). */
  disableFuture?: boolean
  /** Return true for days that cannot be chosen; they render greyed and never fire onChange. */
  isDateDisabled?: (date: Date) => boolean
  className?: string
}

export function DatePicker({ value, onChange, defaultMonth, disableFuture, isDateDisabled, className }: DatePickerProps) {
  const [month, setMonth] = useState(defaultMonth ?? value ?? new Date())
  const today = new Date()
  const weeks = buildWeeks(month)
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999)
  const isDisabled = (day: Date) => Boolean((disableFuture && day > endOfToday) || isDateDisabled?.(day))

  return (
    <div className={cn('flex w-fit flex-col items-start gap-10px rounded-lg bg-surface-container-high p-12px shadow-md', className)}>
      <div className="flex w-full items-center">
        <button
          type="button"
          aria-label="Mes anterior"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="relative size-16px shrink-0 rounded-xs text-icon-muted outline-none after:absolute after:left-1/2 after:top-1/2 after:size-24px after:-translate-x-1/2 after:-translate-y-1/2 focus-visible:focus-ring"
        >
          <ChevronLeft className="size-full" />
        </button>
        <p className="flex-1 text-center text-sm font-medium leading-5 text-text-primary">
          {MONTH_NAMES[month.getMonth()]} {month.getFullYear()}
        </p>
        <button
          type="button"
          aria-label="Mes siguiente"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="relative size-16px shrink-0 rounded-xs text-icon-muted outline-none after:absolute after:left-1/2 after:top-1/2 after:size-24px after:-translate-x-1/2 after:-translate-y-1/2 focus-visible:focus-ring"
        >
          <ChevronRight className="size-full" />
        </button>
      </div>

      <div className="flex gap-2px">
        {WEEKDAYS.map((wd, i) => (
          <div key={i} className="flex h-20px w-[30px] items-center justify-center text-text-xxs leading-4 text-text-secondary">
            {wd}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2px">
        {weeks.map((week, i) => (
          <div key={i} className="flex gap-2px">
            {week.map((day, j) => {
              if (!day) return <div key={j} className="size-[30px] rounded-full" />
              const selected = value ? isSameDay(day, value) : false
              const isToday = isSameDay(day, today)
              const disabled = isDisabled(day)
              return (
                <button
                  key={j}
                  type="button"
                  disabled={disabled}
                  aria-pressed={selected}
                  onClick={() => {
                    if (!disabled) onChange?.(day)
                  }}
                  className={cn(
                    'flex size-[30px] items-center justify-center rounded-full border border-transparent outline-none transition-colors',
                    'focus-visible:focus-ring',
                    disabled && 'cursor-not-allowed text-text-disabled',
                    isToday && 'border-interactive-primary',
                    selected
                      ? 'bg-interactive-primary text-interactive-primary-foreground'
                      : !disabled && 'text-text-primary state-layer hover:state-hover',
                    !disabled && !selected && !isToday && 'hover:border-border-default',
                  )}
                >
                  <span className="text-text-xs leading-5">{day.getDate()}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
