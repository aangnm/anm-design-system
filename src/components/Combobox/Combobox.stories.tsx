import type { Meta, StoryObj } from '@storybook/react-vite'
import { Combobox } from './Combobox'

const options = [
  { value: '07', label: 'Account 4021' },
  { value: '12', label: 'Account 4035' },
  { value: '15n', label: 'Account 4102' },
  { value: '21', label: 'Account 4130' },
]

const meta: Meta<typeof Combobox> = {
  title: 'Core/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  args: { options, size: 'md' },
}
export default meta

type Story = StoryObj<typeof Combobox>

export const Playground: Story = {
  render: (args) => (
    <div className="h-[220px] w-[280px]">
      <Combobox {...args} />
    </div>
  ),
}

const widths = { sm: 'w-[260px]', md: 'w-[280px]', lg: 'w-[300px]' } as const
const sizes = ['sm', 'md', 'lg'] as const

// Mirrors the Figma grid: one row per Size, one column per State.
// Hover and Focus are forced with classes only for this documentation grid;
// in product they are the real :hover and :focus-visible states.
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-24px bg-surface-page p-24px">
      {sizes.map((size) => (
        <div key={size} className="flex flex-wrap items-start gap-16px">
          <div className={widths[size]}>
            <Combobox options={options} size={size} aria-label="Default" />
          </div>
          <div className={widths[size]}>
            <Combobox options={options} size={size} aria-label="Hover" className="border-border-emphasis" />
          </div>
          <div className={widths[size]}>
            <Combobox options={options} size={size} aria-label="Focus" className="focus-ring!" />
          </div>
          <div className={widths[size]}>
            <Combobox options={options} size={size} aria-label="Disabled" disabled />
          </div>
          <div className={widths[size]}>
            <Combobox options={options} size={size} aria-label="Error" error />
          </div>
          <div className={widths[size]}>
            <Combobox
              options={options}
              size={size}
              aria-label="Focus + Error"
              error
              className="focus-ring!"
            />
          </div>
        </div>
      ))}
    </div>
  ),
}

// State=Open: field with its filtered results panel.
export const Open: Story = {
  render: () => (
    <div className="flex flex-wrap gap-24px bg-surface-page p-24px pb-[180px]">
      {sizes.map((size) => (
        <div key={size} className={widths[size]}>
          <Combobox options={options} size={size} aria-label={`Open ${size}`} defaultOpen />
        </div>
      ))}
    </div>
  ),
}

export const WithValue: Story = {
  render: () => (
    <div className="h-[220px] w-[280px]">
      <Combobox options={options} defaultValue="12" />
    </div>
  ),
}
