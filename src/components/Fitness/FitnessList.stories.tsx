import type { Meta, StoryObj } from '@storybook/react';
import FitnessList, { FitnessListProps } from './FitnessList'
import { fn } from '@storybook/test';

const meta = {
  title: 'Fitness/FitnessList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    changeSelectedList: fn()
  } as Partial<FitnessListProps>,
  component: FitnessList,
  decorators: [
    (Story) => {
      return <div className="min-w-[320px]">
        <Story />
      </div>
    }
  ]
} satisfies Meta<typeof FitnessList>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    list: [0, 1, 2, 3, 4],
    selectedList: [1]
  }
}