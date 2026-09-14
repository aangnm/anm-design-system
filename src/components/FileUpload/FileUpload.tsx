import { useRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the File Upload component (Core page): a dashed dropzone for file
// input. Why (from Figma) — the dashed border is the whole affordance: it
// says drop target in a way a solid bordered field does not. The
// accepted-formats hint stays, since it prevents the most common upload
// error. States: Default / Dragging (border -> interactive/primary) /
// Disabled, per the component's description.

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  hint?: string
  onFilesSelected?: (files: FileList) => void
}

export function FileUpload({
  hint = 'PNG · JPG · XLSX — hasta 10 MB',
  onFilesSelected,
  disabled,
  className,
  accept,
  multiple,
  ...props
}: FileUploadProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFiles(files: FileList | null) {
    if (files && files.length) onFilesSelected?.(files)
  }

  return (
    <label
      className={cn(
        'flex w-[360px] cursor-pointer flex-col items-center justify-center gap-8px rounded-lg border border-dashed bg-surface-subtle px-24px py-28px text-center transition-colors',
        dragging ? 'border-interactive-primary' : 'border-border-default',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault()
        if (!disabled) setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        if (!disabled) handleFiles(e.dataTransfer.files)
      }}
    >
      <Upload className="size-24px text-text-secondary" aria-hidden />
      <p className="text-sm font-medium text-text-secondary">Arrastra archivos o haz clic</p>
      <p className="text-[13px] text-text-disabled">{hint}</p>
      <input
        ref={inputRef}
        type="file"
        disabled={disabled}
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
        className="sr-only"
        {...props}
      />
    </label>
  )
}
