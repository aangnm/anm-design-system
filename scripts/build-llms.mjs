#!/usr/bin/env node
// Writes public/llms.txt: one plain-text file an agent can fetch to learn the
// whole system — setup, rules, and every exported component with its Figma
// design notes. Storybook serves public/ at its root, so the hosted site has
// it at /llms.txt. Runs before every Storybook build; deterministic.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const notes = JSON.parse(readFileSync(join(root, 'src/docs/figma-notes.json'), 'utf-8')).notes
const startHere = readFileSync(join(root, 'src/docs/StartHere.mdx'), 'utf-8')
  .replace(/^import \{ Meta \} from .*\n/m, '')
  .replace(/<Meta [^>]*\/>\n/, '')
  .trim()

const byPage = {}
for (const [react, n] of Object.entries(notes)) (byPage[n.page] ||= []).push([react, n])

const lines = [
  '# anm design system',
  '',
  '> A design system for building products in Figma or in code, by hand or with AI agents, with a dedicated set for analytics dashboards. Package: @anm/design-system. Figma is the source of truth; each component below carries its Figma design notes.',
  '',
  startHere.replace(/^# Start here\n+/, ''),
  '',
  '## Components',
  '',
]
for (const page of Object.keys(byPage)) {
  lines.push(`### ${page}`, '')
  for (const [react, n] of byPage[page].sort((a, b) => a[0].localeCompare(b[0]))) {
    lines.push(`#### ${react} (Figma: ${n.figma})`, '', `import { ${react} } from '@anm/design-system'`, '', n.description.trim(), '')
  }
}
mkdirSync(join(root, 'public'), { recursive: true })
writeFileSync(join(root, 'public/llms.txt'), lines.join('\n') + '\n')
console.log(`Wrote public/llms.txt (${Object.keys(notes).length} components)`)
