import { useEffect, useId, useRef, useState } from 'react'

/**
 * Open/close behaviour for a trigger + floating panel (Faceted Filter,
 * Date Range Picker, column menus): click outside or Escape closes it, and
 * Escape returns focus to the trigger. The panel is not modal, so focus is
 * not trapped — Tab simply moves on, as in a menu button.
 */
export function usePopover(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return {
    open,
    setOpen,
    rootRef,
    triggerProps: {
      ref: triggerRef,
      'aria-expanded': open,
      'aria-controls': open ? panelId : undefined,
      onClick: () => setOpen((o) => !o),
    },
    panelId,
  }
}

/** Surface of every floating panel: the same container-high, radius and shadow as Menu. */
export const panelClass = 'absolute left-0 top-[calc(100%+8px)] z-[var(--z-index-dropdown)] rounded-md bg-surface-container-high p-6px shadow-lg'
