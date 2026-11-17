import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fireEvent, within } from 'storybook/test'
import { AreaChart } from './AreaChart'

const meta: Meta<typeof AreaChart> = {
  title: 'Data Display/Area Chart',
  component: AreaChart,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="bg-surface-page p-8">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof AreaChart>

export const Playground: Story = {
  args: {
    categories: ['Mar', 'Apr', 'May', 'Jun', 'Jul'],
    series: [
      { label: 'Conversion', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
      { label: 'Churn', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
    ],
  },
}

/** State=Hover — the readout a pointer gets; checked with axe in every theme. */
export const Hover: Story = {
  ...Playground,
  play: async ({ canvasElement }) => {
    const plot = canvasElement.querySelector<HTMLElement>('[data-chart-plot]')!
    const r = plot.getBoundingClientRect()
    fireEvent.pointerMove(plot, { clientX: r.left + r.width * 0.5, clientY: r.top + r.height / 2 })
    await expect(await within(canvasElement).findAllByText('Conversion')).toHaveLength(2)
  },
}
