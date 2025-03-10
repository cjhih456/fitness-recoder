import { useLazyQuery } from '@apollo/client';
import GetFitnessLisyByIds from '@hooks/apollo/Fitness/graphql/query/GetFitnessLisyByIds';

export default function useLazyGetFitnessListByIds() {
  return useLazyQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(GetFitnessLisyByIds, {
    fetchPolicy: 'cache-first',
  })
}