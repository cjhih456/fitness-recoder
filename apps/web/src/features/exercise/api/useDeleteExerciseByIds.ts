import type { DeleteExerciseByIdsResponse, DeleteExerciseByIdsVariable } from '../model';
import type { GetExerciseByExercisePresetIdResponse, GetExerciseListByScheduleIdResponse } from '@entities/exercise/model';
import type { GetExercisePresetWithListByOffsetResponse } from '@entities/exercisePreset/model';
import { useMutation } from '@apollo/client'
import getExerciseCache from '@entities/exercise/lib/getExerciseCache';
import updateExercisePresetWithListCache from '@entities/exercisePreset/lib/updateExercisePresetWithListCache';
import DeleteExerciseByIds from './mutation/DeleteExerciseByIds';

export default function useDeleteExerciseByIds() {
  return useMutation<
    DeleteExerciseByIdsResponse,
    DeleteExerciseByIdsVariable
  >(DeleteExerciseByIds, {
    update(cache, { data, }, { variables }) {
      if (!data) return
      if (!variables) return
      const { ids } = variables
      cache.modify<
        {
          getExerciseListByScheduleId: GetExerciseListByScheduleIdResponse['getExerciseListByScheduleId'],
          getExerciseListByExercisePresetId: GetExerciseByExercisePresetIdResponse['getExerciseListByExercisePresetId'],
          getExercisePresetWithListByOffset: GetExercisePresetWithListByOffsetResponse['getExercisePresetWithListByOffset']
        }
      >({
        fields: {
          getExerciseListByScheduleId: (existingData) => {
            return existingData.filter((v) => {
              const fragment = getExerciseCache(v, cache)
              if (!fragment) return true
              return !ids.includes(fragment.id)
            })
          },
          getExerciseListByExercisePresetId: (existingData) => {
            return existingData.filter((v) => {
              const fragment = getExerciseCache(v, cache)
              if (!fragment) return true
              return !ids.includes(fragment.id)
            })
          },
          getExercisePresetWithListByOffset: (exercisePresetData) => {
            exercisePresetData.forEach((v) => {
              updateExercisePresetWithListCache(v, cache, (exercisePresetData) => {
                if (!exercisePresetData) return exercisePresetData
                const exerciseList = exercisePresetData.exerciseList.filter((v) => {
                  const fragment = getExerciseCache(v.id, cache)
                  if (!fragment) return v
                  return !ids.includes(fragment.id)
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