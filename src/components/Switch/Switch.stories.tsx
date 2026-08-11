import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from './Switch'

const meta: Meta<typeof Switch> = {
  title: 'Core/Switch',
  component: Switch,
  tags: ['autodocs'],
  args: { label: 'Etiqueta' },
}
export default meta

type Story = StoryObj<typeof Switch>

export const Playground: Story = {
  args: { id: 'switch-playground' },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8">
      <Switch id="sw-1" label="Etiqueta" />
      <Switch id="sw-2" label="Etiqueta" defaultChecked />
      <Switch id="sw-3" label="Etiqueta" disabled />
    </div>
  ),
}
