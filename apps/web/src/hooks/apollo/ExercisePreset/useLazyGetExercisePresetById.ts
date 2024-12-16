import { useLazyQuery } from '@apollo/client';
import GetExercisePresetById from '@graphQuery/Query/ExercisePreset/GetExercisePresetById';

export default function useLazyGetExercisePresetById() {
  return useLazyQuery<
    GetExercisePresetResponse,
    GetExercisePresetVariable
  >(GetExercisePresetById, { fetchPolicy: 'cache-first' })
}