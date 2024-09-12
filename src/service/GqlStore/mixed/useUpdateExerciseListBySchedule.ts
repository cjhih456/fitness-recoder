import { useUpdateExerciseListByScheduleId } from '../Exercise';

export function useUpdateExerciseListBySchedule() {
  const [updateListByScheduleId] = useUpdateExerciseListByScheduleId()
  return async (scheduleId: number, oldExerciseList: ExerciseData[], exerciseList: number[]) => {
    const removeNeedExerciseData = [] as ExerciseData[]
    const keepExerciseData = [] as ExerciseData[]
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
        deleteExerciseId: removeNeedExerciseData.map(v => v.id),
        newExercise: createNeedExerciseId
      }
    })
  }
}