import type { Meta, StoryObj } from '@storybook/react-vite'
import { StackedBarChart } from './StackedBarChart'

const meta: Meta<typeof StackedBarChart> = {
  title: 'Data Display/Stacked Bar Chart',
  component: StackedBarChart,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="bg-surface-page p-8"><Story /></div>],
  args: {
    categories: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    series: [
      { label: 'Cuenta 4021', series: 1, data: [60, 95, 70, 120, 105, 130] },
      { label: 'Cuenta 4035', series: 2, data: [40, 60, 45, 70, 65, 75] },
      { label: 'Cuenta 4102', series: 3, data: [25, 35, 30, 45, 40, 50] },
    ],
  },
}
export default meta
type Story = StoryObj<typeof StackedBarChart>

export const Absolute: Story = {}
export const Percent: Story = { args: { type: 'percent' } }

/** Texture = Pattern: each series also carries its texture, for print, greyscale and colour-blind readers. */
export const TextureAbsolute: Story = { args: { texture: true } }
export const TexturePercent: Story = { args: { type: 'percent', texture: true } }
