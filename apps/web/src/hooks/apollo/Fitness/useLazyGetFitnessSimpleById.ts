import { useLazyQuery } from '@apollo/client';
import GetFitnessSimpleById from '@hooks/apollo/Fitness/graphql/query/GetFitnessSimpleById';

export default function useLazyGetFitnessSimpleById() {
  return useLazyQuery<GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(GetFitnessSimpleById, {
    fetchPolicy: 'cache-first',
  })
}