import type { GetExerciseByExercisePresetIdResponse, GetExerciseByExercisePresetIdVariable } from '../model';
import { useSuspenseQuery } from '@apollo/client'
import GetExerciseListByExercisePresetId from './query/GetExerciseListByExercisePresetId';

export default function useGetExerciseListByExercisePresetId(exercisePresetId: number) {
  return useSuspenseQuery<
    GetExerciseByExercisePresetIdResponse,
    GetExerciseByExercisePresetIdVariable
  >(GetExerciseListByExercisePresetId, {
    variables: { exercisePresetId: Number(exercisePresetId) }
  })
}