import useCopyExercisePresetFromSchedule from './useCopyExercisePresetFromSchedule'
import useCreateExercisePreset from './useCreateExercisePreset';
import useDeleteExercisePreset from './useDeleteExercisePreset';
import useExercisePresetFragment from './useExercisePresetFragment';
import useExercisePresetWithListFragment from './useExercisePresetWithListFragment';
import useGetExercisePresetById from './useGetExercisePresetById';
import useGetExercisePresetWithListById from './useGetExercisePresetWithListById';
import useGetExercisePresetWithListList from './useGetExercisePresetWithListList';
import useLazyGetExercisePresetById from './useLazyGetExercisePresetById';
import useLazyGetExercisePresetWithListById from './useLazyGetExercisePresetWithListById';

export {
  useCopyExercisePresetFromSchedule,
  useCreateExercisePreset,
  useDeleteExercisePreset,
  useExercisePresetFragment,
  useExercisePresetWithListFragment,
  useGetExercisePresetById,
  useGetExercisePresetWithListList,
  useGetExercisePresetWithListById,
  useLazyGetExercisePresetById,
  useLazyGetExercisePresetWithListById
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
