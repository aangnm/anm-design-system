import type { Meta, StoryObj } from '@storybook/react-vite'
import { List } from './List'

const items = [
  { title: 'Cuenta 4021', subtitle: 'Ventas · Sem 22', value: '$ 250' },
  { title: 'Cuenta 4035', subtitle: 'Suscripciones · Sem 21', value: '—' },
  { title: 'Cuenta 4102', subtitle: 'Reembolsos · Sem 22', value: '$ 98' },
]

const meta: Meta<typeof List> = {
  title: 'Data Display/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'empty', 'loading', 'error'] },
  },
  args: { items, state: 'default' },
}
export default meta

type Story = StoryObj<typeof List>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[360px]">
      <List {...args} />
    </div>
  ),
}

// Mirrors the four-state grid on the Data Display page.
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-16px bg-surface-page p-24px">
      <div className="w-[360px]">
        <List items={items} />
      </div>
      <div className="w-[360px]">
        <List state="empty" />
      </div>
      <div className="w-[360px]">
        <List state="loading" />
      </div>
      <div className="w-[360px]">
        <List state="error" />
      </div>
    </div>
  ),
}
