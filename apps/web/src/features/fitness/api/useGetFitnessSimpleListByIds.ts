import type { GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable } from '@entities/fitness/model/types';
import { useSuspenseQuery } from '@apollo/client'
import GetFitnessSimpleByIds from '@entities/fitness/api/query/GetFitnessSimpleByIds';

export default function useGetFitnessSimpleListByIds(ids: number[]) {
  return useSuspenseQuery<GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable>(GetFitnessSimpleByIds, {
    variables: { ids }
  })
}
