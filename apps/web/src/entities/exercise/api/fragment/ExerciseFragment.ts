import { gql } from '@apollo/client'

const ExerciseFragment = gql`
fragment ExerciseFragment on BaseExercise {
  id
  deps
  fitnessId
}`

export default ExerciseFragment
