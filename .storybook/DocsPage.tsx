import { useState } from 'react'
import { Controls, Description, Markdown, Primary, Source, Stories, Subtitle, Title, useOf } from '@storybook/addon-docs/blocks'
import figmaNotes from '../src/docs/figma-notes.json'
import componentApi from '../src/docs/component-api.json'

// Every component's docs page: the generated Storybook blocks plus the design
// rationale from Figma (the component description with its "Why —" notes),
// so a person or an agent reading the docs gets why a component looks the way
// it does, not only its props. Notes come from src/docs/figma-notes.json,
// pulled by scripts/figma/pull-notes.js.

type Note = { figma: string; nodeId: string; page: string; description: string }
const notes = figmaNotes.notes as Record<string, Note>
const FIGMA = 'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id='

const apiNames = new Set((componentApi as { name: string }[]).map((c) => c.name))

// The React export a docs page is about: the meta's component, else its title.
function exportName(component: unknown, title: string): string | undefined {
  const c = component as { displayName?: string; name?: string; render?: { name?: string } } | undefined
  for (const key of [c?.displayName, c?.name, c?.render?.name]) if (key && (notes[key] || apiNames.has(key))) return key
  const last = (title.split('/').pop() ?? '').replace(/\s+/g, '')
  if (notes[last] || apiNames.has(last)) return last
  return Object.entries(notes).find(([, n]) => n.figma === title.split('/').pop())?.[0]
}

// "Copy for AI": the component's generated Markdown page (import, props,
// design notes, links; scripts/build-docs.mjs) to paste into any assistant.
function AiActions({ name }: { name: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle')
  const url = `./components/${name}.md`
  const copy = async () => {
    try {
      const text = await (await fetch(url)).text()
      await navigator.clipboard.writeText(text)
      setState('copied')
    } catch {
      setState('error')
    }
    setTimeout(() => setState('idle'), 2000)
  }
  const btn: React.CSSProperties = { font: 'inherit', fontSize: 13, padding: '6px 12px', borderRadius: 6, border: '1px solid #4A5463', background: '#1B1E24', color: '#F1ECE3', cursor: 'pointer' }
  return (
    <div style={{ display: 'flex', gap: 8, margin: '16px 0 24px' }}>
      <button type="button" style={btn} onClick={copy} aria-live="polite">
        {state === 'copied' ? 'Copied' : state === 'error' ? 'Copy failed' : 'Copy for AI'}
      </button>
      <a href={url} target="_blank" rel="noreferrer" style={{ ...btn, textDecoration: 'none' }}>
        View as Markdown
      </a>
    </div>
  )
}

// "Why — …" paragraphs become a bold lead-in, so the rationale is scannable.
function toMarkdown(text: string) {
  return text
    .split(/\n{2,}/)
    .map((p) => p.replace(/^([A-Z][\w ·/'’]{1,40}?) — /, '**$1** — '))
    .join('\n\n')
}

export function DocsPage() {
  const meta = useOf('meta')
  const name = exportName(meta.preparedMeta.component, meta.preparedMeta.title)
  const note = name ? notes[name] : undefined
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
      {name && apiNames.has(name) ? (
        <>
          <Source language="tsx" dark code={`import { ${name} } from '@anm/design-system'`} />
          <AiActions name={name} />
        </>
      ) : null}
      <Primary />
      <Controls />
      {note ? (
        <>
          <h2 id="design-notes">Design notes</h2>
          <Markdown>{toMarkdown(note.description)}</Markdown>
          <p>
            <a href={FIGMA + note.nodeId.replace(':', '-')} target="_blank" rel="noreferrer">
              {note.figma} in Figma
            </a>{' '}
            · {note.page} page
          </p>
        </>
      ) : null}
      <Stories />
    </>
  )
}
