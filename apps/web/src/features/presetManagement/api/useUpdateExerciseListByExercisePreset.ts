import type { Exercise } from 'fitness-struct';
import { useUpdateExerciseListByExercisePresetId } from '@entities/exercise/api';

export default function useUpdateExerciseListByExercisePreset() {
  const [updateList] = useUpdateExerciseListByExercisePresetId()
  return async (exercisePresetId: number, oldExerciseList: Exercise.Data[], exerciseList: number[]) => {
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
    if (!createNeedExerciseId.length && !removeNeedExerciseData.length) return Promise.resolve()
    return updateList({
      variables: {
        exercisePresetId: exercisePresetId,
        newExercise: createNeedExerciseId,
        deleteExerciseId: removeNeedExerciseData.map(v => Number(v.id)),
      }
    })
  }
}