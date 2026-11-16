import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/Button'
import { Badge } from '@/components/Badge'
import { Stat } from '@/components/Stat'
import { ChoiceTile } from '@/components/ChoiceTile'
import { DonutChart } from '@/components/DonutChart'

// The landing page of the Storybook: what the system is, how it is built, and
// a few live components in the current theme. Not exported from the package.

const meta: Meta = {
  title: 'Introduction',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

const principles = [
  ['Figma is the source of truth', 'Tokens and component specs are decided in the anm Design System Figma file and flow into code through a reviewed token pull. Nothing is fixed here first.'],
  ['States are CSS, not props', 'Hover, Focus and Disabled are real :hover, :focus-visible and disabled. Only states with no native equivalent, like Loading, become props.'],
  ['One rule per concern', 'One surface order (page < container < container-high), one hover (an 8% state layer), one focus ring (2px, 2px outside), one sample-copy format (es-EC).'],
  ['Accessible by default', 'Text clears AA in both themes and AAA in High contrast; controls clear 3:1; every target is at least 24 × 24 and 48 × 48 on touch.'],
]

const stack = ['React 19', 'TypeScript', 'Tailwind CSS v4', 'class-variance-authority', 'Storybook', 'Changesets']

export const Overview: StoryObj = {
  render: () => (
    <div className="-m-8 min-h-screen bg-surface-page px-48px py-56px">
      <div className="mx-auto flex max-w-[960px] flex-col gap-48px">
        <header className="flex flex-col gap-16px">
          <span className="text-text-xxs font-semibold uppercase tracking-wider text-text-secondary">Product design system</span>
          <h1 className="m-0 text-display-2xl font-semibold text-text-primary">anm design system</h1>
          <p className="m-0 max-w-[640px] text-text-lg leading-7 text-text-secondary">
            Tokens, components and patterns for data-heavy products: analytics, data visualisation and fintech. Dark and light themes,
            a high-contrast mode, and a component library that maps one to one to the Figma file.
          </p>
          <div className="flex flex-wrap gap-8px">
            <Button asChild variant="primary" trailingIcon={<ArrowUpRight className="size-4" />}>
              <a href="https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System" target="_blank" rel="noreferrer">
                Open in Figma
              </a>
            </Button>
            <Button asChild variant="secondary" trailingIcon={<ArrowUpRight className="size-4" />}>
              <a href="https://github.com/aangnm/anm-design-system" target="_blank" rel="noreferrer">
                Repository
              </a>
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-2 gap-16px">
          {principles.map(([title, body]) => (
            <div key={title} className="flex flex-col gap-8px rounded-lg border border-border-subtle bg-surface-container p-20px">
              <h2 className="m-0 text-text-base font-semibold leading-6 text-text-primary">{title}</h2>
              <p className="m-0 text-text-sm leading-5 text-text-secondary">{body}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-16px">
          <h2 className="m-0 text-text-xs font-medium uppercase tracking-wider text-text-secondary">Live, in the current theme</h2>
          <div className="grid grid-cols-[minmax(0,1fr)_320px_auto] items-start gap-16px">
            <Stat label="Ingresos totales" value="$ 128.450" delta="12,5 %" trend="up" deltaCaption="vs. mes anterior" />
            <div className="grid grid-cols-2 gap-8px">
              <ChoiceTile label="Mensual" state="selected" />
              <ChoiceTile label="Anual" />
              <ChoiceTile label="Ventas" state="done" count={3} />
              <ChoiceTile label="Otros" state="counted" count={1} />
            </div>
            <DonutChart
              unit="USD"
              parts={[
                { label: 'Ventas', series: 1, value: 520 },
                { label: 'Suscripciones', series: 2, value: 380 },
                { label: 'Servicios', series: 3, value: 250 },
              ]}
            />
          </div>
        </section>

        <footer className="flex flex-wrap items-center gap-8px border-t border-border-subtle pt-24px">
          {stack.map((s) => (
            <Badge key={s}>{s}</Badge>
          ))}
          <span className="ml-auto text-text-xs text-text-secondary">Switch dark and light from the toolbar above.</span>
        </footer>
      </div>
    </div>
  ),
}
