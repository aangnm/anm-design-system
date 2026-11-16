import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Search component (Core page): Size (SM 32 / MD 36 / LG 48) x
// State (Default / Hover / Focus / Disabled) — no Error, since an empty
// result is not an invalid entry. Same padding, radius and text as Input.
// The search icon is always present, not an optional slot like Input's
// leading icon, since a Search field without it isn’t the Figma component.
// Width is up to the caller (Figma shows 260 / 280 / 300).

const searchVariants = cva(
  'flex w-full items-center gap-8px border border-border-default bg-surface-container transition-colors hover:border-border-emphasis ' +
    'has-[:focus-visible]:focus-ring ' +
    'has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-interactive-disabled has-[:disabled]:border-border-subtle has-[:disabled]:hover:border-border-subtle',
  {
    variants: {
      size: {
        sm: 'h-control-sm rounded-sm px-10px text-text-xs leading-5',
        md: 'h-control-md rounded-md px-12px text-sm',
        lg: 'h-control-lg rounded-md px-16px text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>,
    VariantProps<typeof searchVariants> {}

export const Search = forwardRef<HTMLInputElement, SearchProps>(({ className, size, ...props }, ref) => (
  <div className={cn(searchVariants({ size }), className)}>
    <SearchIcon className="size-4 shrink-0 text-icon-muted" aria-hidden />
    <input
      ref={ref}
      type="search"
      placeholder="Search…"
      className="w-full bg-transparent text-text-primary outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled"
      {...props}
    />
  </div>
))
Search.displayName = 'Search'
