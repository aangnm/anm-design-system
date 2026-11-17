import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown, CircleAlert, Columns3, Inbox, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { panelClass, usePopover } from '@/lib/usePopover'
import { Checkbox } from '@/components/Checkbox'
import { FacetedFilter } from '@/components/FacetedFilter'
import { Pagination } from '@/components/Pagination'
import { Search } from '@/components/Search'

// Data Table (Data Display page, Figma v1.0): the Table with the controls an
// analytics table needs — search, faceted filters, sortable columns, column
// visibility, row selection and pagination — in one component with one
// declarative column list.
//
// Why — Table is deliberately presentational; every real data screen then
// rebuilt the same toolbar, sort headers and pager by hand, slightly
// differently each time. Data Table owns that behaviour once, and keeps the
// Table's look (same header, row height, density and states), so a static
// Table and an interactive one read as the same component. No table library:
// the logic is small, typed and has no dependency to keep in step.
//
// Accessibility — sortable headers are buttons with aria-sort on the <th>;
// selection uses real checkboxes with row names; the result count is announced
// (aria-live) as filters change; the table scrolls inside a focusable region.

export interface DataTableColumn<T> {
  /** Field the column reads; also its id. */
  key: keyof T & string
  header: string
  /** Custom cell; defaults to the raw value. */
  cell?: (row: T) => ReactNode
  /** Value used to sort; defaults to the raw value. */
  sortValue?: (row: T) => string | number
  sortable?: boolean
  /** Adds a Faceted Filter for this column, with options and counts from the data. */
  facet?: boolean
  /** Can be hidden from the Columns menu (default true). */
  hideable?: boolean
  align?: 'left' | 'right' | 'center'
  /** Fixed width in px. */
  width?: number
}

export interface DataTableProps<T extends Record<string, unknown>> {
  columns: DataTableColumn<T>[]
  data: T[]
  /** Stable id per row; defaults to the row index. */
  getRowId?: (row: T, index: number) => string
  /** Accessible name of the table, e.g. "Recent transactions". */
  label: string
  /** Search across all text columns (default true). */
  searchable?: boolean
  searchPlaceholder?: string
  /** Checkbox column for selecting rows. */
  selectable?: boolean
  onSelectionChange?: (ids: string[]) => void
  /** Rows per page (default 10). */
  pageSize?: number
  /** Right side of the toolbar, e.g. an export Icon Button and one primary Button. */
  actions?: ReactNode
  state?: 'default' | 'loading' | 'error'
  emptyMessage?: string
  errorMessage?: string
  className?: string
}

type Sort = { key: string; dir: 'asc' | 'desc' } | null
const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' } as const
const cellPad = 'px-14px py-table-cell-y'
const text = (v: unknown) => (v === null || v === undefined ? '' : String(v))

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  getRowId = (_row, i) => String(i),
  label,
  searchable = true,
  searchPlaceholder = 'Search…',
  selectable = false,
  onSelectionChange,
  pageSize = 10,
  actions,
  state = 'default',
  emptyMessage = 'No rows match the filters.',
  errorMessage = 'Couldn’t load the data.',
  className,
}: DataTableProps<T>) {
  const [query, setQuery] = useState('')
  const [facets, setFacets] = useState<Record<string, string[]>>({})
  const [sort, setSort] = useState<Sort>(null)
  const [hidden, setHidden] = useState<string[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const ids = useMemo(() => new Map(data.map((row, i) => [row, getRowId(row, i)])), [data, getRowId])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return data.filter((row) => {
      if (q && !columns.some((c) => text(row[c.key]).toLowerCase().includes(q))) return false
      return Object.entries(facets).every(([key, values]) => !values.length || values.includes(text(row[key])))
    })
  }, [data, columns, query, facets])

  const sorted = useMemo(() => {
    if (!sort) return filtered
    const col = columns.find((c) => c.key === sort.key)
    const value = (row: T) => (col?.sortValue ? col.sortValue(row) : (row[sort.key] as string | number))
    return [...filtered].sort((a, b) => {
      const av = value(a)
      const bv = value(b)
      const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : text(av).localeCompare(text(bv), 'en', { numeric: true })
      return sort.dir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sort, columns])

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize))
  useEffect(() => setPage(1), [query, facets, sort])
  useEffect(() => onSelectionChange?.(selected), [selected, onSelectionChange])
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize)
  const visibleColumns = columns.filter((c) => !hidden.includes(c.key))
  const pageIds = pageRows.map((r) => ids.get(r)!)
  const allOnPage = pageIds.length > 0 && pageIds.every((id) => selected.includes(id))
  const someOnPage = pageIds.some((id) => selected.includes(id))
  const filtering = query !== '' || Object.values(facets).some((v) => v.length)

  const toggleSort = (key: string) =>
    setSort((s) => (!s || s.key !== key ? { key, dir: 'asc' } : s.dir === 'asc' ? { key, dir: 'desc' } : null))

  const facetOptions = (key: string) => {
    const counts = new Map<string, number>()
    for (const row of data) counts.set(text(row[key]), (counts.get(text(row[key])) ?? 0) + 1)
    return [...counts].sort((a, b) => a[0].localeCompare(b[0])).map(([value, count]) => ({ value, label: value, count }))
  }

  const columnsMenu = usePopover()
  const first = sorted.length ? (page - 1) * pageSize + 1 : 0
  const last = Math.min(page * pageSize, sorted.length)

  return (
    <div className={cn('flex w-full flex-col gap-12px', className)}>
      <div className="flex w-full flex-wrap items-center justify-between gap-8px">
        <div className="flex flex-wrap items-center gap-8px">
          {searchable ? (
            <Search size="sm" aria-label={searchPlaceholder} placeholder={searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} className="w-[200px]" />
          ) : null}
          {columns.filter((c) => c.facet).map((c) => (
            <FacetedFilter
              key={c.key}
              title={c.header}
              options={facetOptions(c.key)}
              selected={facets[c.key] ?? []}
              onChange={(v) => setFacets((f) => ({ ...f, [c.key]: v }))}
            />
          ))}
          {filtering ? (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setFacets({})
              }}
              className="inline-flex h-control-sm items-center gap-4px rounded-sm px-8px text-text-xs font-medium leading-5 text-text-primary outline-none state-layer hover:state-hover focus-visible:focus-ring"
            >
              Reset
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </div>
        <div className="flex items-center gap-8px">
          <div ref={columnsMenu.rootRef} className="relative">
            <button
              type="button"
              aria-haspopup="dialog"
              {...columnsMenu.triggerProps}
              className="inline-flex h-control-sm items-center gap-6px rounded-sm border border-border-default px-10px text-text-xs font-medium leading-5 text-text-primary outline-none state-layer hover:state-hover focus-visible:focus-ring"
            >
              <Columns3 className="size-4 text-icon-muted" aria-hidden />
              Columns
            </button>
            {columnsMenu.open ? (
              <div id={columnsMenu.panelId} role="dialog" aria-label="Visible columns" className={cn(panelClass, 'left-auto right-0 flex w-[200px] flex-col gap-2px')}>
                {columns.filter((c) => c.hideable !== false).map((c) => (
                  <div key={c.key} className="rounded-sm px-8px py-4px">
                    <Checkbox
                      label={c.header}
                      checked={!hidden.includes(c.key)}
                      onChange={() => setHidden((h) => (h.includes(c.key) ? h.filter((k) => k !== c.key) : [...h, c.key]))}
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {actions}
        </div>
      </div>

      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn('w-full overflow-x-auto rounded-lg border border-border-subtle bg-surface-container outline-none focus-visible:focus-ring', state !== 'default' && 'min-h-[212px]')}
      >
        <table className="w-full border-collapse" aria-label={label}>
          <thead>
            <tr className="bg-surface-container-high">
              {selectable ? (
                <th className="w-40px px-14px">
                  <Checkbox
                    aria-label="Select all rows on this page"
                    checked={allOnPage}
                    indeterminate={!allOnPage && someOnPage}
                    onChange={() => setSelected((s) => (allOnPage ? s.filter((id) => !pageIds.includes(id)) : [...new Set([...s, ...pageIds])]))}
                  />
                </th>
              ) : null}
              {visibleColumns.map((c) => {
                const dir = sort?.key === c.key ? sort.dir : null
                return (
                  <th
                    key={c.key}
                    scope="col"
                    aria-sort={dir === 'asc' ? 'ascending' : dir === 'desc' ? 'descending' : c.sortable ? 'none' : undefined}
                    style={c.width ? { width: c.width } : undefined}
                    className={cn(cellPad, 'text-text-xxs font-medium leading-4 text-text-secondary', alignClass[c.align ?? 'left'])}
                  >
                    {c.sortable ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(c.key)}
                        className={cn(
                          '-mx-4px inline-flex items-center gap-4px rounded-xs px-4px outline-none hover:text-text-primary focus-visible:focus-ring',
                          dir && 'text-text-primary',
                          c.align === 'right' && 'flex-row-reverse',
                        )}
                      >
                        {c.header}
                        {dir === 'asc' ? <ArrowUp className="size-3" aria-hidden /> : dir === 'desc' ? <ArrowDown className="size-3" aria-hidden /> : <ArrowUpDown className="size-3 opacity-60" aria-hidden />}
                      </button>
                    ) : (
                      c.header
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          {state === 'default' && pageRows.length ? (
            <tbody className="divide-y divide-border-subtle">
              {pageRows.map((row) => {
                const id = ids.get(row)!
                const isSelected = selected.includes(id)
                return (
                  <tr key={id} aria-selected={selectable ? isSelected : undefined} className={cn(isSelected && 'bg-surface-highlight')}>
                    {selectable ? (
                      <td className="px-14px">
                        <Checkbox
                          aria-label={`Select ${text(row[columns[0].key])}`}
                          checked={isSelected}
                          onChange={() => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))}
                        />
                      </td>
                    ) : null}
                    {visibleColumns.map((c) => (
                      <td key={c.key} className={cn(cellPad, 'text-sm text-text-primary', alignClass[c.align ?? 'left'], c.align === 'right' && 'tabular-nums')}>
                        {c.cell ? c.cell(row) : text(row[c.key])}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          ) : state === 'loading' ? (
            <tbody className="divide-y divide-border-subtle" aria-busy="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="h-44px">
                  {(selectable ? [null, ...visibleColumns] : visibleColumns).map((_c, j) => (
                    <td key={j} className="px-14px">
                      <div className="h-12px rounded-sm bg-border-subtle" style={{ width: [24, 112, 72, 42, 42][j % 5] }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan={visibleColumns.length + (selectable ? 1 : 0)} className="h-[176px] px-16px py-32px">
                  <div className="flex flex-col items-center justify-center gap-8px">
                    {state === 'error' ? <CircleAlert className="size-20px text-semantic-error" aria-hidden /> : <Inbox className="size-20px text-icon-muted" aria-hidden />}
                    <p className="text-text-xs leading-5 text-text-secondary">{state === 'error' ? errorMessage : emptyMessage}</p>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>

      <div className="flex w-full flex-wrap items-center justify-between gap-8px">
        <p className="m-0 text-text-xs leading-5 text-text-secondary" aria-live="polite">
          {selectable && selected.length ? `${selected.length} of ${data.length} selected · ` : ''}
          {sorted.length ? `${first}–${last} of ${sorted.length}` : 'No results'}
          {filtering ? ` (filtered from ${data.length})` : ''}
        </p>
        {pageCount > 1 ? <Pagination page={page} pageCount={pageCount} onPageChange={setPage} /> : null}
      </div>
    </div>
  )
}
