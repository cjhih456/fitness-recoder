import type { ExerciseDataDisplayProps } from './ExerciseDataDisplay';
import type { Meta, StoryObj } from '@storybook/react';
import type { Exercise } from 'fitness-struct';
import { fn } from '@storybook/test';
import ExerciseDataDisplay from './ExerciseDataDisplay';
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
      const obj = {
        id: 1,
        exercise: 1,
        deps: 0
      } as Exercise.Data
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
