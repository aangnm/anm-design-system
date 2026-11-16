import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const options = (
  <>
    <option value="">Selecciona…</option>
    <option value="a">Option A</option>
    <option value="b">Option B</option>
  </>
)

const meta: Meta<typeof Select> = {
  title: 'Core/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  args: {
    children: options,
  },
}
export default meta

type Story = StoryObj<typeof Select>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Select aria-label="Account" {...args} />
    </div>
  ),
}

const sizes = ['sm', 'md', 'lg'] as const
const widths = { sm: 'w-[260px]', md: 'w-[280px]', lg: 'w-[300px]' } as const
const states = [
  { label: 'Default', props: {}, cls: '' },
  { label: 'Hover', props: {}, cls: 'border-border-emphasis' },
  { label: 'Focus', props: {}, cls: 'focus-ring!' },
  { label: 'Disabled', props: { disabled: true }, cls: '' },
  { label: 'Error', props: { error: true }, cls: '' },
  { label: 'Focus + Error', props: { error: true }, cls: 'focus-ring!' },
]

/** Mirrors the Figma grid: Size rows x State columns (Hover/Focus forced with the same tokens). */
export const SizeByState: Story = {
  render: () => (
    <div className="flex flex-col gap-24px bg-surface-page p-8">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-8px">
          <span className="text-text-caption leading-4 text-text-secondary">Size {size.toUpperCase()}</span>
          <div className="flex flex-wrap gap-16px">
            {states.map((s) => (
              <div key={s.label} className={`flex flex-col gap-4px ${widths[size]}`}>
                <span className="text-text-caption leading-4 text-text-secondary">{s.label}</span>
                <Select aria-label="Account" size={size} className={s.cls} {...s.props}>{options}</Select>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}
