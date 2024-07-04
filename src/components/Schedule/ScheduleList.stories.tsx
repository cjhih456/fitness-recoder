import type { Meta, StoryObj } from '@storybook/react';
import ScheduleList, { ScheduleListProps } from './ScheduleList'
import ScheduleKeyMockVer from '../../mockData/ScheduleKeyMockVer.data';
import { withRouter } from 'storybook-addon-react-router-v6'
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
    withRouter,
    (Story) => {
      ScheduleKeyMockVer()
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
