import { gql } from '@apollo/client'

const UpdateExerciseListByScheduleId = gql`
mutation UpdateExerciseListByScheduleId($scheduleId: Int, $newExercise: [Int!], $deleteExerciseId: [Int!]) {
  updateExerciseListByScheduleId(scheduleId: $scheduleId, newExercise: $newExercise, deleteExerciseId: $deleteExerciseId){
    ...ExerciseFragment
  }
}`

export default UpdateExerciseListByScheduleId