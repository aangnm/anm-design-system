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
}

const alignClass = { left: 'text-left', right: 'text-right', center: 'text-center' } as const
const cellPad = 'px-14px py-10px'

export function Table({
  columns,
  rows = [],
  state = 'default',
  emptyMessage = 'Sin registros que coincidan con el filtro.',
  errorMessage = 'No se pudieron cargar los registros.',
  loadingRows = 3,
  className,
  ...props
}: TableProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border-subtle bg-surface-container">
      <table className={cn('w-full border-collapse', className)} {...props}>
        <thead>
          <tr className="bg-surface-emphasis">
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
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key} className={cellPad}>
                    <div className="h-[12px] w-full max-w-[80px] rounded-sm bg-surface-emphasis" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="px-16px py-24px">
                <div className="flex flex-col items-center justify-center gap-8px">
                  {state === 'error' ? (
                    <CircleAlert className="size-5 text-semantic-error" aria-hidden />
                  ) : (
                    <Inbox className="size-5 text-icon-muted" aria-hidden />
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
