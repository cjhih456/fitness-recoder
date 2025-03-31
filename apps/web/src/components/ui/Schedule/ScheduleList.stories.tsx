import type { ScheduleListProps } from './ScheduleList';
import type { Meta, StoryObj } from '@storybook/react';
import DateService from '@entities/Calender/model/DateService';
import ScheduleList from './ScheduleList'
const meta = {
  title: 'Schedule/ScheduleList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    choosenDate: {
      control: 'text'
    }
  },
  args: {} as Partial<ScheduleListProps>,
  component: ScheduleList,
  decorators: [
    (Story) => {
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

const { year, month, date } = DateService.takeTodayDateValue()
const nowDate = `${year}-${month}-${date}`

export const Display: Story = {
  args: {
    choosenDate: nowDate
  }
}
