import type { ScheduleListProps } from './ScheduleList';
import type { Meta, StoryObj } from '@storybook/react';
import ScheduleList from './ScheduleList'
const meta = {
  title: 'Schedule/ScheduleList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {},
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

export const Display: Story = {
  args: {
    scheduleList: []
  }
}
