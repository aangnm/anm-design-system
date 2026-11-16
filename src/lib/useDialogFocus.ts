import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], area[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'

/**
 * Focus management for a modal surface (Modal, Drawer, Bottom Sheet) while it
 * is shown as an overlay — WCAG 2.4.3 Focus Order and 2.1.2 No Keyboard Trap:
 *
 * - on open, focus moves into the dialog: the element marked `data-autofocus`,
 *   else the first focusable control, else the dialog itself;
 * - while open, Tab and Shift+Tab cycle inside it, so focus never reaches the
 *   page behind the scrim (Escape still closes it, which is the way out);
 * - on close, focus returns to whatever had it before — usually the trigger.
 *
 * Pass `active = false` for the body-only form (`overlay={false}`), where the
 * host owns the dialog behaviour.
 */
export function useDialogFocus<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (!active) return
    const dialog = ref.current
    if (!dialog) return
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const focusables = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null || el === document.activeElement)

    const initial = dialog.querySelector<HTMLElement>('[data-autofocus]') ?? focusables()[0] ?? dialog
    if (initial === dialog && !dialog.hasAttribute('tabindex')) dialog.setAttribute('tabindex', '-1')
    initial.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = focusables()
      if (items.length === 0) {
        e.preventDefault()
        dialog.focus()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement
      if (e.shiftKey && (current === first || !dialog.contains(current))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (current === last || !dialog.contains(current))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (previous && document.contains(previous)) previous.focus()
    }
  }, [active])

  return ref
}
