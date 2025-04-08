import { useMutation } from '@apollo/client'
import DeleteExerciseById from '@entities/exercise/api/graphql/mutation/DeleteExerciseById';

export default function useDeleteExerciseById() {
  return useMutation<
    DeleteExerciseByIdResponse,
    DeleteExerciseByIdVariable
  >(DeleteExerciseById)
}