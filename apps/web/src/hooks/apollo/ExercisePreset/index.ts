import useCopyExercisePresetFromSchedule from './useCopyExercisePresetFromSchedule'
import useCreateExercisePreset from './useCreateExercisePreset';
import useDeleteExercisePreset from './useDeleteExercisePreset';
import useGetExercisePresetById from './useGetExercisePresetById';
import useGetExercisePresetWithListList from './useGetExercisePresetWithListList';
export {
  useCreateExercisePreset,
  useGetExercisePresetWithListList,
  useGetExercisePresetById,
  useCopyExercisePresetFromSchedule,
  useDeleteExercisePreset
}

export const ExercisePresetMockData: { [key: number]: ExercisePresetStoreType } = Array(20).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  acc[id] = {
    id: id,
    name: `TestPreset - ${id}`,
    deps: 0
  } as ExercisePresetStoreType
  return acc
}, {})
