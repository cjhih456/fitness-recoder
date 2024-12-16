import { useLazyQuery } from '@apollo/client';
import GetExerciseListByExercisePresetId from '@graphQuery/Query/Exercise/GetExerciseListByExercisePresetId';

export default function useLazyGetExerciseListByExercisePresetId() {
  return useLazyQuery<
    GetExerciseByExercisePresetIdResponse,
    GetExerciseByExercisePresetIdVariable
  >(GetExerciseListByExercisePresetId)
}