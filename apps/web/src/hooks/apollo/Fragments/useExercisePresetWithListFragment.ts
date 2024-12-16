import useLazyGetExercisePresetWithListById from '@hooks/apollo/ExercisePreset/useLazyGetExercisePresetWithListById';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import ExercisePresetWithListFragment from '../../../graphQuery/Fragment/ExercisePresetWithListFragment';

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
