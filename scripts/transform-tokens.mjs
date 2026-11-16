#!/usr/bin/env node
// Transforms tokens/figma-export.json (a raw pull from the anm Design System
// Figma file's variable collections) into the CSS + TS the package actually ships.
//
// Re-run after every Figma token pull:
//   node scripts/transform-tokens.mjs
//
// This script is deterministic and has no external dependencies — it only reads
// tokens/figma-export.json and writes src/tokens/*. It never talks to Figma itself;
// refreshing tokens/figma-export.json is a separate step (done from a Claude Code
// session with Figma access, see README).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const raw = JSON.parse(readFileSync(join(root, 'tokens/figma-export.json'), 'utf-8'))
const { collections, effectStyles = [], textStyles = [] } = raw

/** "surface/page" -> "surface-page" (valid CSS custom property segment) */
function cssName(name) {
  return name.replace(/\//g, '-')
}

/** "surface/page" -> "surfacePage" (valid JS identifier segment) */
function camelSegments(name) {
  return name.split('/').map((seg, i) => {
    const words = seg.split('-')
    return words
      .map((w, j) => (i === 0 && j === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
      .join('')
  })
}

const UNITLESS_FLOATS = new Set(['grid/columns'])
const MS_FLOATS_PREFIX = 'duration/'

const FONT_WEIGHT_NUMBERS = {
  'Extra Light': 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  'Semi Bold': 600,
  Bold: 700,
  'Extra Bold': 800,
  Black: 900,
}

function cssValue(name, v, type) {
  if (type !== 'FLOAT') return String(v)
  if (UNITLESS_FLOATS.has(name)) return `${v}`
  if (name.startsWith(MS_FLOATS_PREFIX)) return `${v}ms`
  // opacity/* is stored in Figma as a percent (70 = 70%, a hard-won gotcha —
  // binding the raw 70 renders at 0.7% everywhere). z-index/* has no Figma
  // property at all (scopes: []) — it's a code-only contract, so it stays a
  // bare integer for arbitrary `z-[var(--z-index-modal)]` usage.
  if (name.startsWith('opacity/')) return `${v / 100}`
  if (name.startsWith('z-index/')) return `${v}`
  return `${v}px`
}

// ---------------------------------------------------------------------------
// 1. tokens.css — raw custom properties. Dark is the default (:root); Light
//    overrides via [data-theme="light"]. Non-themed collections (Dimension,
//    Motion, Layout) are mode-less and just live on :root.
// ---------------------------------------------------------------------------
const themes = collections.Themes
const darkLines = []
const lightLines = []
const hcLines = []
const HC_MODE = 'Light · High contrast'
for (const v of themes.variables) {
  const name = `--${cssName(v.name)}`
  darkLines.push(`  ${name}: ${v.valuesByMode['Dark Mode']};`)
  lightLines.push(`  ${name}: ${v.valuesByMode['Light Mode']};`)
  if (v.valuesByMode[HC_MODE] !== undefined) hcLines.push(`  ${name}: ${v.valuesByMode[HC_MODE]};`)
}
// High contrast (Figma's "Light · High contrast" Themes mode) also thickens
// borders and the focus ring: Dimension's "High contrast" mode. Only the
// values that differ from the default are emitted.
const dimension = collections.Dimension
if (dimension?.modes.includes('High contrast')) {
  for (const v of dimension.variables) {
    const base = v.valuesByMode[dimension.modes[0]]
    const hc = v.valuesByMode['High contrast']
    if (hc === undefined || hc === base) continue
    hcLines.push(`  --${cssName(v.name)}: ${cssValue(v.name, hc, v.type)};`)
  }
}

// radius/, spacing/, and breakpoint/ are deliberately EXCLUDED here — their
// Figma names collide exactly with Tailwind v4's own theme namespaces
// (--radius-*, --spacing-*, --breakpoint-*), so they're defined exactly once,
// directly in theme.css's @theme block, instead of here-and-re-exported.
// Defining them twice under the same CSS custom property name would make the
// @theme copy a self-reference (`--radius-xs: var(--radius-xs)`) that resolves
// to nothing.
const NAMESPACE_COLLIDES_WITH_TAILWIND = (name) =>
  name.startsWith('radius/') || name.startsWith('spacing/') || name.startsWith('breakpoint/')

const flatLines = []
for (const colName of ['Dimension', 'Motion', 'Layout', 'Effects']) {
  const col = collections[colName]
  if (!col) continue
  const mode = col.modes[0]
  for (const v of col.variables) {
    if (NAMESPACE_COLLIDES_WITH_TAILWIND(v.name)) continue
    const name = `--${cssName(v.name)}`
    const val = cssValue(v.name, v.valuesByMode[mode], v.type)
    flatLines.push(`  ${name}: ${val};`)
  }
}

// Icon: the one collection whose modes are icon SIZES (24/20/16/12), not
// themes. Each size gets its own custom property — `--icon-stroke-width-16` —
// because stroke width scales with size (2 / 1.67 / 1.33 / 1) so small icons
// keep the same visual weight. Unitless on purpose: it feeds SVG strokeWidth.
if (collections.Icon) {
  for (const v of collections.Icon.variables) {
    for (const mode of collections.Icon.modes) {
      flatLines.push(`  --${cssName(v.name)}-${mode}: ${v.valuesByMode[mode]};`)
    }
  }
}

// Density (Figma v0.96): Comfortable / Compact control heights and table
// padding. Its own collection, so it combines with any theme. Comfortable is
// the :root default; [data-density="compact"] on any ancestor overrides it.
const densityLines = []
const compactLines = []
if (collections.Density) {
  const [comfortable, compact] = collections.Density.modes
  for (const v of collections.Density.variables) {
    densityLines.push(`  --${cssName(v.name)}: ${cssValue(v.name, v.valuesByMode[comfortable], v.type)};`)
    compactLines.push(`  --${cssName(v.name)}: ${cssValue(v.name, v.valuesByMode[compact], v.type)};`)
  }
}

// Typography: one mode ("Default") since Figma v0.94 — the old Normal/Large
// modes were never wired to anything and were removed.
// font/weight/* values are Inter style names in Figma ("Semi Bold") — mapped
// to numeric CSS font-weight here since the style name itself isn't valid CSS.
const typography = collections.Typography
const typeLines = []
for (const v of typography.variables) {
  const name = `--${cssName(v.name)}`
  let val
  if (v.name.startsWith('font/weight/')) {
    val = FONT_WEIGHT_NUMBERS[v.valuesByMode.Default] ?? 400
  } else if (v.type === 'FLOAT') {
    val = `${v.valuesByMode.Default}px`
  } else {
    val = v.valuesByMode.Default
  }
  typeLines.push(`  ${name}: ${val};`)
}

const tokensCss = `/**
 * GENERATED FILE — do not edit by hand.
 * Source: tokens/figma-export.json (exported ${raw.exportedAt})
 * Regenerate: node scripts/transform-tokens.mjs
 */

:root {
${darkLines.join('\n')}

${flatLines.join('\n')}

${densityLines.join('\n')}

${typeLines.join('\n')}
}

[data-density='compact'] {
${compactLines.join('\n')}
}

[data-theme='light'] {
${lightLines.join('\n')}
}

[data-theme='high-contrast'] {
${hcLines.join('\n')}
}
`

// ---------------------------------------------------------------------------
// 2. theme.css — Tailwind v4 @theme block, re-exporting the raw vars under
//    Tailwind's recognized namespaces (--color-*, --radius-*, --spacing-*,
//    --text-*) so utilities like bg-surface-page / rounded-md / p-16 exist.
// ---------------------------------------------------------------------------
// Colors and font sizes: re-export as var() references into tokens.css, where
// the actual (theme-switchable, for colors) values live.
const colorTheme = themes.variables.map((v) => `  --color-${cssName(v.name)}: var(--${cssName(v.name)});`)

const fontSizeTheme = typography.variables
  .filter((v) => v.name.startsWith('font/size/'))
  .map((v) => `  --text-${cssName(v.name).replace('font-size-', '')}: var(--${cssName(v.name)});`)

// Type roles (Figma v0.94): one Tailwind text utility per text-style role,
// carrying size AND line height — `text-body-default`, `text-title-large`,
// `text-label-default` … — so a component names the role it plays instead of
// a raw size. Weight stays a separate class (font-medium), matching the
// Figma styles, which are role/weight (Body Default/Medium).
const roleTheme = textStyles.flatMap((t) => {
  const role = cssName(t.role.toLowerCase().replace(/\s+/g, '-'))
  return [
    `  --text-${role}: var(--${cssName(t.fontSize)});`,
    `  --text-${role}--line-height: var(--${cssName(t.lineHeight)});`,
  ]
})

// Radius, spacing, breakpoint: defined ONCE here with their real value — see
// the note next to NAMESPACE_COLLIDES_WITH_TAILWIND above for why these don't
// also exist in tokens.css.
const radiusTheme = collections.Dimension.variables
  .filter((v) => v.name.startsWith('radius/'))
  .map((v) => `  --radius-${cssName(v.name).replace('radius-', '')}: ${cssValue(v.name, v.valuesByMode.Value, v.type)};`)

// Spacing keys get a "px" suffix (spacing-8px, not spacing-8): Tailwind's own
// bare numeric spacing scale is a MULTIPLIER (h-8 = 8 * 0.25rem = 32px), and
// our Figma scale's numbers are literal pixel values (spacing/8 = 8px). Since
// they share the same key namespace, defining --spacing-8 would silently
// hijack Tailwind's own h-8/p-8/gap-8/etc. to mean something else everywhere
// in the codebase — including by us, in this repo's own first component (see
// git history). The suffix makes the two scales impossible to confuse:
// h-8 is still Tailwind's 32px; h-8px is unambiguously our 8px token.
const spacingTheme = collections.Dimension.variables
  .filter((v) => v.name.startsWith('spacing/'))
  .map((v) => `  --spacing-${cssName(v.name).replace('spacing-', '')}px: ${cssValue(v.name, v.valuesByMode.Value, v.type)};`)

// Density keys land in the spacing namespace so every sizing utility gets
// them: h-control-md, size-control-sm, min-h-control-lg, py-table-cell-y,
// p-container-sm (chart cards, panels), p-container-md (Card, Stat).
// Named keys, so no collision with Tailwind's numeric scale.
const densityTheme = (collections.Density?.variables ?? []).map((v) => {
  const key = v.name.startsWith('control/height/')
    ? `control-${v.name.split('/').pop()}`
    : v.name.startsWith('container/padding/')
      ? `container-${v.name.split('/').pop()}`
      : 'table-cell-y'
  return `  --spacing-${key}: var(--${cssName(v.name)});`
})

const breakpointTheme = collections.Layout.variables
  .filter((v) => v.name.startsWith('breakpoint/'))
  .map((v) => `  --breakpoint-${cssName(v.name).replace('breakpoint-', '')}: ${cssValue(v.name, v.valuesByMode.Value, v.type)};`)

// Elevation comes from Figma EFFECT STYLES, not variables — Figma variables
// can't hold effects at all, so these are exported separately from the
// collections above. They land in Tailwind's own --shadow-* namespace, which
// intentionally OVERRIDES Tailwind's default shadow scale: unlike the spacing
// collision, "shadow-lg" means the same concept in both systems, so replacing
// the values with ours is the correct outcome rather than a name clash.
function shadowCss(effects) {
  return effects
    .filter((e) => e.type === 'DROP_SHADOW')
    .map((e) => {
      // Figma v0.95: effect colours are bound to shadow/key and shadow/ambient
      // (Themes), much stronger in dark — so the shadow reads the theme var.
      if (e.colorVar) return `${e.offsetX}px ${e.offsetY}px ${e.radius}px ${e.spread}px var(--${cssName(e.colorVar)})`
      const { r, g, b, a } = e.color
      const rgb = [r, g, b].map((c) => Math.round(c * 255)).join(' ')
      return `${e.offsetX}px ${e.offsetY}px ${e.radius}px ${e.spread}px rgb(${rgb} / ${a})`
    })
    .join(', ')
}

const shadowTheme = effectStyles.map(
  (s) => `  --shadow-${s.name.replace('elevation/shadow-', '')}: ${shadowCss(s.effects)};`,
)

// opacity/* gets a real Tailwind theme entry (powers e.g. `opacity-loading`),
// same value already re-exported as a raw var in tokens.css above.
// z-index/* deliberately does NOT — it has no Figma property (scopes: []),
// so it's a code-only contract consumed via `z-[var(--z-index-modal)]`,
// never a `z-modal` utility.
const opacityTheme = (collections.Effects?.variables ?? [])
  .filter((v) => v.name.startsWith('opacity/'))
  .map((v) => `  --opacity-${cssName(v.name).replace('opacity-', '')}: var(--${cssName(v.name)});`)

const themeCss = `/**
 * GENERATED FILE — do not edit by hand.
 * Source: tokens/figma-export.json (exported ${raw.exportedAt})
 * Regenerate: node scripts/transform-tokens.mjs
 */

@theme {
${colorTheme.join('\n')}

${radiusTheme.join('\n')}

${spacingTheme.join('\n')}

${densityTheme.join('\n')}

${fontSizeTheme.join('\n')}

${roleTheme.join('\n')}

${breakpointTheme.join('\n')}

${shadowTheme.join('\n')}

${opacityTheme.join('\n')}
}
`

// ---------------------------------------------------------------------------
// 3. index.ts — typed constants for JS-driven styling (chart color arrays,
//    inline styles, etc.) where a Tailwind class isn't the right tool.
// ---------------------------------------------------------------------------
function buildNestedObject(names, varSuffix = '') {
  const root = {}
  for (const name of names) {
    const parts = camelSegments(name)
    let node = root
    for (let i = 0; i < parts.length - 1; i++) {
      node[parts[i]] ??= {}
      node = node[parts[i]]
    }
    node[parts[parts.length - 1]] = `var(--${cssName(name)}${varSuffix})`
  }
  return root
}

function objectToTs(obj, indent = 2) {
  const pad = ' '.repeat(indent)
  const entries = Object.entries(obj).map(([k, v]) => {
    const key = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : `'${k}'`
    if (typeof v === 'string') return `${pad}${key}: '${v}',`
    return `${pad}${key}: {\n${objectToTs(v, indent + 2)}\n${pad}},`
  })
  return entries.join('\n')
}

const colorNames = themes.variables.map((v) => v.name)
const radiusNames = collections.Dimension.variables.filter((v) => v.name.startsWith('radius/')).map((v) => v.name)
const spacingNames = collections.Dimension.variables.filter((v) => v.name.startsWith('spacing/')).map((v) => v.name)
const durationNames = collections.Motion.variables.filter((v) => v.name.startsWith('duration/')).map((v) => v.name)
const easingNames = collections.Motion.variables.filter((v) => v.name.startsWith('easing/')).map((v) => v.name)
const breakpointNames = collections.Layout.variables.filter((v) => v.name.startsWith('breakpoint/')).map((v) => v.name)

const indexTs = `/**
 * GENERATED FILE — do not edit by hand.
 * Source: tokens/figma-export.json (exported ${raw.exportedAt})
 * Regenerate: node scripts/transform-tokens.mjs
 *
 * Every value is a CSS var() reference, not a raw value — these read the
 * current theme at runtime (dark by default, [data-theme="light"] override),
 * same as the generated Tailwind utilities.
 */

export const color = {
${objectToTs(buildNestedObject(colorNames))}
} as const

export const radius = {
${objectToTs(buildNestedObject(radiusNames))}
} as const

export const spacing = {
${objectToTs(buildNestedObject(spacingNames, 'px'))}
} as const

export const duration = {
${objectToTs(buildNestedObject(durationNames))}
} as const

export const easing = {
${objectToTs(buildNestedObject(easingNames))}
} as const

export const breakpoint = {
${objectToTs(buildNestedObject(breakpointNames))}
} as const
`

mkdirSync(join(root, 'src/tokens'), { recursive: true })
writeFileSync(join(root, 'src/tokens/tokens.css'), tokensCss)
writeFileSync(join(root, 'src/tokens/theme.css'), themeCss)
writeFileSync(join(root, 'src/tokens/index.ts'), indexTs)

console.log('Wrote src/tokens/tokens.css, src/tokens/theme.css, src/tokens/index.ts')
