import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Menu } from '@/components/Menu'

// Mirrors the Combobox component set (Core page): Size SM/MD/LG (32/36/48)
// x State Default/Hover/Focus/Disabled/Error/Focus + Error/Open. A searchable
// single-value picker: type to filter, pick one. Why (from Figma) — Select
// covers a plain pick, Multi-select several values; nothing covered a
// searchable single value. Reuses Select's field styling and Menu's panel.
// States are real: :hover, :focus, [disabled], aria-invalid (Error is a prop),
// Open is real open state (`defaultOpen` only exists to document it).
// Focus + Error = error border plus an outer 2px focus ring.
// Hit area (from Figma) — the whole field; on touch it extends to 48px.
//
// Accessibility: ARIA 1.2 combobox pattern (input role=combobox + listbox,
// aria-activedescendant). ArrowDown/Up move, Enter picks, Escape closes,
// Home/End jump; click outside closes. Typing filters by label.

// Field class string copied from Input/Select (owned by another change) so
// this component does not depend on their in-flight edits. Fixed heights
// (box-border) so the stroke counts inside 32/36/48 like Figma.
const comboboxVariants = cva(
  'w-full border bg-surface-container text-text-primary outline-none transition-colors ' +
    'placeholder:text-text-secondary hover:border-border-emphasis ' +
    'focus-visible:border-focus-ring ' +
    'aria-invalid:border-semantic-error aria-invalid:focus-visible:ring-2 aria-invalid:focus-visible:ring-focus-ring ' +
    'disabled:cursor-not-allowed disabled:border-border-subtle disabled:bg-interactive-disabled disabled:text-text-disabled disabled:placeholder:text-text-disabled disabled:hover:border-border-subtle',
  {
    variants: {
      size: {
        sm: 'h-32px rounded-sm pl-10px pr-32px text-text-xs leading-5',
        md: 'h-36px rounded-md pl-12px pr-32px text-sm',
        lg: 'h-48px rounded-md pl-16px pr-40px text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
)

export interface ComboboxOption {
  value: string
  label: string
  disabled?: boolean
}

export interface ComboboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange'>,
    VariantProps<typeof comboboxVariants> {
  options: ComboboxOption[]
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  /** Error is a prop (arbitrary validity has no CSS hook); also sets aria-invalid. */
  error?: boolean
  /** Start open — documents Figma's State=Open; not needed in product. */
  defaultOpen?: boolean
  emptyText?: string
  wrapperClassName?: string
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue = null,
      onValueChange,
      size,
      error,
      defaultOpen = false,
      emptyText = 'Sin resultados',
      placeholder = 'Buscar cuenta…',
      disabled,
      className,
      wrapperClassName,
      onFocus,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState<string | null>(defaultValue)
    const value = valueProp === undefined ? valueState : valueProp
    const selected = options.find((o) => o.value === value) ?? null
    const [open, setOpen] = useState(defaultOpen)
    // `query` is what the user typed; null means "show the selected label".
    const [query, setQuery] = useState<string | null>(defaultOpen && !defaultValue ? '' : null)
    const [active, setActive] = useState(0)
    const rootRef = useRef<HTMLDivElement>(null)
    const listId = useId()

    const filtered = useMemo(() => {
      const q = (query ?? '').trim().toLowerCase()
      return q ? options.filter((o) => o.label.toLowerCase().includes(q)) : options
    }, [options, query])
    const text = query ?? selected?.label ?? ''

    useEffect(() => {
      if (!open) return
      function onPointerDown(event: MouseEvent) {
        if (rootRef.current && !rootRef.current.contains(event.target as Node)) close()
      }
      document.addEventListener('mousedown', onPointerDown)
      return () => document.removeEventListener('mousedown', onPointerDown)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    function close() {
      setOpen(false)
      setQuery(null)
    }

    function pick(option: ComboboxOption) {
      if (option.disabled) return
      if (valueProp === undefined) setValueState(option.value)
      onValueChange?.(option.value)
      close()
    }

    function move(delta: number) {
      if (!filtered.length) return
      let next = active
      for (let i = 0; i < filtered.length; i++) {
        next = (next + delta + filtered.length) % filtered.length
        if (!filtered[next].disabled) break
      }
      setActive(next)
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      onKeyDown?.(e)
      if (e.defaultPrevented) return
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault()
          if (!open) {
            setOpen(true)
            setActive(Math.max(0, filtered.findIndex((o) => o.value === value)))
          } else move(e.key === 'ArrowDown' ? 1 : -1)
          break
        case 'Home':
        case 'End':
          if (open) {
            e.preventDefault()
            setActive(e.key === 'Home' ? 0 : filtered.length - 1)
          }
          break
        case 'Enter':
          if (open) {
            e.preventDefault()
            if (filtered[active]) pick(filtered[active])
          }
          break
        case 'Escape':
          if (open) {
            e.preventDefault()
            close()
          }
          break
        case 'Tab':
          close()
          break
      }
    }

    const activeId = open && filtered[active] ? `${listId}-opt-${active}` : undefined

    return (
      <div
        ref={rootRef}
        className={cn(
          'relative w-full',
          // Touch: extend the hit area to 48px without changing the visual.
          '[@media(pointer:coarse)]:before:absolute [@media(pointer:coarse)]:before:inset-x-0 [@media(pointer:coarse)]:before:top-1/2 [@media(pointer:coarse)]:before:h-48px [@media(pointer:coarse)]:before:-translate-y-1/2',
          wrapperClassName,
        )}
      >
        <input
          ref={ref}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-activedescendant={activeId}
          aria-invalid={error || undefined}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          value={text}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
            setOpen(true)
          }}
          onFocus={onFocus}
          onClick={() => {
            if (!open) {
              setOpen(true)
              setActive(Math.max(0, filtered.findIndex((o) => o.value === value)))
            }
          }}
          onKeyDown={handleKeyDown}
          className={cn(comboboxVariants({ size }), open && 'border-focus-ring', className)}
          {...props}
        />
        <ChevronDown
          className={cn(
            'pointer-events-none absolute right-12px top-1/2 size-4 -translate-y-1/2 transition-transform',
            size === 'lg' && 'right-16px',
            disabled ? 'text-text-disabled' : open ? 'rotate-180 text-text-secondary' : 'text-icon-muted',
          )}
          aria-hidden
        />
        {open ? (
          <Menu
            id={listId}
            role="listbox"
            // Keep focus in the input while the pointer works the list.
            onMouseDown={(e) => e.preventDefault()}
            className="absolute left-0 top-[calc(100%+6px)] z-[var(--z-index-dropdown)] w-full min-w-0"
          >
            {filtered.length ? (
              filtered.map((option, i) => (
                <div
                  key={option.value}
                  id={`${listId}-opt-${i}`}
                  role="option"
                  aria-selected={option.value === value}
                  aria-disabled={option.disabled || undefined}
                  onMouseEnter={() => !option.disabled && setActive(i)}
                  onClick={() => pick(option)}
                  className={cn(
                    // Menu Item row styling (copied: MenuItem is a button with role=menuitem).
                    'cursor-pointer rounded-sm px-12px py-6px text-sm text-text-primary',
                    i === active && 'bg-interactive-default',
                    option.value === value && 'font-medium',
                    option.disabled && 'pointer-events-none text-text-disabled',
                  )}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-12px py-6px text-sm text-text-secondary" role="presentation">
                {emptyText}
              </div>
            )}
          </Menu>
        ) : null}
      </div>
    )
  },
)
Combobox.displayName = 'Combobox'
