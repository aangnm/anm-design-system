import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Suggestions (AI page, Figma v1.4): prompt starters and follow-ups as a row
// of pills — on an empty chat ("Compare Q1 and Q2 sales") or under an answer
// ("Break this down by region").
//
// Why — a blank prompt box is the hardest screen in an AI product: people do
// not know what the agent can do. Suggestions show it by example, written in
// the person's voice as full questions they could have typed, so choosing one
// sends exactly what it says. Three or four is the limit — more becomes a
// menu to read. Pills are outlined, not filled, so they never compete with the
// Send button; they wrap on small screens rather than scroll out of sight.

export interface SuggestionItem {
  label: string
  /** Text sent when chosen; defaults to the label. */
  prompt?: string
  icon?: ReactNode
}

export interface SuggestionsProps {
  items: SuggestionItem[]
  onSelect: (prompt: string) => void
  /** Names the group, e.g. "Suggested questions". */
  'aria-label'?: string
  className?: string
}

export function Suggestions({ items, onSelect, 'aria-label': ariaLabel = 'Suggested prompts', className }: SuggestionsProps) {
  return (
    <ul aria-label={ariaLabel} className={cn('m-0 flex list-none flex-wrap gap-8px p-0', className)}>
      {items.map((s) => (
        <li key={s.label}>
          <button
            type="button"
            onClick={() => onSelect(s.prompt ?? s.label)}
            className="relative inline-flex min-h-control-sm items-center gap-6px rounded-full border border-border-default px-12px py-4px text-left text-text-xs leading-5 text-text-primary outline-none transition-colors state-layer hover:state-hover hover:border-border-emphasis focus-visible:focus-ring [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-icon-muted"
          >
            {s.icon}
            {s.label}
          </button>
        </li>
      ))}
    </ul>
  )
}
