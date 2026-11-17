import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ModelSelector, type ModelOption } from './ModelSelector'

const meta: Meta<typeof ModelSelector> = {
  title: 'AI/Model Selector',
  component: ModelSelector,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  decorators: [(Story) => <div className="flex h-[300px] items-end"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof ModelSelector>

const models: ModelOption[] = [
  { value: 'fast', label: 'Fast', description: 'Best for quick lookups and short answers.', tags: ['Fast'] },
  { value: 'balanced', label: 'Balanced', description: 'Good for most analysis.' },
  { value: 'deep', label: 'Deep reasoning', description: 'Slower; for multi-step questions.', tags: ['Reasoning'] },
]

function Demo({ open }: { open?: boolean }) {
  const [value, setValue] = useState('balanced')
  return <ModelSelector models={models} value={value} onChange={setValue} defaultOpen={open} />
}

export const Playground: Story = { render: () => <Demo /> }
/** Open — checked with axe in every theme. Opens upward, as it sits in the Prompt Input toolbar. */
export const Open: Story = { render: () => <Demo open /> }
