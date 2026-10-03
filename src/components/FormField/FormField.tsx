import { useId } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/Input'

// Mirrors the Form Field molecule (Core page): Label + Input (MD, full
// width) + helper text, State=Default/Error. Composes the atomic Input
// rather than reimplementing it — same relationship as in Figma, where
// Form Field's Input child is an instance, not its own geometry.

export interface FormFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string
  /** Helper text shown below the field — becomes the error message when `error` is set. */
  helperText?: string
  error?: boolean
  leadingIcon?: ReactNode
}

export function FormField({ label, helperText, error, id, leadingIcon, className, ...props }: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  return (
    <div className={cn('flex flex-col gap-6px', className)}>
      <label htmlFor={inputId} className="text-text-xxs font-medium leading-4 text-text-primary">
        {label}
      </label>
      <Input id={inputId} size="md" error={error} leadingIcon={leadingIcon} {...props} />
      {helperText ? (
        <p className={cn('text-caption leading-4', error ? 'text-text-error' : 'text-text-secondary')}>{helperText}</p>
      ) : null}
    </div>
  )
}
