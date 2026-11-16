import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Core/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { label: 'Etiqueta', name: 'radio-group' },
}
export default meta

type Story = StoryObj<typeof Radio>

export const Playground: Story = {
  args: { id: 'radio-playground' },
}

// Value x State, mirroring the Figma grid. Hover/Focus are pseudo-states, so
// the grid forces them on the circle (the input's next sibling) with the same
// tokens; Default and Disabled are real.
const values = [
  { label: 'Unselected', props: {} },
  { label: 'Selected', props: { defaultChecked: true } },
] as const

const forced = {
  Default: '',
  Hover: '[&_input+span]:bg-interactive-default',
  Focus: '[&_input+span]:focus-ring',
  Disabled: '',
} as const

export const ValueByState: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8">
      <div className="grid grid-cols-[120px_repeat(4,120px)] text-text-caption leading-4 text-text-secondary">
        <span />
        {Object.keys(forced).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      {values.map((v) => (
        <div key={v.label} className="grid grid-cols-[120px_repeat(4,120px)] items-center">
          <span className="text-text-caption leading-4 text-text-secondary">{v.label}</span>
          {(Object.keys(forced) as (keyof typeof forced)[]).map((state) => (
            <div key={state} className={forced[state]}>
              <Radio
                id={`r-${v.label}-${state}`}
                name={`r-${v.label}-${state}`}
                label="Etiqueta"
                disabled={state === 'Disabled'}
                {...v.props}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
