import type { HTMLAttributes } from 'react'
import { Info, Check, TriangleAlert, CircleX, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Banner component (Feedback & Overlays page): Color=Info/Success/Warning/Error.
// Why (from Figma) — colour carries the meaning because a banner sits inside known page
// content, so a tinted surface is safe; each colour also gets its own icon rather than one
// placeholder shape repeated, since colour alone fails colour-blind readers.
// Title and Action are optional (both off by default): Title adds a bold first line,
// Action adds ONE underlined text action (24 high) — a single action so a banner never
// becomes a dialog. The close icon is a 16px visual with a 24x24 target.

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

export interface BannerAction {
  /** Maps to Figma's "Action label" text property. */
  label: string
  onClick: () => void
}

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Maps to Figma's "Color" variant. */
  color?: BannerColor
  message: string
  /** Optional bold first line — Figma's "Title" boolean + "Title text". */
  title?: string
  /** Optional single underlined text action — Figma's "Action" boolean + "Action label". */
  action?: BannerAction
  /** Called when the close icon is clicked; omit to hide the close affordance. */
  onDismiss?: () => void
}

export function Banner({ color = 'info', message, title, action, onDismiss, className, ...props }: BannerProps) {
  const Icon = icons[color]
  return (
    <div
      role="status"
      className={cn('flex items-start gap-10px rounded-md p-12px', surfaces[color], className)}
      {...props}
    >
      <Icon className="size-20px shrink-0" aria-hidden />
      <div className="flex min-w-px flex-1 flex-col items-start gap-4px">
        {title ? <p className="w-full break-words text-sm font-semibold leading-5">{title}</p> : null}
        <p className="w-full break-words text-sm leading-5">{message}</p>
        {action ? (
          <button
            type="button"
            onClick={action.onClick}
            className="h-24px rounded-xs py-2px text-sm font-medium leading-5 underline outline-none focus-visible:ring-1 focus-visible:ring-focus-ring"
          >
            {action.label}
          </button>
        ) : null}
      </div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          className="relative flex size-20px shrink-0 items-center justify-center rounded-xs opacity-80 outline-none transition-opacity after:absolute after:left-1/2 after:top-1/2 after:size-24px after:-translate-x-1/2 after:-translate-y-1/2 hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-focus-ring"
          aria-label="Cerrar"
        >
          <X className="size-4" />
        </button>
      ) : null}
    </div>
  )
}
