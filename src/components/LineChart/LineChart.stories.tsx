import type { Meta, StoryObj } from '@storybook/react-vite'
import { LineChart } from './LineChart'

const meta: Meta<typeof LineChart> = {
  title: 'Data Display/Line Chart',
  component: LineChart,
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

type Story = StoryObj<typeof LineChart>

export const Playground: Story = {
  args: {
    categories: ['Mar', 'Apr', 'May', 'Jun', 'Jul'],
    series: [
      { label: 'Conversion', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86] },
      { label: 'Retention', series: 2, data: [0.6, 0.63, 0.68, 0.64, 0.66] },
      { label: 'Churn', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28] },
    ],
  },
}

/**
 * Charts fill their container and redraw at its width — strokes, text and
 * points keep their size. Narrow containers thin the x-axis labels instead of
 * overlapping them. Pass `width` only when a fixed size is really wanted.
 */
export const Widths: Story = {
  render: (args) => (
    <div className="flex flex-col gap-24px">
      {[320, 480, 720].map((w) => (
        <div key={w} style={{ width: w }}>
          <p className="mb-8px text-text-xxs text-text-secondary">{w}px container</p>
          <LineChart {...args} />
        </div>
      ))}
    </div>
  ),
  args: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    series: [
      { label: 'Conversion', series: 1, data: [0.8, 0.82, 0.88, 0.84, 0.86, 0.85, 0.87, 0.9, 0.88, 0.86, 0.89, 0.91] },
      { label: 'Churn', series: 3, data: [0.22, 0.26, 0.3, 0.26, 0.28, 0.27, 0.25, 0.24, 0.26, 0.25, 0.23, 0.22] },
    ],
  },
}
