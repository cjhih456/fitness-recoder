import { useLazyQuery } from '@apollo/client';
import GetFitnessSimpleById from '@graphQuery/Query/Fitness/GetFitnessSimpleById';

export default function useLazyGetFitnessSimpleById() {
  return useLazyQuery<GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(GetFitnessSimpleById, {
    fetchPolicy: 'cache-first',
  })
}