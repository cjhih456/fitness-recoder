import { gql } from '@apollo/client';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { useLazyGetExercisePresetById } from '@service/GqlStore/ExercisePreset/GetExercisePresetById';

export const ExercisePresetFragment = gql`
fragment ExercisePresetFragment on ExercisePreset {
  id
  name
}`

export default function useExercisePresetFragment(id: number) {
  return useFixedFragment<ExercisePresetStoreType, GetExercisePresetResponse, GetExercisePresetVariable>(
    ExercisePresetFragment,
    useLazyGetExercisePresetById,
    {
      id,
      __typename: 'ExercisePreset'
    })
}