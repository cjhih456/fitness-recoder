import type { Meta, StoryObj } from '@storybook/react';
import FitnessItem, { FitnessItemProps } from './FitnessItem'
import FitnessData from '../../service/Fitness/FitnessData.json'
import { fn } from '@storybook/test';
import { Exercise } from 'fitness-struct';

const meta = {
  title: 'Fitness/FitnessItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    onClick: fn()
  } as Partial<FitnessItemProps>,
  component: FitnessItem,
  decorators: [
    (Story) => {
      return <div className="min-w-[320px]">
        <Story />
      </div>
    }
  ]
} satisfies Meta<typeof FitnessItem>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    fitnessData: {
      id: 1,
      ...FitnessData[0]
    } as Exercise.IFitness,
    isSelected: false
  }
}