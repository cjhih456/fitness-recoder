import type { Meta, StoryObj } from '@storybook/react';
import ExerciseDataDisplay, { ExerciseDataDisplayProps } from './ExerciseDataDisplay';
import ScheduleExerciseDataMockVer from '../../mockData/ScheduleExerciseDataMockVer.data';
import { fn } from '@storybook/test';
const meta = {
  title: 'ExerciseData/ExerciseDataDisplay',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    actions: {
      argTypesRegex: '^(has).*'
    }
  },
  args: {
    hasDoneLastSet: fn()
  } as Partial<ExerciseDataDisplayProps>,
  component: ExerciseDataDisplay,
  decorators: [
    (Story, options) => {
      ScheduleExerciseDataMockVer()
      const obj = {
        id: 1,
        exercise: 1,
        deps: 0
      } as ExerciseData
      Object.assign(options.args, { exerciseData: obj })
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
