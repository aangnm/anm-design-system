/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'

const root = import.meta.dirname

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ['src'],
      exclude: ['src/**/*.stories.tsx'],
      bundleTypes: false,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(root, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(root, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
  // `npm test`: every Storybook story runs as a test in headless Chromium,
  // with an axe accessibility check (a11y.test = 'error' in .storybook/preview),
  // in each of the three themes.
  test: {
    // One project per theme, so every check (render, interactions, axe incl.
    // colour contrast) runs in dark, light and high contrast.
    projects: (['dark', 'light', 'high-contrast'] as const).map((theme) => ({
      extends: true,
      define: { 'import.meta.env.VITE_SB_THEME': JSON.stringify(theme) },
      plugins: [storybookTest({ configDir: resolve(root, '.storybook') })],
      test: {
        name: `storybook-${theme}`,
        // Three themes run in parallel; give a slow machine room.
        testTimeout: 30000,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{ browser: 'chromium' as const }],
        },
      },
    })),
  },
})
