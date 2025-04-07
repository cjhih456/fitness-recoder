import { useSuspenseQuery } from '@apollo/client'
import GetFitnessLisyByIds from './graphql/query/GetFitnessLisyByIds';

export default function useGetFitnessListByIds(ids: number[]) {
  return useSuspenseQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(GetFitnessLisyByIds, {
    variables: { ids }
  })
}
