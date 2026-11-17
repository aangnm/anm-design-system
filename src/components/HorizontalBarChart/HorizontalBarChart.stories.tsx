import type { Meta, StoryObj } from '@storybook/react-vite'
import { HorizontalBarChart } from './HorizontalBarChart'

const data = [
  { label: 'Spring campaign', value: 18420 },
  { label: 'Account 4021', value: 12650 },
  { label: 'Newsletter', value: 9310 },
  { label: 'Partner referrals', value: 15880 },
  { label: 'Organic search', value: 21340 },
  { label: 'Paid social', value: 6120 },
]
const usd = (v: number) => `$${v.toLocaleString('en-US')}`

const meta: Meta<typeof HorizontalBarChart> = {
  title: 'Data Display/Horizontal Bar Chart',
  component: HorizontalBarChart,
  tags: ['autodocs'],
  args: { data, sort: 'desc', formatValue: usd },
  decorators: [(Story) => <div className="max-w-[560px] bg-surface-page p-24px"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof HorizontalBarChart>

export const Playground: Story = {}
/** Highlight keeps one row in colour — the "where to look" rule from Bar Chart. */
export const Highlight: Story = { args: { highlight: 'Account 4021' } }
/** Unsorted keeps a meaningful order, such as funnel steps. */
export const Funnel: Story = {
  args: {
    sort: 'none',
    formatValue: (v) => v.toLocaleString('en-US'),
    data: [
      { label: 'Visited', value: 12840 },
      { label: 'Signed up', value: 3120 },
      { label: 'Activated', value: 1284 },
      { label: 'Paid', value: 412 },
    ],
  },
}
