import { useLazyQuery } from '@apollo/client';
import GetFitnessById from '@graphQuery/Query/Fitness/GetFitnessById';

export default function useLazyGetFitnessById() {
  return useLazyQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(GetFitnessById, {
    fetchPolicy: 'cache-first',
  })
}