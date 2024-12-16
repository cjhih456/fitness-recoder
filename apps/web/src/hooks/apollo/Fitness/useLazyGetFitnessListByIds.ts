import { useLazyQuery } from '@apollo/client';
import GetFitnessLisyByIds from '@graphQuery/Query/Fitness/GetFitnessLisyByIds';

export default function useLazyGetFitnessListByIds() {
  return useLazyQuery<GetFitnessListByIdsResponse, GetFitnessListByIdsVariable>(GetFitnessLisyByIds, {
    fetchPolicy: 'cache-first',
  })
}