import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from './RadioGroup'

const options = [
  { value: 'savings', label: 'Savings' },
  { value: 'checking', label: 'Checking' },
  { value: 'credit', label: 'Credit' },
]

const meta: Meta<typeof RadioGroup> = {
  title: 'Core/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    legend: 'Primary currency',
    helperText: 'Used for reports and conversions.',
    options,
    defaultValue: 'savings',
  },
}
export default meta

type Story = StoryObj<typeof RadioGroup>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <RadioGroup {...args} />
    </div>
  ),
}

// The Figma component is a single frame: legend + helper + three options.
// Extra variants show the optional helper and a disabled option / group.
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-32px bg-surface-page p-24px">
      <div className="w-[280px]">
        <RadioGroup
          legend="Primary currency"
          helperText="Used for reports and conversions."
          options={options}
          defaultValue="cafe"
        />
      </div>
      <div className="w-[280px]">
        <RadioGroup legend="Primary currency" options={options} defaultValue="cacao" />
      </div>
      <div className="w-[280px]">
        <RadioGroup
          legend="Primary currency (disabled)"
          options={options}
          defaultValue="cafe"
          disabled
        />
      </div>
    </div>
  ),
}
