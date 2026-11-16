import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, Search } from 'lucide-react'
import { Topbar, TopbarAction } from './Topbar'
import { Breadcrumb } from '@/components/Breadcrumb'
import { DateIndicator } from '@/components/DateIndicator'

const meta: Meta<typeof Topbar> = {
  title: 'Navigation/Topbar',
  component: Topbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Topbar>

// Figma: Topbar / Alt.
export const Playground: Story = {
  render: () => (
    <Topbar
      breadcrumb={<Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Cartera principal', href: '#' }, { label: 'Resumen' }]} />}
      center={<DateIndicator date="Miércoles, 27 may 2026" tag="SEM 22" />}
      actions={
        <>
          <TopbarAction aria-label="Buscar"><Search /></TopbarAction>
          <TopbarAction aria-label="Notificaciones"><Bell /></TopbarAction>
        </>
      }
    />
  ),
}
