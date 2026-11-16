import { useEffect, useId } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

// Mirrors the Bottom Sheet component (Feedback & Overlays page): a panel that
// rises from the bottom of a phone screen for one focused task, over the
// Scrim. Optional handle, a title with a one-line context, a content slot
// (Counter by default in Figma) and a two-button footer. 390 wide (full width
// below that), top corners radius/xl, shadow-xl, 24px side padding and 32px
// at the bottom. Why (from Figma) — Modal is a centred dialog and Drawer
// enters from the side; neither is built for a thumb on a phone. The sheet
// reuses Modal's header and footer pattern so it reads as the same family.
// Like Modal, `overlay` (on by default) renders the fixed Scrim; clicking it
// or pressing Escape calls `onClose`. Focus trapping is the host's job.

export interface BottomSheetProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: string
  /** One-line context under the title. Figma's "Context". */
  context?: string
  /** Figma's "Show handle". */
  showHandle?: boolean
  children?: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  onCancel?: () => void
  onConfirm?: () => void
  onClose?: () => void
  /** Render fixed to the viewport bottom on the Scrim. */
  overlay?: boolean
}

export function BottomSheet({
  title,
  context,
  showHandle = true,
  children,
  cancelLabel = 'Cancel',
  confirmLabel = 'Save',
  onCancel,
  onConfirm,
  onClose,
  overlay = true,
  className,
  ...props
}: BottomSheetProps) {
  const titleId = useId()

  useEffect(() => {
    if (!overlay || !onClose) return
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [overlay, onClose])

  const sheet = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className={cn(
        'flex w-full max-w-[390px] flex-col gap-16px rounded-t-xl bg-surface-container px-24px pb-32px pt-12px shadow-xl',
        className,
      )}
      {...props}
    >
      {showHandle ? (
        <div className="flex justify-center" aria-hidden>
          <div className="h-4px w-40px rounded-pill bg-border-emphasis" />
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2px">
          <p id={titleId} className="text-text-xl font-semibold leading-7 text-text-primary">
            {title}
          </p>
          {context ? <p className="text-text-sm leading-5 text-text-secondary">{context}</p> : null}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="-mr-12px inline-flex size-48px items-center justify-center rounded-md text-icon-muted outline-none transition-colors hover:text-text-primary focus-visible:focus-ring"
        >
          <X className="size-5" aria-hidden />
        </button>
      </div>
      {children}
      <div className="flex gap-8px">
        <Button size="lg" variant="secondary" className="flex-1" onClick={onCancel ?? onClose}>
          {cancelLabel}
        </Button>
        <Button size="lg" className="flex-1" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  )

  if (!overlay) return sheet
  return (
    <>
      <div aria-hidden onClick={onClose} className="fixed inset-0 z-[var(--z-index-scrim)] bg-surface-scrim opacity-scrim" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[var(--z-index-modal)] flex justify-center">
        <div className="pointer-events-auto flex w-full justify-center">{sheet}</div>
      </div>
    </>
  )
}
