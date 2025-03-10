import { useLazyGetExercisePresetWithListById } from '@hooks/apollo/ExercisePreset';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import ExercisePresetWithListFragment from './graphql/fragments/ExercisePresetWithListFragment';

export default function useExercisePresetWithListFragment(id: number) {
  return useFixedFragment<
    ExercisePresetWithListStoreType,
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(
    ExercisePresetWithListFragment,
    useLazyGetExercisePresetWithListById,
    {
      id,
      __typename: 'ExercisePresetWithList'
    })
}
