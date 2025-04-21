import type { DeleteExerciseByIdVariable, DeleteExerciseByIdResponse } from '../model';
import type { ExerciseDataStoreType } from '@entities/exercise/model';
import { useMutation } from '@apollo/client'
import DeleteExerciseById from './mutation/DeleteExerciseById';
export default function useDeleteExerciseById() {
  return useMutation<
    DeleteExerciseByIdResponse,
    DeleteExerciseByIdVariable
  >(DeleteExerciseById, {
    update(cache, { data }, { variables }) {
      if (!data) return
      if (!variables) return
      const { id } = variables
      cache.modify({
        fields: {
          getExerciseListByScheduleId: (existingData) => {
            return existingData.filter((v: ExerciseDataStoreType) => v.id !== id)
          },
          getExerciseListByExercisePresetId: (existingData) => {
            return existingData.filter((v: ExerciseDataStoreType) => v.id !== id)
          }
        }
      })
    }
  })
}