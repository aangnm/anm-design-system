import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Core/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    placeholder: 'Placeholder',
  },
}
export default meta

type Story = StoryObj<typeof Input>

export const Playground: Story = {
  args: { size: 'md' },
}

const sizes = ['sm', 'md', 'lg'] as const
const widths = { sm: 'w-[260px]', md: 'w-[280px]', lg: 'w-[300px]' } as const

// Hover/Focus are pseudo-states; the grid forces them with the same tokens.
const states = [
  { label: 'Default', props: {}, cls: '' },
  { label: 'Hover', props: {}, cls: 'border-border-emphasis' },
  { label: 'Focus', props: {}, cls: 'focus-ring!' },
  { label: 'Disabled', props: { disabled: true }, cls: '' },
  { label: 'Error', props: { error: true }, cls: '' },
  { label: 'Focus + Error', props: { error: true }, cls: 'focus-ring!' },
]

/** Mirrors the Figma grid: Size rows x State columns. */
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
                <Input size={size} placeholder="Placeholder" className={s.cls} {...s.props} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
}

export const WithLeadingIcon: Story = {
  render: () => (
    <div className="flex w-[300px] flex-col gap-16px bg-surface-page p-8">
      {sizes.map((size) => (
        <Input key={size} size={size} placeholder="Placeholder" leadingIcon={<Search />} />
      ))}
    </div>
  ),
}
