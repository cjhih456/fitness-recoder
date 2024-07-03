import type { Meta, StoryObj } from '@storybook/react';
import SimpleFitnessItem, { SimpleFitnessItemProps } from './SimpleFitnessItem'
import ScheduleExerciseDataMockVer from '../../mockData/ScheduleExerciseDataMockVer.data';

const meta = {
  title: 'Fitness/SimpleFitnessItem',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<SimpleFitnessItemProps>,
  component: SimpleFitnessItem,
  decorators: [
    (Story) => {
      ScheduleExerciseDataMockVer()
      return <div className="grid min-w-[320px] h-[500px] overflow-hiden">
        <Story />
      </div>
    }
  ]
} satisfies Meta<typeof SimpleFitnessItem>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    exerciseDataIdx: '00000000-0001-0000-0000-000000000000'
  }
}