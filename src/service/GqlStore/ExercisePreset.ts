import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

const getExercisePresetListGql = gql`
query GetExercisePresetList($page: Int, $size: Int) {
  getExercisePresetList(page: $page, size: $size) {
    id
    name
    deps
  }
}
`
export function useLazyGetExercisePresetList() {
  return useLazyQuery<{ getExercisePresetList: ExercisePreset[] }, { page: number, size: number }>(getExercisePresetListGql)
}
export function useGetExercisePresetList(page: number, size: number) {
  return useQuery<{ getExercisePresetList: ExercisePreset[] }, { page: number, size: number }>(getExercisePresetListGql, {
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
