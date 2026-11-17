import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { Paperclip } from 'lucide-react'
import { IconButton } from '@/components/IconButton'
import { PromptInput } from './PromptInput'

const meta: Meta<typeof PromptInput> = {
  title: 'AI/Prompt Input',
  component: PromptInput,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-[640px]"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof PromptInput>

function Demo({ initial = '', status }: { initial?: string; status?: 'idle' | 'streaming' }) {
  const [value, setValue] = useState(initial)
  const [sent, setSent] = useState<string | null>(null)
  return (
    <div className="flex flex-col gap-12px">
      <PromptInput
        value={value}
        onChange={setValue}
        onSubmit={(v) => {
          setSent(v)
          setValue('')
        }}
        status={status}
        onStop={() => {}}
        toolbar={<IconButton variant="ghost" size="sm" icon={<Paperclip />} aria-label="Attach a file" />}
        hint="Enter to send, Shift+Enter for a new line."
      />
      {sent ? <p className="m-0 text-text-xs text-text-secondary">Sent: {sent}</p> : null}
    </div>
  )
}

export const Playground: Story = { render: () => <Demo /> }

/** Enter sends; the field clears and Send disables again. */
export const Sending: Story = {
  render: () => <Demo />,
  play: async ({ canvasElement }) => {
    const c = within(canvasElement)
    await expect(c.getByRole('button', { name: 'Send message' })).toBeDisabled()
    await userEvent.type(c.getByRole('textbox', { name: 'Message' }), 'Compare Q1 and Q2 sales{Enter}')
    await expect(await c.findByText('Sent: Compare Q1 and Q2 sales')).toBeInTheDocument()
  },
}

/** While the agent answers, Send becomes Stop in the same place. */
export const Streaming: Story = { render: () => <Demo initial="" status="streaming" /> }

/** A long prompt grows the field up to eight lines, then scrolls. */
export const LongPrompt: Story = {
  render: () => (
    <Demo initial={'Summarise May for the leadership review:\n- revenue by category\n- the three fastest-growing accounts\n- refunds and why they changed\n- what to watch in June'} />
  ),
}
