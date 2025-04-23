import type { GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable } from '@entities/fitness/model/types';
import { useSuspenseQuery } from '@apollo/client'
import GetFitnessSimpleById from '@entities/fitness/api/query/GetFitnessSimpleById';

export default function useGetFitnessSimpleById(id: number) {
  return useSuspenseQuery<GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(GetFitnessSimpleById, {
    variables: { id }
  })
}
