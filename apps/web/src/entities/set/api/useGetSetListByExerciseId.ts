import type { GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable } from '@entities/set/model';
import { useSuspenseQuery } from '@apollo/client'
import GetSetListByExerciseIdGql from '@entities/set/api/query/GetSetListByExerciseIdGql';

export default function useGetSetListByExerciseId(id: number) {
  return useSuspenseQuery<GetSetListByExerciseIdResponse, GetSetListByExerciseIdVariable>(GetSetListByExerciseIdGql, {
    variables: { id }
  })
}