import { useLazyQuery } from '@apollo/client';
import GetFitnessById from '@hooks/apollo/Fitness/graphql/query/GetFitnessById';

export default function useLazyGetFitnessById() {
  return useLazyQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(GetFitnessById, {
    fetchPolicy: 'cache-first',
  })
}