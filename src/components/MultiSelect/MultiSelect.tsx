import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tag } from '@/components/Tag'
import { Menu, MenuItem } from '@/components/Menu'

// Mirrors the Multi-select component (Core page): a select that holds
// multiple values as removable chips, opening the same Menu panel as
// Dropdown Menu. Why (from Figma) — chips are real Tag instances with
// Dismissible enabled, not a bespoke chip, so a removable filter chip means
// the same thing wherever it appears. Click-outside/Escape dismissal mirrors
// DropdownMenu, since Figma's two static frames (closed field / open panel)
// imply the same open-state behaviour.

export interface MultiSelectOption {
  label: string
  value: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({ options, value, onChange, placeholder = 'Seleccionar…', className }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
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
    <div ref={rootRef} className={cn('relative w-[280px]', className)}>
      <div
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen((v) => !v)
          }
        }}
        className="flex min-h-36px w-full cursor-pointer flex-wrap items-center gap-6px rounded-md border border-border-default bg-surface-subtle px-8px py-6px"
      >
        {selected.length ? (
          selected.map((option) => (
            <Tag
              key={option.value}
              color="neutral"
              dismissible
              onDismiss={(e) => {
                e.stopPropagation()
                toggle(option.value)
              }}
            >
              {option.label}
            </Tag>
          ))
        ) : (
          <span className="flex-1 text-sm text-text-secondary">{placeholder}</span>
        )}
        <ChevronDown className={cn('ml-auto size-4 shrink-0 text-icon-muted transition-transform', open && 'rotate-180')} />
      </div>

      {open ? (
        <Menu id={menuId} className="absolute left-0 top-[calc(100%+8px)] z-50 w-full min-w-0">
          {options.map((option) => (
            <MenuItem key={option.value} role="menuitemcheckbox" aria-checked={value.includes(option.value)} onClick={() => toggle(option.value)}>
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </div>
  )
}
