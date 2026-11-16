import { useLayoutEffect, useRef, useState } from 'react'

/**
 * Measures an element's content width and follows it as it resizes.
 *
 * Charts use it to fill their container: they redraw their geometry at the
 * real width instead of scaling a fixed-size SVG, so strokes stay 2px, text
 * stays 11px and points stay round at any size. `fallback` is used for the
 * first render (and wherever ResizeObserver is missing), then replaced by the
 * measured width before paint.
 */
export function useElementWidth<T extends HTMLElement = HTMLDivElement>(fallback: number) {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(fallback)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const w = Math.round(el.getBoundingClientRect().width)
      if (w > 0) setWidth(w)
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, width] as const
}

/** Every how-many category labels to print so they never collide (~40px each). */
export function labelStep(count: number, width: number, minGap = 40) {
  return Math.max(1, Math.ceil((count * minGap) / Math.max(width, 1)))
}
