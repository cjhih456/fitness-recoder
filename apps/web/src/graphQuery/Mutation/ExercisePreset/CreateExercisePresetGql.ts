import { gql } from '@apollo/client';

const CreateExercisePresetGql = gql`
mutation CreateExercisePreset($exercisePreset: CreateExercisePresetInput) {
  createExercisePreset(exercisePreset: $exercisePreset) {
    ...ExercisePresetFragment
  }
}`
export default CreateExercisePresetGql