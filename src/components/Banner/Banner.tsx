import type { HTMLAttributes } from 'react'
import { Info, Check, TriangleAlert, CircleX, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Banner component (Feedback & Overlays page): Color=Info/Success/Warning/Error.
// Why (from Figma) — colour carries the meaning because a banner sits inside known page
// content, so a tinted surface is safe; each colour also gets its own icon rather than one
// placeholder shape repeated, since colour alone fails colour-blind readers.

export type BannerColor = 'info' | 'success' | 'warning' | 'error'

const icons: Record<BannerColor, typeof Info> = {
  info: Info,
  success: Check,
  warning: TriangleAlert,
  error: CircleX,
}

const surfaces: Record<BannerColor, string> = {
  info: 'bg-semantic-info-surface text-semantic-info-foreground',
  success: 'bg-semantic-success-surface text-semantic-success-foreground',
  warning: 'bg-semantic-warning-surface text-semantic-warning-foreground',
  error: 'bg-semantic-error-surface text-semantic-error-foreground',
}

export interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  /** Maps to Figma's "Color" variant. */
  color?: BannerColor
  message: string
  /** Called when the close icon is clicked; omit to hide the close affordance. */
  onDismiss?: () => void
}

export function Banner({ color = 'info', message, onDismiss, className, ...props }: BannerProps) {
  const Icon = icons[color]
  return (
    <div
      role="status"
      className={cn('flex items-center gap-10px rounded-md p-12px', surfaces[color], className)}
      {...props}
    >
      <Icon className="size-[18px] shrink-0" aria-hidden />
      <p className="min-w-px flex-1 break-words text-sm leading-5">{message}</p>
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
