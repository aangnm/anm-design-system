import type { HTMLAttributes, ReactNode } from 'react'
import { CircleAlert, Inbox } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Table component set (Data Display page): a header row plus data
// rows divided by hairlines, with State=Default/Empty/Loading/Error. Rendered
// as a semantic <table> (not the Figma div grid) for accessibility. Status
// cells take any ReactNode, so callers drop in a <Tag> — the same relationship
// the Figma default uses (Estado column = Tag instances). The header stays
// visible in every state, matching the design.

export type TableState = 'default' | 'empty' | 'loading' | 'error'

export interface TableColumn {
  key: string
  header: ReactNode
  /** Fixed column width in px. */
  width?: number
  align?: 'left' | 'right' | 'center'
}

export interface TableProps extends Omit<HTMLAttributes<HTMLTableElement>, 'children'> {
  columns: TableColumn[]
  rows?: Record<string, ReactNode>[]
  state?: TableState
  emptyMessage?: string
  errorMessage?: string
  /** Skeleton rows rendered while loading. */
  loadingRows?: number
  /**
   * Card chrome (border, radius, surface). Turn off when the table sits inside
   * another container that already owns the chrome, e.g. Content Panel.
   */
  bordered?: boolean
}

const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' } as const
const cellPad = 'px-14px py-table-cell-y'
// Loading keeps the real header and skeletons only the body; widths per column as in Figma.
const SKELETON_WIDTHS = [24, 112, 72, 42, 42]

export function Table({
  columns,
  rows = [],
  state = 'default',
  emptyMessage = 'Sin registros que coincidan con el filtro.',
  errorMessage = 'No se pudieron cargar los registros.',
  loadingRows = 3,
  bordered = true,
  className,
  ...props
}: TableProps) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden',
        bordered && 'rounded-lg border border-border-subtle bg-surface-container',
        // Every non-Default variant is padded to the Default's height (header 36
        // + four 44px rows = 212px) on purpose, so swapping states never makes
        // the container jump.
        state !== 'default' && 'min-h-[212px]',
      )}
    >
      <table className={cn('w-full border-collapse', className)} {...props}>
        <thead>
          <tr className="bg-surface-container-high">
            {columns.map((col) => (
              <th
                key={col.key}
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  cellPad,
                  'text-text-xxs font-medium leading-4 text-text-secondary',
                  alignClass[col.align ?? 'left'],
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {state === 'default' ? (
          <tbody className="divide-y divide-border-subtle">
            {rows.map((row, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className={cn(cellPad, 'text-sm text-text-primary', alignClass[col.align ?? 'left'])}>
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : state === 'loading' ? (
          <tbody className="divide-y divide-border-subtle" aria-busy="true">
            {Array.from({ length: loadingRows }).map((_, i) => (
              <tr key={i} className="h-44px">
                {columns.map((col, c) => (
                  <td key={col.key} className="px-14px">
                    <div
                      className="h-12px max-w-full rounded-sm bg-border-subtle"
                      style={{ width: SKELETON_WIDTHS[c % SKELETON_WIDTHS.length] }}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="h-[176px] px-16px py-32px">
                <div className="flex flex-col items-center justify-center gap-8px">
                  {state === 'error' ? (
                    <CircleAlert className="size-20px text-semantic-error" aria-hidden />
                  ) : (
                    <Inbox className="size-20px text-icon-muted" aria-hidden />
                  )}
                  <p className="text-text-xs leading-5 text-text-secondary">
                    {state === 'error' ? errorMessage : emptyMessage}
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  )
}
