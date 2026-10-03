import { useEffect, useId } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '../Button'
import { cn } from '@/lib/utils'

// Mirrors the Drawer component (Feedback & Overlays page): cloned from Modal so
// header/footer patterns stay identical (a drawer is a modal entering from the
// side, not a different family). Figma's body shows a fixed "Lote/Actividad/
// Responsable/Notas" detail list — illustrative sample content for a task-detail
// use case, not the contract, so it's exposed as a generic label/value `items`
// list (falls back to arbitrary `children` for other bodies). The footer is
// pinned to the bottom via a flex-1 spacer rather than a fixed height, so the
// body can grow — same as Figma. Like Modal it sits on the Scrim ("Drawer over
// scrim"), rendered by default (`overlay`, on): a fixed scrim (--z-index-scrim) with
// the panel docked to the right edge above it (--z-index-modal); clicking the
// scrim or pressing Escape calls `onClose`. Pass `overlay={false}` for the
// body-only panel Figma documents.
// Focus trapping is the host dialog's job. Close icon: 20px visual, 24x24 target.

export interface DrawerItem {
  label: string
  value: ReactNode
}

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  items?: DrawerItem[]
  children?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
  onClose?: () => void
  /** Render on the Scrim, docked right (fixed, full-height). Default false: body only. */
  overlay?: boolean
}

export function Drawer({
  title,
  items,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel = 'Guardar cambios',
  onCancel,
  onConfirm,
  onClose,
  overlay = true,
  className,
  ...props
}: DrawerProps) {
  const titleId = useId()

  useEffect(() => {
    if (!overlay || !onClose) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [overlay, onClose])

  const panel = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        'flex w-[400px] flex-col items-start gap-16px rounded-lg bg-surface-subtle p-24px shadow-xl',
        overlay ? 'h-full rounded-r-none' : 'h-[600px]',
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <p id={titleId} className="text-xl font-semibold leading-7 text-text-primary">{title}</p>
        <button
          type="button"
          onClick={onClose}
          className="relative rounded-xs text-icon-muted outline-none transition-colors after:absolute after:left-1/2 after:top-1/2 after:size-24px after:-translate-x-1/2 after:-translate-y-1/2 hover:text-text-primary focus-visible:ring-1 focus-visible:ring-focus-ring"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="flex w-full flex-col gap-16px">
        {items
          ? items.map((item) => (
              <div key={item.label} className="flex w-full flex-col gap-4px">
                <p className="text-text-xxs font-medium leading-4 text-text-secondary">{item.label}</p>
                <p className="w-full text-sm text-text-primary">{item.value}</p>
              </div>
            ))
          : children}
      </div>
      <div className="flex-1" />
      <div className="flex w-full items-start justify-end gap-8px">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  )

  if (!overlay) return panel
  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[var(--z-index-scrim)] bg-surface-scrim opacity-scrim"
      />
      <div className="pointer-events-none fixed inset-y-0 right-0 z-[var(--z-index-modal)] flex">
        <div className="pointer-events-auto flex">{panel}</div>
      </div>
    </>
  )
}
