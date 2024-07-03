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
      const id = '00000001-0000-0000-0000-000000000000'
      Object.assign(options.args, { scheduleIdx: id })
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
