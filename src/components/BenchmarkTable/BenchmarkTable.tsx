import type { HTMLAttributes } from 'react'
import { Tag } from '@/components/Tag'
import { formatChartNumber } from '@/components/Legend'
import { cn } from '@/lib/utils'

// Mirrors the Benchmark Table component (Product Patterns page): a
// benchmark table — a per-row rate (sample: Ingresos/mes per account) with a
// tier-coloured Estado chip (Crítico / Moderado / Saludable against a minimum
// and an ideal benchmark, 400 / 800 by default). Why (from Figma) — the Estado column uses
// tier-coloured Tag instances rather than coloured text, so status survives
// being scanned quickly; the numeric column is right-aligned so magnitudes
// compare by eye. Figma builds it from Table + Tag but at its own density
// (13px text, 16px side padding, 40px header / 44px rows), so it renders its
// own semantic <table> with the same chrome as Table rather than bending
// Table's padding. Not interactive today (if rows become selectable, make
// them at least 48 high on touch).

export type BenchmarkTier = 'critico' | 'moderado' | 'saludable'

const TIER_LABEL: Record<BenchmarkTier, string> = {
  critico: 'Crítico',
  moderado: 'Moderado',
  saludable: 'Saludable',
}

const TIER_COLOR = {
  critico: 'error',
  moderado: 'warning',
  saludable: 'success',
} as const

/** Default minimum: a rate below this is Crítico. */
export const BENCHMARK_MIN = 400
/** Default ideal: a rate at or above this is Saludable. */
export const BENCHMARK_IDEAL = 800

export function benchmarkTier(rate: number, min = BENCHMARK_MIN, ideal = BENCHMARK_IDEAL): BenchmarkTier {
  if (rate < min) return 'critico'
  if (rate < ideal) return 'moderado'
  return 'saludable'
}

export interface BenchmarkRow {
  /** First column, e.g. an account or a segment. */
  label: string
  /** Second column, e.g. a revenue category. */
  category: string
  /** The rate being benchmarked, in the unit named by `rateHeader`. */
  rate: number
  /** Defaults to the tier implied by `min` / `ideal`. */
  tier?: BenchmarkTier
}

export interface BenchmarkTableProps extends HTMLAttributes<HTMLDivElement> {
  rows: BenchmarkRow[]
  /** Column headers. Defaults follow the Figma sample. */
  labelHeader?: string
  categoryHeader?: string
  rateHeader?: string
  /** Below `min` is Crítico, at or above `ideal` is Saludable. */
  min?: number
  ideal?: number
}

const th = 'px-6px py-10px text-left text-text-xs font-medium leading-5 text-text-secondary first:pl-16px last:pr-16px'
const td = 'px-6px py-10px text-text-xs leading-5 first:pl-16px last:pr-16px'

export function BenchmarkTable({
  rows,
  labelHeader = 'Cuenta',
  categoryHeader = 'Categoría',
  rateHeader = 'Ingresos/mes',
  min = BENCHMARK_MIN,
  ideal = BENCHMARK_IDEAL,
  className,
  ...props
}: BenchmarkTableProps) {
  return (
    <div
      className={cn('w-[474px] overflow-hidden rounded-lg border border-border-subtle bg-surface-container', className)}
      {...props}
    >
      <table className="w-full table-fixed border-collapse">
        <colgroup>
          <col style={{ width: 92 }} />
          <col style={{ width: 142 }} />
          <col style={{ width: 102 }} />
          <col />
        </colgroup>
        <thead>
          <tr className="bg-surface-container-high">
            <th className={th}>{labelHeader}</th>
            <th className={th}>{categoryHeader}</th>
            <th className={cn(th, 'text-right')}>{rateHeader}</th>
            <th className={th}>Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {rows.map((row) => {
            const tier = row.tier ?? benchmarkTier(row.rate, min, ideal)
            return (
              <tr key={row.label}>
                <td className={cn(td, 'text-text-primary')}>{row.label}</td>
                <td className={cn(td, 'text-text-secondary')}>{row.category}</td>
                <td className={cn(td, 'text-right font-medium tabular-nums text-text-primary')}>{formatChartNumber(row.rate)}</td>
                <td className={td}>
                  <Tag color={TIER_COLOR[tier]}>{TIER_LABEL[tier]}</Tag>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
