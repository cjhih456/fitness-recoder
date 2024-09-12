import type { Meta, StoryObj } from '@storybook/react';
import SimpleFitnessList, { SimpleFitnessListProps } from './SimpleFitnessList'

const meta = {
  title: 'Fitness/SimpleFitnessList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<SimpleFitnessListProps>,
  component: SimpleFitnessList,
  decorators: [
    (Story) => {
      return <div className="grid min-w-[320px] h-[500px] overflow-hiden">
        <Story />
      </div>
    }
  ]
} satisfies Meta<typeof SimpleFitnessList>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    exerciseDataList: [{
      id: 1,
      exercise: 0,
      deps: 0
    }, {
      id: 2,
      exercise: 1,
      deps: 1
    }]
  }
}