import { useLazyQuery } from '@apollo/client';
import GetExercisePresetById from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetById';

export default function useLazyGetExercisePresetById() {
  return useLazyQuery<
    GetExercisePresetResponse,
    GetExercisePresetVariable
  >(GetExercisePresetById, { fetchPolicy: 'cache-first' })
}