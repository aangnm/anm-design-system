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
// body can grow — same as Figma. Like Modal, no backdrop yet.

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
  className,
  ...props
}: DrawerProps) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn('flex h-[600px] w-[400px] flex-col items-start gap-16px rounded-lg bg-surface-subtle p-24px shadow-xl', className)}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-xl font-semibold leading-7 text-text-primary">{title}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-xs text-text-primary opacity-80 outline-none transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-1 focus-visible:ring-focus-ring"
          aria-label="Cerrar"
        >
          <X className="size-5" />
        </button>
      </div>
      <div className="flex w-full flex-col gap-16px">
        {items
          ? items.map((item) => (
              <div key={item.label} className="flex w-full flex-col gap-4px">
                <p className="text-[11px] font-medium leading-4 text-text-secondary">{item.label}</p>
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
}
