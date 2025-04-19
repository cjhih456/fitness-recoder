import { useMutation } from '@apollo/client'
import CreateExerciseByExercisePreset from '@entities/exercise/api/mutation/CreateExerciseByExercisePreset';

export default function useCreateExerciseByExercisePreset() {
  return useMutation<
    CreateExerciseByExercisePresetResponse,
    CreateExerciseByExercisePresetVariable
  >(CreateExerciseByExercisePreset)
}