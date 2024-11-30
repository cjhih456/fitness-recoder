import { ExercisePreset } from 'fitness-struct';
import { useCreateExercisePreset } from './CreateExercisePreset';
import { useDeleteExercisePreset } from './DeleteExercisePreset';
import { useGetExercisePresetById, useLazyGetExercisePresetById } from './GetExercisePresetById';
import { useGetExercisePresetList } from './GetExercisePresetList';
import { useSaveScheduleAsExercisePreset } from './SaveScheduleAsExercisePreset';

export {
  useCreateExercisePreset,
  useGetExercisePresetList,
  useGetExercisePresetById,
  useLazyGetExercisePresetById,
  useSaveScheduleAsExercisePreset,
  useDeleteExercisePreset
}

export const ExercisePresetMockData: { [key: number]: ExercisePreset.Preset } = Array(20).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  acc[id] = {
    id: id,
    name: `TestPreset - ${id}`,
    deps: 0
  } as ExercisePreset.Preset
  return acc
}, {})
