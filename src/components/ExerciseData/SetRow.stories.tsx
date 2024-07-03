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
      const id = '00000000-0000-0000-0000-000000000001'
      Object.assign(options.args, { setId: id })
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
    readonly: false
  }
}

export const ReadOnly: Story = {
  args: {
    index: 2,
    readonly: true
  }
}
