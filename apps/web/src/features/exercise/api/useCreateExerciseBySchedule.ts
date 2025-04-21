import type { CreateExerciseByScheduleResponse, CreateExerciseByScheduleVariable } from '@features/exercise/model';
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
          getExerciseListByScheduleId: (existingData, { storeFieldName, toReference }) => {
            const refList = newExercise.map(v => toReference(v))
            if (!storeFieldName.includes(JSON.stringify({ scheduleId }))) return existingData
            hasUpdate = true
            return [...existingData, ...refList]
          }
        }
      })
      if (!hasUpdate) {
        cache.writeQuery({
          query: GetExerciseListByScheduleId,
          variables: { scheduleId },
          data: { getExerciseListByScheduleId: newExercise }
        })
      }
    }
  })
}