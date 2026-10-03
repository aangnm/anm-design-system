import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

// Mirrors the Rating / Severity Scale component (Core page): Severity=
// Critical/Moderate/Healthy. Three fixed segments (semantic/error, warning,
// success, in that order); the current tier is full opacity, the other two
// are dimmed to 25 %. The label uses the matching text token (text/error,
// text/warning, text/success) so it stays readable in both themes. Same
// tiers and colours as Benchmark Table's Estado column.
// Not interactive (Figma has no hit area), so it is a labelled image: one
// role="img" with an aria-label carrying the tier name; the bars are hidden.

export type Severity = 'critical' | 'moderate' | 'healthy'

const tiers: Record<Severity, { index: number; label: string; text: string }> = {
  critical: { index: 0, label: 'Crítico', text: 'text-text-error' },
  moderate: { index: 1, label: 'Moderado', text: 'text-text-warning' },
  healthy: { index: 2, label: 'Saludable', text: 'text-text-success' },
}
const segmentColors = ['bg-semantic-error', 'bg-semantic-warning', 'bg-semantic-success']

export interface RatingProps extends HTMLAttributes<HTMLDivElement> {
  severity: Severity
}

export function Rating({ severity, className, ...props }: RatingProps) {
  const tier = tiers[severity]
  return (
    <div
      role="img"
      aria-label={`Severidad: ${tier.label}`}
      className={cn('inline-flex h-20px items-center gap-8px', className)}
      {...props}
    >
      <span className="flex w-[80px] gap-4px" aria-hidden>
        {segmentColors.map((color, i) => (
          <span
            key={color}
            className={cn('h-6px flex-1 rounded-full', color, i !== tier.index && 'opacity-25')}
          />
        ))}
      </span>
      <span className={cn('text-text-xs font-medium leading-5', tier.text)} aria-hidden>
        {tier.label}
      </span>
    </div>
  )
}
