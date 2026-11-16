import type { Preview } from '@storybook/react-vite'
import React from 'react'
import '../src/styles.css'
import { DocsPage } from './DocsPage'
import { anm } from './theme'

// Theme and density are applied *before* the story renders, not in an effect
// after it. Applying them after paint made every element with transition-colors
// animate from the previous theme's colours, and the accessibility panel, which
// runs axe straight away, flagged that half-finished state as contrast
// failures (dark-theme text on a light surface). Transitions are also paused
// for the frame in which the theme changes, so a toolbar switch is instant.
function applyGlobals(theme: string, density: string) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  if (root.dataset.theme !== theme || root.dataset.density !== density) {
    root.classList.add('sb-theme-switching')
    root.dataset.theme = theme
    // Density (Figma v0.96) is independent of theme: Compact shrinks control
    // heights, table rows and container padding wherever it is set.
    root.dataset.density = density
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('sb-theme-switching')))
  }
  // The canvas follows the theme too, so a short story shows no strip of the
  // other theme under it.
  document.body.style.backgroundColor = 'var(--surface-page)'
}

const withTheme = (Story: React.ComponentType, context: { globals: { theme?: string; density?: string } }) => {
  applyGlobals(context.globals.theme ?? 'dark', context.globals.density ?? 'comfortable')
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
    // `npm test` runs every story once per theme (vite.config.ts sets
    // SB_THEME per test project), so contrast is checked in all three.
    theme: (import.meta as { env?: Record<string, string> }).env?.VITE_SB_THEME || 'dark',
    density: 'comfortable',
  },
  decorators: [withTheme],
}

export default preview
