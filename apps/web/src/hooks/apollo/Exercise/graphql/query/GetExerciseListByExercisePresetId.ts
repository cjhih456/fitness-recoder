import { gql } from '@apollo/client'

const GetExerciseListByExercisePresetId = gql`
query GetExerciseByExercisePresetId($exercisePresetId: Int) {
  getExerciseListByExercisePresetId(exercisePresetId: $exercisePresetId) {
    ...ExerciseWithFitnessFragment
  }
}`
export default GetExerciseListByExercisePresetId