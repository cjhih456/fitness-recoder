import { useMutation } from '@apollo/client'
import GetExercisePresetWithListById from '@entities/exercisePreset/api/graphql/query/GetExercisePresetWithListById';
import CreateExerciseByExercisePreset from '@features/exercise/api/mutation/CreateExerciseByExercisePreset';

export default function useCreateExerciseByExercisePreset() {
  return useMutation<
    CreateExerciseByExercisePresetResponse,
    CreateExerciseByExercisePresetVariable
  >(CreateExerciseByExercisePreset, {
    update(cache, { data }, { variables }) {
      if (!data) return
      if (!variables) return
      const { exercisePresetId } = variables.exercise
      const newExercise = data.createExerciseByExercisePreset
      let hasUpdate = false
      cache.modify({
        fields: {
          getExercisePresetWithListById: (existingData, { storeFieldName }) => {
            if (!storeFieldName.includes(JSON.stringify({ id: exercisePresetId }))) return existingData
            hasUpdate = true
            return [...existingData, ...newExercise]
          }
        }
      })
      if (!hasUpdate) {
        cache.writeQuery({
          query: GetExercisePresetWithListById,
          variables: { id: exercisePresetId },
          data: { getExercisePresetWithListById: newExercise }
        })
      }
    }
  })
}