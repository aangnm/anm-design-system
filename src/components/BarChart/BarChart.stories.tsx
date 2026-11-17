import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fireEvent, within } from 'storybook/test'
import { BarChart } from './BarChart'

// Sample scale from the Figma component: 0–300 t, bar height = value ÷ 300 × 150px.
const data = [
  { label: 'S1', value: 125 },
  { label: 'S2', value: 190 },
  { label: 'S3', value: 145 },
  { label: 'S4', value: 235 },
  { label: 'S5', value: 210 },
  { label: 'S6', value: 255 },
]

const meta: Meta<typeof BarChart> = {
  title: 'Data Display/Bar Chart',
  component: BarChart,
  tags: ['autodocs'],
  args: { data, max: 300, showValues: true, highlightLatest: true },
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-24px">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof BarChart>

export const Playground: Story = {}

// The two booleans of the Figma component, every combination.
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-32px">
      <BarChart {...args} showValues highlightLatest />
      <BarChart {...args} showValues highlightLatest={false} />
      <BarChart {...args} showValues={false} highlightLatest />
      <BarChart {...args} showValues={false} highlightLatest={false} />
    </div>
  ),
}

// A wider card adds space between bars; bars stay capped at 36px.
export const Wide: Story = {
  render: (args) => <BarChart {...args} className="w-[640px]" />,
}

/** State=Hover — the readout a pointer gets; checked with axe in every theme. */
export const Hover: Story = {
  ...{},
  play: async ({ canvasElement }) => {
    const plot = canvasElement.querySelector<HTMLElement>('[data-chart-plot]')!
    const r = plot.getBoundingClientRect()
    fireEvent.pointerMove(plot, { clientX: r.left + r.width * 0.6, clientY: r.top + r.height / 2 })
    await expect(await within(canvasElement).findAllByText('Value')).toHaveLength(1)
  },
}
