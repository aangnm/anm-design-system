import type { HTMLAttributes } from 'react'
import { Check, Info, TriangleAlert, CircleX, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Toast component (Feedback & Overlays page): Color=Success/Info/Warning/Error.
// Why (from Figma) — keeps a neutral surface with a coloured icon, deliberately unlike
// Banner's tinted background: a toast overlays arbitrary content, so a neutral surface
// stays legible wherever it lands and the icon alone carries the meaning.

export type ToastColor = 'success' | 'info' | 'warning' | 'error'

const icons: Record<ToastColor, typeof Check> = {
  success: Check,
  info: Info,
  warning: TriangleAlert,
  error: CircleX,
}

const iconColors: Record<ToastColor, string> = {
  success: 'text-semantic-success',
  info: 'text-semantic-info',
  warning: 'text-semantic-warning',
  error: 'text-semantic-error',
}

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Maps to Figma's "Color" variant. */
  color?: ToastColor
  title: string
  description: string
  onDismiss?: () => void
}

export function Toast({ color = 'success', title, description, onDismiss, className, ...props }: ToastProps) {
  const Icon = icons[color]
  return (
    <div
      role="status"
      className={cn(
        'flex w-[360px] items-center gap-12px rounded-md bg-surface-emphasis px-14px py-12px shadow-lg',
        className,
      )}
      {...props}
    >
      <Icon className={cn('size-5 shrink-0', iconColors[color])} aria-hidden />
      <div className="flex min-w-px flex-1 flex-col gap-2px">
        <p className="text-sm font-medium text-text-primary">{title}</p>
        <p className="text-[13px] text-text-secondary">{description}</p>
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-xs opacity-80 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-focus-ring"
          aria-label="Cerrar"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
