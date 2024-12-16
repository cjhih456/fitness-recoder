import useLazyGetExercisePresetById from '@hooks/apollo/ExercisePreset/useLazyGetExercisePresetById';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import ExercisePresetFragment from '../../../graphQuery/Fragment/ExercisePresetFragment';

export default function useExercisePresetFragment(id: number) {
  return useFixedFragment<ExercisePresetStoreType, GetExercisePresetResponse, GetExercisePresetVariable>(
    ExercisePresetFragment,
    useLazyGetExercisePresetById,
    {
      id,
      __typename: 'ExercisePreset'
    })
}