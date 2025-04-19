import type { GetFitnessByIdResponse, GetFitnessByIdVariable } from '@entities/fitness/model/types';
import { useSuspenseQuery } from '@apollo/client'
import GetFitnessById from '@entities/fitness/api/query/GetFitnessById';

export default function useGetFitnessById(id: number) {
  return useSuspenseQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(GetFitnessById, {
    variables: { id }
  })
}
