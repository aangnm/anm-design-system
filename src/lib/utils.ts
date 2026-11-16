import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// The design-token type scale is emitted as `text-text-xxs / -xs / -sm / ...`
// and `text-caption` (see src/tokens/theme.css). tailwind-merge does not know
// them as font sizes, treats them as text *colours*, and so silently drops a
// colour class (or the size) that sits next to one. Teach it the token names
// and the type-role classes.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'text-xxs', 'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'caption',
            // Type roles (Figma v0.94), size + line height in one class.
            'display-2xl', 'display-xl', 'headline-large', 'headline-medium', 'headline-small',
            'title-large', 'title-default', 'title-small', 'body-large', 'body-default', 'body-small',
            'label-large', 'label-default',
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
