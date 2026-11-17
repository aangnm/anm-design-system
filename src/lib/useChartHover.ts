import { useState, type PointerEvent as ReactPointerEvent, type MouseEvent as ReactMouseEvent } from 'react'

// Shared hover readout for charts: the whole plot is one target that snaps to
// the nearest data point (`mode: 'point'`, lines and areas) or to the slot
// under the pointer (`mode: 'slot'`, bars). On touch a tap pins the readout;
// tap again to release. The chart's text alternative already carries every
// value, so the hover is an enhancement for pointer users, not the only way in.

export function useChartHover(count: number, mode: 'point' | 'slot' = 'point') {
  const [hover, setHover] = useState<number | null>(null)
  const [pinned, setPinned] = useState(false)

  const locate = (clientX: number, rect: DOMRect) => {
    const t = (clientX - rect.left) / (rect.width || 1)
    const i = mode === 'slot' ? Math.floor(t * count) : Math.round(t * (count - 1))
    return Math.max(0, Math.min(count - 1, i))
  }

  const handlers = {
    onPointerMove: (e: ReactPointerEvent<HTMLElement>) => {
      if (!pinned) setHover(locate(e.clientX, e.currentTarget.getBoundingClientRect()))
    },
    onPointerLeave: () => {
      if (!pinned) setHover(null)
    },
    onClick: (e: ReactMouseEvent<HTMLElement>) => {
      if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === 'mouse') return
      setPinned((p) => !p)
      setHover(locate(e.clientX, e.currentTarget.getBoundingClientRect()))
    },
  }

  return { hover, handlers }
}
