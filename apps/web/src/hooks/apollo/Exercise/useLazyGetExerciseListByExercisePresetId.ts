import { useLazyQuery } from '@apollo/client';
import GetExerciseListByExercisePresetId from '@hooks/apollo/Exercise/graphql/query/GetExerciseListByExercisePresetId';

export default function useLazyGetExerciseListByExercisePresetId() {
  return useLazyQuery<
    GetExerciseByExercisePresetIdResponse,
    GetExerciseByExercisePresetIdVariable
  >(GetExerciseListByExercisePresetId)
}