import type { ChangeEvent, HTMLAttributes, ReactNode } from 'react'
import { Search } from '@/components/Search'
import { Tag } from '@/components/Tag'
import { cn } from '@/lib/utils'

// Mirrors the Table Toolbar component (Product Patterns page): search + active
// filter chips on the left, a secondary icon action and one primary action on
// the right — the header row that sits above Table or Benchmark Table.
// Why (from Figma) — Content Panel solved this exact problem for charts (a
// Segmented Control in its own header slot); tables had no equivalent, so
// callers were re-solving "search + filters + action" by hand above every
// table. Built from Search's own field and Tag's chip, not new treatments, so
// it is composed here from those components: filters are dismissible neutral
// Tags, the actions are slots so callers drop in an IconButton and a Button.
// Hit area — pointer: the search field and the two actions are 36 high; each
// chip is 24 high and its remove icon (12px visual) has a 24 x 24 target
// (owned by Tag). On touch, each extends to 48 x 48.

export interface TableToolbarFilter {
  id: string
  label: string
}

export interface TableToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  /** Active filters, rendered as dismissible chips after the search field. */
  filters?: TableToolbarFilter[]
  onRemoveFilter?: (id: string) => void
  /** Secondary action — an icon-only control, e.g. `<IconButton variant="secondary" icon={<Download />} aria-label="Export" />`. */
  secondaryAction?: ReactNode
  /** The one primary action, e.g. `<Button>Add account</Button>`. */
  primaryAction?: ReactNode
}

export function TableToolbar({
  searchPlaceholder = 'Search accounts…',
  searchValue,
  onSearchChange,
  filters = [],
  onRemoveFilter,
  secondaryAction,
  primaryAction,
  className,
  ...props
}: TableToolbarProps) {
  return (
    <div className={cn('flex w-full flex-wrap items-center justify-between gap-8px', className)} {...props}>
      <div className="flex flex-wrap items-center gap-8px">
        <Search
          aria-label={searchPlaceholder}
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={onSearchChange ? (e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value) : undefined}
          className="w-[132px]"
        />
        {filters.map((filter) => (
          <Tag key={filter.id} dismissible onDismiss={() => onRemoveFilter?.(filter.id)}>
            {filter.label}
          </Tag>
        ))}
      </div>
      {secondaryAction || primaryAction ? (
        <div className="flex items-center gap-8px">
          {secondaryAction}
          {primaryAction}
        </div>
      ) : null}
    </div>
  )
}
