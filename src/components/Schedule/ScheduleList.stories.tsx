import type { Meta, StoryObj } from '@storybook/react';
import ScheduleList, { ScheduleListProps } from './ScheduleList'
import ScheduleExerciseDataMockVer from '../../mockData/ScheduleExerciseDataMockVer.data';

const meta = {
  title: 'Schedule/ScheduleList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<ScheduleListProps>,
  component: ScheduleList,
  decorators: [
    (Story) => {
      ScheduleExerciseDataMockVer()
      return <div className="grid min-w-[320px] h-[500px] overflow-hiden">
        <div>
          <Story />
        </div>
      </div>
    }
  ]
} satisfies Meta<typeof ScheduleList>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    choosenDate: '2024-01-01',
  }
}
