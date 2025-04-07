import type { FitnessListProps } from './FitnessList';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FitnessList from './FitnessList';

const meta = {
  title: 'Fitness/FitnessList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    onChangeSelectedFitnessIds: fn()
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
    fitnessIds: Array(5).fill(0).map((_v, i) => i + 1),
    selectedFitnessIds: [1]
  }
}