import type { Meta, StoryObj } from '@storybook/react';
import ScheduleDisplay, { ScheduleDisplayProps } from './ScheduleDisplay'
import ScheduleExerciseDataMockVer from '../../mockData/ScheduleExerciseDataMockVer.data';
import { ScheduleType } from '../../service/Store/ScheduleStoreHooks';

const meta = {
  title: 'Schedule/ScheduleDisplay',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    date: {
      control: 'text'
    }
  },
  args: {} as Partial<ScheduleDisplayProps>,
  component: ScheduleDisplay,
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
} satisfies Meta<typeof ScheduleDisplay>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    exerciseList: ['00000000-0001-0000-0000-000000000000', '00000000-0002-0000-0000-000000000000'],
    date: '2024-01-01',
    id: '0000001-0000-0000-0000-000000000000',
    title: 'Title'
  }
}

export const WithSchedule: Story = {
  args: {
    date: '2024-01-01',
    schedule: {
      id: '0000001-0000-0000-0000-000000000000',
      beforeTime: 0,
      breakTime: 0,
      date: 1,
      month: 1,
      year: 2024,
      type: ScheduleType.SCHEDULED,
      exerciseList: ['00000000-0001-0000-0000-000000000000', '00000000-0002-0000-0000-000000000000'],
      start: 0,
      workoutTimes: 0
    },
    id: '0000001-0000-0000-0000-000000000000',
    title: 'Title'
  }
}