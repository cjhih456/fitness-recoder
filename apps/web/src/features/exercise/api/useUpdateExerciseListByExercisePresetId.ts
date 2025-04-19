import { useMutation } from '@apollo/client'
import UpdateExerciseListByExercisePresetId from '@entities/exercise/api/mutation/UpdateExerciseListByExercisePresetId';

export default function useUpdateExerciseListByExercisePresetId() {
  return useMutation<
    UpdateExerciseListByExercisePresetIdResponse,
    UpdateExerciseListByExercisePresetIdVariable
  >(UpdateExerciseListByExercisePresetId)
}