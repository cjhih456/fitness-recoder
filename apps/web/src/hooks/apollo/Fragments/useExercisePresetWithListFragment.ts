import { gql } from '@apollo/client';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { useLazyGetExercisePresetWithListById } from '@service/GqlStore/ExercisePreset/GetExercisePresetWithListById';

export const ExercisePresetWithListFragment = gql`
fragment ExercisePresetWithListFragment on ExercisePresetWithList {
  id
  name
  ...ExercisePresetFragment
  exerciseList {
    ...ExerciseFragment
  }
}`

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
