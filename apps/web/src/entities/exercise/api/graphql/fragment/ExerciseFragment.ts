import { gql } from '@apollo/client'

const ExerciseFragment = gql`
fragment ExerciseFragment on BaseExercise {
  id
  deps
  exercise
}`

export default ExerciseFragment
