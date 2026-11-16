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
      breadcrumb={<Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Main portfolio', href: '#' }, { label: 'Overview' }]} />}
      center={<DateIndicator date="Wednesday, May 27, 2026" tag="WK 22" />}
      actions={
        <>
          <TopbarAction aria-label="Search"><Search /></TopbarAction>
          <TopbarAction aria-label="Notifications"><Bell /></TopbarAction>
        </>
      }
    />
  ),
}
