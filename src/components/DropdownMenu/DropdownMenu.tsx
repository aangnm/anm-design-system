import { Children, isValidElement, useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/Button'
import { Menu } from '@/components/Menu'
import { Search } from '@/components/Search'
import { Divider } from '@/components/Divider'

// Mirrors the Dropdown Menu component (Navigation page), which has two
// static states — Closed (trigger only) and Open (trigger + Menu panel).
// Code needs the behaviour those two frames imply, so this owns open state
// plus the two dismissals a real menu can't ship without: click-outside
// and Escape.
//
// Searchable (Figma State=Searchable) is the Open menu with a Search field on
// top and a Limpiar (clear) button at the bottom, both inside the menu
// container and separated from the items by dividers; items carry no icons
// there (`leadingIcon={false}`). Limpiar resets the query and calls `onClear`
// so the owner can reset its selection. The list is filtered by each child's
// text content.
//
// Positioning is a plain absolute panel below the trigger — no viewport
// collision handling. That's a deliberate limit, not an oversight: proper
// flipping/shifting is a Floating UI concern, and adding the dependency
// isn't justified until a screen actually needs it.

export interface DropdownMenuProps {
  /** Trigger label. Ignored when `trigger` is provided. */
  label?: string
  /** Custom trigger. Receives nothing — wire your own onClick via the wrapper. */
  trigger?: ReactNode
  children: ReactNode
  className?: string
  defaultOpen?: boolean
  /** Maps to Figma's State=Searchable: search field on top, Limpiar at the bottom. */
  searchable?: boolean
  searchPlaceholder?: string
  /** Called by Limpiar (after the query is reset) so the owner can clear its selection. */
  onClear?: () => void
}

// Plain text of a React node, for filtering MenuItem children by the query.
function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children)
  return ''
}

export function DropdownMenu({
  label = 'Opciones',
  trigger,
  children,
  className,
  defaultOpen = false,
  searchable = false,
  searchPlaceholder = 'Buscar…',
  onClear,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(defaultOpen)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={rootRef} className={cn('relative inline-block', className)}>
      <div onClick={() => setOpen((v) => !v)}>
        {trigger ?? (
          <Button
            variant="outline"
            size="sm"
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={open ? menuId : undefined}
            trailingIcon={
              <ChevronDown className={cn('size-3.5 text-icon-muted transition-transform', open && 'rotate-180')} />
            }
          >
            {label}
          </Button>
        )}
      </div>

      {open ? (
        <Menu id={menuId} className="absolute left-0 top-[calc(100%+8px)] z-[var(--z-index-dropdown)]">
          {searchable ? (
            <>
              <Search
                size="md"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                autoFocus
              />
              <Divider className="my-2px" />
              {Children.toArray(children).filter(
                (child) => !query || textOf(child).toLowerCase().includes(query.trim().toLowerCase()),
              )}
              <Divider className="my-2px" />
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  onClear?.()
                }}
                className="flex w-full items-center rounded-sm px-12px py-6px text-left text-text-xs font-medium leading-5 text-text-primary outline-none transition-colors hover:bg-interactive-default focus-visible:bg-interactive-default focus-visible:focus-ring"
              >
                Limpiar
              </button>
            </>
          ) : (
            children
          )}
        </Menu>
      ) : null}
    </div>
  )
}
