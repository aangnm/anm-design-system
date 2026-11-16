import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Etiqueta' },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {
  args: { id: 'cb-playground' },
}

// Value x State, mirroring the Figma grid. Hover/Focus are pseudo-states, so
// the grid forces them on the box (the input's next sibling) with the same
// tokens; Default and Disabled are real.
const values = [
  { label: 'Unchecked', props: {} },
  { label: 'Checked', props: { defaultChecked: true } },
  { label: 'Indeterminate', props: { indeterminate: true } },
] as const

const forced = {
  Default: '',
  Hover:
    '[&_input+span]:bg-interactive-default [&_input:checked+span]:state-hover [&_input:indeterminate+span]:state-hover',
  Focus: '[&_input+span]:border-focus-ring!',
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
              <Checkbox
                id={`cb-${v.label}-${state}`}
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
