import type { Meta, StoryObj } from '@storybook/react-vite'
import { Reasoning } from './Reasoning'

const meta: Meta<typeof Reasoning> = {
  title: 'AI/Reasoning',
  component: Reasoning,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="max-w-[640px]"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof Reasoning>

const steps = (
  <>
    <p>The question has two parts: the cause of May’s growth and a comparison with the market.</p>
    <p>I’ll pull May sales by account, then compare the growth rate with a public benchmark.</p>
  </>
)

/** While thinking: open, with the label in words and a pulse. */
export const Thinking: Story = { render: () => <Reasoning status="thinking">{steps}</Reasoning> }
/** Once the answer starts: folded to one line, one click from reopening. */
export const Done: Story = { render: () => <Reasoning status="done" duration={12}>{steps}</Reasoning> }
export const DoneOpen: Story = { render: () => <Reasoning status="done" duration={12} defaultOpen>{steps}</Reasoning> }
