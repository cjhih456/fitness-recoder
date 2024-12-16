import { useLazyQuery } from '@apollo/client';
import GetExercisePresetWithListById from '@graphQuery/Query/ExercisePreset/GetExercisePresetWithListById';

export default function useLazyGetExercisePresetWithListById() {
  return useLazyQuery<
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(GetExercisePresetWithListById, {
    fetchPolicy: 'cache-first'
  })
}