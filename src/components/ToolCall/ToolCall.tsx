import { useId, useState } from 'react'
import { Check, ChevronDown, CircleAlert, Hand, LoaderCircle, Wrench } from 'lucide-react'
import { Button } from '@/components/Button'
import { cn } from '@/lib/utils'

// Tool Call (AI page, Figma v1.4): one action the agent takes — querying a
// database, sending an email, creating a record — with its status, and the
// input and output one click away. With `status="approval"` it asks the
// person to approve or deny before anything happens.
//
// Why — an agent that acts on someone's data must show what it did, in
// words first ("Queried sales for May 2026") and the raw call second, folded,
// for whoever wants to check it. Status reads from the icon and the label,
// not colour alone: a spinner while running, a check when done, an alert on
// error. Actions with side effects stop at Approval — the card states what
// will happen and the two buttons say what each does; Deny is never the
// Primary. Input and output use a monospace block because they are data, not
// prose.

export interface ToolCallProps {
  /** What the agent is doing, in words: "Query sales for May 2026". */
  title: string
  /** The tool's technical name, shown small: "sales.query". */
  tool?: string
  status: 'running' | 'done' | 'error' | 'approval'
  /** Parameters the agent sent. */
  input?: unknown
  /** What came back (or the error). */
  output?: unknown
  /** Shown with `approval`: what will happen if approved. */
  approvalMessage?: string
  onApprove?: () => void
  onDeny?: () => void
  defaultOpen?: boolean
  className?: string
}

const fmt = (v: unknown) => (typeof v === 'string' ? v : JSON.stringify(v, null, 2))

const STATUS = {
  running: { label: 'Running', icon: <LoaderCircle className="size-4 motion-safe:animate-spin" aria-hidden />, tone: 'text-text-secondary' },
  done: { label: 'Done', icon: <Check className="size-4" aria-hidden />, tone: 'text-text-success' },
  error: { label: 'Failed', icon: <CircleAlert className="size-4" aria-hidden />, tone: 'text-text-error' },
  approval: { label: 'Needs approval', icon: <Hand className="size-4" aria-hidden />, tone: 'text-text-warning' },
} as const

export function ToolCall({ title, tool, status, input, output, approvalMessage, onApprove, onDeny, defaultOpen = false, className }: ToolCallProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  const s = STATUS[status]
  const hasDetail = input !== undefined || output !== undefined

  return (
    <div className={cn('flex flex-col rounded-md border border-border-subtle bg-surface-container', status === 'approval' && 'border-border-default', className)}>
      <div className="flex items-center gap-10px px-12px py-8px">
        <Wrench className="size-4 shrink-0 text-icon-muted" aria-hidden />
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-text-xs font-medium leading-5 text-text-primary">{title}</span>
          {tool ? <span className="truncate font-mono text-text-xxs leading-4 text-text-secondary">{tool}</span> : null}
        </div>
        <span className={cn('flex shrink-0 items-center gap-4px text-text-xxs font-medium leading-4', s.tone)} role="status">
          {s.icon}
          {s.label}
        </span>
        {hasDetail ? (
          <button
            type="button"
            aria-expanded={open}
            aria-controls={id}
            aria-label={open ? 'Hide details' : 'Show details'}
            onClick={() => setOpen((o) => !o)}
            className="relative -mr-4px rounded-xs p-4px text-icon-muted outline-none hover:text-text-primary focus-visible:focus-ring"
          >
            <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
          </button>
        ) : null}
      </div>
      {status === 'approval' ? (
        <div className="flex flex-col gap-10px border-t border-border-subtle px-12px py-10px">
          {approvalMessage ? <p className="m-0 text-text-xs leading-5 text-text-primary">{approvalMessage}</p> : null}
          <div className="flex gap-8px">
            <Button size="sm" onClick={onApprove}>Approve</Button>
            <Button size="sm" variant="secondary" onClick={onDeny}>Deny</Button>
          </div>
        </div>
      ) : null}
      {open && hasDetail ? (
        <div id={id} className="flex flex-col gap-8px border-t border-border-subtle px-12px py-10px">
          {input !== undefined ? (
            <div className="flex flex-col gap-4px">
              <span className="text-text-xxs font-medium uppercase leading-4 tracking-wide text-text-secondary">Input</span>
              <pre className="m-0 overflow-x-auto rounded-sm bg-surface-container-high p-8px font-mono text-text-xxs leading-4 text-text-primary">{fmt(input)}</pre>
            </div>
          ) : null}
          {output !== undefined ? (
            <div className="flex flex-col gap-4px">
              <span className="text-text-xxs font-medium uppercase leading-4 tracking-wide text-text-secondary">{status === 'error' ? 'Error' : 'Output'}</span>
              <pre className="m-0 overflow-x-auto rounded-sm bg-surface-container-high p-8px font-mono text-text-xxs leading-4 text-text-primary">{fmt(output)}</pre>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
