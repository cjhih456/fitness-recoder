import type { ExerciseDataListProps } from './ExerciseDataList';
import type { Meta, StoryObj } from '@storybook/react';
import type { Schedule } from 'fitness-struct';
import ExerciseDataList from './ExerciseDataList';

const meta = {
  title: 'ExerciseData/ExerciseDataList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<ExerciseDataListProps>,
  component: ExerciseDataList,
  decorators: [
    (Story, options) => {
      const id = {
        id: 1,
        beforeTime: 0,
        breakTime: 0,
        exerciseList: [
          {
            id: 1,
            exercise: 1,
            deps: 1
          },
          {
            id: 2,
            exercise: 2,
            deps: 2
          }
        ],
        type: 'SCHEDULED'
      } as Schedule.Schedule
      Object.assign(options.args, { schedule: id })
      return <div>
        < Story {...options} />
      </div >
    }
  ]
} satisfies Meta<typeof ExerciseDataList>

type Story = StoryObj<typeof meta>;
export default meta

export const CustomAble: Story = {
  args: {
    readonly: false
  }
}

export const ReadOnly: Story = {
  args: {
    readonly: true
  }
}
