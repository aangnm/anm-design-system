import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Mirrors the Avatar component set (Core page): Size x Status. Status dot
// is sized proportionally per avatar size and cut out from the avatar edge
// via a border matching the surrounding surface — same technique as Figma
// (a 2px stroke bound to surface/page).

const avatarVariants = cva('relative inline-flex shrink-0 items-center justify-center rounded-full bg-surface-emphasis text-text-primary', {
  variants: {
    size: {
      sm: 'size-6 text-text-min',
      md: 'size-8 text-text-xxs',
      lg: 'size-10 text-sm',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

const dotSize: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'size-[9px]',
  md: 'size-[10px]',
  lg: 'size-[12px]',
}

const dotColor: Record<NonNullable<AvatarProps['status']>, string> = {
  none: '',
  online: 'bg-semantic-success',
  offline: 'bg-border-muted',
}

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  /** Initials or short label shown when there's no image. */
  initials?: string
  src?: string
  alt?: string
  status?: 'none' | 'online' | 'offline'
  className?: string
}

export function Avatar({ initials, src, alt, size = 'sm', status = 'none', className }: AvatarProps) {
  return (
    <span className={cn(avatarVariants({ size }), className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt ?? ''} className="size-full rounded-full object-cover" />
      ) : (
        <span aria-hidden={Boolean(alt)}>{initials}</span>
      )}
      {status !== 'none' ? (
        <span
          className={cn(
            'absolute right-0 bottom-0 rounded-full border-2 border-surface-page',
            dotSize[size ?? 'sm'],
            dotColor[status],
          )}
        />
      ) : null}
    </span>
  )
}
