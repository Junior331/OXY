import type { Meta, StoryObj } from '@storybook/react'
import { OxyLogo } from './AuzapLogo'

const meta = {
  title: 'Atoms/OxyLogo',
  component: OxyLogo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OxyLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const OnDarkBackground: Story = {
  decorators: [
    (Story) => (
      <div className="bg-gray-900 p-8 rounded-lg">
        <Story />
      </div>
    ),
  ],
}

export const WithText: Story = {
  args: {},
  render: () => (
    <div className="flex items-center gap-4">
      <OxyLogo />
      <span className="text-2xl font-bold text-gray-800 dark:text-white">Oxy</span>
    </div>
  ),
}
