import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardTitle, CardDescription } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'inline-radio', options: ['default', 'empty', 'loading', 'error'] },
  },
}
export default meta

type Story = StoryObj<typeof Card>

export const Playground: Story = {
  args: { state: 'default' },
  render: (args) => (
    <div className="w-[320px]">
      <Card {...args}>
        <CardTitle>Título de la tarjeta</CardTitle>
        <CardDescription>Contenido de la tarjeta con una descripción breve del elemento mostrado.</CardDescription>
      </Card>
    </div>
  ),
}

// Mirrors the four-state grid on the Data Display page.
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap gap-16px bg-surface-page p-24px">
      <div className="w-[320px]">
        <Card>
          <CardTitle>Título de la tarjeta</CardTitle>
          <CardDescription>Contenido de la tarjeta con una descripción breve del elemento mostrado.</CardDescription>
        </Card>
      </div>
      <div className="w-[320px]">
        <Card state="empty" />
      </div>
      <div className="w-[320px]">
        <Card state="loading" />
      </div>
      <div className="w-[320px]">
        <Card state="error" />
      </div>
    </div>
  ),
}
