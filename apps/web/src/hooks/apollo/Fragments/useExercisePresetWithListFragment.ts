import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { useLazyGetExercisePresetWithListById } from '@service/GqlStore/ExercisePreset/GetExercisePresetWithListById';
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
