// figma/refresh-color-labels.js — WRITES to the Color page (92:773).
//
// Every swatch row on the Dark Theme (2041:93) and Light Theme (2041:298)
// frames is three texts on one line: the token name (x ≈ 98), its source
// (the primitive or token it aliases) and its hex value. This script reads the
// token name, resolves the variable live in that frame's theme, and rewrites
// the source and hex texts when they differ. Run it after any colour change
// so the page can never drift from the variables again (it did, by ~70
// labels, before this script existed).
//
// Run from a Claude Code session with the Figma plugin MCP: pass this file as
// the `code` of one `use_figma` call. Returns the labels it changed; a second
// run returns an empty list.

const page = figma.root.children.find((p) => p.id === '92:773')
await figma.setCurrentPageAsync(page)
const vars = await figma.variables.getLocalVariablesAsync()
const cols = await figma.variables.getLocalVariableCollectionsAsync()
const themes = cols.find((c) => c.name === 'Themes')
const byId = Object.fromEntries(vars.map((v) => [v.id, v]))
const hex = (c) =>
  '#' + [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase() +
  (c.a !== undefined && c.a < 0.999 ? Math.round(c.a * 255).toString(16).padStart(2, '0').toUpperCase() : '')

function resolve(v, modeId) {
  let val = v.valuesByMode[modeId]
  const first = val?.type === 'VARIABLE_ALIAS' ? byId[val.id] : null
  for (let i = 0; i < 20 && val?.type === 'VARIABLE_ALIAS'; i++) {
    const t = byId[val.id]
    val = t.valuesByMode[t.variableCollectionId === themes.id ? modeId : cols.find((c) => c.id === t.variableCollectionId).defaultModeId]
  }
  return { source: first ? first.name.replace(/^color\//, '') : null, hex: hex(val) }
}

const changes = []
for (const [frameId, modeName] of [['2041:93', 'Dark Mode'], ['2041:298', 'Light Mode']]) {
  const frame = await figma.getNodeByIdAsync(frameId)
  const modeId = themes.modes.find((m) => m.name === modeName).modeId
  const texts = frame.children.filter((c) => c.type === 'TEXT')
  for (const nameText of texts.filter((t) => Math.abs(t.x - 98) < 4)) {
    const v = vars.find((x) => x.name === nameText.characters && x.variableCollectionId === themes.id)
    if (!v) continue
    const r = resolve(v, modeId)
    for (const t of texts.filter((t) => t !== nameText && Math.abs(t.y - nameText.y) < 3 && t.x > nameText.x)) {
      const want = t.characters.startsWith('#') ? r.hex : r.source
      if (!want || t.characters === want) continue
      await figma.loadFontAsync(t.fontName)
      changes.push(`${modeName} · ${nameText.characters}: ${t.characters} → ${want}`)
      t.characters = want
    }
  }
}
return changes
