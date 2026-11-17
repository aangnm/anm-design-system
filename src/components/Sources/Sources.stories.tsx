import type { Meta, StoryObj } from '@storybook/react-vite'
import { Citation, Sources, type Source } from './Sources'

const meta: Meta<typeof Sources> = {
  title: 'AI/Sources',
  component: Sources,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-[640px]"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Sources>

const sources: Source[] = [
  { title: 'Sales by account, May 2026', url: 'https://app.example.com/reports/sales-may-2026', kind: 'document', snippet: 'Monthly revenue per account, in USD.' },
  { title: 'Subscriptions pipeline', url: 'https://app.example.com/reports/subscriptions', kind: 'document' },
  { title: 'SaaS benchmarks 2026', url: 'https://www.example.org/benchmarks/saas-2026', kind: 'web', snippet: 'Median monthly growth for B2B subscriptions was 2.1%.' },
  { title: 'Annual plan adoption study', url: 'https://research.example.net/annual-plans', kind: 'web' },
]

/** Folded by default: the count says evidence exists. */
export const Playground: Story = { args: { sources } }
export const Open: Story = { args: { sources, defaultOpen: true } }

/** Citations sit inside the sentence as numbers and preview their source on hover or focus. */
export const Citations: Story = {
  render: () => (
    <p className="m-0 text-sm leading-6 text-text-primary">
      Subscriptions grew 21.4% in May <Citation index={1} source={sources[0]} />, far above the 2.1% median for B2B subscriptions{' '}
      <Citation index={3} source={sources[2]} />.
    </p>
  ),
}
