import type { Meta, StoryObj } from '@storybook/react-vite'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Core/Link',
  component: Link,
  tags: ['autodocs'],
  args: { href: '#', children: 'Sample link', standalone: true },
}
export default meta

type Story = StoryObj<typeof Link>

export const Playground: Story = {}

// Mirrors the Figma grid: State (Default, Hover, Focus, Visited) x External.
// Hover/Focus/Visited are forced with classes only for this documentation grid;
// in product they are the real :hover, :focus-visible and :visited states.
export const States: Story = {
  render: () => (
    <div className="grid grid-cols-[repeat(4,max-content)] items-center gap-x-32px gap-y-16px bg-surface-page p-24px">
      {[false, true].map((external) =>
        [
          ['Default', ''],
          ['Hover', 'text-text-emphasis'],
          ['Focus', 'focus-ring!'],
          ['Visited', 'text-text-secondary'],
        ].map(([state, cls]) => (
          <Link key={`${state}-${external}`} href="#" external={external} standalone className={cls}>
            Sample link
          </Link>
        )),
      )}
    </div>
  ),
}

export const InRunningText: Story = {
  render: () => (
    <p className="max-w-[420px] bg-surface-page p-24px text-sm text-text-primary">
      Consulta la <Link href="#">reconciliation guide</Link> antes de aplicar el plan, o revisa la{' '}
      <Link href="#" external>
        norma externa
      </Link>
      .
    </p>
  ),
}
