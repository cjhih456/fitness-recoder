import { useSuspenseQuery } from '@apollo/client'
import GetFitnessSimpleByIds from '@entities/fitness/api/graphql/query/GetFitnessSimpleByIds';

export default function useGetFitnessSimpleListByIds(ids: number[]) {
  return useSuspenseQuery<GetFitnessSimpleListByIdsResponse, GetFitnessSimpleListByIdsVariable>(GetFitnessSimpleByIds, {
    variables: { ids }
  })
}
