import type { HTMLAttributes, ReactNode } from 'react'
import { AlertCircle, Sparkles } from 'lucide-react'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

// Chat Message (AI page, Figma v1.4): one turn in a conversation with an
// agent — the person's message, or the assistant's answer as it streams in.
// Chat Thread is the scrolling log that holds them.
//
// Why — the two sides are told apart by layout, not only by colour: the
// person's turn is a bubble on surface/container-high aligned right, short
// and theirs; the assistant's answer is unboxed full-width text on the left,
// because it is often long and holds tables, lists and charts that a bubble
// would cramp. The assistant is marked by the Sparkles mark, never a face, so
// nobody mistakes it for a person. While streaming, a caret ends the text
// and the message is aria-busy; the thread is a polite live log, so screen
// readers hear the answer once it settles rather than token by token.
//
// Copy rules for agent output — say what happened in plain words ("I couldn't
// reach the sales data"), never a code or a stack trace; offer the next step
// (Retry); never apologise twice. Status text is short and present tense:
// "Thinking…", "Searching 3 sources…".

export type ChatRole = 'user' | 'assistant'

export interface ChatMessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  from: ChatRole
  /** The person's initials for their avatar (user messages). */
  initials?: string
  /** Shown above the message: "Laura Romero", "Assistant". */
  name?: string
  /** "2:14 PM" — shown next to the name. */
  time?: string
  /** `streaming` shows the caret and marks the message busy; `error` shows the error line. */
  status?: 'done' | 'streaming' | 'error'
  /** Plain-language error, shown when `status="error"`. */
  errorMessage?: string
  onRetry?: () => void
  /** Row of actions under an assistant message (copy, regenerate, feedback). */
  actions?: ReactNode
  /** Parts above the answer: Reasoning, Tool Call. */
  before?: ReactNode
  /** Parts below the answer: Sources, Suggestions. */
  after?: ReactNode
}

/** The assistant's mark — Sparkles on a neutral disc, never a face. */
export function AssistantMark({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('flex size-32px shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-container-high text-icon-default', className)}>
      <Sparkles className="size-4" />
    </span>
  )
}

export function ChatMessage({
  from,
  initials = 'LR',
  name,
  time,
  status = 'done',
  errorMessage = 'Something went wrong while answering. Try again.',
  onRetry,
  actions,
  before,
  after,
  className,
  children,
  ...props
}: ChatMessageProps) {
  const header = name || time ? (
    <p className={cn('m-0 flex items-baseline gap-8px text-text-xs leading-5', from === 'user' && 'justify-end')}>
      {name ? <span className="font-medium text-text-primary">{name}</span> : null}
      {time ? <span className="text-text-secondary">{time}</span> : null}
    </p>
  ) : null

  if (from === 'user') {
    return (
      <div className={cn('flex justify-end gap-12px', className)} {...props}>
        <div className="flex max-w-[80%] flex-col items-end gap-4px">
          {header}
          <div className="rounded-lg rounded-tr-xs bg-surface-container-high px-14px py-10px text-sm leading-6 text-text-primary [&_p]:m-0 [&_p+p]:mt-8px">{children}</div>
        </div>
        <Avatar initials={initials} size="md" />
      </div>
    )
  }

  return (
    <div className={cn('flex gap-12px', className)} aria-busy={status === 'streaming' || undefined} {...props}>
      <AssistantMark />
      <div className="flex min-w-0 flex-1 flex-col gap-8px">
        {header}
        {before}
        {children ? (
          <div
            className={cn(
              'min-w-0 text-sm leading-6 text-text-primary [&_code]:rounded-xs [&_code]:bg-surface-container-high [&_code]:px-4px [&_code]:font-mono [&_code]:text-text-xs [&_li]:my-2px [&_ol]:my-8px [&_ol]:pl-20px [&_p]:m-0 [&_p+p]:mt-8px [&_strong]:font-semibold [&_ul]:my-8px [&_ul]:list-disc [&_ul]:pl-20px',
              status === 'streaming' &&
                "[&>*:last-child]:after:ml-2px [&>*:last-child]:after:inline-block [&>*:last-child]:after:h-[1em] [&>*:last-child]:after:w-2px [&>*:last-child]:after:translate-y-[2px] [&>*:last-child]:after:bg-text-primary [&>*:last-child]:after:content-[''] motion-safe:[&>*:last-child]:after:animate-pulse",
            )}
          >
            {children}
          </div>
        ) : null}
        {status === 'error' ? (
          <div role="alert" className="flex flex-wrap items-center gap-8px text-sm leading-5 text-text-error">
            <AlertCircle className="size-4 shrink-0" aria-hidden />
            <span>{errorMessage}</span>
            {onRetry ? <Button variant="secondary" size="sm" onClick={onRetry}>Retry</Button> : null}
          </div>
        ) : null}
        {after}
        {actions && status === 'done' ? <div className="-ml-6px flex items-center gap-2px">{actions}</div> : null}
      </div>
    </div>
  )
}

export interface ChatThreadProps extends HTMLAttributes<HTMLDivElement> {
  /** Names the conversation for assistive tech. */
  'aria-label': string
}

/** The conversation log: a polite live region that holds Chat Messages. */
export function ChatThread({ className, children, ...props }: ChatThreadProps) {
  return (
    <div role="log" aria-live="polite" className={cn('flex flex-col gap-24px', className)} {...props}>
      {children}
    </div>
  )
}
