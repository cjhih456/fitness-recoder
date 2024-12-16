import { gql } from '@apollo/client'

const GetExerciseListByScheduleId = gql`
query GetExerciseListByScheduleId($scheduleId: Int) {
  getExerciseListByScheduleId(scheduleId: $scheduleId) {
    ...ExerciseFragment
  }
}`

export default GetExerciseListByScheduleId