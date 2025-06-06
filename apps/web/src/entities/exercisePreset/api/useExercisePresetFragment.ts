import type { ExercisePresetStoreType } from '@entities/exercisePreset/model';
import { useSuspenseFragment } from '@apollo/client';
import ExercisePresetFragment from './fragments/ExercisePresetFragment';

export default function useExercisePresetFragment(id: number) {
  const { data } = useSuspenseFragment<ExercisePresetStoreType>({
    fragment: ExercisePresetFragment,
    from: {
      id,
      __typename: 'ExercisePreset'
    }
  })
  return data
}