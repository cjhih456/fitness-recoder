import { useSuspenseQuery } from '@apollo/client'
import GetSetListByExerciseIdGql from '@entities/set/api/graphql/query/GetSetListByExerciseIdGql';

export default function useGetSetListByExerciseId(id: number) {
  return useSuspenseQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(GetSetListByExerciseIdGql, {
    variables: { id }
  })
}