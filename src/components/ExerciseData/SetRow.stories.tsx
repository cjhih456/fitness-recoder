import type { Meta, StoryObj } from '@storybook/react';
import SetRow, { SetRowProps } from './SetRow';
import ScheduleSetDataMockVer from '../../mockData/ScheduleSetDataMockVer.data';
const meta = {
  title: 'ExerciseData/SetRow',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<SetRowProps>,
  component: SetRow,
  decorators: [
    (Story, options) => {
      ScheduleSetDataMockVer()
      return <div>
        < Story {...options} />
      </div >
    }
  ]
} satisfies Meta<typeof SetRow>

type Story = StoryObj<typeof meta>;
export default meta

export const CustomAble: Story = {
  args: {
    index: 1,
    setId: '00000000-0000-0001-0000-000000000000',
    readonly: false
  }
}

export const ReadOnly: Story = {
  args: {
    index: 1,
    setId: '00000000-0000-0002-0000-000000000000',
    readonly: true
  }
}
