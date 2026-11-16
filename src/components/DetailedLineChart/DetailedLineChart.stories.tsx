import type { Meta, StoryObj } from '@storybook/react-vite'
import { DetailedLineChart } from './DetailedLineChart'

const weeks = ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5', 'Apr 12', 'Apr 19', 'Apr 26', 'May 3', 'May 10', 'May 17', 'May 24']

const meta: Meta<typeof DetailedLineChart> = {
  title: 'Data Display/Detailed Line Chart',
  component: DetailedLineChart,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="bg-surface-page p-8"><Story /></div>],
  args: {
    categories: weeks,
    axisLabels: ['Mar 1', 'Mar 29', 'Apr 26', 'May 24'],
    series: [
      { label: 'Conversion', series: 1, data: [0.62, 0.64, 0.66, 0.7, 0.72, 0.75, 0.74, 0.77, 0.79, 0.78, 0.8, 0.81, 0.83] },
      { label: 'Retention', series: 2, data: [0.55, 0.57, 0.58, 0.6, 0.63, 0.64, 0.66, 0.65, 0.67, 0.69, 0.7, 0.71, 0.72] },
      { label: 'Churn', series: 3, data: [0.3, 0.29, 0.31, 0.3, 0.28, 0.33, 0.35, 0.34, 0.35, 0.33, 0.32, 0.33, 0.34] },
    ],
    min: 0,
    max: 1,
    target: { value: 0.8, label: 'Meta 0.80' },
    band: { from: 0.65, to: 0.85, label: 'Target range' },
    events: [
      { index: 3, label: 'Campaign' },
      { index: 8, label: 'Lanzamiento' },
    ],
    forecastFrom: 10,
  },
}
export default meta
type Story = StoryObj<typeof DetailedLineChart>

// State=Hover is real: move the pointer over the plot (tap to pin on touch).
export const Playground: Story = {}
