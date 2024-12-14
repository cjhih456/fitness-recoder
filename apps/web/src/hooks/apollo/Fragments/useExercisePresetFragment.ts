import { ExercisePresetFragment, ExercisePresetStoreType } from '@service/GqlStore/ExercisePreset';
import { GetExercisePresetResponse, GetExercisePresetVariable, useLazyGetExercisePresetById } from '@service/GqlStore/ExercisePreset/GetExercisePresetById';
import useFixedFragment from '@hooks/apollo/useFixedFragment';

export function useExercisePresetFragment(id: number) {
  return useFixedFragment<ExercisePresetStoreType, GetExercisePresetResponse, GetExercisePresetVariable>(
    ExercisePresetFragment,
    useLazyGetExercisePresetById,
    {
      id,
      __typename: 'ExercisePreset'
    })
}