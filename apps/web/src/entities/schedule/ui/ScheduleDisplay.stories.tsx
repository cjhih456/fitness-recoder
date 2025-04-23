import type { ScheduleDisplayProps } from './ScheduleDisplay';
import type { Meta, StoryObj } from '@storybook/react';
import { ScheduleType } from '@entities/schedule/model/ScheduleType';
import MenuableAccordion from '@shared/ui/MenuableAccordion';
import ScheduleDisplay from './ScheduleDisplay'

const meta = {
  title: 'Schedule/ScheduleDisplay',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  argTypes: {},
  args: {} as Partial<ScheduleDisplayProps>,
  component: ScheduleDisplay,
  decorators: [
    (Story) => {
      return <div className="grid min-w-[320px] h-[500px] overflow-hiden">
        <div>
          <MenuableAccordion.GroupProvider>
            <Story />
          </MenuableAccordion.GroupProvider>
        </div>
      </div>
    }
  ]
} satisfies Meta<typeof ScheduleDisplay>;

type Story = StoryObj<typeof meta>;
export default meta

export const Display: Story = {
  args: {
    schedule: {
      id: 1,
      beforeTime: 0,
      breakTime: 0,
      date: 1,
      month: 1,
      year: 2024,
      type: ScheduleType.SCHEDULED,
      start: 0,
      workoutTimes: 0
    },
    exerciseListCount: 1,
    title: 'Title'
  }
}
