import { useEffect, useId } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '../Button'
import { cn } from '@/lib/utils'

// Mirrors the Modal component (Feedback & Overlays page): Type=Default/Destructive.
// Why (from Figma) — Destructive recolours the confirm button through an instance
// override rather than adding a Type to Button; one dialog's needs didn't justify
// widening Button's API for every consumer. The backdrop is the separate Scrim
// component (surface/scrim at opacity/scrim, "Modal over scrim"), rendered by
// default (`overlay`, on): a `fixed inset-0` scrim at --z-index-scrim with the
// dialog centred above it at --z-index-modal; clicking the scrim (or Escape)
// calls `onClose`. Pass `overlay={false}` for the body-only component Figma
// documents, e.g. to compose your own backdrop (a Radix Dialog). Focus
// trapping stays the host dialog's job. The destructive confirm label is the
// literal white of Figma's charcoal/0 binding (like Badge), not text/inverse,
// which flips to black in dark and would drop contrast on the error red.
// The close icon is a 20px visual with a 24x24 target.

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
  /** Render on the Scrim (fixed, full-viewport). Default false: body only. */
  overlay?: boolean
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
  overlay = true,
  className,
  ...props
}: ModalProps) {
  const isDestructive = type === 'destructive'
  const titleId = useId()

  useEffect(() => {
    if (!overlay || !onClose) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [overlay, onClose])

  const dialog = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn('flex w-[440px] flex-col items-start gap-16px rounded-lg bg-surface-subtle p-24px shadow-xl', className)}
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
      <p className="w-full text-sm text-text-secondary">{children}</p>
      <div className="flex w-full items-start justify-end gap-8px">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button
          variant="primary"
          onClick={onConfirm}
          className={isDestructive ? 'bg-semantic-error text-white hover:bg-semantic-error active:bg-semantic-error' : undefined}
        >
          {confirmLabel ?? (isDestructive ? 'Eliminar' : 'Confirmar')}
        </Button>
      </div>
    </div>
  )

  if (!overlay) return dialog
  return (
    <>
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[var(--z-index-scrim)] bg-surface-scrim opacity-scrim"
      />
      <div className="pointer-events-none fixed inset-0 z-[var(--z-index-modal)] flex items-center justify-center p-24px">
        <div className="pointer-events-auto">{dialog}</div>
      </div>
    </>
  )
}
