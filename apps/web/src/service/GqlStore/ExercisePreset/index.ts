import type { GetExercisePresetResponse, GetExercisePresetVariable } from './GetExercisePresetById';
import type { GetExercisePresetWithListByIdResponse, GetExercisePresetWithListByIdVariable } from './GetExercisePresetWithListById';
import type { StoreObject } from '@apollo/client';
import type { ExercisePreset } from 'fitness-struct';
import { gql } from '@apollo/client';
import useFixedFragment from '@hooks/apollo/useFixedFragment';
import { useCreateExercisePreset } from './CreateExercisePreset';
import { useDeleteExercisePreset } from './DeleteExercisePreset';
import { useGetExercisePresetById, useLazyGetExercisePresetById } from './GetExercisePresetById';
import { useLazyGetExercisePresetWithListById } from './GetExercisePresetWithListById';
import { useGetExercisePresetWithListList } from './GetExercisePresetWithListList';
import { useSaveScheduleAsExercisePreset } from './SaveScheduleAsExercisePreset';

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
