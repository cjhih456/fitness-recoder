import type { UpdateExerciseListByScheduleIdResponse, UpdateExerciseListByScheduleIdVariable } from '@features/exercise/model';
import { useMutation } from '@apollo/client'
import UpdateExerciseListByScheduleId from './mutation/UpdateExerciseListByScheduleId';

export default function useUpdateExerciseListByScheduleId() {
  return useMutation<
    UpdateExerciseListByScheduleIdResponse,
    UpdateExerciseListByScheduleIdVariable
  >(UpdateExerciseListByScheduleId, {
    update(cache, { data }, { variables }) {
      if (!data) return
      if (!variables) return
      const { scheduleId } = variables
      const newExercise = data.updateExerciseListByScheduleId
      cache.modify({
        fields: {
          getExerciseListByScheduleId: (existingData, { storeFieldName }) => {
            if (!storeFieldName.includes(JSON.stringify({ id: scheduleId }))) return existingData
            return newExercise
          }
        }
      })
    }
  })
}