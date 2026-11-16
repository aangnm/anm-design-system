import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Core/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Write a note…' },
  decorators: [
    (Story) => (
      <div className="w-[280px] bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof Textarea>

export const Playground: Story = {}

const states = [
  { label: 'Default', props: {}, cls: '' },
  { label: 'Hover', props: {}, cls: 'border-border-emphasis' },
  { label: 'Focus', props: {}, cls: 'focus-ring!' },
  { label: 'Disabled', props: { disabled: true }, cls: '' },
  { label: 'Error', props: { error: true }, cls: '' },
  { label: 'Focus + Error', props: { error: true }, cls: 'focus-ring!' },
]

/** Mirrors the Figma State column (no Size axis; Hover/Focus forced with the same tokens). */
export const States: Story = {
  decorators: [],
  render: () => (
    <div className="flex flex-wrap gap-16px bg-surface-page p-8">
      {states.map((s) => (
        <div key={s.label} className="flex w-[280px] flex-col gap-4px">
          <span className="text-text-caption leading-4 text-text-secondary">{s.label}</span>
          <Textarea placeholder="Write a note…" className={s.cls} {...s.props} />
        </div>
      ))}
    </div>
  ),
}
