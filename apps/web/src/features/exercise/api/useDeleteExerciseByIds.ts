import type { DeleteExerciseByIdsResponse, DeleteExerciseByIdsVariable } from '../model';
import type { ExerciseDataStoreType } from '@entities/exercise/model';
import { useMutation } from '@apollo/client'
import ExerciseFragment from '@entities/exercise/api/fragment/ExerciseFragment';
import DeleteExerciseByIds from './mutation/DeleteExerciseByIds';
export default function useDeleteExerciseById() {
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
          getExerciseListByScheduleId: ExerciseDataStoreType[]
          getExerciseListByExercisePresetId: ExerciseDataStoreType[]
        }
      >({
        fields: {
          getExerciseListByScheduleId: (existingData) => {
            return existingData.filter((v) => {
              const fragment = cache.readFragment<ExerciseDataStoreType>({
                id: cache.identify(v),
                fragment: ExerciseFragment
              })
              if (!fragment) return true
              return !ids.includes(fragment.id)
            })
          },
          getExerciseListByExercisePresetId: (existingData) => {
            return existingData.filter((v) => {
              const fragment = cache.readFragment<ExerciseDataStoreType>({
                id: cache.identify(v),
                fragment: ExerciseFragment
              })
              if (!fragment) return true
              return !ids.includes(fragment.id)
            })
          }
        }
      })
    }
  })
}