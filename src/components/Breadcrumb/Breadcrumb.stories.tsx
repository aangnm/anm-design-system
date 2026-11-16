import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Section', href: '#' }, { label: 'Current page' }],
  },
}
export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Playground: Story = {
  render: (args) => (
    <div className="bg-surface-page p-24px">
      <Breadcrumb {...args} />
    </div>
  ),
}

export const TwoLevels: Story = {
  args: { items: [{ label: 'Home', href: '#' }, { label: 'Current page' }] },
  render: Playground.render,
}
