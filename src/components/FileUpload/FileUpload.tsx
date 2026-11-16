import { useRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'
import { Upload } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the File Upload component (Core page): a dashed dropzone for file
// input. Why (from Figma) — the dashed border is the whole affordance: it
// says drop target in a way a solid bordered field does not. The
// accepted-formats hint stays, since it prevents the most common upload
// error. States: Default / Dragging (border -> interactive/primary) /
// Disabled, per the component's description. The whole drop zone is the
// pointer target (well above 24x24); keyboard focus draws the 2px focus ring.

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  hint?: string
  onFilesSelected?: (files: FileList) => void
}

export function FileUpload({
  hint = 'PNG · JPG · XLSX — up to 10 MB',
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
        'flex w-full max-w-[360px] cursor-pointer flex-col items-center justify-center gap-8px rounded-lg border border-dashed bg-surface-container px-24px py-28px text-center transition-colors has-[:focus-visible]:focus-ring',
        dragging ? 'border-interactive-primary' : 'border-border-default',
        disabled && 'cursor-not-allowed border-border-subtle bg-interactive-disabled opacity-60',
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
      <Upload className="size-24px text-icon-muted" aria-hidden />
      <p className="text-sm font-medium leading-5 text-text-secondary">Arrastra archivos o haz clic</p>
      <p className="text-text-xs leading-5 text-text-secondary">{hint}</p>
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
