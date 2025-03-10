import { useLazyGetExercisePresetById } from '@hooks/apollo/ExercisePreset';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import ExercisePresetFragment from './graphql/fragments/ExercisePresetFragment';

export default function useExercisePresetFragment(id: number) {
  return useFixedFragment<ExercisePresetStoreType, GetExercisePresetResponse, GetExercisePresetVariable>(
    ExercisePresetFragment,
    useLazyGetExercisePresetById,
    {
      id,
      __typename: 'ExercisePreset'
    })
}