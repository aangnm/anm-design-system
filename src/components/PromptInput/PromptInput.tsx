import { useLayoutEffect, useRef, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { ArrowUp, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

// Prompt Input (AI page, Figma v1.4): where a person writes to an agent — a
// text area that grows with the message, a send button, and a toolbar for
// attachments and the Model Selector.
//
// Why — prompts range from three words to a pasted brief, so the field starts
// at one line and grows to eight before it scrolls; a fixed tall box wastes
// the screen most of the time. Enter sends and Shift+Enter adds a line, the
// convention people already know from chat. Send is the one Primary control
// and stays disabled while the field is empty; while the agent answers it
// becomes Stop, in the same place, so stopping never needs a hunt. The whole
// box carries one focus ring, like Input Group. The hint under it states the
// keys and the limits of the agent in one quiet line.

export interface PromptInputProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onSubmit' | 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  /** `streaming` turns Send into Stop. */
  status?: 'idle' | 'streaming'
  onStop?: () => void
  /** Controls at the bottom left: attach, Model Selector. */
  toolbar?: ReactNode
  /** One quiet line under the box. */
  hint?: ReactNode
  /** Rows before the field scrolls (default 8). */
  maxRows?: number
  className?: string
}

const LINE = 24

export function PromptInput({
  value,
  onChange,
  onSubmit,
  status = 'idle',
  onStop,
  toolbar,
  hint,
  maxRows = 8,
  placeholder = 'Ask about your data…',
  className,
  disabled,
  'aria-label': ariaLabel = 'Message',
  ...props
}: PromptInputProps) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const streaming = status === 'streaming'
  const empty = value.trim() === ''

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, LINE * maxRows)}px`
  }, [value, maxRows])

  const send = () => {
    if (!empty && !streaming && !disabled) onSubmit(value)
  }

  return (
    <div className={cn('flex w-full flex-col gap-6px', className)}>
      <div
        className={cn(
          'flex flex-col gap-8px rounded-lg border bg-surface-container p-12px transition-colors has-[textarea:focus-visible]:focus-ring',
          disabled ? 'border-border-subtle bg-interactive-disabled' : 'border-border-default hover:border-border-emphasis',
        )}
      >
        <textarea
          ref={ref}
          rows={1}
          value={value}
          disabled={disabled}
          aria-label={ariaLabel}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
              e.preventDefault()
              send()
            }
          }}
          className="w-full resize-none bg-transparent px-4px text-sm leading-6 text-text-primary outline-none placeholder:text-text-secondary disabled:cursor-not-allowed"
          {...props}
        />
        <div className="flex items-center gap-8px">
          <div className="flex min-w-0 flex-1 items-center gap-4px">{toolbar}</div>
          {streaming ? (
            <button
              type="button"
              aria-label="Stop answering"
              onClick={onStop}
              className="relative inline-flex size-32px shrink-0 items-center justify-center rounded-full bg-interactive-primary text-interactive-primary-foreground outline-none state-layer hover:state-hover focus-visible:focus-ring"
            >
              <Square className="size-3 fill-current" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Send message"
              disabled={empty || disabled}
              onClick={send}
              className="relative inline-flex size-32px shrink-0 items-center justify-center rounded-full bg-interactive-primary text-interactive-primary-foreground outline-none state-layer hover:state-hover focus-visible:focus-ring disabled:pointer-events-none disabled:bg-interactive-disabled disabled:text-text-disabled"
            >
              <ArrowUp className="size-4" />
            </button>
          )}
        </div>
      </div>
      {hint ? <p className="m-0 px-4px text-text-xxs leading-4 text-text-secondary">{hint}</p> : null}
    </div>
  )
}
