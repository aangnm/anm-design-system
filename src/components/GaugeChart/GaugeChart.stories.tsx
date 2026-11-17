import type { Meta, StoryObj } from '@storybook/react-vite'
import { GaugeChart } from './GaugeChart'

const meta: Meta<typeof GaugeChart> = {
  title: 'Data Display/Gauge Chart',
  component: GaugeChart,
  tags: ['autodocs'],
  args: { value: 72, max: 100, label: 'Quota attainment', target: 80, formatValue: (v) => `${v}%` },
  decorators: [(Story) => <div className="bg-surface-page p-24px"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof GaugeChart>

export const Playground: Story = {}
/** Status colours the fill only when the product defines the threshold. */
export const Statuses: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-32px">
      <GaugeChart {...args} value={92} label="Uptime" status="success" target={undefined} />
      <GaugeChart {...args} value={78} label="Budget used" status="warning" target={undefined} />
      <GaugeChart {...args} value={104} label="Storage used" status="error" target={undefined} />
    </div>
  ),
}
export const Small: Story = { args: { size: 140 } }
