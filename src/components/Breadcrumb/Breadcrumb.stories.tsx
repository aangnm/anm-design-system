import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumb } from './Breadcrumb'

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [{ label: 'Inicio', href: '#' }, { label: 'Sección', href: '#' }, { label: 'Página actual' }],
  },
}
export default meta

type Story = StoryObj<typeof Breadcrumb>

export const Playground: Story = {}

export const TwoLevels: Story = {
  args: { items: [{ label: 'Inicio', href: '#' }, { label: 'Página actual' }] },
}
