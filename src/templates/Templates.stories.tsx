import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowLeftRight, Bell, ChartColumn, ChevronUp, LayoutDashboard, Search as SearchIcon, Settings, Users } from 'lucide-react'
import { AppBar } from '@/components/AppBar'
import { Avatar } from '@/components/Avatar'
import { BarChart } from '@/components/BarChart'
import { Breadcrumb } from '@/components/Breadcrumb'
import { Button } from '@/components/Button'
import { ContentPanel } from '@/components/ContentPanel'
import { Divider } from '@/components/Divider'
import { FormField } from '@/components/FormField'
import { IconButton } from '@/components/IconButton'
import { List } from '@/components/List'
import { Navbar } from '@/components/Navbar'
import { PageHeader } from '@/components/PageHeader'
import { Search } from '@/components/Search'
import { Select } from '@/components/Select'
import { Sidebar, SidebarBrand, SidebarItem } from '@/components/Sidebar'
import { Stat } from '@/components/Stat'
import { Switch } from '@/components/Switch'
import { Table } from '@/components/Table'
import { Tag } from '@/components/Tag'

// Reference layouts from the Figma Templates page: four pages assembled only
// from library components, with the same English sample copy and the
// business-analytics data story (accounts, revenue categories, USD). This is a story file only — it is not exported from the
// package; it exists so a page-level composition is checked in both themes.
// The `-m-8` on each root cancels the global story decorator's `p-8`, so the
// layouts render full-bleed like the Figma frames.

const meta: Meta = {
  title: 'Templates',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta

type Story = StoryObj

type NavKey = 'overview' | 'transactions' | 'reports' | 'clients' | 'settings'

function AppSidebar({ active }: { active: NavKey }) {
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
function WithSidebar({ active, children }: { active: NavKey; children: ReactNode }) {
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

const bellButton = <IconButton variant="secondary" icon={<Bell />} aria-label="Notifications" />
const newRecord = <Button variant="primary">New record</Button>

function crumbs(page: string) {
  return <Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Main portfolio', href: '#' }, { label: page }]} />
}

// A ContentPanel hosts a List borderless: strip the nested surface's own edge so
// the panel owns the card chrome (Table has a `bordered` prop for the same job).
const borderless = '[&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent'

const productionData = [
  { label: 'S1', value: 125 },
  { label: 'S2', value: 190 },
  { label: 'S3', value: 145 },
  { label: 'S4', value: 235 },
  { label: 'S5', value: 210 },
  { label: 'S6', value: 255 },
]

const tableColumns = [
  { key: 'account', header: 'Account', width: 70 },
  { key: 'category', header: 'Category' },
  { key: 'status', header: 'Status', width: 120 },
  { key: 'amount', header: 'Amount', width: 90 },
  { key: 'currency', header: 'Currency', width: 90 },
]

const tableRows = [
  { account: '4021', category: 'Sales', status: <Tag color="success">Active</Tag>, amount: '250', currency: 'USD' },
  { account: '4035', category: 'Subscriptions', status: <Tag color="warning">Pending</Tag>, amount: '—', currency: 'USD' },
  { account: '4102', category: 'Refunds', status: <Tag color="success">Active</Tag>, amount: '98', currency: 'EUR' },
  { account: '4118', category: 'Commissions', status: <Tag color="success">Active</Tag>, amount: '76', currency: 'USD' },
]

function DashboardBody() {
  return (
    <>
      <div className="grid grid-cols-1 gap-16px sm:grid-cols-3">
        <Stat label="Total revenue" value="$128,450" delta="12.5%" trend="up" deltaCaption="vs. last month" />
        <Stat label="Transactions this month" value="342" delta="8.2%" trend="up" deltaCaption="vs. last month" />
        <Stat label="Approval rate" value="87%" delta="1.4%" trend="down" deltaCaption="vs. last month" />
      </div>
      <div className="grid grid-cols-1 items-start gap-16px xl:grid-cols-[368px_minmax(0,1fr)]">
        <ContentPanel title="Weekly revenue (USD thousands)" className="w-full">
          <BarChart data={productionData} max={300} className="w-full" aria-label="Weekly revenue in USD thousands" />
        </ContentPanel>
        <ContentPanel title="Recent transactions" className="w-full">
          <Table columns={tableColumns} rows={tableRows} bordered={false} />
        </ContentPanel>
      </div>
    </>
  )
}

export const Dashboard: Story = {
  render: () => (
    <WithSidebar active="overview">
      {crumbs('Overview')}
      <PageHeader title="Overview" subtitle="Main portfolio · Week 22" actions={<>{bellButton}{newRecord}</>} />
      <DashboardBody />
    </WithSidebar>
  ),
}

function SettingsSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ContentPanel title={title} className="w-full gap-12px">
      {children}
    </ContentPanel>
  )
}

function PreferenceRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex w-full items-center justify-between border-b border-border-subtle py-12px last:border-b-0">
      <span className="text-sm text-text-primary">{label}</span>
      <Switch aria-label={label} defaultChecked={defaultChecked} />
    </div>
  )
}

export const Settings_: Story = {
  name: 'Settings',
  render: () => (
    <WithSidebar active="settings">
      {crumbs('Settings')}
      <PageHeader title="Settings" subtitle="Account profile and preferences" />
      <div className="mx-auto flex w-full max-w-[640px] flex-col gap-24px pt-16px md:pt-48px">
        <SettingsSection title="Profile">
          <div className="flex w-full flex-col gap-16px">
            <FormField label="Full name" placeholder="Laura Romero" helperText="This is how you appear in records." />
            <FormField label="Email" placeholder="name@company.com" helperText="Alerts are sent here." />
            <div className="flex flex-col gap-6px">
              <label htmlFor="rol" className="text-text-xxs font-medium leading-4 text-text-primary">
                Role
              </label>
              <Select id="rol" defaultValue="">
                <option value="" disabled>
                  Select…
                </option>
                <option>Administrator</option>
                <option>Supervisor</option>
                <option>Analyst</option>
              </Select>
            </div>
          </div>
        </SettingsSection>
        <SettingsSection title="Preferences">
          <div className="flex w-full flex-col">
            <PreferenceRow label="Push notifications" defaultChecked />
            <PreferenceRow label="Dark mode" defaultChecked />
            <PreferenceRow label="Email alerts" />
          </div>
        </SettingsSection>
        <div className="flex justify-end gap-8px">
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </div>
      </div>
    </WithSidebar>
  ),
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[120px_1fr] items-center border-b sm:grid-cols-[180px_1fr] border-border-subtle py-10px last:border-b-0">
      <dt className="text-text-xxs leading-4 text-text-secondary">{label}</dt>
      <dd className="text-sm font-medium text-text-primary">{value}</dd>
    </div>
  )
}

export const Records: Story = {
  name: 'Records (List + Detail)',
  render: () => (
    <WithSidebar active="transactions">
      {crumbs('Transactions')}
      <PageHeader title="Transactions" subtitle="Main portfolio · Week 22" actions={<>{bellButton}{newRecord}</>} />
      <div className="grid grid-cols-1 items-start gap-24px lg:grid-cols-2">
        <ContentPanel title="Recent transactions" className="w-full">
          <div className="flex w-full flex-col gap-12px">
            <Search placeholder="Search…" aria-label="Search transactions" />
            <div className={borderless}>
              <List
                items={[
                  { title: 'Account 4021', subtitle: 'Sales · Wk 22', value: '$250', onSelect: () => {} },
                  { title: 'Account 4035', subtitle: 'Subscriptions · Wk 21', value: '—', onSelect: () => {} },
                  { title: 'Account 4102', subtitle: 'Refunds · Wk 22', value: '$98', onSelect: () => {} },
                ]}
              />
            </div>
          </div>
        </ContentPanel>
        <div className="flex w-full flex-col gap-16px rounded-lg border border-border-subtle bg-surface-container p-16px">
          <div className="flex items-center gap-12px">
            <p className="text-base font-semibold leading-6 text-text-primary">Account 4021 · Sales</p>
            <Tag color="success">Active</Tag>
            <Button variant="secondary" className="ml-auto">
              Edit
            </Button>
          </div>
          <Divider />
          <dl className="flex flex-col">
            <DetailRow label="Date" value="May 27, 2026" />
            <DetailRow label="Owner" value="Laura Romero" />
            <DetailRow label="Amount" value="$250.00" />
            <DetailRow label="Commission" value="$3.00" />
          </dl>
          <div className="flex justify-end gap-8px">
            <Button variant="secondary">Cancel</Button>
            <Button variant="primary">Save changes</Button>
          </div>
        </div>
      </div>
    </WithSidebar>
  ),
}

const iconAction = 'inline-flex size-24px items-center justify-center rounded-xs text-icon-muted outline-none transition-colors hover:text-text-primary focus-visible:focus-ring [&>svg]:size-5'

export const DashboardTopNavbar: Story = {
  name: 'Dashboard · Top navbar',
  render: () => (
    <div className="-m-8 flex min-h-[900px] flex-col bg-surface-page">
      <Navbar
        className="px-16px md:px-32px"
        brand={<Breadcrumb items={[{ label: 'Home', href: '#' }, { label: 'Main portfolio', href: '#' }, { label: 'Overview' }]} />}
        actions={
          <>
            <button type="button" aria-label="Search" className={iconAction}>
              <SearchIcon />
            </button>
            <button type="button" aria-label="Notifications" className={iconAction}>
              <Bell />
            </button>
          </>
        }
      >
        <span className="hidden text-sm font-medium text-text-primary md:inline">Wednesday, May 27, 2026</span>
        <Tag className="hidden md:inline-flex">WK 22</Tag>
      </Navbar>
      <main className="flex flex-col gap-16px p-16px md:p-24px lg:p-32px">
        <PageHeader title="Overview" subtitle="Main portfolio · Week 22" actions={newRecord} />
        <DashboardBody />
      </main>
    </div>
  ),
}

// The same templates at phone width (Storybook viewport), so the responsive
// shell is checked, not assumed: App Bar instead of Sidebar, one-column grids,
// tables scrolling sideways.
const mobile = { globals: { viewport: { value: 'mobile2', isRotated: false } } }
export const DashboardMobile: Story = { ...Dashboard, name: 'Dashboard · Mobile', ...mobile }
export const RecordsMobile: Story = { ...Records, name: 'Records · Mobile', ...mobile }
export const SettingsMobile: Story = { ...Settings_, name: 'Settings · Mobile', ...mobile }
