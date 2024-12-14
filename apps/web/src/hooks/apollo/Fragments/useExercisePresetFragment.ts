import type { ExercisePresetStoreType } from '@service/GqlStore/ExercisePreset';
import type { GetExercisePresetResponse, GetExercisePresetVariable } from '@service/GqlStore/ExercisePreset/GetExercisePresetById';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { ExercisePresetFragment } from '@service/GqlStore/ExercisePreset';
import { useLazyGetExercisePresetById } from '@service/GqlStore/ExercisePreset/GetExercisePresetById';

export function useExercisePresetFragment(id: number) {
  return useFixedFragment<ExercisePresetStoreType, GetExercisePresetResponse, GetExercisePresetVariable>(
    ExercisePresetFragment,
    useLazyGetExercisePresetById,
    {
      id,
      __typename: 'ExercisePreset'
    })
}