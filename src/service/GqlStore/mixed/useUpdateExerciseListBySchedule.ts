import { useCreateExercise, useDeleteExerciseById, useLazyGetExerciseListByScheduleId } from '../Exercise';

export function useUpdateExerciseListBySchedule() {
  const [callOldList] = useLazyGetExerciseListByScheduleId()
  const [deleteExerciseData] = useDeleteExerciseById()
  const [createExerciseData] = useCreateExercise()
  return async (scheduleId: number, exerciseList: number[]) => {
    const removeNeedExerciseData = [] as ExerciseData[]
    const keepExerciseData = [] as ExerciseData[]
    const createNeedExerciseId = [] as number[]

    const { data: oldExerciseList } = await callOldList({ variables: { scheduleId: scheduleId } })
    oldExerciseList?.getExerciseListByScheduleId.forEach((e) => {
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
    if (removeNeedExerciseData.length) {
      await Promise.all(removeNeedExerciseData.map((exerciseData) => {
        return deleteExerciseData({
          variables: {
            id: exerciseData.id
          }
        })
      }))
    }
    if (createNeedExerciseId.length) {
      await Promise.all(createNeedExerciseId.map((id) => {
        return createExerciseData({
          variables: {
            exercise: {
              exerciseId: id,
              scheduleId: scheduleId
            }
          }
        })
      }))
    }
  }
}