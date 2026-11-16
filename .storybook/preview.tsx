import type { Preview } from '@storybook/react-vite'
import React, { useEffect } from 'react'
import '../src/styles.css'
import { DocsPage } from './DocsPage'
import { anm } from './theme'

const withTheme = (Story: React.ComponentType, context: { globals: { theme?: string; density?: string } }) => {
  const theme = context.globals.theme ?? 'dark'
  const density = context.globals.density ?? 'comfortable'
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    // Density (Figma v0.96) is independent of theme: Compact shrinks control
    // heights and table rows wherever data-density="compact" is set.
    document.documentElement.setAttribute('data-density', density)
    // The canvas itself follows the theme too, so stories shorter than the
    // viewport do not show a dark strip under a light story (and vice versa).
    document.body.style.backgroundColor = 'var(--surface-page)'
  }, [theme, density])
  return (
    <div className="bg-surface-page p-8 min-h-40">
      <Story />
    </div>
  )
}

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    options: {
      storySort: {
        order: ['Introduction', 'Start here', 'Core', 'Navigation', 'Data Display', 'Feedback & Overlays', 'Product Patterns', 'Templates'],
      },
    },
    // Docs pages carry the Figma design notes under the props table.
    // Docs pages wear the same anm chrome as the rest of Storybook (dark),
    // instead of Storybook's default light docs around dark stories.
    docs: { page: DocsPage, theme: anm },
    // Every story runs as a test (npm test, and in CI) with an axe check;
    // an accessibility violation fails the run.
    a11y: { test: 'error' },
  },
  globalTypes: {
    theme: {
      description: 'Dark / light / high contrast',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'dark', title: 'Dark' },
          { value: 'light', title: 'Light' },
          { value: 'high-contrast', title: 'High contrast' },
        ],
        showName: true,
      },
    },
    density: {
      description: 'Comfortable / compact density',
      toolbar: {
        icon: 'component',
        items: [
          { value: 'comfortable', title: 'Comfortable' },
          { value: 'compact', title: 'Compact' },
        ],
        showName: true,
      },
    },
  },
  initialGlobals: {
    theme: 'dark',
    density: 'comfortable',
  },
  decorators: [withTheme],
}

export default preview
