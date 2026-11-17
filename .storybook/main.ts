import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  // Served next to the site, e.g. /llms.txt for agents and per-component Markdown in /components (written by scripts/build-docs.mjs).
  staticDirs: [{ from: '../public', to: '/' }],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
}

export default config
