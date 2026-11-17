import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, Paperclip, RefreshCw, ThumbsDown, ThumbsUp } from 'lucide-react'
import { IconButton } from '@/components/IconButton'
import { Table } from '@/components/Table'
import { PromptInput } from '@/components/PromptInput'
import { Suggestions } from '@/components/Suggestions'
import { Reasoning } from '@/components/Reasoning'
import { ToolCall } from '@/components/ToolCall'
import { Citation, Sources, type Source } from '@/components/Sources'
import { ModelSelector } from '@/components/ModelSelector'
import { ChatMessage, ChatThread } from './ChatMessage'

const meta: Meta<typeof ChatMessage> = {
  title: 'AI/Chat Message',
  component: ChatMessage,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-[720px]"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof ChatMessage>

const actions = (
  <>
    <IconButton variant="ghost" size="sm" icon={<Copy />} aria-label="Copy answer" />
    <IconButton variant="ghost" size="sm" icon={<RefreshCw />} aria-label="Regenerate" />
    <IconButton variant="ghost" size="sm" icon={<ThumbsUp />} aria-label="Good answer" />
    <IconButton variant="ghost" size="sm" icon={<ThumbsDown />} aria-label="Bad answer" />
  </>
)

export const Playground: Story = {
  render: () => (
    <ChatThread aria-label="Conversation with the assistant">
      <ChatMessage from="user" name="Laura Romero" time="2:14 PM">
        <p>Which accounts grew the most in May?</p>
      </ChatMessage>
      <ChatMessage from="assistant" name="Assistant" time="2:14 PM" actions={actions}>
        <p>Three accounts grew more than 20% in May 2026:</p>
        <ul>
          <li><strong>Account 4105</strong> — $18,420, up 31.4%</li>
          <li><strong>Account 4063</strong> — $15,880, up 24.0%</li>
          <li><strong>Account 4021</strong> — $12,650, up 21.2%</li>
        </ul>
        <p>All three are in Subscriptions.</p>
      </ChatMessage>
    </ChatThread>
  ),
}

/** While the answer streams: a caret ends the text and the message is aria-busy. */
export const Streaming: Story = {
  render: () => (
    <ChatMessage from="assistant" name="Assistant" status="streaming">
      <p>Three accounts grew more than 20% in May 2026. The largest was Account 4105, up</p>
    </ChatMessage>
  ),
}

/** Errors say what happened in plain words and offer the next step. */
export const ErrorState: Story = {
  name: "Error",
  render: () => (
    <ChatMessage from="assistant" name="Assistant" status="error" errorMessage="I couldn’t reach the sales data. Try again in a moment." onRetry={() => {}} />
  ),
}

const sources: Source[] = [
  { title: 'Sales by account, May 2026', url: 'https://app.example.com/reports/sales-may-2026', kind: 'document', snippet: 'Monthly revenue per account, all currencies converted to USD.' },
  { title: 'Subscriptions pipeline', url: 'https://app.example.com/reports/subscriptions', kind: 'document' },
  { title: 'SaaS benchmarks 2026', url: 'https://www.example.org/benchmarks/saas-2026', kind: 'web', snippet: 'Median monthly growth for B2B subscriptions was 2.1%.' },
]

function Conversation() {
  const [draft, setDraft] = useState('')
  const [model, setModel] = useState('balanced')
  return (
    <div className="flex flex-col gap-24px">
      <ChatThread aria-label="Conversation with the assistant">
        <ChatMessage from="user" name="Laura Romero" time="2:14 PM">
          <p>Why did Subscriptions grow so fast in May, and is that normal?</p>
        </ChatMessage>
        <ChatMessage
          from="assistant"
          name="Assistant"
          time="2:15 PM"
          actions={actions}
          before={
            <>
              <Reasoning duration={12}>
                <p>The question has two parts: the cause of May’s growth and a comparison with the market.</p>
                <p>I’ll pull May sales by account, then compare the growth rate with a public benchmark.</p>
              </Reasoning>
              <ToolCall
                title="Query sales by account for May 2026"
                tool="sales.query"
                status="done"
                input={{ category: 'Subscriptions', period: '2026-05', groupBy: 'account' }}
                output={{ rows: 18, total: 128450, growth: 0.214 }}
              />
            </>
          }
          after={<Sources sources={sources} />}
        >
          <p>
            Subscriptions grew 21.4% in May, to $128,450 <Citation index={1} source={sources[0]} />. Most of it came from three accounts that moved to
            annual plans <Citation index={2} source={sources[1]} />.
          </p>
          <p>
            That is well above normal: the median for B2B subscriptions is about 2.1% a month <Citation index={3} source={sources[2]} />, so expect June to
            settle lower.
          </p>
        </ChatMessage>
      </ChatThread>
      <Suggestions
        aria-label="Follow-up questions"
        onSelect={setDraft}
        items={[{ label: 'Break this down by region' }, { label: 'Forecast June for Subscriptions' }, { label: 'Show the three accounts in a table' }]}
      />
      <PromptInput
        value={draft}
        onChange={setDraft}
        onSubmit={() => setDraft('')}
        hint="Enter to send, Shift+Enter for a new line. Answers can be wrong — check the sources."
        toolbar={
          <>
            <IconButton variant="ghost" size="sm" icon={<Paperclip />} aria-label="Attach a file" />
            <ModelSelector
              value={model}
              onChange={setModel}
              models={[
                { value: 'fast', label: 'Fast', description: 'Best for quick lookups and short answers.', tags: ['Fast'] },
                { value: 'balanced', label: 'Balanced', description: 'Good for most analysis.' },
                { value: 'deep', label: 'Deep reasoning', description: 'Slower; for multi-step questions.', tags: ['Reasoning'] },
              ]}
            />
          </>
        }
      />
    </div>
  )
}

/** Every AI element together: reasoning, a tool call, citations, sources, follow-ups and the prompt. */
export const Conversation_: Story = { name: 'Conversation', render: () => <Conversation /> }

/** Rich content: answers can hold tables and charts at full width. */
export const RichAnswer: Story = {
  render: () => (
    <ChatMessage from="assistant" name="Assistant">
      <p>Here are May’s top accounts:</p>
      <Table
        columns={[
          { key: 'account', header: 'Account' },
          { key: 'amount', header: 'Amount', align: 'right' },
        ]}
        rows={[
          { account: '4105', amount: '$18,420' },
          { account: '4063', amount: '$15,880' },
        ]}
      />
    </ChatMessage>
  ),
}
