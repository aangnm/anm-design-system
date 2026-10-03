import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, ChartColumn, ChevronUp, ClipboardList, LayoutDashboard, Leaf, MapPin, Search as SearchIcon, Settings } from 'lucide-react'
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
// from library components, with the same Spanish (es-EC) sample copy and the
// Tallos data story. This is a story file only — it is not exported from the
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

type NavKey = 'panel' | 'registros' | 'analisis' | 'zonas' | 'ajustes'

function AppSidebar({ active }: { active: NavKey }) {
  return (
    <Sidebar
      className="h-auto"
      brand={<SidebarBrand logo={<Leaf className="size-6 text-text-primary" />} name="Santa Fe" />}
      footer={
        <>
          <div className="flex items-center gap-10px">
            <Avatar initials="ER" size="sm" />
            <div className="flex flex-col">
              <span className="text-sm leading-5 text-text-primary">Elainy Romero</span>
              <span className="text-text-xxs leading-4 text-text-secondary">Administrador</span>
            </div>
          </div>
          <ChevronUp className="size-4 text-icon-muted" />
        </>
      }
    >
      <SidebarItem icon={<LayoutDashboard />} active={active === 'panel'}>
        Panel
      </SidebarItem>
      <SidebarItem icon={<ClipboardList />} active={active === 'registros'}>
        Registros
      </SidebarItem>
      <SidebarItem icon={<ChartColumn />} active={active === 'analisis'}>
        Análisis
      </SidebarItem>
      <SidebarItem icon={<MapPin />} active={active === 'zonas'}>
        Zonas
      </SidebarItem>
      <SidebarItem icon={<Settings />} active={active === 'ajustes'}>
        Ajustes
      </SidebarItem>
    </Sidebar>
  )
}

function WithSidebar({ active, children }: { active: NavKey; children: ReactNode }) {
  return (
    <div className="-m-8 flex min-h-[900px] bg-surface-page">
      <AppSidebar active={active} />
      <main className="flex min-w-0 flex-1 flex-col gap-16px p-32px">{children}</main>
    </div>
  )
}

const bellButton = <IconButton variant="secondary" icon={<Bell />} aria-label="Notificaciones" />
const newRecord = <Button variant="primary">Nuevo registro</Button>

function crumbs(page: string) {
  return <Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Santa Fe', href: '#' }, { label: page }]} />
}

// A ContentPanel hosts a Table / List borderless: strip the nested surface's own
// edge so the panel owns the card chrome.
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
  { key: 'lote', header: 'Lote', width: 70 },
  { key: 'actividad', header: 'Actividad' },
  { key: 'estado', header: 'Estado', width: 120 },
  { key: 'data', header: 'Data', width: 90 },
  { key: 'unidad', header: 'Unidad', width: 90 },
]

const tableRows = [
  { lote: '07', actividad: 'Cosecha', estado: <Tag color="success">Activa</Tag>, data: '250', unidad: 'Tallos' },
  { lote: '12', actividad: 'Fertilización', estado: <Tag color="warning">Pendiente</Tag>, data: '—', unidad: 'Kg/Ha' },
  { lote: '15N', actividad: 'Monitoreo', estado: <Tag color="success">Activa</Tag>, data: '98', unidad: 'Plantas' },
  { lote: '18', actividad: 'Riego', estado: <Tag color="success">Activa</Tag>, data: '7,6', unidad: 'L/Ha' },
]

function DashboardBody() {
  return (
    <>
      <div className="grid grid-cols-3 gap-16px">
        <Stat label="Producción total" value="1.284 Tallos" delta="12,5 %" trend="up" deltaCaption="vs. mes anterior" />
        <Stat label="Cosechas del mes" value="342" delta="8,2 %" trend="up" deltaCaption="vs. mes anterior" />
        <Stat label="Rendimiento" value="87 %" delta="1,4 %" trend="down" deltaCaption="vs. mes anterior" />
      </div>
      <div className="grid grid-cols-[368px_minmax(0,1fr)] items-start gap-16px">
        <ContentPanel title="Producción semanal (Tallos)" className="w-full">
          <BarChart data={productionData} max={300} className="w-full" aria-label="Producción semanal en Tallos" />
        </ContentPanel>
        <ContentPanel title="Registros recientes" className="w-full">
          <div className={`w-full ${borderless}`}>
            <Table columns={tableColumns} rows={tableRows} />
          </div>
        </ContentPanel>
      </div>
    </>
  )
}

export const Dashboard: Story = {
  render: () => (
    <WithSidebar active="panel">
      {crumbs('Panel')}
      <PageHeader title="Panel" subtitle="Santa Fe · Semana 22" actions={<>{bellButton}{newRecord}</>} />
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
    <WithSidebar active="ajustes">
      {crumbs('Ajustes')}
      <PageHeader title="Ajustes" subtitle="Perfil y preferencias de la cuenta" />
      <div className="mx-auto flex w-[640px] flex-col gap-24px pt-48px">
        <SettingsSection title="Perfil">
          <div className="flex w-full flex-col gap-16px">
            <FormField label="Nombre completo" placeholder="Elainy Romero" helperText="Así aparecerás en los registros." />
            <FormField label="Correo electrónico" placeholder="nombre@empresa.com" helperText="Aquí recibirás las alertas." />
            <div className="flex flex-col gap-6px">
              <label htmlFor="rol" className="text-text-xxs font-medium leading-4 text-text-primary">
                Rol
              </label>
              <Select id="rol" defaultValue="">
                <option value="" disabled>
                  Selecciona…
                </option>
                <option>Administrador</option>
                <option>Supervisor</option>
                <option>Operario</option>
              </Select>
            </div>
          </div>
        </SettingsSection>
        <SettingsSection title="Preferencias">
          <div className="flex w-full flex-col">
            <PreferenceRow label="Notificaciones push" defaultChecked />
            <PreferenceRow label="Modo oscuro" defaultChecked />
            <PreferenceRow label="Alertas por correo" />
          </div>
        </SettingsSection>
        <div className="flex justify-end gap-8px">
          <Button variant="secondary">Cancelar</Button>
          <Button variant="primary">Guardar cambios</Button>
        </div>
      </div>
    </WithSidebar>
  ),
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[180px_1fr] items-center border-b border-border-subtle py-10px last:border-b-0">
      <dt className="text-text-xxs leading-4 text-text-secondary">{label}</dt>
      <dd className="text-sm font-medium text-text-primary">{value}</dd>
    </div>
  )
}

export const Records: Story = {
  name: 'Records (List + Detail)',
  render: () => (
    <WithSidebar active="registros">
      {crumbs('Registros')}
      <PageHeader title="Registros" subtitle="Santa Fe · Semana 22" actions={<>{bellButton}{newRecord}</>} />
      <div className="grid grid-cols-2 items-start gap-24px">
        <ContentPanel title="Registros recientes" className="w-full">
          <div className="flex w-full flex-col gap-12px">
            <Search placeholder="Buscar…" aria-label="Buscar registros" />
            <div className={borderless}>
              <List
                items={[
                  { title: 'Lote 07', subtitle: 'Cosecha · Sem 22', value: '250 Tallos', onSelect: () => {} },
                  { title: 'Lote 12', subtitle: 'Fertilización · Sem 21', value: '—', onSelect: () => {} },
                  { title: 'Lote 15N', subtitle: 'Monitoreo · Sem 22', value: '98 Plantas', onSelect: () => {} },
                ]}
              />
            </div>
          </div>
        </ContentPanel>
        <div className="flex w-full flex-col gap-16px rounded-lg border border-border-subtle bg-surface-subtle p-16px">
          <div className="flex items-center gap-12px">
            <p className="text-base font-semibold leading-6 text-text-primary">Lote 07 · Cosecha</p>
            <Tag color="success">Activa</Tag>
            <Button variant="secondary" className="ml-auto">
              Editar
            </Button>
          </div>
          <Divider />
          <dl className="flex flex-col">
            <DetailRow label="Fecha" value="27 may 2026" />
            <DetailRow label="Responsable" value="Elainy Romero" />
            <DetailRow label="Tallos cosechados" value="250" />
            <DetailRow label="Rendimiento" value="87 %" />
          </dl>
          <div className="flex justify-end gap-8px">
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Guardar cambios</Button>
          </div>
        </div>
      </div>
    </WithSidebar>
  ),
}

const iconAction = 'inline-flex size-24px items-center justify-center rounded-xs text-icon-muted outline-none transition-colors hover:text-text-primary focus-visible:ring-1 focus-visible:ring-focus-ring [&>svg]:size-5'

export const DashboardTopNavbar: Story = {
  name: 'Dashboard · Top navbar',
  render: () => (
    <div className="-m-8 flex min-h-[900px] flex-col bg-surface-page">
      <Navbar
        className="px-32px"
        brand={<Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Santa Fe', href: '#' }, { label: 'Panel' }]} />}
        actions={
          <>
            <button type="button" aria-label="Buscar" className={iconAction}>
              <SearchIcon />
            </button>
            <button type="button" aria-label="Notificaciones" className={iconAction}>
              <Bell />
            </button>
          </>
        }
      >
        <span className="text-sm font-medium text-text-primary">Miércoles, 27 may 2026</span>
        <Tag>SEM 22</Tag>
      </Navbar>
      <main className="flex flex-col gap-16px p-32px">
        <PageHeader title="Panel" subtitle="Santa Fe · Semana 22" actions={newRecord} />
        <DashboardBody />
      </main>
    </div>
  ),
}
