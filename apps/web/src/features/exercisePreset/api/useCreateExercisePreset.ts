import type { CreateExercisePresetResponse, CreateExercisePresetVariable } from '../model';
import type { GetExercisePresetWithListByOffsetResponse } from '@entities/exercisePreset/model';
import { useMutation } from '@apollo/client'
import CreateExercisePresetGql from '@features/exercisePreset/api/mutation/CreateExercisePresetGql';

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