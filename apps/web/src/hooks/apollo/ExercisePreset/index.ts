import useCopyExercisePresetFromSchedule from './useCopyExercisePresetFromSchedule'
import useCreateExercisePreset from './useCreateExercisePreset';
import useDeleteExercisePreset from './useDeleteExercisePreset';
import useExercisePresetFragment from './useExercisePresetFragment';
import useExercisePresetWithListFragment from './useExercisePresetWithListFragment';
import useGetExercisePresetWithListById from './useGetExercisePresetWithListById';
import useGetExercisePresetWithListByOffset from './useGetExercisePresetWithListByOffset';

export {
  useCopyExercisePresetFromSchedule,
  useCreateExercisePreset,
  useDeleteExercisePreset,
  useExercisePresetFragment,
  useExercisePresetWithListFragment,
  useGetExercisePresetWithListByOffset,
  useGetExercisePresetWithListById,
}

export const ExercisePresetMockData: { [key: number]: ExercisePresetStoreType } = Array(20).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  acc[id] = {
    id: id,
    name: `TestPreset - ${id}`,
    deps: 0,
    __typename: 'ExercisePreset'
  } as ExercisePresetStoreType
  return acc
}, {})
