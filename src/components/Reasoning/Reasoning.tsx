import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Brain, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Reasoning (AI page, Figma v1.4): the agent's thinking, shown as a quiet
// disclosure above its answer — open while it thinks, folded to one line
// ("Thought for 12 seconds") once the answer starts.
//
// Why — showing the steps builds trust and lets people catch a wrong
// assumption early, but the answer is what they came for. So the trace is
// open only while there is nothing else to read, then folds itself away; it
// stays one click from reopening. It is set in text/secondary behind a
// border/subtle rule — visibly a side channel, never confused with the answer.
// The label carries the state in words ("Thinking…" / "Thought for 12
// seconds"), with a pulse only while thinking and none under reduced motion.

export interface ReasoningProps {
  /** `thinking` keeps it open and animates the label; `done` folds it. */
  status?: 'thinking' | 'done'
  /** Seconds spent, for the folded label. */
  duration?: number
  /** Open or closed regardless of status (stories). */
  defaultOpen?: boolean
  children: ReactNode
  className?: string
}

export function Reasoning({ status = 'done', duration, defaultOpen, children, className }: ReasoningProps) {
  const thinking = status === 'thinking'
  const [open, setOpen] = useState(defaultOpen ?? thinking)
  const prev = useRef(status)
  const id = useId()

  // Fold automatically when thinking ends, unless the person opened it themselves.
  useEffect(() => {
    if (prev.current === 'thinking' && status === 'done') setOpen(false)
    if (status === 'thinking') setOpen(true)
    prev.current = status
  }, [status])

  const label = thinking ? 'Thinking…' : duration !== undefined ? `Thought for ${duration} second${duration === 1 ? '' : 's'}` : 'Reasoning'

  return (
    <div className={cn('flex flex-col gap-6px', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="-ml-4px inline-flex w-fit items-center gap-6px rounded-sm px-4px py-2px text-text-xs font-medium leading-5 text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:focus-ring"
      >
        <Brain className={cn('size-4', thinking && 'motion-safe:animate-pulse')} aria-hidden />
        <span>{label}</span>
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open ? (
        <div id={id} className="border-l-2 border-border-subtle pl-12px text-text-xs leading-5 text-text-secondary [&_p]:m-0 [&_p+p]:mt-6px">
          {children}
        </div>
      ) : null}
    </div>
  )
}
