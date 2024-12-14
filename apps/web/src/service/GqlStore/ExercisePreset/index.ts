import { ExercisePreset } from 'fitness-struct';
import { useCreateExercisePreset } from './CreateExercisePreset';
import { useDeleteExercisePreset } from './DeleteExercisePreset';
import { GetExercisePresetResponse, GetExercisePresetVariable, useGetExercisePresetById, useLazyGetExercisePresetById } from './GetExercisePresetById';
import { useGetExercisePresetWithListList } from './GetExercisePresetWithListList';
import { useSaveScheduleAsExercisePreset } from './SaveScheduleAsExercisePreset';
import { gql, StoreObject } from '@apollo/client';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { GetExercisePresetWithListByIdResponse, GetExercisePresetWithListByIdVariable, useLazyGetExercisePresetWithListById } from './GetExercisePresetWithListById';

export type ExercisePresetStoreType = ExercisePreset.Preset & StoreObject
export type ExercisePresetWithListStoreType = ExercisePreset.PresetWithExerciseList & StoreObject

export const ExercisePresetFragment = gql`
fragment ExercisePresetFragment on ExercisePreset {
  id
  name
}`

export const ExercisePresetWithListFragment = gql`
fragment ExercisePresetWithListFragment on ExercisePresetWithList {
  id
  name
  ...ExercisePresetFragment
  exerciseList {
    ...ExerciseFragment
  }
}`

export function useExercisePresetFragment(id: number) {
  return useFixedFragment<ExercisePresetStoreType, GetExercisePresetResponse, GetExercisePresetVariable>(
    ExercisePresetFragment,
    useLazyGetExercisePresetById,
    {
      id,
      __typename: 'ExercisePreset'
    })
}

export function useExercisePresetWithListFragment(id: number) {
  return useFixedFragment<
    ExercisePresetWithListStoreType,
    GetExercisePresetWithListByIdResponse,
    GetExercisePresetWithListByIdVariable
  >(
    ExercisePresetWithListFragment,
    useLazyGetExercisePresetWithListById,
    {
      id,
      __typename: 'ExercisePresetWithList'
    })
}

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
