import { gql, useQuery } from '@apollo/client';

const getSetListByExerciseIdGql = gql`
query GetSetListByExerciseId($id: ID!) {
  getSetListByExerciseId(id: $id) {
    duration
    exerciseId
    id
    isDone
    repeat
    weight
    weightUnit
  }
}
`
export function useGetSetListByExerciseId(id: number) {
  return useQuery<{ getSetListByExerciseId: Sets[] }>(getSetListByExerciseIdGql, {
    variables: { id }
  })
}