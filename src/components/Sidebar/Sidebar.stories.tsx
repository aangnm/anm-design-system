import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronUp, Circle, LayoutDashboard, ArrowLeftRight, ChartColumn, Users, Settings } from 'lucide-react'
import { Sidebar, SidebarBrand, SidebarItem } from './Sidebar'
import { Avatar } from '@/components/Avatar'

const meta: Meta<typeof Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj<typeof Sidebar>

const nav = (
  <>
    <SidebarItem icon={<Circle />} active>
      Resumen
    </SidebarItem>
    <SidebarItem icon={<Circle />}>Transactions</SidebarItem>
    <SidebarItem icon={<Circle />}>Reports</SidebarItem>
    <SidebarItem icon={<Circle />}>Clients</SidebarItem>
    <SidebarItem icon={<Circle />}>Settings</SidebarItem>
  </>
)

// Same rows with a distinct icon each — the per-item icon slot (Figma: Icon · Overview,
// Transactions, Reports, Clients, Settings).
const navWithIcons = (
  <>
    <SidebarItem icon={<LayoutDashboard />} active>
      Resumen
    </SidebarItem>
    <SidebarItem icon={<ArrowLeftRight />}>Transactions</SidebarItem>
    <SidebarItem icon={<ChartColumn />}>Reports</SidebarItem>
    <SidebarItem icon={<Users />}>Clients</SidebarItem>
    <SidebarItem icon={<Settings />}>Settings</SidebarItem>
  </>
)

function Footer({ collapsed }: { collapsed?: boolean }) {
  if (collapsed) return <Avatar initials="LR" size="sm" />
  return (
    <>
      <div className="flex items-center gap-10px">
        <Avatar initials="LR" size="sm" />
        <div className="flex flex-col">
          <span className="text-sm text-text-primary">Laura Romero</span>
          <span className="text-text-xxs leading-4 text-text-secondary">Administrador</span>
        </div>
      </div>
      <ChevronUp className="size-4 text-icon-muted" />
    </>
  )
}

export const Expanded: Story = {
  render: () => (
    <div className="h-[600px]">
      <Sidebar brand={<SidebarBrand name="Workspace" />} footer={<Footer />}>
        {nav}
      </Sidebar>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div className="h-[600px]">
      <Sidebar
        aria-label="Sidebar, collapsed"
        collapsed
        brand={<SidebarBrand name="Workspace" />}
        footer={<Footer collapsed />}
      >
        {nav}
      </Sidebar>
    </div>
  ),
}

export const SideBySide: Story = {
  render: () => (
    <div className="flex h-[600px] gap-24px bg-surface-page">
      <Sidebar brand={<SidebarBrand name="Workspace" />} footer={<Footer />}>
        {nav}
      </Sidebar>
      <Sidebar
        aria-label="Sidebar, collapsed"
        collapsed
        brand={<SidebarBrand name="Workspace" />}
        footer={<Footer collapsed />}
      >
        {nav}
      </Sidebar>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex h-[600px] gap-24px bg-surface-page">
      <Sidebar brand={<SidebarBrand name="Workspace" />} footer={<Footer />}>
        {navWithIcons}
      </Sidebar>
      <Sidebar
        aria-label="Sidebar, collapsed"
        collapsed
        brand={<SidebarBrand name="Workspace" />}
        footer={<Footer collapsed />}
      >
        {navWithIcons}
      </Sidebar>
    </div>
  ),
}
