import { ExercisePreset } from 'fitness-struct';
import { useCreateExercisePreset } from './CreateExercisePreset';
import { useDeleteExercisePreset } from './DeleteExercisePreset';
import { useGetExercisePresetById } from './GetExercisePresetById';
import { useGetExercisePresetList } from './GetExercisePresetList';
import { useSaveScheduleAsExercisePreset } from './SaveScheduleAsExercisePreset';
import { gql, StoreObject } from '@apollo/client';

export const ExercisePresetFragment = gql`
fragment ExercisePresetFragment on ExercisePreset {
  id
  name
}`
export const ExercisePresetWithExerciseFragment = gql`
fragment ExercisePresetWithExerciseFragment on ExercisePreset {
  ...ExercisePresetFragment,
  exerciseList {
    ...ExerciseFragment
  }
}`

export {
  useCreateExercisePreset,
  useGetExercisePresetList,
  useGetExercisePresetById,
  useSaveScheduleAsExercisePreset,
  useDeleteExercisePreset
}

export const ExercisePresetMockData: { [key: number]: ExercisePreset.Preset & StoreObject } = Array(20).fill(0).reduce((acc, _cur, i) => {
  const id = i + 1
  acc[id] = {
    id: id,
    name: `TestPreset - ${id}`,
    deps: 0
  } as ExercisePreset.Preset & StoreObject
  return acc
}, {})
