import { useMutation } from '@apollo/client'
import DeleteExerciseById from '@entities/exercise/api/mutation/DeleteExerciseById';

export default function useDeleteExerciseById() {
  return useMutation<
    DeleteExerciseByIdResponse,
    DeleteExerciseByIdVariable
  >(DeleteExerciseById)
}