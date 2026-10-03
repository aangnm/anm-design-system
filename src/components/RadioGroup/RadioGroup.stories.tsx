import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup } from './RadioGroup'

const options = [
  { value: 'cafe', label: 'Café' },
  { value: 'cacao', label: 'Cacao' },
  { value: 'platano', label: 'Plátano' },
]

const meta: Meta<typeof RadioGroup> = {
  title: 'Core/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  args: {
    legend: 'Cultivo principal',
    helperText: 'Usado para las recomendaciones de riego y fertilización.',
    options,
    defaultValue: 'cafe',
  },
}
export default meta

type Story = StoryObj<typeof RadioGroup>

export const Playground: Story = {
  render: (args) => (
    <div className="w-[280px]">
      <RadioGroup {...args} />
    </div>
  ),
}

// The Figma component is a single frame: legend + helper + three options.
// Extra variants show the optional helper and a disabled option / group.
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-32px bg-surface-page p-24px">
      <div className="w-[280px]">
        <RadioGroup
          legend="Cultivo principal"
          helperText="Usado para las recomendaciones de riego y fertilización."
          options={options}
          defaultValue="cafe"
        />
      </div>
      <div className="w-[280px]">
        <RadioGroup legend="Cultivo principal" options={options} defaultValue="cacao" />
      </div>
      <div className="w-[280px]">
        <RadioGroup
          legend="Cultivo principal (deshabilitado)"
          options={options}
          defaultValue="cafe"
          disabled
        />
      </div>
    </div>
  ),
}
