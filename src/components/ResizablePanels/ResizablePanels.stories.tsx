import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { ResizablePanels } from './ResizablePanels'
import { BarChart } from '@/components/BarChart'

const meta: Meta<typeof ResizablePanels> = {
  title: 'Data Display/Resizable Panels',
  component: ResizablePanels,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof ResizablePanels>

function Pane({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-12px p-container-sm">
      <p className="m-0 text-text-sm font-medium leading-5 text-text-primary">{title}</p>
      {children ?? <p className="m-0 text-text-xs leading-5 text-text-secondary">Drag the line, or focus it and use the arrow keys.</p>}
    </div>
  )
}

const frame = 'h-[320px] rounded-lg border border-border-subtle bg-surface-container'
const sales = [
  { label: 'Jan', value: 128 },
  { label: 'Feb', value: 142 },
  { label: 'Mar', value: 135 },
  { label: 'Apr', value: 168 },
  { label: 'May', value: 181 },
]

/** A chart beside its detail — the common dashboard split. */
export const Playground: Story = {
  render: () => (
    <ResizablePanels className={frame} defaultSizes={[62, 38]} minSizes={[40, 25]} panelLabels={['Sales chart', 'Details']}>
      <Pane title="Sales by month">
        <BarChart data={sales} seriesLabel="Sales" />
      </Pane>
      <Pane title="Details" />
    </ResizablePanels>
  ),
}

/** The grip makes the affordance obvious — for first-run layouts and touch screens. */
export const WithHandle: Story = {
  render: () => (
    <ResizablePanels className={frame} withHandle defaultSizes={[25, 50, 25]} panelLabels={['Filters', 'Results', 'Preview']}>
      <Pane title="Filters" />
      <Pane title="Results" />
      <Pane title="Preview" />
    </ResizablePanels>
  ),
}

/** Stacked, and nested inside a horizontal split. */
export const Nested: Story = {
  render: () => (
    <ResizablePanels className={frame} defaultSizes={[35, 65]} panelLabels={['Navigation', 'Workspace']}>
      <Pane title="Accounts" />
      <ResizablePanels direction="vertical" defaultSizes={[60, 40]} panelLabels={['Chart', 'Log']}>
        <Pane title="Conversion" />
        <Pane title="Activity log" />
      </ResizablePanels>
    </ResizablePanels>
  ),
}

/** Keyboard: arrows move the split 2%, Enter resets it. */
export const Keyboard: Story = {
  render: Playground.render,
  play: async ({ canvasElement }) => {
    const handle = within(canvasElement).getByRole('separator', { name: 'Resize Sales chart' })
    handle.focus()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')
    await expect(handle).toHaveAttribute('aria-valuenow', '66')
    await userEvent.keyboard('{Enter}')
    await expect(handle).toHaveAttribute('aria-valuenow', '62')
  },
}
