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
  className?: string
}

export function DatePicker({ value, onChange, defaultMonth, className }: DatePickerProps) {
  const [month, setMonth] = useState(defaultMonth ?? value ?? new Date())
  const today = new Date()
  const weeks = buildWeeks(month)

  return (
    <div className={cn('flex w-fit flex-col items-start gap-10px rounded-lg bg-surface-emphasis p-12px shadow-md', className)}>
      <div className="flex w-full items-center">
        <button
          type="button"
          aria-label="Mes anterior"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
          className="size-[18px] text-text-primary"
        >
          <ChevronLeft className="size-full" />
        </button>
        <p className="flex-1 text-center text-sm font-medium text-text-primary">
          {MONTH_NAMES[month.getMonth()]} {month.getFullYear()}
        </p>
        <button
          type="button"
          aria-label="Mes siguiente"
          onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
          className="size-[18px] text-text-primary"
        >
          <ChevronRight className="size-full" />
        </button>
      </div>

      <div className="flex gap-2px">
        {WEEKDAYS.map((wd, i) => (
          <div key={i} className="flex h-20px w-[30px] items-center justify-center text-[10px] text-text-secondary">
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
              return (
                <button
                  key={j}
                  type="button"
                  onClick={() => onChange?.(day)}
                  className={cn(
                    'flex size-[30px] items-center justify-center rounded-full text-[13px] transition-colors',
                    selected
                      ? 'bg-interactive-primary text-interactive-primary-foreground'
                      : isToday
                        ? 'border border-interactive-primary text-text-primary'
                        : 'text-text-primary hover:bg-interactive-default',
                  )}
                >
                  {day.getDate()}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
