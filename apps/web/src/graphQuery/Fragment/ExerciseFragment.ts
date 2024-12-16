import { gql } from '@apollo/client'

const ExerciseFragment = gql`
fragment ExerciseFragment on Exercise {
  id
  deps
  exercise
}`

export default ExerciseFragment