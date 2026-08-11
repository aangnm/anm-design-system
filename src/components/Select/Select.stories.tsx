import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const options = (
  <>
    <option value="">Selecciona…</option>
    <option value="a">Opción A</option>
    <option value="b">Opción B</option>
  </>
)

const meta: Meta<typeof Select> = {
  title: 'Core/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    children: options,
  },
}
export default meta

type Story = StoryObj<typeof Select>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <Select {...args} />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-16px bg-surface-page p-8 w-[280px]">
      <Select>{options}</Select>
      <Select disabled>{options}</Select>
      <Select error>{options}</Select>
    </div>
  ),
}
