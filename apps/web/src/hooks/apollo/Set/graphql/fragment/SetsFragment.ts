import { gql } from '@apollo/client'

const SetsFragment = gql`
fragment SetsFragment on Sets {
  id
  exerciseId
  duration
  isDone
  repeat
  weight
  weightUnit
}`
export default SetsFragment