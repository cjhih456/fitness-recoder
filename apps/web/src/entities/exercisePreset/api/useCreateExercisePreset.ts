import { useMutation } from '@apollo/client'
import CreateExercisePresetGql from './graphql/mutation/CreateExercisePresetGql';

export default function useCreateExercisePreset() {
  return useMutation<CreateExercisePresetResponse, CreateExercisePresetVariable>(CreateExercisePresetGql, {
    update: (cache, result) => {
      cache.modify<{
        getExercisePresetWithListByOffset: GetExercisePresetWithListByOffsetResponse['getExercisePresetWithListByOffset']
      }>({
        fields: {
          getExercisePresetWithListByOffset(prev, { toReference }) {
            if (!prev || !result.data?.createExercisePreset) return prev
            const ref = toReference(result.data?.createExercisePreset, true)
            return [ref, ...prev]
          }
        }
      })
    }
  })
}