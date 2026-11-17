#!/usr/bin/env node
// Builds the documentation data that Storybook and agents read. Deterministic,
// no network, runs before every Storybook build (npm run docs:build).
//
//   src/docs/component-api.json  every exported component: import line, own
//                                props (name, type, required, description) read
//                                from its TypeScript `<Name>Props` interface,
//                                and the HTML element it extends, if any
//   src/docs/token-usage.json    every colour / spacing / text / shadow token →
//                                the components whose source uses it
//   public/components/<Name>.md  one Markdown page per component — import,
//                                props, design notes, links — served next to
//                                Storybook so "Copy for AI" and agents can fetch it
//   public/llms.txt              the whole system in one file, linking each .md
//
// The content is portable on purpose: the same Markdown can feed a future
// Next.js / MDX docs site.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import ts from 'typescript'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const read = (p) => readFileSync(join(root, p), 'utf-8')
const notes = JSON.parse(read('src/docs/figma-notes.json')).notes
const exportJson = JSON.parse(read('tokens/figma-export.json'))
const PKG = '@anm/design-system'
const SB = 'https://aangnm.github.io/anm-design-system/'
const FIGMA = 'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id='

// ---------------------------------------------------------------- components
const componentDirs = readdirSync(join(root, 'src/components')).filter((d) => existsSync(join(root, 'src/components', d, 'index.ts')))

function jsDoc(node) {
  const docs = ts.getJSDocCommentsAndTags(node).filter(ts.isJSDoc)
  return docs.map((d) => (typeof d.comment === 'string' ? d.comment : ts.getTextOfJSDocComment(d.comment) ?? '')).join(' ').replace(/\s+/g, ' ').trim()
}

function parseDir(dir) {
  const files = readdirSync(join(root, 'src/components', dir)).filter((f) => /\.tsx?$/.test(f) && !/stories|index\.ts$/.test(f))
  const exportsText = read(`src/components/${dir}/index.ts`)
  const exported = new Set([...exportsText.matchAll(/\b([A-Z]\w*)\b/g)].map((m) => m[1]))
  const comps = []
  for (const f of files) {
    const src = read(`src/components/${dir}/${f}`)
    const sf = ts.createSourceFile(f, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
    const interfaces = {}
    const components = []
    // cva() variants: `variant` / `size` / … become props with their options
    // and default, since VariantProps<typeof x> hides them from the interface.
    const cvaVariants = {}
    const visit = (n) => {
      if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name) && n.initializer && ts.isCallExpression(n.initializer) && n.initializer.expression.getText(sf) === 'cva') {
        const cfg = n.initializer.arguments[1]
        if (cfg && ts.isObjectLiteralExpression(cfg)) {
          const prop = (o, k) => o.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText(sf) === k)?.initializer
          const variants = prop(cfg, 'variants'); const defaults = prop(cfg, 'defaultVariants')
          if (variants && ts.isObjectLiteralExpression(variants)) {
            cvaVariants[n.name.text] = variants.properties.filter(ts.isPropertyAssignment).map((v) => {
              const opts = ts.isObjectLiteralExpression(v.initializer) ? v.initializer.properties.map((o) => o.name.getText(sf).replace(/^'|'$/g, '')) : []
              const def = defaults && ts.isObjectLiteralExpression(defaults) ? prop(defaults, v.name.getText(sf))?.getText(sf) : undefined
              const isBool = opts.length && opts.every((o) => o === 'true' || o === 'false')
              return { name: v.name.getText(sf), type: isBool ? 'boolean' : opts.map((o) => `'${o}'`).join(' | '), required: false, description: def ? `Default ${def}.` : '' }
            })
          }
        }
      }
      ts.forEachChild(n, visit)
    }
    visit(sf)
    sf.forEachChild((n) => {
      if (ts.isInterfaceDeclaration(n) && /Props$/.test(n.name.text)) {
        const ext = (n.heritageClauses ?? []).flatMap((h) => h.types.map((t) => t.getText(sf)))
        const fromCva = ext.flatMap((e) => cvaVariants[e.match(/VariantProps<typeof (\w+)>/)?.[1] ?? ''] ?? [])
        const props = fromCva.concat(n.members.filter(ts.isPropertySignature).map((m) => ({
          name: m.name.getText(sf).replace(/^'|'$/g, ''),
          type: m.type ? m.type.getText(sf).replace(/\s+/g, ' ') : 'unknown',
          required: !m.questionToken,
          description: jsDoc(m),
        })))
        const seen = new Set()
        interfaces[n.name.text] = { props: props.filter((p) => !seen.has(p.name) && seen.add(p.name)), extends: ext.filter((e) => !/^VariantProps</.test(e)) }
      }
      const isExported = (n.modifiers ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword)
      if (isExported && ts.isFunctionDeclaration(n) && n.name && /^[A-Z]/.test(n.name.text)) components.push(n.name.text)
      if (isExported && ts.isVariableStatement(n))
        for (const d of n.declarationList.declarations) if (ts.isIdentifier(d.name) && /^[A-Z]/.test(d.name.text) && d.initializer && /forwardRef|memo|\(/.test(d.initializer.getText(sf).slice(0, 40)) && !/^[A-Z_]+$/.test(d.name.text)) components.push(d.name.text)
    })
    for (const name of components) {
      if (!exported.has(name)) continue
      const iface = interfaces[`${name}Props`]
      comps.push({
        name,
        dir,
        file: `src/components/${dir}/${f}`,
        import: `import { ${name} } from '${PKG}'`,
        extends: iface?.extends ?? [],
        props: iface?.props ?? [],
      })
    }
  }
  return comps
}

const api = componentDirs.flatMap(parseDir).sort((a, b) => a.name.localeCompare(b.name))
const apiByName = Object.fromEntries(api.map((c) => [c.name, c]))
writeFileSync(join(root, 'src/docs/component-api.json'), JSON.stringify(api, null, 2) + '\n')

// ---------------------------------------------------------------- token usage
// Which component uses which token: scan each component's source for the
// Tailwind utilities and CSS variables the generated theme defines.
const themeTokens = exportJson.collections.Themes.variables.map((v) => v.name.replace(/\//g, '-'))
const usage = {}
for (const dir of componentDirs) {
  const src = readdirSync(join(root, 'src/components', dir))
    .filter((f) => /\.tsx?$/.test(f) && !/stories/.test(f))
    .map((f) => read(`src/components/${dir}/${f}`))
    .join('\n')
  for (const t of themeTokens) {
    const re = new RegExp(`(?:[a-z-]+-|var\\(--)${t.replace(/[-/]/g, '[-/]')}(?![\\w-])`)
    if (re.test(src)) (usage[t] ||= []).push(dir)
  }
}
writeFileSync(join(root, 'src/docs/token-usage.json'), JSON.stringify(usage, null, 2) + '\n')

// ---------------------------------------------------------------- markdown
const slug = (s) => s.replace(/\s+/g, '-').toLowerCase()
function storyPath(c) {
  const story = readdirSync(join(root, 'src/components', c.dir)).find((f) => /stories\.tsx$/.test(f))
  if (!story) return null
  const title = read(`src/components/${c.dir}/${story}`).match(/title:\s*'([^']+)'/)?.[1]
  return title ? `${SB}?path=/docs/${title.split('/').map(slug).join('-').replace(/&/g, '').replace(/-+/g, '-')}--docs` : null
}
const esc = (s) => s.replace(/\|/g, '\\|')
mkdirSync(join(root, 'public/components'), { recursive: true })
for (const f of readdirSync(join(root, 'public/components'))) rmSync(join(root, 'public/components', f))
for (const c of api) {
  const n = notes[c.name]
  const lines = [`# ${c.name}`, '']
  if (n) lines.push(`> ${n.description.split('\n')[0]}`, '')
  lines.push('## Import', '', '```tsx', c.import, `import '${PKG}/styles.css' // once, at the app root`, '```', '')
  if (c.props.length) {
    lines.push('## Props', '', '| Prop | Type | Required | Description |', '|---|---|---|---|')
    for (const p of c.props) lines.push(`| \`${p.name}\` | \`${esc(p.type)}\` | ${p.required ? 'yes' : 'no'} | ${esc(p.description)} |`)
    lines.push('')
  }
  if (c.extends.length) lines.push(`Also accepts every attribute of \`${c.extends.join('`, `')}\` (spread onto the root element).`, '')
  if (n) lines.push('## Design notes (from Figma)', '', n.description.split('\n').slice(1).join('\n').trim(), '')
  lines.push('## Links', '')
  const sb = storyPath(c)
  if (sb) lines.push(`- Storybook: ${sb}`)
  if (n) lines.push(`- Figma: ${FIGMA}${n.nodeId.replace(':', '-')} (${n.figma}, ${n.page} page)`)
  lines.push(`- Source: https://github.com/aangnm/anm-design-system/blob/main/${c.file}`, '')
  writeFileSync(join(root, 'public/components', `${c.name}.md`), lines.join('\n'))
}

// ---------------------------------------------------------------- llms.txt
const startHere = read('src/docs/StartHere.mdx').replace(/^import \{ Meta \} from .*\n/m, '').replace(/<Meta [^>]*\/>\n/, '').replace(/^# Start here\n+/m, '').trim()
const byPage = {}
for (const c of api) (byPage[notes[c.name]?.page ?? 'Other'] ||= []).push(c)
const llms = [
  '# anm design system',
  '',
  `> A design system for building products in Figma or in code, by hand or with AI agents, with a dedicated set for analytics dashboards. Package: ${PKG}. Figma is the source of truth; each component below links to its full page (import, props, design notes).`,
  '',
  startHere,
  '',
  '## Components',
  '',
]
for (const page of Object.keys(byPage).sort()) {
  llms.push(`### ${page}`, '')
  for (const c of byPage[page]) {
    const lead = notes[c.name]?.description.split('\n')[0] ?? ''
    llms.push(`- [${c.name}](${SB}components/${c.name}.md): ${lead}`)
  }
  llms.push('')
}
writeFileSync(join(root, 'public/llms.txt'), llms.join('\n'))
console.log(`docs: ${api.length} components, ${Object.keys(usage).length} tokens with usage, ${api.length} Markdown pages, llms.txt`)
