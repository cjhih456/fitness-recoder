import { useSuspenseQuery } from '@apollo/client'
import GetExerciseListByExercisePresetId from './graphql/query/GetExerciseListByExercisePresetId';

export default function useGetExerciseListByExercisePresetId(exercisePresetId: number) {
  return useSuspenseQuery<
    GetExerciseByExercisePresetIdResponse,
    GetExerciseByExercisePresetIdVariable
  >(GetExerciseListByExercisePresetId, {
    variables: { exercisePresetId: Number(exercisePresetId) }
  })
}