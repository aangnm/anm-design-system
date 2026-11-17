// figma-lint-variants.js — read-only lint of component property names and
// values in the anm Design System Figma file (fileKey OSexn3GQ7oIOo7X2sGVlSb).
//
// Run it from a Claude Code session with the Figma plugin MCP: pass this
// file's contents as the `code` of one `use_figma` call. It never writes to
// the file. It returns { checked, findings }, where each finding names the page,
// component, property and the rule it breaks. An empty findings array is a pass.
//
// Prompted by the naming typos in the 2026-11 M3 kit audit. Run it before
// every changelog entry that adds or changes a component.

// ---------------------------------------------------------------------------
// The agreed vocabulary. Grow it here, deliberately, when a component needs a
// new axis or option — the lint failing is the prompt to have that discussion.
// ---------------------------------------------------------------------------
const VARIANT_AXES = {
  Size: ['SM', 'MD', 'LG'],
  Type: ['Primary', 'Secondary', 'Ghost', 'Outline', 'Default', 'Destructive', 'Absolute', 'Percent'],
  State: [
    'Default', 'Hover', 'Focus', 'Disabled', 'Loading', 'Error', 'Focus + Error', 'Empty',
    'Active', 'Visited', 'Open', 'Closed', 'Searchable', 'Expanded', 'Collapsed',
    'Selected', 'Done', 'Counted', 'Filled',
    // AI elements (v1.4): a message streams, reasoning thinks, a tool call runs or waits for approval.
    'Streaming', 'Thinking', 'Running', 'Approval',
  ],
  Value: ['Unchecked', 'Checked', 'Indeterminate', 'Unselected', 'Selected', 'Off', 'On'],
  Color: ['Neutral', 'Info', 'Success', 'Warning', 'Error'],
  Status: ['None', 'Online', 'Offline'],
  // Who wrote a chat turn (Chat Message, v1.4).
  From: ['User', 'Assistant'],
  Orientation: ['Horizontal', 'Vertical'],
  Shape: ['Line', 'Block', 'Circle'],
  Active: ['Left', 'Center', 'Right'],
  Align: ['Left', 'Center'],
  Severity: ['Critical', 'Moderate', 'Healthy'],
  Surface: ['Dark', 'Light'],
  Density: ['Comfortable', 'Compact'],
  Texture: ['Solid', 'Pattern'],
  // Numeric axes: any non-negative integer, listed in ascending order.
  Depth: 'numeric',
  Filled: 'numeric',
  Series: 'numeric',
}

const ORDERED_AXES = ['Size']

// Booleans either show/hide an element ("Show …"), name an icon slot
// ("Leading icon" / "Trailing icon"), or are a single adjective or verb phrase
// that changes behaviour. A bare noun ("Title") reads like a TEXT property and
// is the mistake this rule exists to catch.
const BOOLEAN_OK = /^(Show [a-z][a-z ]*|Leading icon|Trailing icon|Dismissible|External|Highlight latest|Center label)$/

// TEXT and INSTANCE_SWAP properties are nouns in sentence case. Instance-swap
// slots inside a composite may be qualified: "Icon · Resumen".
const NOUN_OK = /^[A-Z][a-z]+( [a-z]+)*( · [A-ZÁÉÍÓÚÑ][\wáéíóúñ ]*)?$/

const COMPONENT_PAGES = ['Core', 'Navigation', 'Data Display', 'Feedback & Overlays', 'Product Patterns', 'Logo & Brand', 'Iconography']

// ---------------------------------------------------------------------------
const findings = []
let checked = 0
const flag = (page, comp, prop, rule) => findings.push({ page, component: comp, property: prop, rule })

for (const page of figma.root.children.filter((p) => COMPONENT_PAGES.includes(p.name))) {
  await page.loadAsync()
  const sets = page.findAllWithCriteria({ types: ['COMPONENT_SET'] })
  const singles = page.findAllWithCriteria({ types: ['COMPONENT'] }).filter((c) => c.parent.type !== 'COMPONENT_SET')

  for (const owner of [...sets, ...singles]) {
    let defs
    try { defs = owner.componentPropertyDefinitions } catch { continue }
    checked++
    const seen = new Map()

    for (const [key, def] of Object.entries(defs)) {
      const name = key.replace(/#[^#]*$/, '')
      if (name !== name.trim() || /\s{2,}/.test(name)) flag(page.name, owner.name, name, 'stray whitespace in the name')

      const lower = name.toLowerCase()
      if (seen.has(lower)) flag(page.name, owner.name, name, `duplicates "${seen.get(lower)}"`)
      seen.set(lower, name)

      if (def.type === 'VARIANT') {
        const allowed = VARIANT_AXES[name]
        if (!allowed) { flag(page.name, owner.name, name, 'variant axis not in the vocabulary'); continue }
        const opts = def.variantOptions
        // Value is also the axis of a numeric component (Progress 0–100).
        if (allowed === 'numeric' || (name === 'Value' && opts.every((o) => /^\d+$/.test(o)))) {
          if (opts.some((o) => !/^\d+$/.test(o))) flag(page.name, owner.name, name, `non-numeric option in ${opts.join(' | ')}`)
          const nums = opts.map(Number)
          if (nums.some((n, i) => i && n < nums[i - 1])) flag(page.name, owner.name, name, `options not ascending: ${opts.join(' | ')}`)
        } else {
          for (const o of opts) {
            if (o !== o.trim()) flag(page.name, owner.name, name, `stray whitespace in option "${o}"`)
            else if (!allowed.includes(o)) flag(page.name, owner.name, name, `option "${o}" not in the vocabulary`)
          }
          // Ordered axes list small to large in the instance panel. Other axes
          // keep the order of their grid (State follows each component's layout).
          if (ORDERED_AXES.includes(name)) {
            const idx = opts.map((o) => allowed.indexOf(o))
            if (idx.some((v, i) => i && v < idx[i - 1])) flag(page.name, owner.name, name, `options out of order: ${opts.join(' | ')}`)
          }
        }
      } else if (def.type === 'BOOLEAN') {
        if (!BOOLEAN_OK.test(name)) flag(page.name, owner.name, name, 'boolean should read "Show …", an icon slot, or an adjective')
      } else if (!NOUN_OK.test(name)) {
        flag(page.name, owner.name, name, `${def.type.toLowerCase()} name should be a sentence-case noun`)
      }
    }
  }
}

return { checked, findings }
