import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// The design-token type scale is emitted as `text-text-xxs / -xs / -sm / ...`
// and `text-caption` (see src/tokens/theme.css). tailwind-merge does not know
// them as font sizes, treats them as text *colours*, and so silently drops a
// colour class (or the size) that sits next to one. Teach it the token names.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['text-xxs', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'caption'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
