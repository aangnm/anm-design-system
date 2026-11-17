import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from './FormField'

const meta: Meta<typeof FormField> = {
  title: 'Core/Form Field',
  component: FormField,
  tags: ['autodocs'],
  args: { label: 'Label', placeholder: 'Placeholder' },
}
export default meta

type Story = StoryObj<typeof FormField>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <FormField {...args} />
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-24px bg-surface-page p-8 w-[280px]">
      <FormField label="Label" placeholder="Placeholder" helperText="Optional helper text" />
      <FormField label="Label" placeholder="Placeholder" error helperText="This field is required" />
    </div>
  ),
}
