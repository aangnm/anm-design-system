import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { DateRangePicker, DEFAULT_DATE_RANGE_PRESETS, type DateRange } from './DateRangePicker'

const meta: Meta<typeof DateRangePicker> = {
  title: 'Core/Date Range Picker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof DateRangePicker>

// A fixed "today" keeps the stories (and their screenshots) stable.
const today = new Date(2026, 4, 27)

function Demo({ initial }: { initial?: DateRange }) {
  const [range, setRange] = useState<DateRange | undefined>(initial)
  return (
    <div className="h-[420px]">
      <DateRangePicker today={today} value={range} onChange={setRange} />
    </div>
  )
}

export const Playground: Story = { render: () => <Demo initial={DEFAULT_DATE_RANGE_PRESETS[3].range(today)} /> }
export const CustomRange: Story = { render: () => <Demo initial={{ from: new Date(2026, 4, 4), to: new Date(2026, 4, 15) }} /> }
export const Empty: Story = { render: () => <Demo /> }
/** The panel open — checked in CI with axe in every theme. */
export const Open: Story = {
  render: () => <Demo initial={{ from: new Date(2026, 4, 4), to: new Date(2026, 4, 15) }} />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: /May 4/ }))
  },
}
