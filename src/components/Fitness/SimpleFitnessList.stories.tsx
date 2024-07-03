import type { Meta, StoryObj } from '@storybook/react';
import SimpleFitnessList, { SimpleFitnessListProps } from './SimpleFitnessList'
import ScheduleExerciseDataMockVer from '../../mockData/ScheduleExerciseDataMockVer.data';

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
      ScheduleExerciseDataMockVer()
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
    exerciseDataIdxList: ['00000000-0001-0000-0000-000000000000', '00000000-0002-0000-0000-000000000000']
  }
}