import { Exercise } from 'fitness-struct'
import { useUpdateExerciseListByScheduleId } from '../Exercise'

export function useUpdateExerciseListBySchedule() {
  const [updateListByScheduleId] = useUpdateExerciseListByScheduleId()
  return async (scheduleId: number, oldExerciseList: Exercise.Data[], exerciseList: number[]) => {
    const removeNeedExerciseData = [] as Exercise.Data[]
    const keepExerciseData = [] as Exercise.Data[]
    const createNeedExerciseId = [] as number[]

    oldExerciseList.forEach((e) => {
      if (exerciseList.includes(e.exercise)) {
        keepExerciseData.push(e)
      } else {
        removeNeedExerciseData.push(e)
      }
    })
    const keepExerciseDataExercises = keepExerciseData.map(v => v.exercise)
    exerciseList.forEach((newExerciseId) => {
      if (!keepExerciseDataExercises.includes(newExerciseId)) {
        createNeedExerciseId.push(newExerciseId)
      }
    })
    updateListByScheduleId({
      variables: {
        scheduleId: scheduleId,
        deleteExerciseId: removeNeedExerciseData.map(v => Number(v.id)),
        newExercise: createNeedExerciseId
      }
    })
  }
}