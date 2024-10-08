import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

const getExercisePresetListGql = gql`
query GetExercisePresetList($page: Int, $size: Int) {
  getExercisePresetList(page: $page, size: $size) {
    id
    name
    exerciseList {
      id
      exercise
    }
  }
}
`
export function useLazyGetExercisePresetList() {
  return useLazyQuery<{ getExercisePresetList: ExercisePresetWithExerciseList[] }, { page: number, size: number }>(getExercisePresetListGql)
}
export function useGetExercisePresetList(page: number, size: number) {
  return useQuery<{ getExercisePresetList: ExercisePresetWithExerciseList[] }, { page: number, size: number }>(getExercisePresetListGql, {
    variables: { page, size }
  })
}


const createExercisePresetGql = gql`
mutation CreateExercisePreset($exercisePreset: CreateExercisePresetInput) {
  createExercisePreset(exercisePreset: $exercisePreset) {
    id
    name
    deps
  }
}
`
export function useCreateExercisePreset() {
  return useMutation<{ createExercisePreset: ExercisePreset }, { exercisePreset: { name: string } }>(createExercisePresetGql)
}


const getExercisePresetByIdGql = gql`
query GetExercisePresetById($id: ID!) {
  getExercisePresetById(id:$id) {
    id
    name
  }
}
`
export function useLazyGetExercisePresetById() {
  return useLazyQuery<{ getExercisePresetById: ExercisePreset }, { id: number }>(getExercisePresetByIdGql)
}
export function useGetExercisePresetById(id: number) {
  return useQuery<{ getExercisePresetById: ExercisePreset }, { id: number }>(getExercisePresetByIdGql, { variables: { id: id } })
}