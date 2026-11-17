import { useMemo, useState } from 'react'
import { CirclePlus, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { panelClass, usePopover } from '@/lib/usePopover'
import { Tag } from '@/components/Tag'

// Faceted Filter (Data Display page, Figma v1.0): a dashed trigger that opens a
// checklist of the values in one column, each with its count, for narrowing a
// table. Once values are picked, the trigger shows them as chips (or "3
// selected" past two), so the active filter is visible without opening it.
//
// Why — Table Toolbar showed active filter chips but had no way to choose
// them; analytics tables are filtered far more often than they are searched.
// Counts come with each option so the reader knows what a filter will leave
// before choosing it. The dashed edge marks it as an optional refinement, not
// a required field.

export interface FacetedFilterOption {
  value: string
  label: string
  /** How many rows have this value; shown right-aligned. */
  count?: number
}

export interface FacetedFilterProps {
  /** Column name, e.g. "Status". */
  title: string
  options: FacetedFilterOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  /** Show a search field above the list (on by default past 7 options). */
  searchable?: boolean
  className?: string
}

export function FacetedFilter({ title, options, selected, onChange, searchable, className }: FacetedFilterProps) {
  const { open, rootRef, triggerProps, panelId, setOpen } = usePopover()
  const [query, setQuery] = useState('')
  const showSearch = searchable ?? options.length > 7
  const visible = useMemo(
    () => (query ? options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase())) : options),
    [options, query],
  )
  const toggle = (value: string) => onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])
  const chosen = options.filter((o) => selected.includes(o.value))

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        {...triggerProps}
        className="inline-flex h-control-sm items-center gap-6px rounded-sm border border-dashed border-border-default px-10px text-text-xs font-medium leading-5 text-text-primary outline-none transition-colors state-layer hover:state-hover focus-visible:focus-ring"
      >
        <CirclePlus className="size-4 text-icon-muted" aria-hidden />
        {title}
        {chosen.length ? (
          <>
            <span aria-hidden className="mx-2px h-16px w-px bg-border-subtle" />
            {chosen.length > 2 ? (
              <Tag>{chosen.length} selected</Tag>
            ) : (
              chosen.map((o) => <Tag key={o.value}>{o.label}</Tag>)
            )}
          </>
        ) : null}
      </button>
      {open ? (
        <div id={panelId} role="dialog" aria-label={`Filter by ${title}`} className={cn(panelClass, 'flex w-[240px] max-w-[calc(100vw-32px)] flex-col gap-2px')}>
          {showSearch ? (
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${title.toLowerCase()}…`}
              aria-label={`Search ${title.toLowerCase()}`}
              className="mb-4px h-control-sm rounded-sm border border-border-default bg-surface-container px-10px text-text-xs leading-5 text-text-primary outline-none placeholder:text-text-secondary focus-visible:focus-ring"
            />
          ) : null}
          <ul aria-label={title} className="m-0 flex max-h-[280px] list-none flex-col gap-2px overflow-y-auto p-0">
            {visible.map((o) => {
              const on = selected.includes(o.value)
              return (
                <li key={o.value}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={on}
                    onClick={() => toggle(o.value)}
                    className="flex w-full items-center gap-10px rounded-sm px-8px py-6px text-left text-text-xs leading-5 text-text-primary outline-none transition-colors state-layer hover:state-hover focus-visible:focus-ring"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'flex size-16px shrink-0 items-center justify-center rounded-xs border',
                        on ? 'border-interactive-primary bg-interactive-primary text-interactive-primary-foreground' : 'border-border-default',
                      )}
                    >
                      {on ? <Check className="size-3" strokeWidth={3} /> : null}
                    </span>
                    <span className="flex-1 truncate">{o.label}</span>
                    {o.count !== undefined ? <span className="tabular-nums text-text-secondary">{o.count}</span> : null}
                  </button>
                </li>
              )
            })}
            {visible.length === 0 ? <li className="px-8px py-6px text-text-xs leading-5 text-text-secondary">No matches</li> : null}
          </ul>
          {selected.length ? (
            <>
              <span aria-hidden className="my-2px h-px bg-border-subtle" />
              <button
                type="button"
                onClick={() => {
                  onChange([])
                  setOpen(false)
                }}
                className="rounded-sm px-8px py-6px text-center text-text-xs font-medium leading-5 text-text-primary outline-none state-layer hover:state-hover focus-visible:focus-ring"
              >
                Clear filter
              </button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
