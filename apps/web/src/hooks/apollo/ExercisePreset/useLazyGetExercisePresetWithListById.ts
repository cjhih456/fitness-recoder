import { useLazyQuery } from '@apollo/client';
import GetExercisePresetWithListById from '@hooks/apollo/ExercisePreset/graphql/query/GetExercisePresetWithListById';

export default function useLazyGetExercisePresetWithListById() {
  return useLazyQuery<
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(GetExercisePresetWithListById, {
    fetchPolicy: 'cache-first'
  })
}