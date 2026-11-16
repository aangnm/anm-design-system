import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Tag } from '@/components/Tag'
import { Checkbox } from '@/components/Checkbox'
import { Menu } from '@/components/Menu'

// Mirrors the Multi-select component set (Core page): Size x State.
// Why (from Figma) — chips are real Tag instances with Dismissible enabled, not
// a bespoke chip, so a removable filter chip means the same thing wherever it
// appears. Size — SM 32 / MD 36 / LG 48 high, 260 / 280 / 300 wide; chips stay
// 24 high at every Size.
// States — Hover / Focus are :hover / :focus-visible; Disabled and Error are
// props; Focus + Error = error border plus an outer 2px ring. Open is the
// field with a Focus border and the Menu panel below, each option a Checkbox
// row checked when its chip is in the field. Unlike Select the list stays open
// while picking (several values are chosen); it closes on click-outside/Escape,
// as in DropdownMenu. Vertical padding is the Figma value minus the 1px border
// (Figma strokes sit inside the frame, CSS borders add to the content box).

const fieldVariants = cva(
  'flex w-full cursor-pointer flex-wrap items-center gap-6px border bg-surface-container text-text-primary outline-none transition-colors ' +
    'focus-visible:focus-ring aria-expanded:border-focus-ring ' +
    'aria-disabled:cursor-not-allowed aria-disabled:border-border-subtle aria-disabled:bg-interactive-disabled aria-disabled:text-text-disabled',
  {
    variants: {
      size: {
        sm: 'min-h-control-sm rounded-sm px-8px py-[3px] text-text-xs leading-5',
        md: 'min-h-control-md rounded-md px-8px py-[5px] text-sm',
        lg: 'min-h-control-lg rounded-md px-12px py-[11px] text-base',
      },
      error: {
        true: 'border-semantic-error focus-visible:border-semantic-error aria-expanded:border-semantic-error',
        false: 'border-border-default hover:border-border-emphasis aria-disabled:hover:border-border-subtle',
      },
    },
    defaultVariants: { size: 'md', error: false },
  },
)

const widths = { sm: 'w-full max-w-[260px]', md: 'w-full max-w-[280px]', lg: 'w-full max-w-[300px]' } as const

export interface MultiSelectOption {
  label: string
  value: string
}

export interface MultiSelectProps extends VariantProps<typeof fieldVariants> {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  /** Accessible name when no <label> points at the field; defaults to the placeholder. */
  'aria-label'?: string
  /** Maps to Figma's State=Disabled. */
  disabled?: boolean
  /** Maps to Figma's State=Open — the initial open state; the component tracks it afterwards. */
  defaultOpen?: boolean
  className?: string
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  size,
  error,
  disabled = false,
  defaultOpen = false,
  className,
  'aria-label': ariaLabel,
}: MultiSelectProps) {
  const [open, setOpen] = useState(defaultOpen && !disabled)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuId = useId()
  const selected = options.filter((option) => value.includes(option.value))

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

  function toggle(optionValue: string) {
    onChange(value.includes(optionValue) ? value.filter((v) => v !== optionValue) : [...value, optionValue])
  }

  return (
    <div ref={rootRef} className={cn('relative', widths[size ?? 'md'], className)}>
      <div
        role="combobox"
        aria-label={ariaLabel ?? placeholder}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-disabled={disabled || undefined}
        aria-invalid={error || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          if (!disabled) setOpen((v) => !v)
        }}
        onKeyDown={(e) => {
          if (disabled) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((v) => !v)
          }
        }}
        className={fieldVariants({ size, error })}
      >
        {selected.length ? (
          selected.map((option) => (
            <Tag
              key={option.value}
              color="neutral"
              dismissible
              onDismiss={(e) => {
                e.stopPropagation()
                if (!disabled) toggle(option.value)
              }}
            >
              {option.label}
            </Tag>
          ))
        ) : (
          <span className={cn('flex-1', disabled ? 'text-text-disabled' : 'text-text-secondary')}>{placeholder}</span>
        )}
        <ChevronDown
          className={cn(
            'ml-auto size-4 shrink-0 transition-transform',
            disabled ? 'text-text-disabled' : 'text-icon-muted',
            open && 'rotate-180',
          )}
        />
      </div>

      {open ? (
        <Menu
          id={menuId}
          role="group"
          aria-label="Options"
          className="absolute left-0 top-[calc(100%+6px)] z-[var(--z-index-dropdown)] w-full min-w-0"
        >
          {options.map((option) => (
            <Checkbox
              key={option.value}
              label={option.label}
              checked={value.includes(option.value)}
              onChange={() => toggle(option.value)}
              className="w-full rounded-sm px-12px py-6px text-sm hover:bg-interactive-default"
            />
          ))}
        </Menu>
      ) : null}
    </div>
  )
}
