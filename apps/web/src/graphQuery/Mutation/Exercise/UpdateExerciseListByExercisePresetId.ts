import { gql } from '@apollo/client';

const UpdateExerciseListByExercisePresetId = gql`
mutation UpdateExerciseListByExercisePresetId($exercisePresetId: Int, $newExercise: [Int!], $deleteExerciseId: [Int!]) {
  updateExerciseListByExercisePresetId(exercisePresetId: $exercisePresetId, newExercise: $newExercise, deleteExerciseId: $deleteExerciseId) {
    ...ExerciseFragment
  }
}`

export default UpdateExerciseListByExercisePresetId