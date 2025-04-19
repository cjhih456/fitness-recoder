import type { ExerciseDataListProps } from './ExerciseDataList';
import type { Exercise } from '@fitness/struct';
import type { Meta, StoryObj } from '@storybook/react';
import ExerciseDataItem from '@entities/exercise/ui/ExerciseDataItem';
import SetListEditor from '@features/set/ui/SetListEditor';
import ExerciseDataList from './ExerciseDataList';

const meta = {
  title: 'ExerciseData/ExerciseDataList',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  args: {
    scheduleId: 1,
  } as Partial<ExerciseDataListProps>,
  component: ExerciseDataList,
  decorators: [
    (Story, options) => {
      Object.assign(options.args, {
        children: ({ exercise }: { exercise: Exercise.Data }) => <ExerciseDataItem exerciseId={exercise.id} fitnessName={exercise.fitness?.name}>
          <SetListEditor exerciseDataId={exercise.id} readonly={false} />
        </ExerciseDataItem>
      })
      return <div>
        <Story {...options} />
      </div >
    }
  ]
} satisfies Meta<typeof ExerciseDataList>

export default meta

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
}
