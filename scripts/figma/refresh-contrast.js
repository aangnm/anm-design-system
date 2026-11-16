// figma/refresh-contrast.js — WRITES to the Accessibility page (2201:21).
//
// The contrast cards name a pair as "<token> on <token> …" and show a measured
// ratio and a verdict next to it. This script recomputes every ratio from the
// live variables in the theme of the frame the card sits in (Dark mode, Light
// mode or High contrast) and rewrites the ratio and verdict when they differ.
// Text pairs: AAA ≥ 7, AA ≥ 4.5, else FAIL. Graphic pairs (borders, chart and
// data marks, icons, focus, solid status fills): PASS ≥ 3 (CAUTION kept while
// under 4.5), else FAIL.
//
// Run from a Claude Code session with the Figma plugin MCP: pass this file as
// the `code` of one `use_figma` call. Returns what changed; a second run
// returns an empty list.

const page = figma.root.children.find((p) => p.id === '2201:21')
await page.loadAsync()
const vars = await figma.variables.getLocalVariablesAsync()
const cols = await figma.variables.getLocalVariableCollectionsAsync()
const themes = cols.find((c) => c.name === 'Themes')
const byId = Object.fromEntries(vars.map((v) => [v.id, v]))

function resolve(v, modeId) {
  let val = v.valuesByMode[modeId]
  for (let i = 0; i < 20 && val?.type === 'VARIABLE_ALIAS'; i++) {
    const t = byId[val.id]
    val = t.valuesByMode[t.variableCollectionId === themes.id ? modeId : cols.find((c) => c.id === t.variableCollectionId).defaultModeId]
  }
  return val
}
const lum = (c) => { const f = (x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b) }
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05) }
const modeFor = (name) =>
  themes.modes.find((m) => (name.includes('Dark') ? m.name === 'Dark Mode' : name.includes('High') ? m.name === 'Light · High contrast' : m.name === 'Light Mode')).modeId

const changes = []
for (const label of page.findAllWithCriteria({ types: ['TEXT'] }).filter((t) => /^\S+\/\S+ on \S+\/\S+/.test(t.characters))) {
  const [, fgName, bgName] = label.characters.match(/^(\S+) on (\S+)/)
  const fg = vars.find((v) => v.name === fgName && v.variableCollectionId === themes.id)
  const bg = vars.find((v) => v.name === bgName && v.variableCollectionId === themes.id)
  if (!fg || !bg) continue
  let top = label
  while (top.parent.type !== 'PAGE' && top.parent.type !== 'SECTION') top = top.parent
  const m = modeFor(top.name)
  const r = ratio(resolve(fg, m), resolve(bg, m))
  const card = label.parent.parent
  const [ratioText, verdictText] = card.children.filter((c) => c.type === 'TEXT')
  if (!ratioText || !verdictText) continue
  // Graphics (borders, chart and data marks, icons, focus, solid status
  // fills) are held to 3:1 and wear PASS / CAUTION; text pairs wear AA / AAA.
  const nonText =
    /Non-text|control edge|graphic/i.test(label.characters + ' ' + (label.parent.children[1]?.characters || '')) ||
    /^(border|chart|data|icon|focus)\//.test(fgName) ||
    /^semantic\/(success|warning|error|info)$/.test(fgName)
  const verdict = nonText
    ? r < 3 ? 'FAIL' : verdictText.characters === 'CAUTION' && r < 4.5 ? 'CAUTION' : verdictText.characters === 'AA' ? 'AA' : 'PASS'
    : r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : 'FAIL'
  const value = r.toFixed(2) + ':1'
  if (ratioText.characters === value && verdictText.characters === verdict) continue
  for (const t of [ratioText, verdictText]) await figma.loadFontAsync(t.fontName)
  changes.push(`${top.name}: ${label.characters.slice(0, 50)} ${ratioText.characters} ${verdictText.characters} → ${value} ${verdict}`)
  ratioText.characters = value
  verdictText.characters = verdict
}
return changes
