import { useSuspenseQuery } from '@apollo/client'
import GetExercisePresetWithListById from './graphql/query/GetExercisePresetWithListById';

export default function useGetExercisePresetWithListById(id: number) {
  return useSuspenseQuery<
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(GetExercisePresetWithListById, {
    variables: { id }
  })
}
