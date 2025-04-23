import type { DeleteExerciseByIdVariable, DeleteExerciseByIdResponse } from '../model';
import type { GetExerciseByExercisePresetIdResponse, GetExerciseListByScheduleIdResponse } from '@entities/exercise/model';
import type { GetExercisePresetWithListByOffsetResponse } from '@entities/exercisePreset/model';
import { useMutation } from '@apollo/client'
import getExerciseByCache from '@entities/exercise/lib/getExerciseCache';
import updateExercisePresetWithListCache from '@entities/exercisePreset/lib/updateExercisePresetWithListCache';
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
      cache.modify<{
        getExerciseListByScheduleId: GetExerciseListByScheduleIdResponse['getExerciseListByScheduleId'],
        getExerciseListByExercisePresetId: GetExerciseByExercisePresetIdResponse['getExerciseListByExercisePresetId'],
        getExercisePresetWithListByOffset: GetExercisePresetWithListByOffsetResponse['getExercisePresetWithListByOffset']
      }>({
        fields: {
          getExerciseListByScheduleId: (existingData) => {
            return existingData.filter((v) => {
              const fragment = getExerciseByCache(v, cache)
              if (!fragment) return v
              return fragment.id !== id
            })
          },
          getExerciseListByExercisePresetId: (existingData) => {
            return existingData.filter((v) => {
              const fragment = getExerciseByCache(v, cache)
              if (!fragment) return v
              return fragment.id !== id
            })
          },
          getExercisePresetWithListByOffset: (exercisePresetData) => {
            exercisePresetData.forEach((v) => {
              updateExercisePresetWithListCache(v, cache, (exercisePresetData) => {
                if (!exercisePresetData) return exercisePresetData
                const exerciseList = exercisePresetData.exerciseList.filter((v) => {
                  const fragment = getExerciseByCache(v.id, cache)
                  if (!fragment) return v
                  return fragment.id !== id
                })
                return { ...exercisePresetData, exerciseList }
              })
            })
            return exercisePresetData
          }
        }
      })
    }
  })
}
