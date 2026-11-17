import { useRef, type KeyboardEvent } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { panelClass, usePopover } from '@/lib/usePopover'

// Model Selector (AI page, Figma v1.4): a compact control in the Prompt
// Input toolbar that picks which model answers — named by what it is good at,
// with one line on the trade-off.
//
// Why — people choose between speed, depth and cost, not between version
// numbers. Each option says what it is for ("Best for quick lookups") and
// can carry short capability tags, so the choice is made on purpose rather
// than by name recognition. The trigger is a quiet ghost control showing
// only the current name, because it is set once and rarely changed; it must
// never compete with Send. The list is a radio group: arrows move, Enter or
// Space picks, Escape closes and returns focus.

export interface ModelOption {
  value: string
  label: string
  description?: string
  /** Short capability tags: "Fast", "Reasoning", "Vision". */
  tags?: string[]
}

export interface ModelSelectorProps {
  models: ModelOption[]
  value: string
  onChange: (value: string) => void
  /** Open on mount (stories). */
  defaultOpen?: boolean
  className?: string
}

export function ModelSelector({ models, value, onChange, defaultOpen, className }: ModelSelectorProps) {
  const { open, setOpen, rootRef, triggerProps, panelId } = usePopover(defaultOpen)
  const listRef = useRef<HTMLDivElement>(null)
  const current = models.find((m) => m.value === value) ?? models[0]

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role=radio]') ?? [])
    const i = items.indexOf(document.activeElement as HTMLElement)
    if (e.key === 'ArrowDown') items[(i + 1) % items.length]?.focus()
    else if (e.key === 'ArrowUp') items[(i - 1 + items.length) % items.length]?.focus()
    else return
    e.preventDefault()
  }

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-label={`Model: ${current.label}`}
        {...triggerProps}
        className="relative inline-flex h-control-sm items-center gap-4px rounded-sm px-8px text-text-xs font-medium leading-5 text-text-secondary outline-none transition-colors state-layer hover:state-hover hover:text-text-primary focus-visible:focus-ring"
      >
        {current.label}
        <ChevronDown className="size-4" aria-hidden />
      </button>
      {open ? (
        <div id={panelId} role="dialog" aria-label="Choose a model" className={cn(panelClass, 'bottom-[calc(100%+8px)] top-auto w-[280px] max-w-[calc(100vw-32px)]')}>
          <div ref={listRef} role="radiogroup" aria-label="Model" className="flex flex-col gap-2px" onKeyDown={onKey}>
            {models.map((m) => {
              const on = m.value === current.value
              return (
                <button
                  key={m.value}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  tabIndex={on ? 0 : -1}
                  autoFocus={on}
                  onClick={() => {
                    onChange(m.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-start gap-10px rounded-sm px-10px py-8px text-left outline-none transition-colors state-layer hover:state-hover focus-visible:focus-ring',
                    on && 'bg-interactive-default',
                  )}
                >
                  <span className="flex min-w-0 flex-1 flex-col gap-2px">
                    <span className="flex flex-wrap items-center gap-6px">
                      <span className="text-sm font-medium leading-5 text-text-primary">{m.label}</span>
                      {m.tags?.map((t) => (
                        <span key={t} className="rounded-xs border border-border-subtle px-4px text-text-xxs leading-4 text-text-secondary">{t}</span>
                      ))}
                    </span>
                    {m.description ? <span className="text-text-xs leading-5 text-text-secondary">{m.description}</span> : null}
                  </span>
                  {on ? <Check className="mt-2px size-4 shrink-0 text-icon-default" aria-hidden /> : <span className="size-4 shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
