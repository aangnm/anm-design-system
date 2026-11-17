import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fireEvent, within } from 'storybook/test'
import { Heatmap } from './Heatmap'

const rows = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const columns = ['00', '04', '08', '12', '16', '20']
// Sessions by weekday and time of day — busier on weekday working hours.
const values = rows.map((_, r) =>
  columns.map((_, c) => {
    const weekday = r < 5 ? 1 : 0.45
    const hour = [0.15, 0.1, 0.7, 1, 0.85, 0.5][c]
    return Math.round(1200 * weekday * hour + ((r * 7 + c * 13) % 9) * 20)
  }),
)

const meta: Meta<typeof Heatmap> = {
  title: 'Data Display/Heatmap',
  component: Heatmap,
  tags: ['autodocs'],
  args: { rows, columns, values, valueLabel: 'Sessions' },
  decorators: [(Story) => <div className="bg-surface-page p-24px"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Heatmap>

export const Playground: Story = {}
/** Empty cells (null) keep a border, so "no data" never reads as "low". */
export const WithGaps: Story = { args: { values: values.map((row, r) => row.map((v, c) => ((r + c) % 7 === 3 ? null : v))) } }
/** State=Hover — checked with axe in every theme. */
export const Hover: Story = {
  play: async ({ canvasElement }) => {
    const cell = canvasElement.querySelectorAll<HTMLElement>('[style*="color-mix"]')[9]
    fireEvent.pointerOver(cell)
    await expect(await within(canvasElement).findByText('Sessions')).toBeInTheDocument()
  },
}
