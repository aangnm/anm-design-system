import type { HTMLAttributes } from 'react'
import { Tag } from '@/components/Tag'
import { formatChartNumber } from '@/components/Legend'
import { cn } from '@/lib/utils'

// Mirrors the Benchmark Table component (Product Patterns page): a
// productivity benchmark table — per-lote rate (Tallos/ha·mes) with a
// tier-coloured Estado chip (Crítico / Moderado / Saludable vs the 400 min /
// 800 ideal benchmarks). Why (from Figma) — the Estado column uses
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

/** Rate (Tallos/ha·mes) below this is Crítico. */
export const BENCHMARK_MIN = 400
/** Rate at or above this is Saludable. */
export const BENCHMARK_IDEAL = 800

export function benchmarkTier(rate: number): BenchmarkTier {
  if (rate < BENCHMARK_MIN) return 'critico'
  if (rate < BENCHMARK_IDEAL) return 'moderado'
  return 'saludable'
}

export interface BenchmarkRow {
  lote: string
  actividad: string
  /** Tallos/ha·mes. */
  rate: number
  /** Defaults to the tier implied by the 400 / 800 benchmarks. */
  tier?: BenchmarkTier
}

export interface BenchmarkTableProps extends HTMLAttributes<HTMLDivElement> {
  rows: BenchmarkRow[]
}

const th = 'px-6px py-10px text-left text-text-xs font-medium leading-5 text-text-secondary first:pl-16px last:pr-16px'
const td = 'px-6px py-10px text-text-xs leading-5 first:pl-16px last:pr-16px'

export function BenchmarkTable({ rows, className, ...props }: BenchmarkTableProps) {
  return (
    <div
      className={cn('w-[474px] overflow-hidden rounded-lg border border-border-subtle bg-surface-subtle', className)}
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
          <tr className="bg-surface-emphasis">
            <th className={th}>Lote</th>
            <th className={th}>Actividad</th>
            <th className={cn(th, 'text-right')}>Tallos/ha·mes</th>
            <th className={th}>Estado</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {rows.map((row) => {
            const tier = row.tier ?? benchmarkTier(row.rate)
            return (
              <tr key={row.lote}>
                <td className={cn(td, 'text-text-primary')}>{row.lote}</td>
                <td className={cn(td, 'text-text-secondary')}>{row.actividad}</td>
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
