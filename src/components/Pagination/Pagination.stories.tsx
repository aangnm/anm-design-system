import { useState } from 'react'
import type { ReactElement } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Pagination } from './Pagination'

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Pagination>

const onBg = (Story: () => ReactElement) => (
  <div className="bg-surface-page p-24px">
    <Story />
  </div>
)

// Mirrors the Figma component: previous, five pages (page 1 filled), next.
export const Playground: Story = {
  args: { page: 1, pageCount: 5 },
  decorators: [onBg],
}

export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return (
      <div className="bg-surface-page p-24px">
        <Pagination page={page} pageCount={5} onPageChange={setPage} />
      </div>
    )
  },
}

export const LastPage: Story = {
  args: { page: 5, pageCount: 5 },
  decorators: [onBg],
}
