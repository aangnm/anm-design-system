import { LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mirrors the Spinner component (Core page): Size=SM/MD/LG (16/24/32).
// Why (from Figma) — drawn as a static 270° arc; the rotation lives in code
// using the motion tokens, since the component is the shape, not the
// animation. Reuses lucide's LoaderCircle, the same glyph Button's Loading
// state already animates, so the two never drift.

export type SpinnerSize = 'sm' | 'md' | 'lg'

const sizes: Record<SpinnerSize, string> = {
  sm: 'size-4',
  md: 'size-6',
  lg: 'size-8',
}

export interface SpinnerProps {
  size?: SpinnerSize
  className?: string
}

export function Spinner({ size = 'sm', className }: SpinnerProps) {
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      className={cn('animate-spin text-interactive-primary', sizes[size], className)}
    />
  )
}
