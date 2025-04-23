import type { CreateExerciseByExercisePresetResponse, CreateExerciseByExercisePresetVariable } from '@features/exercise/model';
import { useMutation } from '@apollo/client'
import updateExercisePresetWithListCache from '@entities/exercisePreset/lib/updateExercisePresetWithListCache';
import CreateExerciseByExercisePreset from '@features/exercise/api/mutation/CreateExerciseByExercisePreset';
export default function useCreateExerciseByExercisePreset() {
  return useMutation<
    CreateExerciseByExercisePresetResponse,
    CreateExerciseByExercisePresetVariable
  >(CreateExerciseByExercisePreset, {
    update(cache, { data }, { variables }) {
      if (!data) return
      if (!variables) return
      const { exercisePresetId } = variables.exercise
      const newExercise = data.createExerciseByExercisePreset
      updateExercisePresetWithListCache(exercisePresetId, cache, (exercisePresetData) => {
        if (!exercisePresetData) return exercisePresetData
        return { ...exercisePresetData, exerciseList: [...exercisePresetData.exerciseList, ...newExercise] }
      })
    }
  })
}