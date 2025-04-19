import { useMutation } from '@apollo/client'
import GetExerciseListByScheduleId from '@entities/exercise/api/query/GetExerciseListByScheduleId';
import CreateExerciseBySchedule from '@features/exercise/api/mutation/CreateExerciseBySchedule';

export default function useCreateExerciseBySchedule() {
  return useMutation<
    CreateExerciseByScheduleResponse,
    CreateExerciseByScheduleVariable
  >(CreateExerciseBySchedule, {
    update(cache, { data }, { variables }) {
      if (!data) return
      if (!variables) return
      const { scheduleId } = variables.exercise
      const newExercise = data.createExerciseBySchedule
      let hasUpdate = false
      cache.modify({
        fields: {
          getExerciseListByScheduleId: (existingData, { storeFieldName }) => {
            if (!storeFieldName.includes(JSON.stringify({ id: scheduleId }))) return existingData
            hasUpdate = true
            return [...existingData, ...newExercise]
          }
        }
      })
      if (!hasUpdate) {
        cache.writeQuery({
          query: GetExerciseListByScheduleId,
          variables: { id: scheduleId },
          data: { getExerciseListByScheduleId: newExercise }
        })
      }
    }
  })
}