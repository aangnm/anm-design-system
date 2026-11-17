import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kbd } from './Kbd'

const meta: Meta<typeof Kbd> = {
  title: 'Core/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: { children: 'K' },
}
export default meta
type Story = StoryObj<typeof Kbd>

export const Playground: Story = {}
/** A chord shows its keys side by side, without "+". */
export const Chords: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-16px">
      <Kbd keys={['⌘', 'K']} />
      <Kbd keys={['Ctrl', 'K']} />
      <Kbd keys={['⇧', '⌘', 'P']} />
      <Kbd>esc</Kbd>
      <Kbd>↵</Kbd>
    </div>
  ),
}
/** Inline in running text. */
export const InText: Story = {
  render: () => (
    <p className="m-0 text-sm leading-5 text-text-primary">
      Press <Kbd keys={['⌘', 'K']} /> to open the command menu, or <Kbd>/</Kbd> to search.
    </p>
  ),
}
