import type { SimpleFitnessListProps } from './SimpleFitnessList'
import type { Meta, StoryObj } from '@storybook/react';
import SetState from '@features/set/ui/SetState';
import SimpleFitnessList from './SimpleFitnessList'

const meta = {
  title: 'Fitness/SimpleFitnessList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    children: (exerciseData) => <SetState exerciseDataId={exerciseData.id} />
  } as Partial<SimpleFitnessListProps>,
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
      fitnessId: 1,
      deps: 0
    }, {
      id: 2,
      fitnessId: 2,
      deps: 1
    }]
  }
}