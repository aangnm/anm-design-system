import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowLeftRight, Bell, ChartColumn, ChevronUp, LayoutDashboard, Search as SearchIcon, Settings, Users } from 'lucide-react'
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
// fintech data story (accounts, revenue categories, USD). This is a story file only — it is not exported from the
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

type NavKey = 'resumen' | 'transacciones' | 'reportes' | 'clientes' | 'configuracion'

function AppSidebar({ active }: { active: NavKey }) {
  return (
    <Sidebar
      className="h-auto"
      brand={<SidebarBrand name="Espacio de trabajo" />}
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
      <SidebarItem icon={<LayoutDashboard />} active={active === 'resumen'}>
        Resumen
      </SidebarItem>
      <SidebarItem icon={<ArrowLeftRight />} active={active === 'transacciones'}>
        Transacciones
      </SidebarItem>
      <SidebarItem icon={<ChartColumn />} active={active === 'reportes'}>
        Reportes
      </SidebarItem>
      <SidebarItem icon={<Users />} active={active === 'clientes'}>
        Clientes
      </SidebarItem>
      <SidebarItem icon={<Settings />} active={active === 'configuracion'}>
        Configuración
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
  return <Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Espacio de trabajo', href: '#' }, { label: page }]} />
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
  { key: 'cuenta', header: 'Cuenta', width: 70 },
  { key: 'categoria', header: 'Categoría' },
  { key: 'estado', header: 'Estado', width: 120 },
  { key: 'monto', header: 'Monto', width: 90 },
  { key: 'moneda', header: 'Moneda', width: 90 },
]

const tableRows = [
  { cuenta: '4021', categoria: 'Ventas', estado: <Tag color="success">Activa</Tag>, monto: '250', moneda: 'USD' },
  { cuenta: '4035', categoria: 'Suscripciones', estado: <Tag color="warning">Pendiente</Tag>, monto: '—', moneda: 'USD' },
  { cuenta: '4102', categoria: 'Reembolsos', estado: <Tag color="success">Activa</Tag>, monto: '98', moneda: 'EUR' },
  { cuenta: '4118', categoria: 'Comisiones', estado: <Tag color="success">Activa</Tag>, monto: '76', moneda: 'USD' },
]

function DashboardBody() {
  return (
    <>
      <div className="grid grid-cols-3 gap-16px">
        <Stat label="Ingresos totales" value="$ 128.450" delta="12,5 %" trend="up" deltaCaption="vs. mes anterior" />
        <Stat label="Transacciones del mes" value="342" delta="8,2 %" trend="up" deltaCaption="vs. mes anterior" />
        <Stat label="Tasa de aprobación" value="87 %" delta="1,4 %" trend="down" deltaCaption="vs. mes anterior" />
      </div>
      <div className="grid grid-cols-[368px_minmax(0,1fr)] items-start gap-16px">
        <ContentPanel title="Ingresos semanales (miles USD)" className="w-full">
          <BarChart data={productionData} max={300} className="w-full" aria-label="Ingresos semanales en miles de USD" />
        </ContentPanel>
        <ContentPanel title="Transacciones recientes" className="w-full">
          <Table columns={tableColumns} rows={tableRows} bordered={false} />
        </ContentPanel>
      </div>
    </>
  )
}

export const Dashboard: Story = {
  render: () => (
    <WithSidebar active="resumen">
      {crumbs('Resumen')}
      <PageHeader title="Resumen" subtitle="Cartera principal · Semana 22" actions={<>{bellButton}{newRecord}</>} />
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
    <WithSidebar active="configuracion">
      {crumbs('Configuración')}
      <PageHeader title="Configuración" subtitle="Perfil y preferencias de la cuenta" />
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
    <WithSidebar active="transacciones">
      {crumbs('Transacciones')}
      <PageHeader title="Transacciones" subtitle="Cartera principal · Semana 22" actions={<>{bellButton}{newRecord}</>} />
      <div className="grid grid-cols-2 items-start gap-24px">
        <ContentPanel title="Transacciones recientes" className="w-full">
          <div className="flex w-full flex-col gap-12px">
            <Search placeholder="Buscar…" aria-label="Buscar transacciones" />
            <div className={borderless}>
              <List
                items={[
                  { title: 'Cuenta 4021', subtitle: 'Ventas · Sem 22', value: '$ 250', onSelect: () => {} },
                  { title: 'Cuenta 4035', subtitle: 'Suscripciones · Sem 21', value: '—', onSelect: () => {} },
                  { title: 'Cuenta 4102', subtitle: 'Reembolsos · Sem 22', value: '$ 98', onSelect: () => {} },
                ]}
              />
            </div>
          </div>
        </ContentPanel>
        <div className="flex w-full flex-col gap-16px rounded-lg border border-border-subtle bg-surface-container p-16px">
          <div className="flex items-center gap-12px">
            <p className="text-base font-semibold leading-6 text-text-primary">Cuenta 4021 · Ventas</p>
            <Tag color="success">Activa</Tag>
            <Button variant="secondary" className="ml-auto">
              Editar
            </Button>
          </div>
          <Divider />
          <dl className="flex flex-col">
            <DetailRow label="Fecha" value="27 may 2026" />
            <DetailRow label="Responsable" value="Elainy Romero" />
            <DetailRow label="Monto" value="$ 250,00" />
            <DetailRow label="Comisión" value="$ 3,00" />
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
        brand={<Breadcrumb items={[{ label: 'Inicio', href: '#' }, { label: 'Espacio de trabajo', href: '#' }, { label: 'Resumen' }]} />}
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
        <PageHeader title="Resumen" subtitle="Cartera principal · Semana 22" actions={newRecord} />
        <DashboardBody />
      </main>
    </div>
  ),
}
