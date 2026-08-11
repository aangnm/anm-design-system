import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Core/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: { children: 'Información' },
}
export default meta

type Story = StoryObj<typeof Tooltip>

export const Playground: Story = {
  render: (args) => (
    <div className="bg-surface-page p-8">
      <Tooltip {...args} />
    </div>
  ),
}
