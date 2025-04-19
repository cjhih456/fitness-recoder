import { useUpdateExerciseListByScheduleId } from '@features/exercise/api'
export default function useUpdateExerciseListBySchedule() {
  const [updateListByScheduleId] = useUpdateExerciseListByScheduleId()
  return async (scheduleId: number, oldExerciseIds: number[], newExerciseIds: number[]) => {
    const removeNeedExerciseData = [] as number[]
    const keepExerciseData = [] as number[]
    const createNeedExerciseId = [] as number[]

    oldExerciseIds.forEach((e) => {
      if (newExerciseIds.includes(e)) {
        keepExerciseData.push(e)
      } else {
        removeNeedExerciseData.push(e)
      }
    })

    newExerciseIds.forEach((newExerciseId) => {
      if (!keepExerciseData.includes(newExerciseId)) {
        createNeedExerciseId.push(newExerciseId)
      }
    })

    updateListByScheduleId({
      variables: {
        scheduleId: scheduleId,
        deleteExerciseId: removeNeedExerciseData,
        newExercise: createNeedExerciseId
      }
    })
  }
}