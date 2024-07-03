import type { Meta, StoryObj } from '@storybook/react';
import ExerciseDataDisplay, { ExerciseDataDisplayProps } from './ExerciseDataDisplay';
import ScheduleExerciseDataMockVer from '../../mockData/ScheduleExerciseDataMockVer.data';
const meta = {
  title: 'ExerciseData/ExerciseDataDisplay',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {} as Partial<ExerciseDataDisplayProps>,
  component: ExerciseDataDisplay,
  decorators: [
    (Story, options) => {
      ScheduleExerciseDataMockVer()
      const id = '00000000-0000-0000-0000-000000000000'
      Object.assign(options.args, { exerciseDataIdx: id })
      return <div>
        < Story {...options} />
      </div >
    }
  ]
} satisfies Meta<typeof ExerciseDataDisplay>

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
