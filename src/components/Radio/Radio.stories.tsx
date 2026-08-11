import type { Meta, StoryObj } from '@storybook/react-vite'
import { Radio } from './Radio'

const meta: Meta<typeof Radio> = {
  title: 'Core/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { label: 'Etiqueta', name: 'radio-group' },
}
export default meta

type Story = StoryObj<typeof Radio>

export const Playground: Story = {
  args: { id: 'radio-playground' },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8">
      <Radio id="r-1" name="r-group" label="Etiqueta" />
      <Radio id="r-2" name="r-group" label="Etiqueta" defaultChecked />
      <Radio id="r-3" name="r-group-disabled" label="Etiqueta" disabled />
    </div>
  ),
}
