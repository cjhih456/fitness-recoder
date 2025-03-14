import type { FitnessListProps } from './FitnessList';
import type { Meta, StoryObj } from '@storybook/react';
import type { Exercise } from 'fitness-struct';
import { fn } from '@storybook/test';
import FitnessData from '@service/Fitness/FitnessData.json';
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
    list: FitnessData.slice(0, 5).map((v, i) => ({
      ...v,
      id: i + 1
    })) as Exercise.IFitness[],
    selectedFitnessIds: [1]
  }
}