import type { HTMLAttributes } from 'react'
import { Table } from '@/components/Table'
import { Tag } from '@/components/Tag'
import { cn } from '@/lib/utils'

// Mirrors the Benchmark Table component (App Ref: Product Patterns page): a
// productivity benchmark table — per-lote rate (t/ha·mes) with a tier-colored
// Estado chip. Why (from Figma) — the Estado column uses tier-coloured Tag
// instances rather than coloured text, so status survives being scanned
// quickly; the numeric column is right-aligned so magnitudes compare by eye.
// Built on Table + Tag rather than a bespoke grid.

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

export interface BenchmarkRow {
  lote: string
  actividad: string
  rate: number
  tier: BenchmarkTier
}

export interface BenchmarkTableProps extends HTMLAttributes<HTMLDivElement> {
  rows: BenchmarkRow[]
}

export function BenchmarkTable({ rows, className, ...props }: BenchmarkTableProps) {
  return (
    <div className={cn('w-[474px]', className)} {...props}>
      <Table
        columns={[
          { key: 'lote', header: 'Lote' },
          { key: 'actividad', header: 'Actividad' },
          { key: 'rate', header: 't/ha·mes', align: 'right' },
          { key: 'estado', header: 'Estado' },
        ]}
        rows={rows.map((row) => ({
          lote: row.lote,
          actividad: row.actividad,
          rate: row.rate,
          estado: (
            <Tag color={TIER_COLOR[row.tier]}>{TIER_LABEL[row.tier]}</Tag>
          ),
        }))}
      />
    </div>
  )
}
