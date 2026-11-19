import type { ReactNode } from 'react'
import { ArrowLeftRight, ChartColumn, ChevronUp, LayoutDashboard, Settings, Sparkles, Users } from 'lucide-react'
import { AppBar } from '@/components/AppBar'
import { Avatar } from '@/components/Avatar'
import { Sidebar, SidebarBrand, SidebarItem } from '@/components/Sidebar'

// The app shell shared by Templates and Blocks: Sidebar from lg up, App Bar
// below. Story-only; not exported from the package.

export type NavKey = 'overview' | 'transactions' | 'reports' | 'assistant' | 'clients' | 'settings'

export function AppSidebar({ active }: { active: NavKey }) {
  return (
    <Sidebar
      className="h-auto"
      brand={<SidebarBrand name="Workspace" />}
      footer={
        <>
          <div className="flex items-center gap-10px">
            <Avatar initials="LR" size="sm" />
            <div className="flex flex-col">
              <span className="text-sm leading-5 text-text-primary">Laura Romero</span>
              <span className="text-text-xxs leading-4 text-text-secondary">Administrator</span>
            </div>
          </div>
          <ChevronUp className="size-4 text-icon-muted" />
        </>
      }
    >
      <SidebarItem icon={<LayoutDashboard />} active={active === 'overview'}>
        Overview
      </SidebarItem>
      <SidebarItem icon={<ArrowLeftRight />} active={active === 'transactions'}>
        Transactions
      </SidebarItem>
      <SidebarItem icon={<ChartColumn />} active={active === 'reports'}>
        Reports
      </SidebarItem>
      <SidebarItem icon={<Sparkles />} active={active === 'assistant'}>
        Assistant
      </SidebarItem>
      <SidebarItem icon={<Users />} active={active === 'clients'}>
        Clients
      </SidebarItem>
      <SidebarItem icon={<Settings />} active={active === 'settings'}>
        Settings
      </SidebarItem>
    </Sidebar>
  )
}

// Responsive shell: the Sidebar from lg (1024px) up; below that an App Bar
// with a menu button takes its place, and the page padding steps down
// 32 → 24 → 16 with the grid margins (grid/margin/desktop, tablet, mobile).
export function WithSidebar({ active, children }: { active: NavKey; children: ReactNode }) {
  return (
    <div className="-m-8 flex min-h-[900px] flex-col bg-surface-page lg:flex-row">
      <div className="hidden lg:flex">
        <AppSidebar active={active} />
      </div>
      <AppBar className="lg:hidden" trailing={<Avatar initials="LR" size="sm" />} />
      <main className="flex min-w-0 flex-1 flex-col gap-16px p-16px md:p-24px lg:p-32px">{children}</main>
    </div>
  )
}

