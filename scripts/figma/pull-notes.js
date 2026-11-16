// figma/pull-notes.js — read-only pull of component descriptions (the
// "Why —" notes) from the anm Design System Figma file, keyed by React export.
//
// Run it from a Claude Code session with the Figma plugin MCP: pass this
// file's contents as the `code` of one `use_figma` call, save the returned
// object to src/docs/figma-notes.json. Storybook shows each note on its
// component's docs page, and scripts/build-llms.mjs puts them in llms.txt.
//
// The Figma → React mapping comes from each page's Code handoff spec, the same
// table a developer reads, so the two can't drift apart silently.

const notes = {}
const missing = []
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')

for (const page of figma.root.children) {
  if (page.name.startsWith('—')) continue
  await page.loadAsync()
  const specs = page.findAllWithCriteria({ types: ['SPEC_BLOCK'] }).filter((s) => /Code handoff/.test(s.name))
  if (!specs.length) continue
  const owners = page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] }).filter((c) => c.type === 'COMPONENT_SET' || c.parent.type !== 'COMPONENT_SET')
  for (const spec of specs) {
    const md = (await figma.spec.getContent({ specNodeId: spec.id })).markdown
    // | [Figma name](…node-id=1-2) | `ReactExport` | [File.tsx](…) |
    for (const m of md.matchAll(/^\| \[([^\]]+)\]\([^)]*node-id=(\d+)-(\d+)\) \| `([A-Za-z]+)`/gm)) {
      const [, figmaName, a, b, react] = m
      const node = owners.find((o) => o.id === `${a}:${b}`) || owners.find((o) => o.name === figmaName)
      if (!node || !node.description) { missing.push(figmaName); continue }
      notes[react] = { figma: figmaName, nodeId: node.id, page: page.name, description: decode(node.description) }
    }
  }
}
return { pulledAt: new Date().toISOString(), notes, missing }
