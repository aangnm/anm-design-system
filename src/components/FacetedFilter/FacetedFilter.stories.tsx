import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { userEvent, within } from 'storybook/test'
import { FacetedFilter } from './FacetedFilter'

const meta: Meta<typeof FacetedFilter> = {
  title: 'Data Display/Faceted Filter',
  component: FacetedFilter,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof FacetedFilter>

const options = [
  { value: 'Active', label: 'Active', count: 18 },
  { value: 'Pending', label: 'Pending', count: 6 },
  { value: 'Blocked', label: 'Blocked', count: 2 },
]

function Demo({ initial = [] as string[] }) {
  const [selected, setSelected] = useState<string[]>(initial)
  return (
    <div className="h-[260px]">
      <FacetedFilter title="Status" options={options} selected={selected} onChange={setSelected} />
    </div>
  )
}

export const Playground: Story = { render: () => <Demo /> }
export const WithSelection: Story = { render: () => <Demo initial={['Active', 'Pending']} /> }
/** The panel open — checked in CI with axe in every theme. */
export const Open: Story = {
  render: () => <Demo initial={['Pending']} />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: /Status/ }))
  },
}
