import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tag } from './Tag'

const meta: Meta<typeof Tag> = {
  title: 'Core/Tag',
  component: Tag,
  tags: ['autodocs'],
  args: { children: 'Label' },
}
export default meta

type Story = StoryObj<typeof Tag>

export const Playground: Story = {
  args: { color: 'neutral' },
}

export const AllColors: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8px bg-surface-page p-8">
      {(['neutral', 'success', 'warning', 'error', 'info'] as const).map((color) => (
        <Tag key={color} color={color}>
          Etiqueta
        </Tag>
      ))}
    </div>
  ),
}

/** Color x Dismissible, mirroring the Figma set (the × has a 24x24 target). */
export const Dismissible: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-8px bg-surface-page p-8">
      {(['neutral', 'success', 'warning', 'error', 'info'] as const).map((color) => (
        <Tag key={color} color={color} dismissible>
          Etiqueta
        </Tag>
      ))}
    </div>
  ),
}
