import { useMutation } from '@apollo/client'
import UpdateExerciseListByExercisePresetId from '@features/exercise/api/mutation/UpdateExerciseListByExercisePresetId';

export default function useUpdateExerciseListByExercisePresetId() {
  return useMutation<
    UpdateExerciseListByExercisePresetIdResponse,
    UpdateExerciseListByExercisePresetIdVariable
  >(UpdateExerciseListByExercisePresetId, {
    update(cache, { data }, { variables }) {
      if (!data) return
      if (!variables) return
      const { exercisePresetId } = variables
      const newExercise = data.updateExerciseListByExercisePresetId

      cache.modify({
        fields: {
          getExercisePresetWithListById: (existingData, { storeFieldName }) => {
            if (!storeFieldName.includes(JSON.stringify({ id: exercisePresetId }))) return existingData
            return newExercise
          }
        }
      })
    }
  })
}