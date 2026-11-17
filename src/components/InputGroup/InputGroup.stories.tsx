import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, Search } from 'lucide-react'
import { IconButton } from '@/components/IconButton'
import { Kbd } from '@/components/Kbd'
import { InputGroup } from './InputGroup'

const meta: Meta<typeof InputGroup> = {
  title: 'Core/Input Group',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [(Story) => <div className="flex max-w-[400px] flex-col gap-16px"><Story /></div>],
}
export default meta
type Story = StoryObj<typeof InputGroup>

export const Playground: Story = { args: { prefix: 'https://', placeholder: 'example.com', 'aria-label': 'Website' } }

export const AddOns: Story = {
  render: () => (
    <>
      <InputGroup aria-label="Budget" prefix="$" suffix="USD" defaultValue="128,450" />
      <InputGroup aria-label="Conversion target" suffix="%" defaultValue="12.5" />
      <InputGroup aria-label="Search" leadingIcon={<Search />} placeholder="Search accounts…" trailing={<Kbd>/</Kbd>} />
      <InputGroup
        aria-label="API endpoint"
        readOnly
        defaultValue="https://api.example.com/v1/accounts"
        trailing={<IconButton variant="ghost" size="sm" icon={<Copy />} aria-label="Copy endpoint" />}
      />
    </>
  ),
}

export const SizesAndStates: Story = {
  render: () => (
    <>
      <InputGroup aria-label="Small" size="sm" prefix="https://" placeholder="example.com" />
      <InputGroup aria-label="Medium" prefix="https://" placeholder="example.com" />
      <InputGroup aria-label="Large" size="lg" prefix="https://" placeholder="example.com" />
      <InputGroup aria-label="With error" error suffix="%" defaultValue="140" />
      <InputGroup aria-label="Disabled" disabled prefix="$" defaultValue="0.00" />
    </>
  ),
}
