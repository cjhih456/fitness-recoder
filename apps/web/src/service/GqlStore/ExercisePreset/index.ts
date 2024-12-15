import { useCreateExercisePreset } from './CreateExercisePreset';
import { useDeleteExercisePreset } from './DeleteExercisePreset';
import { useGetExercisePresetById } from './GetExercisePresetById';
import { useGetExercisePresetWithListList } from './GetExercisePresetWithListList';
import { useSaveScheduleAsExercisePreset } from './SaveScheduleAsExercisePreset';

export {
  useCreateExercisePreset,
  useGetExercisePresetWithListList,
  useGetExercisePresetById,
  useSaveScheduleAsExercisePreset,
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
