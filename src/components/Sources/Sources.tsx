import { useId, useState } from 'react'
import { ChevronDown, FileText, Globe } from 'lucide-react'
import { HoverCard } from '@/components/HoverCard'
import { cn } from '@/lib/utils'

// Sources and Citation (AI page, Figma v1.4): where an answer came from.
// Citation is the small numbered marker inside the text; Sources is the
// folded list under the answer ("4 sources").
//
// Why — an agent's claim is only as good as what it read, so every factual
// sentence can point to its source and every source is one click away. The
// marker is a number, not a link text, so it does not break the sentence; on
// hover or focus it previews the source in a Hover Card. The list is folded by
// default because most readers trust the answer and some want to verify it —
// the count alone tells them evidence exists. Internal documents and web
// pages get different icons, since "from your data" and "from the web" carry
// different weight.

export interface Source {
  title: string
  url: string
  /** Shown in the list and the Citation preview. */
  snippet?: string
  /** Internal file or record vs a web page. */
  kind?: 'document' | 'web'
}

const host = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

export interface CitationProps {
  /** 1-based number shown in the marker. */
  index: number
  source: Source
}

export function Citation({ index, source }: CitationProps) {
  return (
    <HoverCard
      trigger={
        <a
          href={source.url}
          aria-label={`Source ${index}: ${source.title}`}
          className="mx-2px inline-flex h-16px min-w-16px -translate-y-[2px] items-center justify-center rounded-xs bg-surface-container-high px-4px align-middle text-text-xxs font-medium leading-4 text-text-secondary no-underline outline-none hover:text-text-primary focus-visible:focus-ring"
        >
          {index}
        </a>
      }
    >
      <span className="flex flex-col gap-4px">
        <span className="text-text-xxs leading-4 text-text-secondary">{host(source.url)}</span>
        <span className="text-sm font-medium leading-5 text-text-primary">{source.title}</span>
        {source.snippet ? <span className="text-text-xs leading-5 text-text-secondary">{source.snippet}</span> : null}
      </span>
    </HoverCard>
  )
}

export interface SourcesProps {
  sources: Source[]
  defaultOpen?: boolean
  className?: string
}

export function Sources({ sources, defaultOpen = false, className }: SourcesProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className={cn('flex flex-col gap-6px', className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="-ml-4px inline-flex w-fit items-center gap-6px rounded-sm px-4px py-2px text-text-xs font-medium leading-5 text-text-secondary outline-none hover:text-text-primary focus-visible:focus-ring"
      >
        {sources.length} source{sources.length === 1 ? '' : 's'}
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden />
      </button>
      {open ? (
        <ol id={id} className="m-0 grid list-none grid-cols-1 gap-6px p-0 sm:grid-cols-2">
          {sources.map((s, i) => (
            <li key={s.url}>
              <a
                href={s.url}
                className="flex h-full gap-10px rounded-md border border-border-subtle bg-surface-container px-10px py-8px no-underline outline-none transition-colors state-layer hover:state-hover hover:border-border-default focus-visible:focus-ring"
              >
                <span className="text-text-xxs font-medium leading-5 text-text-secondary">{i + 1}</span>
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-text-xs font-medium leading-5 text-text-primary">{s.title}</span>
                  <span className="flex items-center gap-4px truncate text-text-xxs leading-4 text-text-secondary">
                    {s.kind === 'document' ? <FileText className="size-3 shrink-0" aria-hidden /> : <Globe className="size-3 shrink-0" aria-hidden />}
                    {s.kind === 'document' ? 'Your data' : host(s.url)}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  )
}
