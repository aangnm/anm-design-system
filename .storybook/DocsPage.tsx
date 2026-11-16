import { Controls, Description, Markdown, Primary, Stories, Subtitle, Title, useOf } from '@storybook/addon-docs/blocks'
import figmaNotes from '../src/docs/figma-notes.json'

// Every component's docs page: the generated Storybook blocks plus the design
// rationale from Figma (the component description with its "Why —" notes),
// so a person or an agent reading the docs gets why a component looks the way
// it does, not only its props. Notes come from src/docs/figma-notes.json,
// pulled by scripts/figma/pull-notes.js.

type Note = { figma: string; nodeId: string; page: string; description: string }
const notes = figmaNotes.notes as Record<string, Note>
const FIGMA = 'https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id='

function findNote(component: unknown, title: string): Note | undefined {
  const c = component as { displayName?: string; name?: string; render?: { name?: string } } | undefined
  for (const key of [c?.displayName, c?.name, c?.render?.name]) if (key && notes[key]) return notes[key]
  const last = title.split('/').pop() ?? ''
  return notes[last.replace(/\s+/g, '')] ?? Object.values(notes).find((n) => n.figma === last)
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
  const note = findNote(meta.preparedMeta.component, meta.preparedMeta.title)
  return (
    <>
      <Title />
      <Subtitle />
      <Description />
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
