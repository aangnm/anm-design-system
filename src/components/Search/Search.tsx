import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Search component (Core page): State only (no Error), one
// size (36px), search icon always present — not an optional slot like
// Input's leading icon, since a Search field without it isn't the Figma
// component anymore.

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {}

export const Search = forwardRef<HTMLInputElement, SearchProps>(({ className, ...props }, ref) => (
  <div
    className={cn(
      'flex w-full items-center gap-8px rounded-md border border-border-default bg-surface-subtle px-12px py-8px text-base transition-colors',
      'has-[:focus-visible]:border-focus-ring',
      'has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-interactive-disabled has-[:disabled]:border-border-subtle',
      className,
    )}
  >
    <SearchIcon className="size-4 shrink-0 text-icon-muted" aria-hidden />
    <input
      ref={ref}
      type="search"
      placeholder="Buscar…"
      className="w-full bg-transparent text-text-primary outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled"
      {...props}
    />
  </div>
))
Search.displayName = 'Search'
