import { gql } from '@apollo/client';

const deleteExerciseByIds = gql`
mutation deleteExerciseByIds($ids: [Int!]!) {
  deleteExerciseByIds(ids: $ids)
}`

export default deleteExerciseByIds