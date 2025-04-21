import type { Exercise } from '@fitness/struct'
import { useCreateExerciseBySchedule, useDeleteExerciseByIds } from '@features/exercise/api'

export default function useUpdateExerciseListBySchedule() {
  const [createExercise] = useCreateExerciseBySchedule()
  const [deleteExercise] = useDeleteExerciseByIds()
  return async (scheduleId: number, oldExerciseList: Exercise.Data[], fitnessIds: number[]) => {
    const removeNeedExerciseData = [] as Exercise.Data[]
    const keepExerciseData = [] as Exercise.Data[]
    const createNeedFitnessId = [] as number[]
    oldExerciseList.forEach((e) => {
      if (fitnessIds.includes(e.fitnessId)) {
        keepExerciseData.push(e)
      } else {
        removeNeedExerciseData.push(e)
      }
    })
    const keepExerciseDataExercises = keepExerciseData.map(v => v.fitnessId)
    fitnessIds.forEach((newExerciseId) => {
      if (!keepExerciseDataExercises.includes(newExerciseId)) {
        createNeedFitnessId.push(newExerciseId)
      }
    })
    if (createNeedFitnessId.length) {
      await createExercise({
        variables: {
          exercise: {
            scheduleId,
            fitnessIds: createNeedFitnessId
          }
        }
      })
    }
    if (removeNeedExerciseData.length) {
      await deleteExercise({
        variables: {
          ids: removeNeedExerciseData.map(v => Number(v.id))
        }
      })
    }
  }
}