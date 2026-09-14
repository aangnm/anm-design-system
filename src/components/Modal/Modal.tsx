import type { HTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '../Button'
import { cn } from '@/lib/utils'

// Mirrors the Modal component (Feedback & Overlays page): Type=Default/Destructive.
// Why (from Figma) — Destructive recolours the confirm button through an instance
// override rather than adding a Type to Button; one dialog's needs didn't justify
// widening Button's API for every consumer. Also per the component's description,
// Figma's Modal has no backdrop — opacity/scrim exists as a token but nothing
// consumes it yet — so this component is deliberately body-only too; a caller
// wanting a backdrop composes it (e.g. a Radix Dialog) around this.

export type ModalType = 'default' | 'destructive'

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  /** Maps to Figma's "Type" variant. */
  type?: ModalType
  title: string
  children: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
  onClose?: () => void
}

export function Modal({
  type = 'default',
  title,
  children,
  cancelLabel = 'Cancelar',
  confirmLabel,
  onCancel,
  onConfirm,
  onClose,
  className,
  ...props
}: ModalProps) {
  const isDestructive = type === 'destructive'
  return (
    <div
      role="dialog"
      aria-modal="true"
      className={cn('flex w-[440px] flex-col items-start gap-16px rounded-lg bg-surface-subtle p-24px shadow-xl', className)}
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
      <p className="w-full text-sm text-text-secondary">{children}</p>
      <div className="flex w-full items-start justify-end gap-8px">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          className={isDestructive ? 'bg-semantic-error text-text-inverse hover:bg-semantic-error' : undefined}
        >
          {confirmLabel ?? (isDestructive ? 'Eliminar' : 'Confirmar')}
        </Button>
      </div>
    </div>
  )
}
