import { gql } from '@apollo/client';

const CreateExerciseByExercisePreset = gql`
mutation CreateExerciseByExercisePreset($exercise: CreateExerciseByExercisePresetInput!) {
  createExerciseByExercisePreset(exercise: $exercise) {
    ...ExerciseWithFitnessFragment
  }
}`

export default CreateExerciseByExercisePreset