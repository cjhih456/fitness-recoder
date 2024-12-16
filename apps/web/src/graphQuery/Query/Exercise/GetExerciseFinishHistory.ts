import { gql } from '@apollo/client'

const GetExerciseFinishHistory = gql`
query GetExerciseFinishHistory($exerciseId: Int) {
  getExerciseFinishHistory(exerciseId: $exerciseId) {
    id
    type
    year
    month
    date
    exercise
    cnt
    hasDone
    weights
    repeats
    weightUnit
  }
}`

export default GetExerciseFinishHistory