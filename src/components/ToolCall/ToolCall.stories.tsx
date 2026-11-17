import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToolCall } from './ToolCall'

const meta: Meta<typeof ToolCall> = {
  title: 'AI/Tool Call',
  component: ToolCall,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-[560px]"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof ToolCall>

const input = { category: 'Subscriptions', period: '2026-05', groupBy: 'account' }

export const Playground: Story = {
  args: { title: 'Query sales by account for May 2026', tool: 'sales.query', status: 'done', input, output: { rows: 18, total: 128450, growth: 0.214 } },
}

/** Every status, read from the icon and the words, not colour alone. */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-12px">
      <ToolCall title="Query sales by account for May 2026" tool="sales.query" status="running" input={input} />
      <ToolCall title="Query sales by account for May 2026" tool="sales.query" status="done" input={input} output={{ rows: 18, total: 128450 }} defaultOpen />
      <ToolCall title="Read the subscriptions pipeline" tool="reports.read" status="error" input={{ report: 'subscriptions' }} output="Permission denied: you don’t have access to this report." />
    </div>
  ),
}

/** Actions with side effects stop here until the person approves. */
export const Approval: Story = {
  args: {
    title: 'Email the May summary to the sales team',
    tool: 'email.send',
    status: 'approval',
    approvalMessage: 'This sends one email to 12 people in Sales from your address. It can’t be undone.',
    input: { to: 'sales-team', subject: 'May 2026 summary', attachments: 1 },
    onApprove: () => {},
    onDeny: () => {},
  },
}
