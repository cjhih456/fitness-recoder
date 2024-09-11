import type { Meta, StoryObj } from '@storybook/react';
import ExerciseDataList, { ExerciseDataListProps } from './ExerciseDataList';
import ScheduleInfoDataMockVer from '../../mockData/ScheduleInfoDataMockVer.data';
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
      ScheduleInfoDataMockVer()
      const id = {
        id: 1,
        beforeTime: 0,
        breakTime: 0,
        exerciseList: [
          {
            id: 1,
            exercise: 0,
            deps: 1
          },
          {
            id: 2,
            exercise: 1,
            deps: 2
          }
        ],
        type: 'SCHEDULED'
      } as Schedule
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
