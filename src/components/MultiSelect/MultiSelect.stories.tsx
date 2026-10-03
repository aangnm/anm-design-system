import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { MultiSelect } from './MultiSelect'

const meta: Meta<typeof MultiSelect> = {
  title: 'Core/Multi-select',
  component: MultiSelect,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof MultiSelect>

const options = [
  { label: 'Cosecha', value: 'harvest' },
  { label: 'Riego', value: 'irrigation' },
  { label: 'Tratamiento', value: 'treatment' },
  { label: 'Poda', value: 'pruning' },
]

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState(['harvest', 'irrigation'])
    return <MultiSelect options={options} value={value} onChange={setValue} />
  },
}

export const Empty: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return <MultiSelect options={options} value={value} onChange={setValue} />
  },
}

// Mirrors the Figma grid: rows = Size (SM, MD, LG), columns = State. Hover and
// Focus are real pseudo-classes — hover / Tab to see them; Focus + Error shows
// when the Error field is focused.
const sizes = ['sm', 'md', 'lg'] as const
const states = [
  { label: 'Default', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Error', props: { error: true } },
] as const

export const SizesAndStates: Story = {
  render: () => (
    <div className="flex flex-col gap-24px">
      {sizes.map((size) => (
        <div key={size} className="flex flex-wrap items-start gap-24px">
          <span className="w-24px pt-8px text-text-xxs font-medium leading-4 text-text-secondary">{size.toUpperCase()}</span>
          {states.map((s) => (
            <div key={s.label} className="flex flex-col gap-4px">
              <MultiSelect size={size} options={options} value={['harvest', 'irrigation']} onChange={() => {}} {...s.props} />
              <span className="text-text-xxs leading-4 text-text-secondary">{s.label}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}

// State=Open: the list stays open while picking.
export const Open: Story = {
  render: () => {
    const [value, setValue] = useState(['harvest', 'irrigation'])
    return (
      <div className="h-[260px]">
        <MultiSelect defaultOpen options={options} value={value} onChange={setValue} />
      </div>
    )
  },
}
