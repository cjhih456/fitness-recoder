import { useSuspenseQuery } from '@apollo/client'
import GetFitnessById from './graphql/query/GetFitnessById';

export default function useGetFitnessById(id: number) {
  return useSuspenseQuery<GetFitnessByIdResponse, GetFitnessByIdVariable>(GetFitnessById, {
    variables: { id }
  })
}
