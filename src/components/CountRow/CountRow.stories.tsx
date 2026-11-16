import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { CountRow } from './CountRow'

const meta: Meta<typeof CountRow> = {
  title: 'Core/Count Row',
  component: CountRow,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="w-[358px] bg-surface-page p-8"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof CountRow>

// State=Default and State=Filled: a row fills (highlight band, semibold label)
// as soon as it holds a value. Stack rows edge to edge.
export const Playground: Story = {
  render: () => {
    const [v, setV] = useState({ Cards: 0, Transfers: 3, Checks: 0 })
    return (
      <div className="flex flex-col">
        {Object.entries(v).map(([k, n]) => (
          <CountRow key={k} label={k} value={n} max={99} onChange={(x) => setV({ ...v, [k]: x })} />
        ))}
      </div>
    )
  },
}
