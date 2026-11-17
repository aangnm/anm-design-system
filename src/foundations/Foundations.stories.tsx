import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import tokens from '../../tokens/figma-export.json'
import usage from '../docs/token-usage.json'

// Foundations: the token layer, rendered from tokens/figma-export.json (the
// reviewed Figma pull) so these pages can never drift from the CSS. Every
// swatch and specimen uses the live CSS variable, so it follows the toolbar's
// theme and density. "Used by" comes from src/docs/token-usage.json
// (scripts/build-docs.mjs scans the component source).

const meta: Meta = {
  title: 'Foundations',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

type Variable = { name: string; type: string; valuesByMode: Record<string, string | number> }
const collections = tokens.collections as Record<string, { modes: string[]; variables: Variable[] }>
const used = usage as Record<string, string[]>
const css = (name: string) => name.replace(/\//g, '-')

function Page({ title, intro, children }: { title: string; intro: ReactNode; children: ReactNode }) {
  return (
    <div className="-m-8 min-h-screen bg-surface-page px-24px py-40px md:px-48px">
      <div className="mx-auto flex max-w-[1040px] flex-col gap-32px">
        <header className="flex flex-col gap-8px">
          <span className="text-label-default font-semibold uppercase tracking-wider text-text-secondary">Foundations</span>
          <h1 className="m-0 text-headline-large font-semibold text-text-primary">{title}</h1>
          <p className="m-0 max-w-[720px] text-body-default text-text-secondary">{intro}</p>
        </header>
        {children}
      </div>
    </div>
  )
}

function Section({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-12px">
      <div className="flex flex-col gap-4px">
        <h2 className="m-0 text-title-default font-semibold text-text-primary">{title}</h2>
        {note ? <p className="m-0 max-w-[720px] text-body-small text-text-secondary">{note}</p> : null}
      </div>
      {children}
    </section>
  )
}

const th = 'px-12px py-8px text-left text-label-default font-medium text-text-secondary'
const td = 'px-12px py-10px align-top text-body-small text-text-primary'

// ------------------------------------------------------------------ Color
const GROUPS: [string, string, string][] = [
  ['surface', 'Surfaces', 'Backgrounds, in elevation order: page < container < container-high. surface/highlight marks "already has a value"; scrim sits behind overlays. Use as bg-surface-*.'],
  ['text', 'Text', 'Text on neutral surfaces. text/<status> is the status colour for text and icons on a neutral surface. Use as text-text-*.'],
  ['icon', 'Icons', 'Glyph colours; text/disabled replaces icon/muted on disabled controls. Use as text-icon-*.'],
  ['border', 'Borders', 'subtle is a container edge (not held to 3:1); default is a control boundary (3:1); emphasis is hover. Use as border-border-*.'],
  ['interactive', 'Interactive', 'Fills of controls: primary (the one primary action), default (secondary fill, hover tint), disabled. Use as bg-interactive-*.'],
  ['semantic', 'Status', 'One set per status, all ramp steps: solid fill, tinted surface, and the foreground that sits on the tint. Use as bg-semantic-*, text-semantic-*-foreground.'],
  ['focus', 'Focus', 'The focus ring colour, used by the focus-ring utility only.'],
  ['chart', 'Chart series', 'Eight categorical hues in fixed slot order; a series keeps its slot (and texture) across every chart.'],
  ['data', 'Data scale', 'A sequential low / mid / high scale for magnitudes (heat, intensity).'],
  ['brand', 'Brand', 'Logo and brand accent; not for UI state.'],
  ['shadow', 'Shadow colour', 'Colours of the elevation shadows; stronger in dark so depth still reads.'],
]

export const Color: Story = {
  render: () => {
    const themes = collections.Themes
    return (
      <Page
        title="Color"
        intro="Semantic tokens, never raw values. Every swatch below shows the current theme (switch Dark / Light / High contrast in the toolbar); the table lists the value in each theme and the components that use the token."
      >
        {GROUPS.map(([prefix, title, note]) => {
          const vars = themes.variables.filter((v) => v.name.startsWith(prefix + '/'))
          if (!vars.length) return null
          return (
            <Section key={prefix} title={title} note={note}>
              <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface-container" role="region" aria-label={`${title} tokens`} tabIndex={0}>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle">
                      <th className={th}>Token</th>
                      {themes.modes.map((m) => (
                        <th key={m} className={th}>{m.replace('Light · ', '')}</th>
                      ))}
                      <th className={th}>Used by</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vars.map((v) => (
                      <tr key={v.name} className="border-b border-border-subtle last:border-b-0">
                        <td className={td}>
                          <div className="flex items-center gap-10px">
                            <span aria-hidden className="size-24px shrink-0 rounded-sm border border-border-subtle" style={{ background: `var(--${css(v.name)})` }} />
                            <code className="text-body-small">{v.name}</code>
                          </div>
                        </td>
                        {themes.modes.map((m) => (
                          <td key={m} className={`${td} font-mono text-text-secondary`}>{String(v.valuesByMode[m])}</td>
                        ))}
                        <td className={`${td} text-text-secondary`}>{(used[css(v.name)] ?? []).join(', ') || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )
        })}
      </Page>
    )
  },
}

// ------------------------------------------------------------- Typography
export const Typography: Story = {
  render: () => {
    const type = collections.Typography.variables
    const value = (name: string) => type.find((v) => v.name === name)?.valuesByMode.Default
    const roles = (tokens.textStyles as { role: string; fontSize: string; lineHeight: string }[])
    return (
      <Page
        title="Typography"
        intro="Type by role: a component names the role it plays (text-body-default, text-title-large …), and the role carries size and line height together. Weight is separate (font-medium, font-semibold). Inter throughout."
      >
        <Section title="Roles">
          <div className="flex flex-col divide-y divide-border-subtle rounded-lg border border-border-subtle bg-surface-container">
            {roles.map((r) => {
              const cls = `text-${r.role.toLowerCase().replace(/\s+/g, '-')}`
              return (
                <div key={r.role} className="flex flex-col gap-4px px-16px py-14px md:flex-row md:items-baseline md:gap-24px">
                  <div className="flex w-[220px] shrink-0 flex-col">
                    <code className="text-body-small text-text-primary">{cls}</code>
                    <span className="text-label-default text-text-secondary">
                      {r.role} · {value(r.fontSize)}/{value(r.lineHeight)}
                    </span>
                  </div>
                  <span className={`${cls} truncate text-text-primary`}>Revenue grew 12.5% this quarter</span>
                </div>
              )
            })}
          </div>
        </Section>
      </Page>
    )
  },
}

// --------------------------------------------------- Spacing and density
export const SpacingAndDensity: Story = {
  name: 'Spacing & density',
  render: () => {
    const dim = collections.Dimension.variables
    const spacing = dim.filter((v) => v.name.startsWith('spacing/'))
    const density = collections.Density
    return (
      <Page
        title="Spacing & density"
        intro="A 4px base. Spacing classes carry a px suffix (p-16px, gap-8px) because Tailwind's bare numbers (p-4) are a different scale. Density is its own setting: data-density=&quot;compact&quot; on any ancestor tightens controls, table rows and container padding."
      >
        <Section title="Spacing scale" note="Use as p-*, m-*, gap-*, w-*, h-* with the px suffix.">
          <div className="flex flex-col gap-6px rounded-lg border border-border-subtle bg-surface-container p-16px">
            {spacing.map((v) => {
              const n = Number(v.valuesByMode.Value)
              return (
                <div key={v.name} className="flex items-center gap-12px">
                  <code className="w-[96px] shrink-0 text-body-small text-text-primary">{n}px</code>
                  <span aria-hidden className="h-12px rounded-xs bg-chart-series-1" style={{ width: n }} />
                </div>
              )
            })}
          </div>
        </Section>
        <Section title="Density" note="Switch Comfortable / Compact in the toolbar: the sample controls follow. Touch targets stay 48 × 48 in both.">
          <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface-container" role="region" aria-label="Density tokens" tabIndex={0}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className={th}>Token</th>
                  <th className={th}>Utility</th>
                  {density.modes.map((m) => (
                    <th key={m} className={th}>{m}</th>
                  ))}
                  <th className={th}>Now</th>
                </tr>
              </thead>
              <tbody>
                {density.variables.map((v) => {
                  const utility = v.name.startsWith('control/height/') ? `h-control-${v.name.split('/').pop()}` : v.name.startsWith('container/padding/') ? `p-container-${v.name.split('/').pop()}` : 'py-table-cell-y'
                  return (
                    <tr key={v.name} className="border-b border-border-subtle last:border-b-0">
                      <td className={td}><code>{v.name}</code></td>
                      <td className={`${td} text-text-secondary`}><code>{utility}</code></td>
                      {density.modes.map((m) => (
                        <td key={m} className={`${td} text-text-secondary`}>{String(v.valuesByMode[m])}px</td>
                      ))}
                      <td className={td}>
                        {v.name.startsWith('control/height/') ? (
                          <span aria-hidden className="block w-48px rounded-sm bg-interactive-default" style={{ height: `var(--${css(v.name)})` }} />
                        ) : (
                          <span className="text-text-secondary">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Section>
      </Page>
    )
  },
}

// -------------------------------------------------- Radius and elevation
export const RadiusAndElevation: Story = {
  name: 'Radius & elevation',
  render: () => {
    const radius = collections.Dimension.variables.filter((v) => v.name.startsWith('radius/'))
    const shadows = (tokens.effectStyles as { name: string }[]).map((s) => s.name.replace('elevation/', ''))
    return (
      <Page
        title="Radius & elevation"
        intro="Radius steps for every corner in the system. Elevation pairs a surface with a shadow: container with shadow-xs / sm for cards and bars, container-high with shadow-md and up for menus, popovers and dialogs. Shadow colours follow the theme."
      >
        <Section title="Radius" note="Use as rounded-xs … rounded-pill.">
          <div className="grid grid-cols-2 gap-12px sm:grid-cols-3 md:grid-cols-5">
            {radius.map((v) => (
              <div key={v.name} className="flex flex-col items-start gap-6px">
                <span aria-hidden className="size-64px border border-border-default bg-surface-container" style={{ borderRadius: `var(--radius-${v.name.split('/').pop()})` }} />
                <code className="text-body-small text-text-primary">rounded-{v.name.split('/').pop()}</code>
                <span className="text-label-default text-text-secondary">{String(v.valuesByMode.Value)}px</span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Elevation" note="Use as shadow-xs … shadow-xl.">
          <div className="grid grid-cols-2 gap-24px rounded-lg bg-surface-page p-8px sm:grid-cols-3 md:grid-cols-5">
            {shadows.map((s, i) => (
              <div key={s} className={`flex h-[96px] flex-col justify-end rounded-lg p-12px ${i < 2 ? 'bg-surface-container' : 'bg-surface-container-high'}`} style={{ boxShadow: `var(--${s})` }}>
                <code className="text-body-small text-text-primary">{s}</code>
              </div>
            ))}
          </div>
        </Section>
      </Page>
    )
  },
}

// ------------------------------------------------------------------ Motion
export const Motion: Story = {
  render: () => {
    const motion = collections.Motion.variables
    return (
      <Page title="Motion" intro="Three durations and two easings. Transitions are for state changes (hover, open, theme); nothing moves on its own.">
        <Section title="Tokens">
          <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface-container" role="region" aria-label="Motion tokens" tabIndex={0}>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className={th}>Token</th>
                  <th className={th}>Value</th>
                  <th className={th}>CSS variable</th>
                </tr>
              </thead>
              <tbody>
                {motion.map((v) => (
                  <tr key={v.name} className="border-b border-border-subtle last:border-b-0">
                    <td className={td}><code>{v.name}</code></td>
                    <td className={`${td} text-text-secondary`}>{String(v.valuesByMode.Value)}{v.name.startsWith('duration/') ? 'ms' : ''}</td>
                    <td className={`${td} text-text-secondary`}><code>var(--{css(v.name)})</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </Page>
    )
  },
}
