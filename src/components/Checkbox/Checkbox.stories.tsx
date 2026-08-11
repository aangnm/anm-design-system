import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Core/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: { label: 'Etiqueta' },
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {
  args: { id: 'cb-playground' },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8">
      <Checkbox id="cb-1" label="Etiqueta" />
      <Checkbox id="cb-2" label="Etiqueta" defaultChecked />
      <Checkbox id="cb-3" label="Etiqueta" indeterminate />
      <Checkbox id="cb-4" label="Etiqueta" disabled />
    </div>
  ),
}
