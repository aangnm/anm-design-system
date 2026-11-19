import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, Download, KeyRound, Paperclip, RefreshCw, Share2, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/Button'
import { ButtonGroup } from '@/components/ButtonGroup'
import { ChatMessage, ChatThread } from '@/components/ChatMessage'
import { Checkbox } from '@/components/Checkbox'
import { ContentPanel } from '@/components/ContentPanel'
import { DataTable, type DataTableColumn } from '@/components/DataTable'
import { DateRangePicker, DEFAULT_DATE_RANGE_PRESETS, type DateRange } from '@/components/DateRangePicker'
import { Divider } from '@/components/Divider'
import { FormField } from '@/components/FormField'
import { GaugeChart } from '@/components/GaugeChart'
import { Heatmap } from '@/components/Heatmap'
import { HorizontalBarChart } from '@/components/HorizontalBarChart'
import { IconButton } from '@/components/IconButton'
import { Kbd } from '@/components/Kbd'
import { LineChart } from '@/components/LineChart'
import { Link } from '@/components/Link'
import { ModelSelector } from '@/components/ModelSelector'
import { PageHeader } from '@/components/PageHeader'
import { PromptInput } from '@/components/PromptInput'
import { Reasoning } from '@/components/Reasoning'
import { ResizablePanels } from '@/components/ResizablePanels'
import { ScrollArea } from '@/components/ScrollArea'
import { Citation, Sources, type Source } from '@/components/Sources'
import { Stat } from '@/components/Stat'
import { Suggestions } from '@/components/Suggestions'
import { Tag } from '@/components/Tag'
import { ToolCall } from '@/components/ToolCall'
import { WithSidebar } from './shell'

// Blocks (Figma Templates page, v1.5): three complete screens assembled only
// from library components — a sign-in page, an analytics dashboard built on
// the v1.0–v1.2 analytics set, and an AI workspace that pairs a conversation
// with the report the agent is drafting. They are the reference for "how the
// pieces fit", for people and for agents: copy a block, then change the data.
// Story-only; not exported from the package. `-m-8` cancels the global story
// padding so each block renders full-bleed like its Figma frame.

const meta: Meta = {
  title: 'Blocks',
  tags: ['!autodocs'],
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj

const mobile = { globals: { viewport: { value: 'mobile2', isRotated: false } } }

/* ------------------------------------------------------------------ Login */

function LoginBlock() {
  return (
    <div className="-m-8 flex min-h-[760px] items-center justify-center bg-surface-page p-16px">
      <div className="flex w-full max-w-[400px] flex-col gap-24px rounded-lg border border-border-subtle bg-surface-container p-container-md">
        <div className="flex flex-col gap-8px">
          <span aria-hidden className="flex size-32px items-center justify-center rounded-md bg-interactive-primary text-sm font-semibold text-interactive-primary-foreground">W</span>
          <h1 className="m-0 text-title-large text-text-primary">Sign in to Workspace</h1>
          <p className="m-0 text-sm leading-5 text-text-secondary">Use your work email. New here? Ask your administrator for an invite.</p>
        </div>
        <form className="flex flex-col gap-16px" onSubmit={(e) => e.preventDefault()}>
          <FormField label="Work email" type="email" autoComplete="email" placeholder="laura.romero@example.com" required />
          <FormField label="Password" type="password" autoComplete="current-password" required />
          <div className="flex items-center justify-between gap-12px">
            <Checkbox label="Keep me signed in" />
            <Link href="#reset">Forgot password?</Link>
          </div>
          <Button type="submit" size="lg" className="w-full">Sign in</Button>
        </form>
        <div className="flex items-center gap-12px text-text-xs text-text-secondary">
          <Divider className="flex-1" />
          or
          <Divider className="flex-1" />
        </div>
        <Button variant="secondary" size="lg" className="w-full" leadingIcon={<KeyRound />}>Continue with SSO</Button>
        <p className="m-0 text-center text-text-xs leading-5 text-text-secondary">
          By signing in you agree to the <Link href="#terms">Terms</Link> and <Link href="#privacy">Privacy Policy</Link>.
        </p>
      </div>
    </div>
  )
}

export const Login: Story = { render: () => <LoginBlock /> }
export const LoginMobile: Story = { ...Login, name: 'Login · Mobile', ...mobile }

/* ---------------------------------------------------- Analytics Dashboard */

const today = new Date(2026, 4, 27)
const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May']

type Row = { account: string; category: string; status: string; amount: number; currency: string; date: string }
const categories = ['Sales', 'Subscriptions', 'Refunds', 'Commissions']
const statuses = ['Active', 'Pending', 'Blocked']
const rows: Row[] = Array.from({ length: 26 }, (_, i) => ({
  account: String(4021 + i * 7),
  category: categories[i % 4],
  status: statuses[(i * 5) % 7 === 0 ? 2 : i % 3 === 0 ? 1 : 0],
  amount: Math.round(((i * 37) % 97) * 12.5 + 40),
  currency: i % 5 === 0 ? 'EUR' : 'USD',
  date: `2026-05-${String(27 - (i % 27)).padStart(2, '0')}`,
}))
const tone = { Active: 'success', Pending: 'warning', Blocked: 'error' } as const
const columns: DataTableColumn<Row>[] = [
  { key: 'account', header: 'Account', sortable: true, hideable: false, width: 100 },
  { key: 'category', header: 'Category', sortable: true, facet: true },
  { key: 'status', header: 'Status', facet: true, cell: (r) => <Tag color={tone[r.status as keyof typeof tone]}>{r.status}</Tag> },
  { key: 'amount', header: 'Amount', sortable: true, align: 'right', cell: (r) => `$${r.amount.toLocaleString('en-US')}` },
  { key: 'currency', header: 'Currency', facet: true },
  { key: 'date', header: 'Date', sortable: true },
]
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = ['00', '04', '08', '12', '16', '20']
const sessions = days.map((_, r) => hours.map((_, c) => Math.round(1200 * (r < 5 ? 1 : 0.45) * [0.15, 0.1, 0.7, 1, 0.85, 0.5][c] + ((r * 7 + c * 13) % 9) * 20)))
const usd = (v: number) => `$${v.toLocaleString('en-US')}`

function DashboardBlock() {
  const [range, setRange] = useState<DateRange | undefined>(DEFAULT_DATE_RANGE_PRESETS[3].range(today))
  return (
    <WithSidebar active="overview">
      <PageHeader
        title="Overview"
        subtitle="Main portfolio · USD"
        actions={
          <>
            <DateRangePicker today={today} value={range} onChange={setRange} />
            <ButtonGroup aria-label="Share and export">
              <IconButton variant="secondary" icon={<Share2 />} aria-label="Share" />
              <IconButton variant="secondary" icon={<Download />} aria-label="Export" />
            </ButtonGroup>
          </>
        }
      />
      <div className="grid grid-cols-1 gap-16px sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total revenue" value="$128,450" delta="12.5%" trend="up" deltaCaption="vs. previous 30 days" />
        <Stat label="Transactions" value="342" delta="8.2%" trend="up" deltaCaption="vs. previous 30 days" />
        <Stat label="Conversion" value="4.8%" delta="0.3%" trend="up" deltaCaption="vs. previous 30 days" />
        <Stat label="Active accounts" value="1,284" delta="3.1%" trend="up" deltaCaption="vs. previous 30 days" />
      </div>
      <div className="grid grid-cols-1 items-stretch gap-16px xl:grid-cols-[minmax(0,1fr)_320px]">
        <LineChart
          categories={months}
          formatValue={(v) => `$${v.toFixed(0)}k`}
          series={[
            { label: 'Sales', series: 1, data: [92, 98, 104, 101, 112, 128] },
            { label: 'Subscriptions', series: 2, data: [41, 44, 46, 49, 53, 64] },
          ]}
        />
        <ContentPanel title="Quarterly target">
          <div className="flex w-full flex-1 items-center justify-center">
            <GaugeChart value={72} label="Revenue target" target={80} formatValue={(v) => `${v}%`} size={220} />
          </div>
        </ContentPanel>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-16px xl:grid-cols-2">
        <ContentPanel title="Top channels by revenue">
          <HorizontalBarChart
            sort="desc"
            formatValue={usd}
            data={[
              { label: 'Organic search', value: 21340 },
              { label: 'Spring campaign', value: 18420 },
              { label: 'Partner referrals', value: 15880 },
              { label: 'Newsletter', value: 9310 },
              { label: 'Paid social', value: 6120 },
            ]}
          />
        </ContentPanel>
        <ContentPanel title="Sessions by weekday and hour">
          <Heatmap rows={days} columns={hours} values={sessions} valueLabel="Sessions" cellSize={26} />
        </ContentPanel>
      </div>
      <DataTable<Row> label="Recent transactions" columns={columns} data={rows} getRowId={(r) => r.account} selectable pageSize={6} searchPlaceholder="Search transactions…" />
    </WithSidebar>
  )
}

export const AnalyticsDashboard: Story = { name: 'Analytics Dashboard', render: () => <DashboardBlock /> }
export const AnalyticsDashboardMobile: Story = { ...AnalyticsDashboard, name: 'Analytics Dashboard · Mobile', ...mobile }

/* ----------------------------------------------------------- AI Workspace */

const sources: Source[] = [
  { title: 'Sales by account, May 2026', url: 'https://app.example.com/reports/sales-may-2026', kind: 'document', snippet: 'Monthly revenue per account, in USD.' },
  { title: 'Subscriptions pipeline', url: 'https://app.example.com/reports/subscriptions', kind: 'document' },
  { title: 'SaaS benchmarks 2026', url: 'https://www.example.org/benchmarks/saas-2026', kind: 'web', snippet: 'Median monthly growth for B2B subscriptions was 2.1%.' },
]
const answerActions = (
  <>
    <IconButton variant="ghost" size="sm" icon={<Copy />} aria-label="Copy answer" />
    <IconButton variant="ghost" size="sm" icon={<RefreshCw />} aria-label="Regenerate" />
    <IconButton variant="ghost" size="sm" icon={<ThumbsUp />} aria-label="Good answer" />
    <IconButton variant="ghost" size="sm" icon={<ThumbsDown />} aria-label="Bad answer" />
  </>
)

function WorkspaceBlock() {
  const [draft, setDraft] = useState('')
  const [model, setModel] = useState('balanced')
  return (
    <WithSidebar active="assistant">
      <PageHeader
        title="Assistant"
        subtitle="May review · drafted with the assistant"
        actions={
          <span className="hidden items-center gap-6px text-text-xs text-text-secondary md:flex">
            <Kbd keys={['⌘', 'K']} /> to jump anywhere
          </span>
        }
      />
      <ResizablePanels
        className="h-[840px] rounded-lg border border-border-subtle bg-surface-container"
        defaultSizes={[55, 45]}
        minSizes={[35, 30]}
        panelLabels={['Conversation', 'Report draft']}
      >
        <div className="flex h-full flex-col">
          <ScrollArea aria-label="Conversation" className="min-h-0 flex-1" style={{ height: '100%' }}>
            <div className="p-container-sm">
              <ChatThread aria-label="Conversation with the assistant">
                <ChatMessage from="user" name="Laura Romero" time="2:14 PM">
                  <p>Draft the May review for leadership. Start with why Subscriptions grew so fast.</p>
                </ChatMessage>
                <ChatMessage
                  from="assistant"
                  name="Assistant"
                  time="2:15 PM"
                  actions={answerActions}
                  before={
                    <>
                      <Reasoning duration={9}>
                        <p>Leadership wants the cause and whether it lasts. I need May sales by account and a market benchmark.</p>
                      </Reasoning>
                      <ToolCall title="Query sales by account for May 2026" tool="sales.query" status="done" input={{ category: 'Subscriptions', period: '2026-05' }} output={{ rows: 18, total: 128450 }} />
                    </>
                  }
                  after={<Sources sources={sources} />}
                >
                  <p>
                    Subscriptions grew 21.4% in May <Citation index={1} source={sources[0]} />, mostly from three accounts that moved to annual plans{' '}
                    <Citation index={2} source={sources[1]} />. That is ten times the 2.1% market median <Citation index={3} source={sources[2]} />, so I flagged it as a
                    one-off in the draft.
                  </p>
                </ChatMessage>
                <ChatMessage from="assistant" name="Assistant" time="2:16 PM" before={<ToolCall title="Share the draft with the leadership group" tool="docs.share" status="approval" approvalMessage="This shares “May review” with 6 people in Leadership. They will get an email." onApprove={() => {}} onDeny={() => {}} />} />
              </ChatThread>
            </div>
          </ScrollArea>
          <div className="flex flex-col gap-12px border-t border-border-subtle p-container-sm">
            <Suggestions aria-label="Follow-up questions" onSelect={setDraft} items={[{ label: 'Add a June forecast' }, { label: 'Compare with April' }]} />
            <PromptInput
              value={draft}
              onChange={setDraft}
              onSubmit={() => setDraft('')}
              hint="Answers can be wrong — check the sources."
              toolbar={
                <>
                  <IconButton variant="ghost" size="sm" icon={<Paperclip />} aria-label="Attach a file" />
                  <ModelSelector
                    value={model}
                    onChange={setModel}
                    models={[
                      { value: 'fast', label: 'Fast', description: 'Best for quick lookups.', tags: ['Fast'] },
                      { value: 'balanced', label: 'Balanced', description: 'Good for most analysis.' },
                      { value: 'deep', label: 'Deep reasoning', description: 'Slower; for multi-step questions.', tags: ['Reasoning'] },
                    ]}
                  />
                </>
              }
            />
          </div>
        </div>
        <ScrollArea aria-label="Report draft" className="h-full" style={{ height: '100%' }}>
          <article className="flex flex-col gap-16px p-container-sm">
            <div className="flex items-center justify-between gap-12px">
              <div className="flex flex-col">
                <h2 className="m-0 text-title-default text-text-primary">May review</h2>
                <span className="text-text-xs text-text-secondary">Draft · updated 2:16 PM</span>
              </div>
              <Tag color="warning">Draft</Tag>
            </div>
            <div className="grid grid-cols-2 gap-12px">
              <Stat label="Revenue" value="$128,450" delta="12.5%" trend="up" />
              <Stat label="Subscriptions" value="+21.4%" delta="vs. 2.1% median" trend="neutral" />
            </div>
            <LineChart
              categories={months}
              formatValue={(v) => `$${v.toFixed(0)}k`}
              series={[
                { label: 'Sales', series: 1, data: [92, 98, 104, 101, 112, 128] },
                { label: 'Subscriptions', series: 2, data: [41, 44, 46, 49, 53, 64] },
              ]}
            />
            <p className="m-0 text-sm leading-6 text-text-primary">
              Revenue reached $128,450, up 12.5%. The jump in Subscriptions came from three accounts moving to annual plans; treat it as a one-off when planning June.
            </p>
            <Button variant="secondary" className="w-fit">Open in Reports</Button>
          </article>
        </ScrollArea>
      </ResizablePanels>
    </WithSidebar>
  )
}

export const AIWorkspace: Story = { name: 'AI Workspace', render: () => <WorkspaceBlock /> }
