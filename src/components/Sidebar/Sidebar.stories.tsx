import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronUp, Circle, LayoutDashboard, ClipboardList, ChartLine, Map, Settings } from 'lucide-react'
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
      Panel
    </SidebarItem>
    <SidebarItem icon={<Circle />}>Registros</SidebarItem>
    <SidebarItem icon={<Circle />}>Análisis</SidebarItem>
    <SidebarItem icon={<Circle />}>Zonas</SidebarItem>
    <SidebarItem icon={<Circle />}>Ajustes</SidebarItem>
  </>
)

// Same rows with a distinct icon each — the per-item icon slot (Figma: Icon · Panel,
// Registros, Análisis, Zonas, Ajustes).
const navWithIcons = (
  <>
    <SidebarItem icon={<LayoutDashboard />} active>
      Panel
    </SidebarItem>
    <SidebarItem icon={<ClipboardList />}>Registros</SidebarItem>
    <SidebarItem icon={<ChartLine />}>Análisis</SidebarItem>
    <SidebarItem icon={<Map />}>Zonas</SidebarItem>
    <SidebarItem icon={<Settings />}>Ajustes</SidebarItem>
  </>
)

function Footer({ collapsed }: { collapsed?: boolean }) {
  if (collapsed) return <Avatar initials="OA" size="sm" />
  return (
    <>
      <div className="flex items-center gap-10px">
        <Avatar initials="OA" size="sm" />
        <div className="flex flex-col">
          <span className="text-sm text-text-primary">Oscar Andrade</span>
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
      <Sidebar brand={<SidebarBrand logo={<Circle className="size-6 text-text-primary" />} name="Santa Fe" />} footer={<Footer />}>
        {nav}
      </Sidebar>
    </div>
  ),
}

export const Collapsed: Story = {
  render: () => (
    <div className="h-[600px]">
      <Sidebar
        collapsed
        brand={<SidebarBrand logo={<Circle className="size-6 text-text-primary" />} name="Santa Fe" />}
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
      <Sidebar brand={<SidebarBrand logo={<Circle className="size-6 text-text-primary" />} name="Santa Fe" />} footer={<Footer />}>
        {nav}
      </Sidebar>
      <Sidebar
        collapsed
        brand={<SidebarBrand logo={<Circle className="size-6 text-text-primary" />} name="Santa Fe" />}
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
      <Sidebar brand={<SidebarBrand logo={<Circle className="size-6 text-text-primary" />} name="Santa Fe" />} footer={<Footer />}>
        {navWithIcons}
      </Sidebar>
      <Sidebar
        collapsed
        brand={<SidebarBrand logo={<Circle className="size-6 text-text-primary" />} name="Santa Fe" />}
        footer={<Footer collapsed />}
      >
        {navWithIcons}
      </Sidebar>
    </div>
  ),
}
