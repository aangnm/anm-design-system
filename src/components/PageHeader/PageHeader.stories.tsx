import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell } from 'lucide-react'
import { PageHeader } from './PageHeader'
import { IconButton } from '@/components/IconButton'
import { Button } from '@/components/Button'

const meta: Meta<typeof PageHeader> = {
  title: 'Product Patterns/Page Header',
  component: PageHeader,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[800px] bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof PageHeader>

export const Playground: Story = {
  args: {
    title: 'Cartera',
    subtitle: 'Cartera principal · 1.284 cuentas · Semana 22',
    actions: (
      <>
        <IconButton variant="secondary" icon={<Bell />} aria-label="Notificaciones" />
        <Button variant="primary">Nuevo registro</Button>
      </>
    ),
  },
}
