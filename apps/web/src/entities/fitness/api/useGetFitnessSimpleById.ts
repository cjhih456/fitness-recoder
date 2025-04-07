import { useSuspenseQuery } from '@apollo/client'
import GetFitnessSimpleById from './graphql/query/GetFitnessSimpleById';

export default function useGetFitnessSimpleById(id: number) {
  return useSuspenseQuery<GetFitnessSimpleByIdResponse, GetFitnessSimpleByIdVariable>(GetFitnessSimpleById, {
    variables: { id }
  })
}
