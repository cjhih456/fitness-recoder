import { useUpdateExerciseListByExercisePresetId } from '../Exercise';

export function useUpdateExerciseListByExercisePreset() {
  const [updateList] = useUpdateExerciseListByExercisePresetId()
  return async (exercisePresetId: number, oldExerciseList: ExerciseData[], exerciseList: number[]) => {
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