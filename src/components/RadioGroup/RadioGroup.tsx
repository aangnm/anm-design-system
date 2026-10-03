import { useId, useState } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Radio } from '@/components/Radio'

// Mirrors the Radio Group component (Core page): a legend + optional helper
// text over a stack of Radio options. Why (from Figma) — Form Field labels
// one control; this labels a set, so it is a real <fieldset>/<legend> with
// the helper wired through aria-describedby. Options are the existing Radio
// (Value x State behaviour included); arrow keys are the browser's native
// radio-group behaviour.
// Hit area (from Figma) — each option row is 24 high; Radio's own row
// carries it. Pitch is 32 (24 row + 8 gap) to keep Figma's 20 + 12 rhythm.

export interface RadioGroupOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  legend: string
  helperText?: ReactNode
  options: RadioGroupOption[]
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
}

export function RadioGroup({
  legend,
  helperText,
  options,
  name,
  value: valueProp,
  defaultValue,
  onValueChange,
  disabled,
  className,
}: RadioGroupProps) {
  const autoId = useId()
  const groupName = name ?? autoId
  const [state, setState] = useState(defaultValue)
  const value = valueProp ?? state
  const helperId = `${autoId}-helper`

  return (
    <fieldset
      disabled={disabled}
      aria-describedby={helperText ? helperId : undefined}
      className={cn('m-0 flex min-w-0 flex-col border-0 p-0', className)}
    >
      <legend className="mb-10px p-0 text-sm font-medium text-text-primary">{legend}</legend>
      {helperText ? (
        <p id={helperId} className="mb-10px text-text-xs leading-5 text-text-secondary">
          {helperText}
        </p>
      ) : null}
      <div className="flex flex-col gap-8px">
        {options.map((option) => (
          <Radio
            key={option.value}
            id={`${autoId}-${option.value}`}
            name={groupName}
            value={option.value}
            label={option.label}
            disabled={disabled || option.disabled}
            checked={value === option.value}
            onChange={() => {
              if (valueProp === undefined) setState(option.value)
              onValueChange?.(option.value)
            }}
            className="min-h-24px"
          />
        ))}
      </div>
    </fieldset>
  )
}
