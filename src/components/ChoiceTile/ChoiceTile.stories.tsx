import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Wallet } from 'lucide-react'
import { ChoiceTile } from './ChoiceTile'

const meta: Meta<typeof ChoiceTile> = {
  title: 'Core/Choice Tile',
  component: ChoiceTile,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="bg-surface-page p-8"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof ChoiceTile>

export const Playground: Story = {
  render: () => {
    const [picked, setPicked] = useState('Monthly')
    return (
      <div className="grid w-[360px] grid-cols-2 gap-8px">
        {['Diario', 'Semanal', 'Monthly', 'Yearly'].map((p) => (
          <ChoiceTile key={p} label={p} state={picked === p ? 'selected' : 'default'} onClick={() => setPicked(p)} />
        ))}
      </div>
    )
  },
}

// Mirrors the Figma grid: rows = Size x Align, columns = State. Hover and Focus
// are real :hover / :focus-visible (hover or Tab); the Focus column forces the ring.
const states = [
  { label: 'Default', props: {} },
  { label: 'Focus', props: { focus: true } },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Selected', props: { state: 'selected' as const } },
  { label: 'Done', props: { state: 'done' as const, count: 3 } },
  { label: 'Counted', props: { state: 'counted' as const, count: 3 } },
]

export const SizeAlignByState: Story = {
  render: () => (
    <div className="flex w-max flex-col gap-16px">
      {(['md', 'lg'] as const).flatMap((size) =>
        (['center', 'left'] as const).map((align) => (
          <div key={size + align} className="flex items-center gap-12px">
            <span className="w-[96px] text-text-xxs text-text-secondary">{size.toUpperCase()} · {align}</span>
            {states.map((s) => (
              <ChoiceTile
                key={s.label}
                size={size}
                align={align}
                label="Option"
                icon={<Wallet />}
                {...{ ...s.props, focus: undefined }}
                className={'w-[160px] shrink-0' + ('focus' in s.props ? ' focus-ring!' : '')}
              />
            ))}
          </div>
        )),
      )}
    </div>
  ),
}
