import { useCreateExercisePreset } from './CreateExercisePreset';
import { useGetExercisePresetById, useLazyGetExercisePresetById } from './GetExercisePresetById';
import { useGetExercisePresetList, useLazyGetExercisePresetList } from './GetExercisePresetList';

export {
  useCreateExercisePreset,
  useGetExercisePresetList,
  useLazyGetExercisePresetList,
  useGetExercisePresetById,
  useLazyGetExercisePresetById
}

export const ExercisePresetMockData: { [key: number]: ExercisePreset } = Array(20).fill(0).reduce((acc, cur, i) => {
  const id = i + 1
  acc[id] = {
    id: id,
    name: `TestPreset - ${id}`,
    deps: 0
  } as ExercisePreset
  return acc
}, {})
