#!/usr/bin/env node
// Writes tokens/figma-export.json from a raw pull (scripts/figma/pull-tokens.js)
// in the committed layout: one variable, text style or effect style per line,
// so every token change is a one-line diff.
//
//   node scripts/format-export.mjs pulled.json            # write
//   node scripts/format-export.mjs pulled.json --check    # exit 1 if it differs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const [src, flag] = process.argv.slice(2)
if (!src) { console.error('usage: format-export.mjs <pulled.json> [--check]'); process.exit(2) }
const raw = JSON.parse(readFileSync(src, 'utf-8'))
const j = (v) => JSON.stringify(v)
  .replace(/":/g, '": ').replace(/,"/g, ', "').replace(/,\{/g, ', {')

const out = []
out.push('{')
out.push(`  "exportedAt": ${JSON.stringify(raw.exportedAt)},`)
out.push(`  "figmaFileKey": ${JSON.stringify(raw.figmaFileKey)},`)
out.push('  "collections": {')
const names = Object.keys(raw.collections)
names.forEach((name, ci) => {
  const c = raw.collections[name]
  out.push(`    ${JSON.stringify(name)}: {`)
  out.push(`      "modes": ${JSON.stringify(c.modes).replace(/","/g, '", "')},`)
  out.push('      "variables": [')
  c.variables.forEach((v, i) => out.push(`        ${j(v)}${i < c.variables.length - 1 ? ',' : ''}`))
  out.push('      ]')
  out.push(`    }${ci < names.length - 1 ? ',' : ''}`)
})
out.push('  },')
out.push('  "textStyles": [')
raw.textStyles.forEach((t, i) => out.push(`    ${j(t)}${i < raw.textStyles.length - 1 ? ',' : ''}`))
out.push('  ],')
out.push('  "effectStyles": [')
raw.effectStyles.forEach((e, i) => out.push(`    ${j(e)}${i < raw.effectStyles.length - 1 ? ',' : ''}`))
out.push('  ]')
out.push('}')
const text = out.join('\n') + '\n'

const target = join(root, 'tokens/figma-export.json')
if (flag === '--check') {
  // Compare everything except the timestamp.
  const strip = (s) => s.replace(/"exportedAt": "[^"]*"/, '')
  const same = strip(readFileSync(target, 'utf-8')) === strip(text)
  console.log(same ? 'tokens/figma-export.json matches the pull' : 'tokens/figma-export.json differs from the pull')
  process.exit(same ? 0 : 1)
}
writeFileSync(target, text)
console.log('Wrote tokens/figma-export.json')
