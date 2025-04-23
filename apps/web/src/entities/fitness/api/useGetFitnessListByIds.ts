import type { GetFitnessListByIdsResponse, GetFitnessListByIdsVariable } from '@entities/fitness/model/types';
import { useSuspenseQuery } from '@apollo/client'
import GetFitnessLisyByIds from '@entities/fitness/api/query/GetFitnessLisyByIds';

export default function useGetFitnessListByIds(ids: number[]) {
  return useSuspenseQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(GetFitnessLisyByIds, {
    variables: { ids }
  })
}
