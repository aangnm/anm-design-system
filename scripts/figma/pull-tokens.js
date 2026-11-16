// figma/pull-tokens.js — read-only token pull from the anm Design System
// Figma file (fileKey OSexn3GQ7oIOo7X2sGVlSb).
//
// Run it from a Claude Code session with the Figma plugin MCP: pass this
// file's contents as the `code` of one `use_figma` call. It never writes to
// the file. It returns the whole export object; save it to a file and run
//   node scripts/format-export.mjs <pulled.json>
// which writes tokens/figma-export.json in its one-variable-per-line layout.
// Then `npm run tokens:transform`.
//
// What it pulls:
// - every local variable collection except Primitives, each variable
//   resolved through its alias chain to a final value per mode (Primitives
//   are an implementation detail of Figma; code only needs final values);
// - text styles as roles: role name, bound font-size and line-height variables;
// - effect styles: every shadow, with `colorVar` when its colour is bound.

const SKIP = ['Primitives']
const cols = await figma.variables.getLocalVariableCollectionsAsync()
const vars = await figma.variables.getLocalVariablesAsync()
const byId = Object.fromEntries(vars.map((v) => [v.id, v]))
const colById = Object.fromEntries(cols.map((c) => [c.id, c]))

const round = (n, d = 4) => Math.round(n * 10 ** d) / 10 ** d
const hex = (c) =>
  '#' + [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('') +
  (c.a !== undefined && c.a < 0.999 ? Math.round(c.a * 255).toString(16).padStart(2, '0') : '')

// Resolve an alias chain. An alias into the SAME collection keeps the mode;
// an alias into another collection uses that collection's default mode
// (Figma's behaviour for an unset explicit mode).
function resolve(v, modeId) {
  let value = v.valuesByMode[modeId]
  let col = colById[v.variableCollectionId]
  for (let i = 0; i < 20 && value && value.type === 'VARIABLE_ALIAS'; i++) {
    const target = byId[value.id]
    const targetCol = colById[target.variableCollectionId]
    const m = targetCol.id === col.id ? modeId : targetCol.defaultModeId
    value = target.valuesByMode[m]
    col = targetCol
  }
  if (v.resolvedType === 'COLOR') return hex(value)
  if (v.resolvedType === 'FLOAT') return round(value)
  return value
}

const collections = {}
for (const c of cols) {
  if (SKIP.includes(c.name)) continue
  collections[c.name] = {
    modes: c.modes.map((m) => m.name),
    variables: c.variableIds.map((id) => byId[id]).filter(Boolean).map((v) => ({
      name: v.name,
      type: v.resolvedType,
      valuesByMode: Object.fromEntries(c.modes.map((m) => [m.name, resolve(v, m.modeId)])),
    })),
  }
}

const textStyles = []
for (const s of await figma.getLocalTextStylesAsync()) {
  const role = s.name.split('/')[0].trim()
  if (textStyles.some((t) => t.role === role)) continue
  const bv = s.boundVariables || {}
  textStyles.push({
    role,
    fontSize: bv.fontSize ? byId[bv.fontSize.id]?.name : null,
    lineHeight: bv.lineHeight ? byId[bv.lineHeight.id]?.name : null,
  })
}

const effectStyles = (await figma.getLocalEffectStylesAsync()).map((s) => ({
  name: s.name,
  effects: s.effects.map((e, i) => {
    const out = { type: e.type, radius: e.radius, offsetX: e.offset?.x ?? 0, offsetY: e.offset?.y ?? 0, spread: e.spread ?? 0,
      color: { r: round(e.color.r, 3), g: round(e.color.g, 3), b: round(e.color.b, 3), a: round(e.color.a, 3) } }
    const bound = s.boundVariables?.effects?.[i]?.color || e.boundVariables?.color
    if (bound) out.colorVar = byId[bound.id]?.name
    return out
  }),
}))

return { exportedAt: new Date().toISOString(), figmaFileKey: figma.fileKey ?? 'OSexn3GQ7oIOo7X2sGVlSb', collections, textStyles, effectStyles }
