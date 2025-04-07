import { useMutation } from '@apollo/client'
import CreateExerciseByExercisePreset from '@entities/exercise/api/graphql/mutation/CreateExerciseByExercisePreset';

export default function useCreateExerciseByExercisePreset() {
  return useMutation<
    CreateExerciseByExercisePresetResponse,
    CreateExerciseByExercisePresetVariable
  >(CreateExerciseByExercisePreset)
}